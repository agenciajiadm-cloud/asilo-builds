#!/usr/bin/env python3
"""Ponte d4data → ASILO. Só SkillKit + SkillTreeRewards. Sem dump de 10GB."""

from __future__ import annotations

import json
import re
import urllib.request
from collections import defaultdict, deque
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "d4" / "trees"
BASE = "https://raw.githubusercontent.com/DiabloTools/d4data/master"

CLASSES = {
    "barbarian": "Barbarian.skl.json",
    "druid": "Druid.skl.json",
    "necromancer": "Necromancer.skl.json",
    "rogue": "Rogue.skl.json",
    "sorcerer": "Sorcerer.skl.json",
    "spiritborn": "Spiritborn.skl.json",
    "paladin": "Paladin_NEW.skl.json",
    "warlock": "Warlock.skl.json",
}

CLUSTER_BY_INDEX = ["Básico", "Essencial", "Defesa", "Brawl", "Maestria", "Ultimate"]

FIX = {
    "HammeroftheAncients": "Hammer of the Ancients",
    "CalloftheAncients": "Call of the Ancients",
    "WrathoftheBerserker": "Wrath of the Berserker",
    "IronMaelstrom": "Iron Maelstrom",
    "WarCry": "War Cry",
    "RallyingCry": "Rallying Cry",
    "ChallengingShout": "Challenging Shout",
    "LungingStrike": "Lunging Strike",
    "DoubleSwing": "Double Swing",
    "GroundStomp": "Ground Stomp",
    "IronSkin": "Iron Skin",
    "DeathBlow": "Death Blow",
    "WeaponThrow": "Weapon Throw",
    "PrimalAxe": "Steel Grasp",
    "SteelGrasp": "Steel Grasp",
}


CACHE = Path("/tmp/d4-ponte")


def fetch(path: str) -> dict:
    CACHE.mkdir(parents=True, exist_ok=True)
    local = CACHE / path.replace("/", "_")
    if local.exists() and local.stat().st_size > 100:
        print("CACHE", path)
        return json.loads(local.read_text(encoding="utf-8"))
    url = f"{BASE}/{path}"
    print("GET", path)
    with urllib.request.urlopen(url, timeout=90) as r:
        data = r.read()
    local.write_bytes(data)
    return json.loads(data.decode("utf-8"))


