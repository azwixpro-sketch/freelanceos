'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function NouveauClient() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    entreprise: '', siret: '', adresse: '',
    ville: '', code_postal: '', pays: 'France', notes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/connexion'; return }

    const { error } = await supabase.from('clients').insert({
      ...form,
      user_id: user.id
    })

    if (error) {
      setMessage('❌ Erreur : ' + error.message)
    } else {
      setMessage('✅ Client ajouté avec succès !')
      setTimeout(() => window.location.href = '/dashboard/clients', 1500)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <a href="/dashboard/clients" className="text-slate-400 hover:text-white transition">
            ← Clients
          </a>
          <span className="text-slate-600">|</span>
          <span className="font-semibold">➕ Nouveau client</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Ajouter un client</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Infos personnelles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">👤 Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Nom *', name: 'nom', required: true, placeholder: 'Dupont' },
                { label: 'Prénom', name: 'prenom', placeholder: 'Jean' },
                { label: 'Email', name: 'email', placeholder: 'jean@exemple.fr' },
                { label: 'Téléphone', name: 'telephone', placeholder: '06 12 34 56 78' },
              ].map(field => (
                <div key={field.name}>
                  <label className="text-slate-400 text-sm block mb-2">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Infos entreprise */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">🏢 Entreprise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Nom entreprise', name: 'entreprise', placeholder: 'Acme SARL' },
                { label: 'SIRET', name: 'siret', placeholder: '123 456 789 00012' },
              ].map(field => (
                <div key={field.name}>
                  <label className="text-slate-400 text-sm block mb-2">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Adresse */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">📍 Adresse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-slate-400 text-sm block mb-2">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={form.adresse}
                  onChange={handleChange}
                  placeholder="12 rue de la Paix"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
                />
              </div>
              {[
                { label: 'Ville', name: 'ville', placeholder: 'Paris' },
                { label: 'Code postal', name: 'code_postal', placeholder: '75001' },
              ].map(field => (
                <div key={field.name}>
                  <label className="text-slate-400 text-sm block mb-2">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-violet-400">📝 Notes</h2>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes internes sur ce client..."
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
              {loading ? 'Enregistrement...' : '✅ Enregistrer le client'}
            </button>
            <a href="/dashboard/clients">
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