'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Connexion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('❌ Email ou mot de passe incorrect')
    } else {
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-white">
              Freelance<span className="text-violet-400">OS</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold text-white mt-6">Connexion</h1>
          <p className="text-slate-400 mt-2">Content de vous revoir 👋</p>
        </div>

        {/* Formulaire */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <form onSubmit={handleConnexion} className="space-y-4">

            <div>
              <label className="text-slate-400 text-sm block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm block mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
              />
            </div>

            {message && (
              <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition"
            >
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>

          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Pas encore de compte ?{' '}
            <a href="/inscription" className="text-violet-400 hover:text-violet-300 transition">
              Créer un compte gratuit
            </a>
          </p>
        </div>

      </div>
    </main>
  )
}