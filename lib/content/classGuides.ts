export type Era = { jogo: string; texto: string }

export type Guide = {
  nome: string
  lead: string
  eras: Era[]
  skillsNote: string
}

export const CLASS_GUIDES: Record<string, Guide> = {
  barbaro: {
    nome: 'Bárbaro',
    lead: 'A classe que atravessa a saga inteira. Força bruta como teologia: se o corpo aguenta, o mundo que se vire.',
    skillsNote: 'No D4 o kit dataminado tem Bash, Frenzy, Lunging Strike, Hammer of the Ancients, Rend, Whirlwind, Death Blow, Call of the Ancients, Weapon Throw. Planner puxa o SkillKit, não esta página.',
    eras: [
      { jogo: 'Diablo I', texto: 'O guerreiro de Tristram é o molde: espada, armadura, pouco mistério. Sem árvore — só o ofício de entrar na catedral quando o resto da cidade já desistiu.' },
      { jogo: 'Diablo II', texto: 'Gritos, dupla arma, whirlwind. O Bárbaro vira identidade: tribo das terras do norte, fúria como recurso, Leap como teologia de posicionamento.' },
      { jogo: 'Diablo III', texto: 'Fury, rend, ancient spear. Mais espetáculo, mesmo osso: corpo a corpo que recusa magia como muleta. O Nephalem ainda é um homem com um machado grande demais.' },
      { jogo: 'Diablo IV', texto: 'Ainda fúria. Arsenal de armas no peito. No ASILO, Pit alto de Bárbaro vale mais que lore — mas a lore explica por que a classe não some quando a season troca o unique da moda.' },
    ],
  },
  amazona: {
    nome: 'Amazona',
    lead: 'D2 no sangue. D4 no calendário: primeiro semestre de 2027. Arco e javelin. Sem kit inventado.',
    skillsNote: 'Não há Amazon.skl no dump atual. Lightning Fury e Valkyrie são memória de D2, não skill tree de D4. Quando o showcase sair, esta linha muda.',
    eras: [
      { jogo: 'Diablo II', texto: 'Javelin, lightning fury, valkyrie, bowzon. Skovos. A classe que o D4 atrasou de propósito — Paladino e Warlock vieram antes, a ilha ficou esperando.' },
      { jogo: 'Diablo IV · 2027', texto: 'Blizzard: velocidade, precisão, controle. Arma nova (javelin) + arco. Skill tree fina só depois do showcase. Planner ASILO não finge kit que não existe. Rob e o What’s Next da BlizzCon 2026 são a fonte, não leak de skill.' },
    ],
  },
  spiritborn: {
    nome: 'Spiritborn',
    lead: 'Filho de Vessel of Hatred. Quatro espíritos, um corpo, e a comunidade BR que aprendeu Evade como idioma.',
    skillsNote: 'Kit no dump: Eagle / Gorilla / Jaguar / Centipede. Touch of Death, Quill Volley, Evade loops — isso é build, não guia. Aqui é por que a classe existe.',
    eras: [
      { jogo: 'Antes do D4', texto: 'Não tem ancestral em D1–D3. O Spiritborn nasce em Nahantu: um povo que trata o espírito como arma, não como metáfora.' },
      { jogo: 'Diablo IV', texto: 'A classe mais “nova” do roster até o Warlock. No ASILO ela carregou rank: Pit absurdo, vídeo no Discord, officer no #pit-submit. Quem entra no clã perguntando “é evade?” já entendeu o recado e ainda não entendeu o espírito.' },
    ],
  },
  necromante: {
    nome: 'Necromante',
    lead: 'Os mortos trabalham. Você só precisa não ter vergonha disso.',
    skillsNote: 'Bone, Blood, Darkness, Army. Golem e Sacrifice ainda definem se a build é preguiçosa ou cirúrgica.',
    eras: [
      { jogo: 'Diablo II', texto: 'Summoner, poison, bone spear, corpse explosion. A fantasia mais honesta da saga: você não é o herói, é o capataz.' },
      { jogo: 'Diablo III', texto: 'Rathma, Trag’Oul, pets que viram parede. O Necro vira espetáculo visual — no D4 ele volta a ser lama e osso.' },
      { jogo: 'Diablo IV', texto: 'Minion, blight, blood wave, bone spirit. No clã: ou você joga army e admite, ou joga solo e prova no Pit. Os dois valem. Mentir o clear não vale.' },
    ],
  },
  feiticeira: {
    nome: 'Feiticeira',
    lead: 'Elemento como idioma. Quem não escolhe um, espalha dano e some no fosso.',
    skillsNote: 'Fire, Ice, Lightning. Teleport ainda é a skill que separa quem joga de quem sofre.',
    eras: [
      { jogo: 'Diablo II', texto: 'Frozen orb, meteor, lightning. A Sorc ensinou o mundo a farmar. O ASILO ainda fala “tele” como verbo.' },
      { jogo: 'Diablo III', texto: 'Wizard, não Sorc — mas o sangue é o mesmo: vidro que explode o mapa.' },
      { jogo: 'Diablo IV', texto: 'Enchantments, Firebolt, Chain Lightning, Blizzard, Inferno. Season troca o unique, a classe continua sendo a que pune posicionamento ruim com um teleport de 0.2s.' },
    ],
  },
  ladina: {
    nome: 'Ladina',
    lead: 'Corte, sombra, preparação. Se a rotação pede dez botões e você quer um, jogue outra classe.',
    skillsNote: 'Cutthroat, Marksman, Subterfuge. Combo points e Inner Sight ainda definem o cérebro da build.',
    eras: [
      { jogo: 'Diablo III', texto: 'Demon Hunter é a prima: armadilha, ódio, disciplina. A Rogue do D4 herda a pressa, não o nome.' },
      { jogo: 'Diablo IV', texto: 'Twisting Blades, Heartseeker, Rapid Fire, Death Trap, Concealment. No ASILO a Ladina é a classe que o recruta acha fácil até o Pit 90.' },
    ],
  },
  druida: {
    nome: 'Druida',
    lead: 'Urso, lobo, tempestade, terra. Quatro fantasias numa barra. Quem não escolhe, não sobe.',
    skillsNote: 'Werewolf, Werebear, Storm, Earth. Pulverize e Tornado ainda brigam pelo mesmo ego.',
    eras: [
      { jogo: 'Diablo II', texto: 'Elemental, shapeshift, summon. O Druida era o “resto” que virou culto. Hurricane ainda é religião.' },
      { jogo: 'Diablo IV', texto: 'Spirit Boons, Pulverize, Tornado, Landslide, Grizzly Rage. No clã o Druida é o que grava o vídeo com o mapa inteiro tremendo e manda no #pit-submit sem caption.' },
    ],
  },
  paladino: {
    nome: 'Paladino',
    lead: 'Fé como arma. D2 ensinou aura. D4 devolveu o juramento — e o Blessed Shield que o BR adotou.',
    skillsNote: 'Kit Paladin_NEW no dump. Auras, justice, shield. Builds S do clã não substituem este guia.',
    eras: [
      { jogo: 'Diablo II', texto: 'Holy Freeze, Blessed Hammer, Fist of the Heavens, Charge. O Paladino era o grupo: aura pra todo mundo, martelo pra quem não merecia.' },
      { jogo: 'Diablo IV', texto: 'Voltou depois de Spiritborn e Warlock na fila emocional da comunidade. No ASILO o Blessed Shield já entrou no arsenal verificado. Guia aqui, números no planner.' },
    ],
  },
  warlock: {
    nome: 'Warlock',
    lead: 'Pacto. Você não conjura de graça — você deve. A classe nova que o D4 usou pra dizer que magia ainda pode ser suja.',
    skillsNote: 'SkillKit Warlock.skl no dump. DoT, pet, maldição. Sem copiar tooltip da Blizzard nesta página.',
    eras: [
      { jogo: 'Antes', texto: 'Não há Warlock clássico na saga como classe jogável contínua. O D4 inventa o pacto no vocabulário de Santuário: poder emprestado, conta depois.' },
      { jogo: 'Diablo IV', texto: 'Chegou no roster recente. No clã: sala #warlock existe, guia ≠ build. Quem monta DoT sem vídeo no Pit está só conversando.' },
    ],
  },
}

export const CLASS_ALIAS: Record<string, string> = {
  barbaro: 'barbaro',
  barbarian: 'barbaro',
  amazona: 'amazona',
  amazon: 'amazona',
  spiritborn: 'spiritborn',
  necromante: 'necromante',
  necromancer: 'necromante',
  feiticeira: 'feiticeira',
  sorcerer: 'feiticeira',
  ladina: 'ladina',
  rogue: 'ladina',
  druida: 'druida',
  druid: 'druida',
  paladino: 'paladino',
  paladin: 'paladino',
  warlock: 'warlock',
}

export const CLASS_SLUGS = Object.keys(CLASS_GUIDES)
