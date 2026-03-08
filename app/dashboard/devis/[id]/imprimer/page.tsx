'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

export default function ImprimerDevis() {
  const { id } = useParams()
  const [devis, setDevis] = useState<any>(null)
  const [client, setClient] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const { data: d } = await supabase.from('devis').select('*, clients(*)').eq('id', id).single()
      setDevis(d)
      setClient(d?.clients)
    }
    fetchData()
    setTimeout(() => window.print(), 1500)
  }, [id])

  if (!devis) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Chargement...</p>
    </div>
  )

  const sousTotal = devis.sous_total || 0
  const tva = devis.tva_montant || 0
  const total = devis.total || 0

  return (
    <>
      <style>{`
        @media print { .no-print { display: none !important; } body { margin: 0; } }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: white; color: #1a1a1a; }
      `}</style>

      <div className="no-print fixed top-4 right-4 flex gap-2 z-50">
        <button onClick={() => window.print()}
          className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          🖨️ Imprimer / Sauvegarder PDF
        </button>
        <button onClick={() => window.close()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
          ✕ Fermer
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-12 bg-white min-h-screen">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-violet-600">FreelanceOS</h1>
            <p className="text-gray-500 text-sm mt-1">{user?.user_metadata?.entreprise || ''}</p>
            <p className="text-gray-500 text-sm">{user?.user_metadata?.adresse || ''}</p>
            <p className="text-gray-500 text-sm">{user?.user_metadata?.code_postal || ''} {user?.user_metadata?.ville || ''}</p>
            <p className="text-gray-500 text-sm">SIRET : {user?.user_metadata?.siret || '—'}</p>
          </div>
          <div className="text-right">
            <div className="bg-emerald-600 text-white px-6 py-3 rounded-xl inline-block">
              <p className="text-xs opacity-80">DEVIS</p>
              <p className="text-xl font-bold">{devis.numero}</p>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Émis le : {new Date(devis.created_at).toLocaleDateString('fr-FR')}
            </p>
            {devis.date_validite && (
              <p className="text-gray-500 text-sm">
                Valide jusqu'au : {new Date(devis.date_validite).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Adressé à</p>
          <p className="font-bold text-lg">{client?.prenom} {client?.nom}</p>
          {client?.entreprise && <p className="text-gray-600">{client.entreprise}</p>}
          {client?.email && <p className="text-gray-600">{client.email}</p>}
          {client?.telephone && <p className="text-gray-600">{client.telephone}</p>}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">{devis.titre}</h2>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left px-4 py-3 rounded-tl-lg text-sm">Description</th>
              <th className="text-center px-4 py-3 text-sm">Qté</th>
              <th className="text-center px-4 py-3 text-sm">Prix HT</th>
              <th className="text-right px-4 py-3 rounded-tr-lg text-sm">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {(devis.lignes || []).map((ligne: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm">{ligne.description}</td>
                <td className="px-4 py-3 text-sm text-center">{ligne.quantite}</td>
                <td className="px-4 py-3 text-sm text-center">{Number(ligne.prix_unitaire).toFixed(2)} €</td>
                <td className="px-4 py-3 text-sm text-right font-medium">{Number(ligne.total).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm border-b border-gray-200">
              <span className="text-gray-500">Sous-total HT</span>
              <span>{sousTotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-gray-200">
              <span className="text-gray-500">TVA ({devis.tva_taux}%)</span>
              <span>{tva.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-lg bg-emerald-600 text-white px-3 rounded-lg mt-2">
              <span>Total TTC</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {devis.notes && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Notes</p>
            <p className="text-gray-600 text-sm whitespace-pre-line">{devis.notes}</p>
          </div>
        )}

        <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">✍️ Bon pour accord</p>
          <p className="text-gray-500 text-sm mb-8">Signature et mention "Bon pour accord" :</p>
          <div className="border-b border-gray-300 w-64"></div>
        </div>

        <div className="text-center text-gray-400 text-xs border-t border-gray-200 pt-6">
          <p>Devis généré avec FreelanceOS • {user?.email}</p>
          {user?.user_metadata?.siret && <p>SIRET : {user?.user_metadata?.siret}</p>}
          {devis.tva_taux === 0 && <p className="mt-1">TVA non applicable — Art. 293 B du CGI</p>}
        </div>
      </div>
    </>
  )
}