'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    caTotal: 0, devisEnAttente: 0,
    facturesImpayees: 0, totalClients: 0,
    derniersDevis: [] as any[],
    dernieresFactures: [] as any[]
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/connexion'; return }
      setUser(user)

      const [
        { data: factures },
        { data: devis },
        { data: clients }
      ] = await Promise.all([
        supabase.from('factures').select('*, clients(nom, prenom)').order('created_at', { ascending: false }),
        supabase.from('devis').select('*, clients(nom, prenom)').order('created_at', { ascending: false }),
        supabase.from('clients').select('id')
      ])

      const caTotal = (factures || []).filter(f => f.statut === 'payee').reduce((sum, f) => sum + f.total, 0)
      const facturesImpayees = (factures || []).filter(f => f.statut === 'en_attente' || f.statut === 'en_retard').reduce((sum, f) => sum + f.total, 0)
      const devisEnAttente = (devis || []).filter(d => d.statut === 'brouillon' || d.statut === 'envoye').length

      setStats({
        caTotal,
        devisEnAttente,
        facturesImpayees,
        totalClients: (clients || []).length,
        derniersDevis: (devis || []).slice(0, 3),
        dernieresFactures: (factures || []).slice(0, 3)
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  const getStatutFacture = (statut: string) => {
    switch(statut) {
      case 'payee': return { label: '✅ Payée', color: 'text-emerald-400' }
      case 'en_retard': return { label: '🔴 En retard', color: 'text-red-400' }
      default: return { label: '⏳ En attente', color: 'text-amber-400' }
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-violet-400 text-xl animate-pulse">Chargement...</div>
    </div>
  )

  const moisActuel = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold">Facto<span className="text-violet-400">OS</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">👋 {user?.user_metadata?.prenom || user?.email}</span>
            <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }}
              className="text-slate-400 hover:text-white text-sm border border-slate-700 px-3 py-1.5 rounded-lg transition">
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-1">Bienvenue ! Voici votre activité en temps réel.</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "💰", label: "CA encaissé", value: `${stats.caTotal.toFixed(2)} €`, sub: moisActuel, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { icon: "📋", label: "Devis en cours", value: stats.devisEnAttente.toString(), sub: "À transformer", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            { icon: "🧾", label: "À encaisser", value: `${stats.facturesImpayees.toFixed(2)} €`, sub: "Factures impayées", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
            { icon: "👥", label: "Clients actifs", value: stats.totalClients.toString(), sub: "Total clients", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          ].map((kpi, i) => (
            <div key={i} className={`border rounded-2xl p-5 ${kpi.bg}`}>
              <span className="text-2xl">{kpi.icon}</span>
              <p className="text-slate-400 text-sm mt-3 mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-slate-500 text-xs mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "📋", label: "Nouveau devis", href: "/dashboard/devis/nouveau" },
              { icon: "🧾", label: "Nouvelle facture", href: "/dashboard/factures/nouvelle" },
              { icon: "👤", label: "Nouveau client", href: "/dashboard/clients/nouveau" },
              { icon: "👥", label: "Mes clients", href: "/dashboard/clients" },
            ].map((action, i) => (
              <a key={i} href={action.href}>
                <div className="bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-xl p-4 text-center cursor-pointer transition group">
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="text-sm text-slate-400 group-hover:text-white transition">{action.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Derniers devis + factures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Derniers devis</h2>
              <a href="/dashboard/devis" className="text-violet-400 text-sm hover:text-violet-300 transition">Voir tout →</a>
            </div>
            {stats.derniersDevis.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-3xl mb-2 block">📋</span>
                <p className="text-slate-400 text-sm">Aucun devis</p>
                <a href="/dashboard/devis/nouveau">
                  <button className="mt-3 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm transition">Créer un devis</button>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.derniersDevis.map(d => (
                  <a key={d.id} href={`/dashboard/devis/${d.id}`}>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition">
                      <div>
                        <p className="text-sm font-medium text-white">{d.titre}</p>
                        <p className="text-xs text-slate-400">{d.clients ? `${d.clients.prenom || ''} ${d.clients.nom}` : '—'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-violet-400">{d.total?.toFixed(2)} €</p>
                        <p className="text-xs text-slate-500">{d.numero}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Dernières factures</h2>
              <a href="/dashboard/factures" className="text-violet-400 text-sm hover:text-violet-300 transition">Voir tout →</a>
            </div>
            {stats.dernieresFactures.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-3xl mb-2 block">🧾</span>
                <p className="text-slate-400 text-sm">Aucune facture</p>
                <a href="/dashboard/factures/nouvelle">
                  <button className="mt-3 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm transition">Créer une facture</button>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.dernieresFactures.map(f => {
                  const s = getStatutFacture(f.statut)
                  return (
                    <a key={f.id} href={`/dashboard/factures/${f.id}`}>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition">
                        <div>
                          <p className="text-sm font-medium text-white">{f.titre}</p>
                          <p className={`text-xs ${s.color}`}>{s.label}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">{f.total?.toFixed(2)} €</p>
                          <p className="text-xs text-slate-500">{f.numero}</p>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Plafond auto-entrepreneur */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-semibold mb-4">🇫🇷 Plafond auto-entrepreneur</h2>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Prestations de services</span>
              <span className="text-white font-medium">{stats.caTotal.toFixed(2)} € / 77 700 €</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${stats.caTotal / 77700 > 0.8 ? 'bg-red-500' : stats.caTotal / 77700 > 0.5 ? 'bg-amber-500' : 'bg-violet-500'}`}
                style={{width: `${Math.min((stats.caTotal / 77700) * 100, 100)}%`}}
              ></div>
            </div>
            <p className="text-slate-500 text-xs mt-1">{((stats.caTotal / 77700) * 100).toFixed(1)}% du plafond atteint</p>
          </div>
        </div>
      </div>
    </main>
  )
}