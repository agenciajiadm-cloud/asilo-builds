import type { TierBuild } from '@/lib/tier'

function row(
  id: string,
  tier: TierBuild['tier'],
  sort: number,
  name: string,
  class_id: string,
  skill_slug: string,
  href: string,
  icon?: string,
): TierBuild {
  return {
    id,
    list_kind: 'endgame',
    tier,
    sort,
    name,
    class_id,
    skill_slug,
    skill_icon: icon || `/icons/skills/${skill_slug}.png`,
    href,
  }
}

function d4(path: string) {
  return `https://d4builds.gg/builds/${path}/?var=0`
}

/** Semente inicial: sequência pública do d4builds.gg/tierlist. Editável no painel. */
export const TIER_SEED: TierBuild[] = [
  row('s1', 'S', 0, 'Pestilent Swarm', 'spiritborn', 'pestilent_swarm', d4('pestilent-swarm-spiritborn-endgame'), '/icons/classes/spiritborn.png'),
  row('s2', 'S', 1, 'Shred', 'druid', 'shred', d4('shred-druid-endgame')),
  row('s3', 'S', 2, 'Charge', 'barbarian', 'charge', d4('charge-barbarian-endgame')),
  row('s4', 'S', 3, 'Leap Rend', 'barbarian', 'leap', d4('leap-rend-barbarian-endgame')),
  row('s5', 'S', 4, 'Whirlwind', 'barbarian', 'whirlwind', d4('whirlwind-barbarian-endgame')),
  row('s6', 'S', 5, 'Firewall', 'sorcerer', 'firewall', d4('firewall-sorcerer-endgame')),
  row('s7', 'S', 6, 'Rain of Arrows', 'rogue', 'rain_of_arrows', d4('rain-of-arrows-rogue-endgame')),
  row('s8', 'S', 7, 'Penetrating Shot', 'rogue', 'penetrating_shot', d4('penetrating-shot-rogue-endgame')),

  row('a1', 'A', 0, 'Ancients', 'barbarian', 'call_of_the_ancients', d4('call-of-the-ancients-barbarian-endgame')),
  row('a2', 'A', 1, 'Lightning Storm', 'druid', 'lightning_storm', d4('lightning-storm-druid-endgame')),
  row('a3', 'A', 2, 'Werenado', 'druid', 'tornado', d4('tornado-druid-endgame')),
  row('a4', 'A', 3, 'Companion', 'druid', 'ravens', d4('companion-druid-endgame')),
  row('a5', 'A', 4, 'Landslide', 'druid', 'landslide', d4('landslide-druid-endgame')),
  row('a6', 'A', 5, 'Stinger', 'spiritborn', 'stinger', d4('stinger-spiritborn-endgame')),
  row('a7', 'A', 6, 'Quill Volley', 'spiritborn', 'quill_volley', d4('quill-volley-spiritborn-endgame')),
  row('a8', 'A', 7, 'Blood Wave', 'necromancer', 'blood_wave', d4('blood-wave-necromancer-endgame')),
  row('a9', 'A', 8, 'Lunatic', 'warlock', 'apocalypse', d4('lunatic-warlock-endgame')),
  row('a10', 'A', 9, 'Meteor', 'sorcerer', 'meteor', d4('meteor-sorcerer-endgame')),
  row('a11', 'A', 10, 'Dance of Knives', 'rogue', 'dance_of_knives', d4('dance-of-knives-rogue-endgame')),
  row('a12', 'A', 11, 'Death Trap', 'rogue', 'death_trap', d4('death-trap-rogue-endgame')),
  row('a13', 'A', 12, 'Twisting Blades', 'rogue', 'twisting_blades', d4('twisting-blades-rogue-endgame')),
  row('a14', 'A', 13, 'Arbiter Wing Strike', 'paladin', 'zeal', d4('arbiter-paladin-endgame')),
  row('a15', 'A', 14, 'Zeal', 'paladin', 'zeal', d4('zeal-paladin-endgame')),

  row('b1', 'B', 0, 'Apocalypse', 'warlock', 'apocalypse', d4('apocalypse-warlock-endgame')),
  row('b2', 'B', 1, 'Dread Claws', 'warlock', 'dread_claws', d4('dread-claws-warlock-endgame')),
  row('b3', 'B', 2, 'Golem', 'necromancer', 'golem', d4('golem-necromancer-endgame')),
  row('b4', 'B', 3, 'Bone Spirit', 'necromancer', 'bone_spirit', d4('bone-spirit-necromancer-endgame')),
  row('b5', 'B', 4, 'Bone Spear', 'necromancer', 'bone_spear', d4('bone-spear-necromancer-endgame')),
  row('b6', 'B', 5, 'Death Blow', 'barbarian', 'death_blow', d4('death-blow-barbarian-endgame')),
  row('b7', 'B', 6, 'Double Swing', 'barbarian', 'double_swing', d4('double-swing-barbarian-endgame')),
  row('b8', 'B', 7, 'Hammer of the Ancients', 'barbarian', 'hammer_of_the_ancients', d4('hammer-of-the-ancients-barbarian-endgame')),
  row('b9', 'B', 8, 'Ball Lightning', 'sorcerer', 'ball_lightning', d4('ball-lightning-sorcerer-endgame')),
  row('b10', 'B', 9, 'Fireball', 'sorcerer', 'fireball', d4('fireball-sorcerer-endgame')),
  row('b11', 'B', 10, 'Blizzard', 'sorcerer', 'blizzard', d4('blizzard-sorcerer-endgame')),
  row('b12', 'B', 11, 'Hammerdin', 'paladin', 'blessed_hammer', d4('hammerdin-paladin-endgame')),
  row('b13', 'B', 12, 'Divine Lance', 'paladin', 'divine_lance', d4('divine-lance-paladin-endgame')),
  row('b14', 'B', 13, 'Clash', 'paladin', 'clash', d4('clash-paladin-endgame')),
  row('b15', 'B', 14, 'Judgement', 'paladin', 'condemn', d4('judgement-paladin-endgame')),
  row('b16', 'B', 15, 'Blessed Shield', 'paladin', 'blessed_shield', d4('blessed-shield-paladin-endgame')),
  row('b17', 'B', 16, 'Crushing Hand', 'spiritborn', 'crushing_hand', d4('crushing-hand-spiritborn-endgame')),
  row('b18', 'B', 17, 'Rake', 'druid', 'rake', d4('rake-druid-endgame')),
]
