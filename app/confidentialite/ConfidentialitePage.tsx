"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Politique de <span style={{ color: "#f72585" }}>confidentialité</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Introduction</h2>
                <p>Mood2Fit accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site mood2fit.com.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Données collectées</h2>
                <p>Nous collectons les données suivantes :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Formulaire de contact</strong> : nom, adresse email, message</li>
                  <li><strong className="text-white">Newsletter</strong> : adresse email</li>
                  <li><strong className="text-white">Données de navigation</strong> : adresse IP, type de navigateur, pages visitées (via Sentry pour la détection d'erreurs)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Utilisation des données</h2>
                <p>Les données collectées sont utilisées pour :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Répondre à vos demandes de contact</li>
                  <li>Vous envoyer notre newsletter (avec votre consentement)</li>
                  <li>Améliorer les performances et la stabilité du site</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Conservation des données</h2>
                <p>Vos données sont conservées pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées. Les données de newsletter sont conservées jusqu'à votre désinscription.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Vos droits</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement (droit à l'oubli)</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit à la portabilité</li>
                </ul>
                <p className="mt-3">Pour exercer ces droits, contactez-nous à : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Prestataires tiers</h2>
                <p>Nous utilisons les services tiers suivants :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li><strong className="text-white">Brevo</strong> : gestion des emails et de la newsletter</li>
                  <li><strong className="text-white">Vercel</strong> : hébergement du site</li>
                  <li><strong className="text-white">Sentry</strong> : monitoring des erreurs</li>
                  <li><strong className="text-white">Upstash Redis</strong> : protection contre le spam</li>
                </ul>
              </section>

              <p className="text-white/30 text-sm">Dernière mise à jour : mai 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}