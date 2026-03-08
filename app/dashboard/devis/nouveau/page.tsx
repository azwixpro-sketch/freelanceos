'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Ligne {
  description: string
  quantite: number
  prix_unitaire: number
  total: number
}

export default function NouveauDevis() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    client_id: '',
    titre: '',
    date_validite: '',
    tva_taux: 20,
    notes: ''
  })
  const [lignes, setLignes] = useState<Ligne[]>([
    { description: '', quantite: 1, prix_unitaire: 0, total: 0 }
  ])

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from('clients').select('id, nom, prenom, entreprise')
      setClients(data || [])
    }
    fetchClients()
  }, [])

  const updateLigne = (index: number, field: keyof Ligne, value: string | number) => {
    const newLignes = [...lignes]
    newLignes[index] = { ...newLignes[index], [field]: value }
    newLignes[index].total = newLignes[index].quantite * newLignes[index].prix_unitaire
    setLignes(newLignes)
  }

  const addLigne = () => {
    setLignes([...lignes, { description: '', quantite: 1, prix_unitaire: 0, total: 0 }])
  }

  const removeLigne = (index: number) => {
    setLignes(lignes.filter((_, i) => i !== index))
  }

  const sousTotal = lignes.reduce((sum, l) => sum + l.total, 0)
  const tvaMontant = sousTotal * (form.tva_taux / 100)
  const total = sousTotal + tvaMontant

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/connexion'; return }

    const numero = `DEV-${Date.now().toString().slice(-6)}`

    const { error } = await supabase.from('devis').insert({
      user_id: user.id,
      client_id: form.client_id || null,
      numero,
      titre: form.titre,
      date_validite: form.date_validite || null,
      lignes,
      sous_total: sousTotal,
      tva_taux: form.tva_taux,
      tva_montant: tvaMontant,
      total,
      notes: form.notes,
      statut: 'brouillon'
    })

    if (error) {
      setMessage('❌ Erreur : ' + error.message)
    } else {
      setMessage('✅ Devis créé avec succès !')
      setTimeout(() => window.location.href = '/dashboard/devis', 1500)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <a href="/dashboard/devis" className="text-slate-400 hover:text-white transition">← Devis</a>
          <span className="text-slate-600">|</span>
          <span className="font-semibold">➕ Nouveau devis</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Créer un devis</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Infos générales */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">📋 Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm block mb-2">Client</label>
                <select
                  value={form.client_id}
                  onChange={e => setForm({...form, client_id: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"
                >
                  <option value="">— Sélectionner un client —</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.prenom} {c.nom} {c.entreprise ? `(${c.entreprise})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-2">Titre du devis *</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={e => setForm({...form, titre: e.target.value})}
                  placeholder="Ex: Création site web"
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-2">Date de validité</label>
                <input
                  type="date"
                  value={form.date_validite}
                  onChange={e => setForm({...form, date_validite: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-2">TVA (%)</label>
                <select
                  value={form.tva_taux}
                  onChange={e => setForm({...form, tva_taux: Number(e.target.value)})}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition"
                >
                  <option value={0}>0% — Auto-entrepreneur</option>
                  <option value={5.5}>5.5%</option>
                  <option value={10}>10%</option>
                  <option value={20}>20% — Taux normal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lignes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">📝 Prestations</h2>

            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 text-slate-400 text-xs px-2">
                <div className="col-span-5">Description</div>
                <div className="col-span-2 text-center">Qté</div>
                <div className="col-span-2 text-center">Prix HT</div>
                <div className="col-span-2 text-center">Total HT</div>
                <div className="col-span-1"></div>
              </div>

              {lignes.map((ligne, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={ligne.description}
                      onChange={e => updateLigne(index, 'description', e.target.value)}
                      placeholder="Description de la prestation"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={ligne.quantite}
                      onChange={e => updateLigne(index, 'quantite', Number(e.target.value))}
                      min="0"
                      step="0.5"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-violet-500 transition"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={ligne.prix_unitaire}
                      onChange={e => updateLigne(index, 'prix_unitaire', Number(e.target.value))}
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-violet-500 transition"
                    />
                  </div>
                  <div className="col-span-2 text-center text-white font-medium text-sm">
                    {ligne.total.toFixed(2)} €
                  </div>
                  <div className="col-span-1 text-center">
                    {lignes.length > 1 && (
                      <button type="button" onClick={() => removeLigne(index)} className="text-red-400 hover:text-red-300 transition">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLigne}
              className="mt-4 text-violet-400 hover:text-violet-300 text-sm transition flex items-center gap-1"
            >
              + Ajouter une ligne
            </button>
          </div>

          {/* Totaux */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Sous-total HT</span>
                <span className="text-white">{sousTotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">TVA ({form.tva_taux}%)</span>
                <span className="text-white">{tvaMontant.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-slate-700 pt-2 mt-2">
                <span>Total TTC</span>
                <span className="text-violet-400">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">📝 Notes</h2>
            <textarea
              value={form.notes}
              onChange={e => setForm({...form, notes: e.target.value})}
              placeholder="Conditions de paiement, délais, remarques..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition resize-none"
            />
          </div>

          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              message.startsWith('✅')
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition"
            >
              {loading ? 'Enregistrement...' : '✅ Créer le devis'}
            </button>
            <a href="/dashboard/devis">
              <button type="button" className="border border-slate-700 hover:border-slate-500 text-white px-8 py-3 rounded-xl transition">
                Annuler
              </button>
            </a>
          </div>

        </form>
      </div>
    </main>
  )
}