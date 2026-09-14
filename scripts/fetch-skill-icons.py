#!/usr/bin/env python3
"""Cataloga skills dos kits e tenta PNG em sunderarmor (fan atlas). Sem dump de 10GB."""

from __future__ import annotations

import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TREES = ROOT / "data" / "d4" / "trees"
OUT_JSON = ROOT / "data" / "d4" / "skills-catalog.json"
OUT_DIR = ROOT / "public" / "icons" / "skills"
BASES = [
    "https://sunderarmor.com/DIABLO4/Skills/VoH2/{slug}.png",
    "https://sunderarmor.com/DIABLO4/Skills/{slug}.png",
]

ALIASES = {
    "hammer of the ancients": "hotas",
    "call of the ancients": "call_of_the_ancients",
    "leap rend": "leap",
    "hammerdin": "blessed_hammer",
    "arbiter wing strike": "wing_strikes",
}


def slugify(name: str) -> str:
    s = name.lower().strip()
    if s in ALIASES:
        return ALIASES[s]
    return re.sub(r"[^a-z0-9]+", "_", s).strip("_")


def download(slug: str) -> bool:
    dest = OUT_DIR / f"{slug}.png"
    if dest.exists() and dest.stat().st_size > 800:
        return True
    for tmpl in BASES:
        url = tmpl.format(slug=slug)
        req = urllib.request.Request(url, headers={"User-Agent": "ASILO-tier/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=12) as r:
                data = r.read()
                ctype = r.headers.get("Content-Type", "")
            if "png" in ctype.lower() and len(data) > 800:
                dest.write_bytes(data)
                print("ok", slug, len(data))
                return True
        except Exception:
            continue
    print("miss", slug)
    return False


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    jobs: dict[str, str] = {}
    catalog: dict[str, list] = {}
    for path in sorted(TREES.glob("*.json")):
        if path.name == "index.json":
            continue
        tree = json.loads(path.read_text(encoding="utf-8"))
        cid = tree["classId"]
        seen: set[str] = set()
        rows = []
        for a in tree.get("actives") or []:
            name = a.get("name") or ""
            if not name or name in seen:
                continue
            seen.add(name)
            slug = slugify(name)
            jobs[slug] = name
            rows.append({"id": a.get("id") or slug, "name": name, "slug": slug, "icon": f"/icons/skills/{slug}.png"})
        catalog[cid] = rows

    with ThreadPoolExecutor(max_workers=8) as pool:
        futs = {pool.submit(download, slug): slug for slug in jobs}
        got = set()
        for fut in as_completed(futs):
            slug = futs[fut]
            if fut.result():
                got.add(slug)

    for cid, rows in catalog.items():
        for row in rows:
            if row["slug"] not in got and not (OUT_DIR / f"{row['slug']}.png").exists():
                row["icon"] = "/icons/skills/fallback.svg"
        print(cid, len(rows), "png", sum(1 for r in rows if r["icon"].endswith(".png")))
    OUT_JSON.write_text(json.dumps(catalog, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
