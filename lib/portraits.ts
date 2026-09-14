import type { ClassId } from '@/lib/d4'

export const CLASS_PORTRAIT: Partial<Record<ClassId, string>> = {
  barbarian: '/images/classes/barbarian.webp',
  sorcerer: '/images/classes/sorcerer.jpg',
  necromancer: '/images/classes/necromancer.webp',
  paladin: '/images/classes/paladin.avif',
  rogue: '/images/classes/rogue.jpeg',
  spiritborn: '/images/classes/spiritborn.webp',
  warlock: '/images/classes/warlock.avif',
}

export const GUIDE_TO_CLASS: Record<string, ClassId> = {
  barbaro: 'barbarian',
  feiticeira: 'sorcerer',
  necromante: 'necromancer',
  paladino: 'paladin',
  ladina: 'rogue',
  spiritborn: 'spiritborn',
  warlock: 'warlock',
  druida: 'druid',
  amazona: 'amazon',
}
