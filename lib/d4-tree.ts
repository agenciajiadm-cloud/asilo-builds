export type TreeNode = {
  i: number
  id: number
  x: number
  y: number
  kind: string
  label: string
  reward: string
  power: string
  maxRank: number
  exclusive: number | null
  levelReq: number
}

export type SkillTree = {
  classId: string
  snoId: number
  source: string
  bounds: { minX: number; maxX: number; minY: number; maxY: number }
  actives: { i: number; id: string; name: string }[]
  nodes: TreeNode[]
  edges: number[][]
}

export const SKILL_BUDGET = 72
const CLUSTER_GATES = [0, 2, 6, 11, 16, 23]

export function spent(ranks: Record<number, number>) {
  return Object.values(ranks).reduce((a, n) => a + (n || 0), 0)
}

export function adjacency(tree: SkillTree) {
  const adj = new Map<number, number[]>()
  const add = (a: number, b: number) => {
    adj.set(a, [...(adj.get(a) || []), b])
    adj.set(b, [...(adj.get(b) || []), a])
  }
  for (const [a, b] of tree.edges) add(a, b)
  return adj
}

export function byIndex(tree: SkillTree) {
  return new Map(tree.nodes.map((n) => [n.i, n]))
}

function unlockedClusters(tree: SkillTree, pts: number) {
  const clusters = tree.nodes.filter((n) => n.kind === 'cluster').sort((a, b) => a.levelReq - b.levelReq)
  const open = new Set<number>()
  clusters.forEach((c, i) => {
    if (pts >= (CLUSTER_GATES[i] ?? 99)) open.add(c.i)
  })
  return open
}

export function canIncrement(tree: SkillTree, ranks: Record<number, number>, i: number) {
  const node = byIndex(tree).get(i)
  if (!node || node.kind === 'cluster') return false
  const cur = ranks[i] || 0
  if (cur >= node.maxRank) return false
  if (spent(ranks) >= SKILL_BUDGET) return false
  if (node.exclusive != null) {
    const blocked = tree.nodes.some((n) => n.exclusive === node.exclusive && n.i !== i && (ranks[n.i] || 0) > 0)
    if (blocked) return false
  }
  if (cur > 0) return true
  const pts = spent(ranks)
  const open = unlockedClusters(tree, pts)
  const adj = adjacency(tree)
  const nbs = adj.get(i) || []
  return nbs.some((j) => open.has(j) || (ranks[j] || 0) > 0)
}

export function bump(tree: SkillTree, ranks: Record<number, number>, i: number, dir: 1 | -1) {
  const node = byIndex(tree).get(i)
  if (!node || node.kind === 'cluster') return ranks
  const cur = ranks[i] || 0
  if (dir < 0) {
    if (cur <= 0) return ranks
    const next = { ...ranks }
    if (cur === 1) delete next[i]
    else next[i] = cur - 1
    return next
  }
  if (!canIncrement(tree, ranks, i)) return ranks
  return { ...ranks, [i]: cur + 1 }
}

export function matchesSearch(node: TreeNode, q: string) {
  if (!q.trim()) return true
  const n = q.toLowerCase()
  return `${node.label} ${node.reward} ${node.power}`.toLowerCase().includes(n)
}
