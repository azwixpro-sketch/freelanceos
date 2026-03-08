export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold">Facto<span className="text-violet-400">ro</span></span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/connexion" className="text-slate-400 hover:text-white text-sm transition">Connexion</a>
            <a href="/inscription">
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Commencer gratuitement
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs px-3 py-1 rounded-full mb-6">
          🇫🇷 Conçu pour les freelances français
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Vos devis et factures<br />
          <span className="text-violet-400">en 30 secondes</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Facturo est l'outil tout-en-un pour gérer vos clients, créer vos devis et envoyer vos factures.
          Simple, rapide, 100% gratuit pour commencer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/inscription">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition">
              Créer mon compte gratuit →
            </button>
          </a>
          <a href="#fonctionnalites">
            <button className="border border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-xl text-lg transition">
              Voir les fonctionnalités
            </button>
          </a>
        </div>
        <p className="text-slate-500 text-sm mt-4">✅ Gratuit · ✅ Sans carte bancaire · ✅ En français</p>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2 min', label: 'Pour créer une facture' },
            { value: '100%', label: 'Conforme loi française' },
            { value: '0€', label: 'Pour commencer' },
            { value: '24/7', label: 'Accessible partout' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-violet-400">{s.value}</p>
              <p className="text-slate-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="fonctionnalites" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-slate-400">Pas de fonctionnalités inutiles. Juste l'essentiel, bien fait.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '👥', title: 'Gestion clients', desc: 'Centralisez toutes les infos de vos clients. Historique, contacts, entreprises.' },
            { icon: '📋', title: 'Devis professionnels', desc: 'Créez des devis en 2 minutes. Envoyez-les par email ou en PDF.' },
            { icon: '🧾', title: 'Factures conformes', desc: 'Factures 100% conformes à la loi française. TVA, mentions légales, art. 293B.' },
            { icon: '📊', title: 'Dashboard temps réel', desc: 'CA encaissé, factures impayées, devis en cours. Tout en un coup d\'œil.' },
            { icon: '🇫🇷', title: 'Plafond auto-entrepreneur', desc: 'Suivez votre plafond AE en temps réel. Alertes avant dépassement.' },
            { icon: '🖨️', title: 'Export PDF pro', desc: 'PDFs prêts à envoyer avec votre IBAN, logo et coordonnées.' },
          ].map((f, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-6 transition">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pour qui */}
      <section className="bg-slate-900/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Fait pour vous si vous êtes...</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '💻', label: 'Développeur freelance' },
              { icon: '🎨', label: 'Graphiste / Designer' },
              { icon: '✍️', label: 'Rédacteur / Copywriter' },
              { icon: '📱', label: 'Community Manager' },
              { icon: '📸', label: 'Photographe' },
              { icon: '🎬', label: 'Vidéaste / Monteur' },
              { icon: '📢', label: 'Consultant Marketing' },
              { icon: '🏗️', label: 'Artisan / Prestataire' },
            ].map((p, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <span className="text-2xl block mb-2">{p.icon}</span>
                <p className="text-sm text-slate-300">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Tarifs simples</h2>
          <p className="text-slate-400">Commencez gratuitement. Passez au Pro quand vous êtes prêt.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: 'Gratuit', price: '0', color: 'border-slate-700',
              features: ['3 clients', '5 devis/mois', '5 factures/mois', 'Export PDF'],
              cta: 'Commencer gratuitement', href: '/inscription', style: 'border border-slate-700 hover:border-violet-500'
            },
            {
              name: 'Pro', price: '9', color: 'border-violet-500', badge: '⭐ Populaire',
              features: ['Clients illimités', 'Devis illimités', 'Factures illimitées', 'PDF personnalisé', 'Rappels auto', 'Stats avancées'],
              cta: 'Démarrer Pro', href: '/inscription', style: 'bg-violet-600 hover:bg-violet-500'
            },
            {
              name: 'Expert', price: '19', color: 'border-amber-500/50',
              features: ['Tout Pro +', 'Multi-comptes', 'Support prioritaire', 'API accès', 'Marque blanche'],
              cta: 'Démarrer Expert', href: '/inscription', style: 'border border-slate-700 hover:border-amber-500'
            },
          ].map((plan, i) => (
            <div key={i} className={`bg-slate-900 border-2 ${plan.color} rounded-2xl p-8 relative`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}€</span>
                <span className="text-slate-400">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={plan.href}>
                <button className={`w-full py-3 rounded-xl font-medium transition text-white ${plan.style}`}>
                  {plan.cta}
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-violet-600/10 border-y border-violet-500/20 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à gagner du temps ?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Rejoignez les freelances français qui gèrent leur activité avec Facturo.
          </p>
          <a href="/inscription">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 rounded-xl text-lg font-medium transition">
              Créer mon compte gratuit →
            </button>
          </a>
          <p className="text-slate-500 text-sm mt-4">✅ Gratuit · ✅ Sans engagement · ✅ 100% français</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-bold">Facto<span className="text-violet-400">ro</span></span>
              <span className="text-slate-500 text-sm ml-2">L'outil des freelances français</span>
            </div>
            <div className="flex gap-6 text-slate-400 text-sm">
              <a href="#fonctionnalites" className="hover:text-white transition">Fonctionnalités</a>
              <a href="#tarifs" className="hover:text-white transition">Tarifs</a>
              <a href="/connexion" className="hover:text-white transition">Connexion</a>
              <a href="/inscription" className="hover:text-white transition">Inscription</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-xs">
            © 2026 Facturo — Tous droits réservés · Fait avec ❤️ en France
          </div>
        </div>
      </footer>
    </main>
  )
}