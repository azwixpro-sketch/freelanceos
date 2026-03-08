'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Devis() {
  const [devis, setDevis] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDevis = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/connexion'; return }

      const { data } = await supabase
        .from('devis')
        .select('*, clients(nom, prenom, entreprise)')
        .order('created_at', { ascending: false })

      setDevis(data || [])
      setLoading(false)
    }
    fetchDevis()
  }, [])

  const getStatutColor = (statut: string) => {
    switch(statut) {
      case 'accepte': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'refuse': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'envoye': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const getStatutLabel = (statut: string) => {
    switch(statut) {
      case 'accepte': return '✅ Accepté'
      case 'refuse': return '❌ Refusé'
      case 'envoye': return '📤 Envoyé'
      default: return '📝 Brouillon'
    }
  }

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
            <span className="font-semibold">📋 Devis</span>
          </div>
          <a href="/dashboard/devis/nouveau">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + Nouveau devis
            </button>
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mes devis</h1>
          <p className="text-slate-400 text-sm mt-1">{devis.length} devis</p>
        </div>

        {devis.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
            <span className="text-5xl mb-4 block">📋</span>
            <h2 className="text-xl font-semibold mb-2">Aucun devis</h2>
            <p className="text-slate-400 mb-6">Créez votre premier devis</p>
            <a href="/dashboard/devis/nouveau">
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition">
                + Créer un devis
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
                  <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {devis.map(d => (
                  <tr key={d.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition cursor-pointer">
                    <td className="px-6 py-4">
  <a href={`/dashboard/devis/${d.id}`} className="text-violet-400 hover:text-violet-300 font-medium transition">
    {d.numero}
  </a>
</td>
                    <td className="px-6 py-4 text-white">
                      {d.clients ? `${d.clients.prenom || ''} ${d.clients.nom}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{d.titre}</td>
                    <td className="px-6 py-4 text-white font-medium">{d.total?.toFixed(2)} €</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatutColor(d.statut)}`}>
                        {getStatutLabel(d.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
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