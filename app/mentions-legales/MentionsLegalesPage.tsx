"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080010] pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="font-roboto font-900 text-white uppercase text-4xl mb-10" style={{ letterSpacing: "-0.02em" }}>
          Mentions <span style={{ color: "#f72585" }}>légales</span>
        </h1>

        <div className="flex flex-col gap-8 font-roboto text-white/60 leading-relaxed" style={{ fontSize: "15px" }}>

          <section>
            <h2 className="font-roboto font-700 text-white text-lg mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Éditeur du site</h2>
            <p>Le site mood2fit.app est édité par Mood2Fit, projet en cours de développement.</p>
            <p className="mt-2">Siège social : Paris, France</p>
            <p className="mt-2">Email : <a href="mailto:hello@mood2fit.app" className="text-white hover:text-[#f72585] transition-colors">hello@mood2fit.app</a></p>
          </section>

          <section>
            <h2 className="font-roboto font-700 text-white text-lg mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <p className="mt-2"><strong className="text-white">Vercel Inc.</strong><br />440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#f72585] transition-colors">vercel.com</a></p>
          </section>

          <section>
            <h2 className="font-roboto font-700 text-white text-lg mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur mood2fit.app (textes, images, logos, design) sont la propriété exclusive de Mood2Fit et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.</p>
          </section>

          <section>
            <h2 className="font-roboto font-700 text-white text-lg mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Responsabilité</h2>
            <p>Mood2Fit s'efforce de maintenir les informations publiées sur ce site à jour et exactes. Cependant, Mood2Fit ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisation des informations et contenus disponibles sur ce site se fait sous l'entière responsabilité de l'utilisateur.</p>
          </section>

          <section>
            <h2 className="font-roboto font-700 text-white text-lg mb-3 uppercase tracking-widest" style={{ fontSize: "11px", color: "#f72585" }}>Contact</h2>
            <p>Pour toute question relative aux mentions légales, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:hello@mood2fit.app" className="text-white hover:text-[#f72585] transition-colors">hello@mood2fit.app</a></p>
          </section>

          <p className="text-white/30 text-sm">Dernière mise à jour : mai 2026</p>
        </div>
      </main>
      <Footer />
    </>
  );
}