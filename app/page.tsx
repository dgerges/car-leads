"use client";

import { useState } from "react";

const SERVICES = [
  {
    icon: "🚿",
    title: "Lavage extérieur",
    desc: "Carrosserie, jantes, vitres — résultat showroom garanti.",
  },
  {
    icon: "🧹",
    title: "Nettoyage intérieur",
    desc: "Aspiration, plastiques, tapis et sièges traités en profondeur.",
  },
  {
    icon: "✨",
    title: "Polish & protection",
    desc: "Traitement céramique et polish pour protéger votre peinture.",
  },
  {
    icon: "📍",
    title: "À domicile",
    desc: "On se déplace sur Rennes et toute l'Ille-et-Vilaine.",
  },
];

const ZONES = [
  "Rennes",
  "Saint-Malo",
  "Fougères",
  "Vitré",
  "Redon",
  "Dinard",
  "Bruz",
  "Cesson-Sévigné",
];

const SERVICE_TYPES = [
  "Lavage extérieur",
  "Nettoyage intérieur",
  "Nettoyage complet (intérieur + extérieur)",
  "Polish & protection céramique",
  "Décontamination & préparation",
  "Autre / Je ne sais pas encore",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    serviceType: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Nettoyage Voiture à Rennes — Pro, Rapide, à Domicile
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Votre véhicule mérite un soin professionnel. On se déplace chez vous
            sur Rennes et toute l&apos;Ille-et-Vilaine.
          </p>
          <a
            href="#devis"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition"
          >
            Devis gratuit en 2 min →
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos prestations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Zones d&apos;intervention
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {ZONES.map((z) => (
              <span
                key={z}
                className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="devis" className="py-16 px-4 bg-blue-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Devis gratuit
          </h2>
          <p className="text-center text-gray-600 mb-8">
            On vous rappelle sous 2h en semaine.
          </p>

          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Demande reçue !
              </h3>
              <p className="text-green-700">
                On vous contacte sous 2h pour confirmer votre rendez-vous.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-sm p-8 space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="jean@exemple.fr"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville / Localité *
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex : Rennes, Cesson-Sévigné, Saint-Malo…"
                />
              </div>
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de prestation *
                </label>
                <select
                  id="serviceType"
                  required
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Choisir une prestation…</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Précisions (optionnel)
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex : SUV, cuirs, taches tenaces…"
                />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm">
                  Une erreur s&apos;est produite. Réessayez ou appelez-nous directement.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-60"
              >
                {status === "loading" ? "Envoi en cours…" : "Demander mon devis gratuit"}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Pas de spam. On vous rappelle, c&apos;est tout.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Nettoyage Voiture Rennes — Ille-et-Vilaine</p>
      </footer>
    </main>
  );
}
