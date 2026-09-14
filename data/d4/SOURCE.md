# Catálogo D4 (subset)

Fonte: [DiabloTools/d4data](https://github.com/DiabloTools/d4data) (MIT). Assets do jogo continuam da Blizzard.

Não clonamos o dump (~50MB+ `CoreTOC_flat.json` + `json/base/meta`). Extraímos:

- `json/base/meta/SkillKit/*.skl.json` das 8 classes jogáveis
- nomes de `PlayerClass`, `SkillKit`, sample de Aspect / Paragon no TOC

Regenerar (precisa dos JSON em `/tmp/d4data`):

```bash
python3 scripts/ingest-d4data.py
```

Amazona: não está no SkillKit atual. Planner não inventa kit. Janela Blizzard: H1 2027, arco + javelin.

Lothrik `diablo4-build-calc` é AGPL e está parado (sem Spiritborn/Paladin/Warlock) — referência, não fork.
