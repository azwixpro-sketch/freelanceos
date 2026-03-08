export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold">Freelance<span className="text-violet-400">OS</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#fonctionnalites" className="text-slate-400 hover:text-white text-sm transition">Fonctionnalités</a>
            <a href="#prix" className="text-slate-400 hover:text-white text-sm transition">Tarifs</a>
            <a href="/connexion" className="text-slate-400 hover:text-white text-sm transition">Connexion</a>
            <a href="/inscription">
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Essayer gratuitement →
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 text-violet-400 text-sm mb-8">
          🇫🇷 Conçu 100% pour les freelances français
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Gérez votre activité<br />
          <span className="text-violet-400">freelance</span> simplement
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Devis, factures, clients, projets et finances — tout en un seul endroit.
          Conforme TVA française, mentions légales automatiques, plafond auto-entrepreneur inclus.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/inscription">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition">
              Démarrer gratuitement 🚀
            </button>
          </a>
          <a href="#fonctionnalites">
            <button className="border border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-xl text-lg transition">
              Voir les fonctionnalités
            </button>
          </a>
        </div>
        <p className="text-slate-500 text-sm mt-4">Sans carte bancaire • Gratuit pour démarrer</p>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-violet-400">4,1M</p>
            <p className="text-slate-400 mt-1">freelances en France</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-violet-400">0€</p>
            <p className="text-slate-400 mt-1">pour commencer</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-violet-400">100%</p>
            <p className="text-slate-400 mt-1">conforme droit français</p>
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-4">Tout ce dont vous avez besoin</h2>
        <p className="text-slate-400 text-center mb-16">Un seul outil. Zéro prise de tête.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "📋", titre: "Devis professionnels", desc: "Créez et envoyez des devis en 2 minutes. Signature électronique incluse. TVA calculée automatiquement." },
            { icon: "💰", titre: "Factures conformes", desc: "Factures avec toutes les mentions légales françaises obligatoires. Relances automatiques en cas d'impayé." },
            { icon: "👥", titre: "Portail client", desc: "Chaque client a son espace personnel. Il voit l'avancement, signe et paie directement en ligne." },
            { icon: "📊", titre: "Suivi financier", desc: "Visualisez votre CA, vos charges et votre plafond auto-entrepreneur en temps réel." },
            { icon: "🇫🇷", titre: "100% France", desc: "TVA 20/10/5.5%, franchise en base, SIRET, statuts juridiques français, tout est prévu." },
            { icon: "⚡", titre: "Gain de temps", desc: "Économisez 5h par semaine sur l'administratif. Concentrez-vous sur votre vrai métier." },
          ].map((f, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/50 transition">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.titre}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="prix" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-4">Tarifs simples</h2>
        <p className="text-slate-400 text-center mb-16">Commencez gratuitement, évoluez quand vous êtes prêt.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              nom: "Starter",
              prix: "0€",
              periode: "/mois",
              desc: "Pour démarrer",
              features: ["3 devis/mois", "3 factures/mois", "2 clients", "Support email"],
              cta: "Commencer gratuitement",
              highlight: false,
            },
            {
              nom: "Pro",
              prix: "19€",
              periode: "/mois",
              desc: "Pour les freelances actifs",
              features: ["Devis illimités", "Factures illimitées", "Clients illimités", "Portail client", "Signature électronique", "Relances automatiques"],
              cta: "Essayer 14 jours gratuits",
              highlight: true,
            },
            {
              nom: "Business",
              prix: "49€",
              periode: "/mois",
              desc: "Pour les agences",
              features: ["Tout Pro inclus", "Multi-utilisateurs", "White-label", "IA rédaction devis", "Support prioritaire"],
              cta: "Contacter",
              highlight: false,
            },
          ].map((plan, i) => (
            <div key={i} className={`rounded-2xl p-6 border ${plan.highlight ? 'bg-violet-600 border-violet-500' : 'bg-slate-900 border-slate-800'}`}>
              {plan.highlight && (
                <div className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                  ⭐ Le plus populaire
                </div>
              )}
              <h3 className="text-white font-bold text-xl mb-1">{plan.nom}</h3>
              <p className={`text-sm mb-4 ${plan.highlight ? 'text-violet-200' : 'text-slate-400'}`}>{plan.desc}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{plan.prix}</span>
                <span className={`mb-1 ${plan.highlight ? 'text-violet-200' : 'text-slate-400'}`}>{plan.periode}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-400">✓</span>
                    <span className={plan.highlight ? 'text-white' : 'text-slate-300'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-medium transition ${plan.highlight ? 'bg-white text-violet-600 hover:bg-violet-50' : 'border border-slate-700 text-white hover:border-violet-500'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-r from-violet-600/20 to-slate-800 border border-violet-500/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">Prêt à simplifier votre gestion ?</h2>
          <p className="text-slate-400 mb-8">Rejoignez les freelances qui ont repris le contrôle de leur activité.</p>
          <a href="/inscription">
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition">
              Créer mon compte gratuitement 🚀
            </button>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-slate-500 text-sm">© 2026 FreelanceOS — Fait avec ❤️ en France</span>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition">Mentions légales</a>
            <a href="#" className="hover:text-white transition">CGU</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  )
}