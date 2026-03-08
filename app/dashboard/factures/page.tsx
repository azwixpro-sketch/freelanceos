'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Factures() {
  const [factures, setFactures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFactures = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/connexion'; return }

      const { data } = await supabase
        .from('factures')
        .select('*, clients(nom, prenom, entreprise)')
        .order('created_at', { ascending: false })

      setFactures(data || [])
      setLoading(false)
    }
    fetchFactures()
  }, [])

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'payee': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'en_retard': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'en_attente': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const getStatutLabel = (statut: string) => {
    switch(statut) {
      case 'payee': return '✅ Payée'
      case 'en_retard': return '🔴 En retard'
      case 'en_attente': return '⏳ En attente'
      default: return '📝 Brouillon'
    }
  }

  const totalImpaye = factures
    .filter(f => f.statut === 'en_attente' || f.statut === 'en_retard')
    .reduce((sum, f) => sum + f.total, 0)

  const totalPaye = factures
    .filter(f => f.statut === 'payee')
    .reduce((sum, f) => sum + f.total, 0)

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-violet-400 animate-pulse">Chargement...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-slate-400 hover:text-white transition">← Dashboard</a>
            <span className="text-slate-600">|</span>
            <span className="font-semibold">🧾 Factures</span>
          </div>
          <a href="/dashboard/factures/nouvelle">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + Nouvelle facture
            </button>
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
            <p className="text-amber-400 text-sm mb-1">💰 À encaisser</p>
            <p className="text-2xl font-bold text-white">{totalImpaye.toFixed(2)} €</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <p className="text-emerald-400 text-sm mb-1">✅ Déjà encaissé</p>
            <p className="text-2xl font-bold text-white">{totalPaye.toFixed(2)} €</p>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5">
            <p className="text-violet-400 text-sm mb-1">🧾 Total factures</p>
            <p className="text-2xl font-bold text-white">{factures.length}</p>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mes factures</h1>
        </div>

        {factures.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
            <span className="text-5xl mb-4 block">🧾</span>
            <h2 className="text-xl font-semibold mb-2">Aucune facture</h2>
            <p className="text-slate-400 mb-6">Créez votre première facture</p>
            <a href="/dashboard/factures/nouvelle">
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition">
                + Créer une facture
              </button>
            </a>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Numéro</th>
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Client</th>
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Titre</th>
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Montant</th>
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Statut</th>
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Échéance</th>
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {factures.map(f => (
                  <tr key={f.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <a href={`/dashboard/factures/${f.id}`} className="text-violet-400 hover:text-violet-300 font-medium transition">
                        {f.numero}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {f.clients ? `${f.clients.prenom || ''} ${f.clients.nom}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{f.titre}</td>
                    <td className="px-6 py-4 text-white font-bold">{f.total?.toFixed(2)} €</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatutColor(f.statut)}`}>
                        {getStatutLabel(f.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {f.date_echeance ? new Date(f.date_echeance).toLocaleDateString('fr-FR') : '—'}
                    </td>
                    <td className="px-6 py-4">
                      {f.statut !== 'payee' && (
                        <button
                          onClick={async () => {
                            await supabase.from('factures').update({ statut: 'payee' }).eq('id', f.id)
                            setFactures(factures.map(x => x.id === f.id ? {...x, statut: 'payee'} : x))
                          }}
                          className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg transition"
                        >
                          ✅ Marquer payée
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}