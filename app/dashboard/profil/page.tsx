'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Profil() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '',
    telephone: '', entreprise: '',
    siret: '', adresse: '', ville: '',
    code_postal: '', tva_numero: '',
    iban: '', bic: ''
  })

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/connexion'; return }
      setForm(prev => ({
        ...prev,
        email: user.email || '',
        prenom: user.user_metadata?.prenom || '',
        nom: user.user_metadata?.nom || '',
        telephone: user.user_metadata?.telephone || '',
        entreprise: user.user_metadata?.entreprise || '',
        siret: user.user_metadata?.siret || '',
        adresse: user.user_metadata?.adresse || '',
        ville: user.user_metadata?.ville || '',
        code_postal: user.user_metadata?.code_postal || '',
        tva_numero: user.user_metadata?.tva_numero || '',
        iban: user.user_metadata?.iban || '',
        bic: user.user_metadata?.bic || '',
      }))
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.auth.updateUser({
      data: {
        prenom: form.prenom, nom: form.nom,
        telephone: form.telephone, entreprise: form.entreprise,
        siret: form.siret, adresse: form.adresse,
        ville: form.ville, code_postal: form.code_postal,
        tva_numero: form.tva_numero,
        iban: form.iban, bic: form.bic
      }
    })
    if (error) setMessage('❌ Erreur : ' + error.message)
    else setMessage('✅ Profil mis à jour !')
    setSaving(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-violet-400 animate-pulse">Chargement...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <a href="/dashboard" className="text-slate-400 hover:text-white transition">← Dashboard</a>
          <span className="text-slate-600">|</span>
          <span className="font-semibold">👤 Mon profil</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Mon profil freelance</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Informations personnelles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">👤 Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Prénom', key: 'prenom', placeholder: 'Jean' },
                { label: 'Nom', key: 'nom', placeholder: 'Dupont' },
                { label: 'Email (non modifiable)', key: 'email', placeholder: '', disabled: true },
                { label: 'Téléphone', key: 'telephone', placeholder: '06 12 34 56 78' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-slate-400 text-sm block mb-2">{f.label}</label>
                  <input type="text" value={(form as any)[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    placeholder={f.placeholder} disabled={f.disabled}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
              ))}
            </div>
          </div>

          {/* Entreprise */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">🏢 Mon entreprise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Nom entreprise / Nom commercial', key: 'entreprise', placeholder: 'Jean Dupont Développement' },
                { label: 'SIRET', key: 'siret', placeholder: '123 456 789 00012' },
                { label: 'N° TVA intracommunautaire', key: 'tva_numero', placeholder: 'FR12345678901' },
                { label: 'Adresse', key: 'adresse', placeholder: '12 rue de la Paix' },
                { label: 'Ville', key: 'ville', placeholder: 'Paris' },
                { label: 'Code postal', key: 'code_postal', placeholder: '75001' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-slate-400 text-sm block mb-2">{f.label}</label>
                  <input type="text" value={(form as any)[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    placeholder={f.placeholder}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* Coordonnées bancaires */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">💳 Coordonnées bancaires</h2>
            <p className="text-slate-500 text-xs mb-4">Ces informations apparaîtront automatiquement sur toutes vos factures PDF.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-slate-400 text-sm block mb-2">IBAN</label>
                <input type="text" value={form.iban}
                  onChange={e => setForm({...form, iban: e.target.value})}
                  placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm font-mono placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-2">BIC / SWIFT</label>
                <input type="text" value={form.bic}
                  onChange={e => setForm({...form, bic: e.target.value})}
                  placeholder="XXXXXXXX"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm font-mono placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition" />
              </div>
            </div>
          </div>

          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm ${message.startsWith('✅') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={saving}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition">
            {saving ? 'Sauvegarde...' : '💾 Sauvegarder le profil'}
          </button>
        </form>
      </div>
    </main>
  )
}