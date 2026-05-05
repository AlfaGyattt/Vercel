"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email invalide").max(100),
});

type FormData = z.infer<typeof schema>;

export default function HomeNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Erreur newsletter:", err);
      }
    } catch (e) {
      console.error("Erreur réseau:", e);
    }
    setSubmitted(true);
  };

  return (
    <section style={{ background: "#000" }} className="py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Gauche — texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h2
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
            >
              Dans la boucle<br />
              <span style={{ color: "#f72585" }}>avant tout<br />le monde.</span>
            </h2>

            <p className="font-roboto font-400 text-white/50 leading-relaxed max-w-sm"
              style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
              Nouvelles features en avant-première, tips sport exclusifs, événements communautaires.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              {[
                "Accès beta avant tout le monde",
                "Tips sport exclusifs chaque semaine",
                "Événements et meetups communautaires",
              ].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#f72585" }} />
                  <span className="font-roboto font-400 text-white/50 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Droite — formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="font-roboto font-900 text-white uppercase tracking-[-0.02em]"
                    style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                    Tu es dans la boucle. 
                  </div>
                  <p className="font-roboto font-400 text-white/40 text-sm">
                    Vérifie ton email pour confirmer ton inscription.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  {/* Input email */}
                  <div className="flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="ton@email.com"
                      className="w-full px-6 py-4 font-roboto font-400 text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: errors.email ? "1px solid #f72585" : "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "12px",
                        fontSize: "15px",
                      }}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="font-roboto text-xs" style={{ color: "#f72585" }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 font-roboto font-700 text-sm tracking-[0.05em] uppercase text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #f72585, #7209b7)",
                      borderRadius: "12px",
                    }}
                  >
                    {isSubmitting ? "Envoi…" : "Je m'abonne — c'est gratuit"}
                  </button>

                  <p className="font-roboto text-[11px] text-white/25 text-center tracking-wide">
                    Zéro spam. Désabonnement en un clic.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}