def pretty(raw: str) -> str:
    if not raw:
        return ""
    s = raw
    s = re.sub(r"^(Barb|Sorc|Druid|Rogue|Necro|Spiritborn|Paladin|Warlock)_", "", s)
    s = re.sub(r"^(Barbarian|Sorcerer|Necromancer)_", "", s)
    s = re.sub(r"^Unlock_", "", s)
    s = re.sub(r"^Mod_", "", s)
    s = re.sub(r"^X1_", "", s)
    s = re.sub(r"_Upgrade([A-D])", r" · \1", s)
    s = re.sub(r"_Upgrade(\d+)", r" · \1", s)
    s = re.sub(r"_Side(\d+)", r" · lado \1", s)
    s = s.replace("_", " ")
    for a, b in FIX.items():
        s = s.replace(a, b)
    s = re.sub(r"(?<!^)(?<!· )(?<! )(?=[A-Z])", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def kind_of(name: str, root: int) -> str:
    if root == 1:
        return "cluster"
    if root == 2 or not name:
        return "rank"
    if "_Mod_" in name or re.search(r"_(Upgrade|Side)", name):
        return "mod"
    return "skill"


def slim_kit(class_id: str, kit: dict, rewards: dict[str, dict]) -> dict:
    nodes_in = kit["arNodes"]
    adj: dict[int, set[int]] = defaultdict(set)
    for c in kit.get("arConnections") or []:
        a, b = c.get("nIndexNodeA"), c.get("nIndexNodeB")
        if isinstance(a, int) and isinstance(b, int):
            adj[a].add(b)
            adj[b].add(a)
    for i, n in enumerate(nodes_in):
        for c in n.get("arConnections") or []:
            j = c.get("nIndexNode")
            if isinstance(j, int):
                adj[i].add(j)
                adj[j].add(i)

    clusters = sorted(
        (i for i, n in enumerate(nodes_in) if n.get("eRootNodeType") == 1),
        key=lambda i: nodes_in[i].get("dwNodeRequiredPlayerLevel") or 0,
    )
    cluster_label = {idx: CLUSTER_BY_INDEX[k] if k < len(CLUSTER_BY_INDEX) else f"Grupo {k+1}" for k, idx in enumerate(clusters)}

    nodes = []
    actives = []
    for i, n in enumerate(nodes_in):
        g = n.get("gbidReward") or {}
        reward = g.get("name") or ""
        root = n.get("eRootNodeType") or 0
        kind = kind_of(reward, root)
        if kind == "rank":
            continue
        rew = rewards.get(reward, {})
        power = rew.get("power") or ""
        max_rank = 5 if kind == "skill" else 1
        if kind == "cluster":
            max_rank = 0
            label = cluster_label.get(i, "Grupo")
        elif kind == "mod":
            label = pretty(reward)
        else:
            label = pretty(power or reward)
        pos = n.get("vPosition") or {"x": 0, "y": 0}
        node = {
            "i": i,
            "id": n.get("dwID"),
            "x": round(float(pos.get("x") or 0), 1),
            "y": round(float(pos.get("y") or 0), 1),
            "kind": kind,
            "label": label,
            "reward": reward,
            "power": power,
            "maxRank": max_rank,
            "exclusive": n.get("nExclusiveGroupId") if (n.get("nExclusiveGroupId") or -1) >= 0 else None,
            "levelReq": n.get("dwNodeRequiredPlayerLevel") or 0,
        }
        nodes.append(node)
        if kind == "skill":
            actives.append({"i": i, "id": power or reward, "name": label})

    kinds = {}
    for i, n in enumerate(nodes_in):
        g = n.get("gbidReward") or {}
        kinds[i] = kind_of(g.get("name") or "", n.get("eRootNodeType") or 0)
    rank = {i for i, k in kinds.items() if k == "rank"}
    keep = {n["i"] for n in nodes}

    def through_rank(start: int) -> set[int]:
        found: set[int] = set()
        dq: deque[int] = deque()
        seen = {start}
        for nb in adj[start]:
            if nb in keep and nb != start:
                found.add(nb)
            elif nb in rank:
                dq.append(nb)
                seen.add(nb)
        while dq:
            u = dq.popleft()
            for v in adj[u]:
                if v in seen:
                    continue
                if v in keep and v != start:
                    found.add(v)
                elif v in rank:
                    seen.add(v)
                    dq.append(v)
        return found

    edge_set = set()
    for i in keep:
        for j in through_rank(i):
            a, b = (i, j) if i < j else (j, i)
            edge_set.add((a, b))
    edges = [list(e) for e in sorted(edge_set)]

    xs = [n["x"] for n in nodes]
    ys = [n["y"] for n in nodes]
    return {
        "classId": class_id,
        "snoId": kit.get("__snoID__"),
        "source": "DiabloTools/d4data SkillKit + SkillTreeRewards",
        "bounds": {
            "minX": min(xs),
            "maxX": max(xs),
            "minY": min(ys),
            "maxY": max(ys),
        },
        "actives": actives,
        "nodes": nodes,
        "edges": edges,
    }


def load_rewards(raw: dict) -> dict[str, dict]:
    out = {}
    for e in raw["ptData"][0]["tEntries"]:
        name = (e.get("tHeader") or {}).get("szName") or ""
        sno = e.get("snoPower") or {}
        out[name] = {
            "eType": e.get("eType"),
            "power": sno.get("name") or "",
            "maxRank": e.get("dwMaxTalentRanks") or 1,
        }
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rewards = load_rewards(fetch("json/base/meta/GameBalance/SkillTreeRewards.gam.json"))
    index = {"source": BASE, "classes": {}}
    for cid, fname in CLASSES.items():
        kit = fetch(f"json/base/meta/SkillKit/{fname}")
        tree = slim_kit(cid, kit, rewards)
        path = OUT / f"{cid}.json"
        path.write_text(json.dumps(tree, separators=(",", ":")), encoding="utf-8")
        index["classes"][cid] = {
            "file": fname,
            "nodes": len(tree["nodes"]),
            "edges": len(tree["edges"]),
            "actives": len(tree["actives"]),
            "bytes": path.stat().st_size,
        }
        print(cid, index["classes"][cid])
    (OUT / "index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    (ROOT / "data" / "d4" / "SOURCE.md").write_text(
        """# Árvores D4 (ponte)

Fonte: [DiabloTools/d4data](https://github.com/DiabloTools/d4data) (MIT). Rebuild do JSON do jogo, não o Lothrik.

Não clonamos o dump (~10GB). O ingest baixa só:

- `json/base/meta/SkillKit/{Classe}.skl.json` (~300KB cada)
- `json/base/meta/GameBalance/SkillTreeRewards.gam.json` (~1.5MB)

```bash
python3 scripts/ingest-d4data.py
```

Nós tipo `rank` (pips sem GBID) somem no slim: o clique no skill gasta até 5 ranks.
Ícones `.tex` não entram — arte da Blizzard.
Amazona: sem SkillKit no dump. Planner não inventa.
""",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
