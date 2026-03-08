'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchClients = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/connexion'; return }

      const { data } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      setClients(data || [])
      setLoading(false)
    }
    fetchClients()
  }, [])

  const clientsFiltres = clients.filter(c =>
    c.nom?.toLowerCase().includes(search.toLowerCase()) ||
    c.entreprise?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-violet-400 animate-pulse">Chargement...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-slate-400 hover:text-white transition">
              ← Dashboard
            </a>
            <span className="text-slate-600">|</span>
            <span className="font-semibold">👥 Clients</span>
          </div>
          <a href="/dashboard/clients/nouveau">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + Nouveau client
            </button>
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Mes clients</h1>
            <p className="text-slate-400 text-sm mt-1">{clients.length} client{clients.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Rechercher un client..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-96 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        {/* LISTE */}
        {clientsFiltres.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
            <span className="text-5xl mb-4 block">👥</span>
            <h2 className="text-xl font-semibold mb-2">Aucun client</h2>
            <p className="text-slate-400 mb-6">Ajoutez votre premier client pour commencer</p>
            <a href="/dashboard/clients/nouveau">
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition">
                + Ajouter un client
              </button>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientsFiltres.map(client => (
              <div key={client.id} className="bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    {client.nom?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h3 className="font-semibold text-white">
                  {client.prenom} {client.nom}
                </h3>
                {client.entreprise && (
                  <p className="text-violet-400 text-sm">{client.entreprise}</p>
                )}
                {client.email && (
                  <p className="text-slate-400 text-sm mt-1">✉️ {client.email}</p>
                )}
                {client.telephone && (
                  <p className="text-slate-400 text-sm">📞 {client.telephone}</p>
                )}
                <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
                  <button className="text-xs text-slate-400 hover:text-white transition">
                    ✏️ Modifier
                  </button>
                  <span className="text-slate-700">•</span>
                  <button className="text-xs text-slate-400 hover:text-violet-400 transition">
                    📋 Devis
                  </button>
                  <span className="text-slate-700">•</span>
                  <button className="text-xs text-slate-400 hover:text-violet-400 transition">
                    🧾 Facture
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}