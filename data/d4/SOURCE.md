# Árvores D4 (ponte)

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
