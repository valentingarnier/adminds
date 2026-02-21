"use client";

import { useEffect, useState } from "react";

const CALENDLY_URL = "https://calendly.com/contact-adminds/30min";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type FormState = "idle" | "loading" | "success" | "error";

export default function CalendlyEmbed() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;

    setState("loading");
    try {
      const res = await fetch(`${API_URL}/api/v1/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="calendly-inline-widget rounded-2xl overflow-hidden border border-zinc-200 h-[550px] sm:h-[660px]"
        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fafafa&text_color=3f3f46&primary_color=6849a0`}
        style={{ minWidth: "280px" }}
      />

      {/* Email fallback */}
      <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 text-center">
        <p className="text-sm text-zinc-600 mb-4">
          Pas de créneau disponible ? Laissez votre email, nous vous contacterons.
        </p>
        {state === "success" ? (
          <div className="flex items-center justify-center gap-2 py-2">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span className="text-sm font-medium text-zinc-700">
              Merci ! Nous vous contacterons bientôt.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.ch"
              className="flex-1 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors shrink-0 cursor-pointer"
            >
              {state === "loading"
                ? "Envoi…"
                : state === "error"
                  ? "Réessayer"
                  : "Envoyer"}
            </button>
          </form>
        )}
        <p className="mt-4 text-xs text-zinc-400">
          Ou écrivez-nous directement à{" "}
          <a
            href="mailto:contact@adminds.ch"
            className="text-indigo-600 hover:text-indigo-500 underline underline-offset-2 transition-colors"
          >
            contact@adminds.ch
          </a>
        </p>
      </div>
    </div>
  );
}
