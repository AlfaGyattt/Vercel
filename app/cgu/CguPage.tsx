"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#0f0520" }}>
        <section className="min-h-screen py-32 px-6" style={{ background: "#0f0520" }}>
          <div className="max-w-3xl mx-auto pt-8">
            <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
              Conditions générales <span style={{ color: "#f72585" }}>d'utilisation</span>
            </h1>
            <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Objet</h2>
                <p>Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation du site mood2fit.com édité par Mood2Fit. En accédant au site, vous acceptez sans réserve les présentes CGU.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Accès au site</h2>
                <p>Le site mood2fit.com est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Mood2Fit se réserve le droit de modifier, suspendre ou interrompre l'accès au site à tout moment, sans préavis.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Utilisation du site</h2>
                <p>L'utilisateur s'engage à utiliser le site de manière licite et conforme aux présentes CGU. Il est notamment interdit de :</p>
                <ul className="mt-2 flex flex-col gap-1 pl-4" style={{ listStyleType: "disc" }}>
                  <li>Utiliser le site à des fins illicites ou frauduleuses</li>
                  <li>Transmettre des contenus illégaux, offensants ou nuisibles</li>
                  <li>Tenter de porter atteinte à la sécurité du site</li>
                  <li>Collecter des données personnelles d'autres utilisateurs</li>
                </ul>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Newsletter</h2>
                <p>En vous inscrivant à la newsletter, vous acceptez de recevoir des communications de la part de Mood2Fit. Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de désinscription présent dans chaque email.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Propriété intellectuelle</h2>
                <p>Tous les contenus présents sur le site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle, sans autorisation préalable de Mood2Fit est strictement interdite.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Droit applicable</h2>
                <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
              </section>

              <section>
                <h2 className="font-roboto font-700 mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Contact</h2>
                <p>Pour toute question relative aux CGU : <a href="mailto:hello@mood2fit.com" style={{ color: "#f72585" }} className="hover:opacity-75 transition-opacity">hello@mood2fit.com</a></p>
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