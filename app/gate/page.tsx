'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GateLogin() {
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(false)
    const res = await fetch('/api/gate/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (!res.ok) {
      setErr(true)
      return
    }
    router.push('/gate/tier')
    router.refresh()
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm border border-green-border/40 p-10 bg-[#080a08]">
        <p className="font-display text-2xl text-white mb-2">Arsenal</p>
        <p className="text-sm text-bone/60 mb-8">Só senha. O resto do clã não entra aqui.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#101014] border border-green-border/40 px-3 py-3 text-sm outline-none focus:border-green-bright mb-4"
          placeholder="Senha"
          autoFocus
        />
        {err && <p className="text-sm text-[#c45b4a] mb-4">Não.</p>}
        <button type="submit" disabled={loading} className="w-full py-3 bg-green-primary text-white text-sm">
          {loading ? '…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
