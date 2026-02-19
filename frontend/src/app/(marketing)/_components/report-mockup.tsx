"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const RAPPORT_SECTIONS = [
  {
    id: "anamnese",
    number: "1",
    question:
      "Anamnèse et status (constatations objectives)",
    answer:
      "Patient suivi depuis mars 2024. Symptomatologie dépressive persistante avec anhédonie marquée, troubles du sommeil (réveils précoces), ralentissement psychomoteur et idéations suicidaires passives sans planification. Examen : patient ralenti, affect émoussé, discours cohérent mais pauvre.",
  },
  {
    id: "diag-avec",
    number: "2",
    question:
      "Diagnostic(s) avec répercussion durable sur la capacité de travail (CIM-DSM)",
    answer:
      "F32.1 — Épisode dépressif moyen. Répercussion durable sur la capacité de travail : concentration limitée à 20 min, difficultés relationnelles en milieu professionnel, capacité d'adaptation réduite face au stress.",
  },
  {
    id: "diag-sans",
    number: "3",
    question:
      "Diagnostic(s) sans répercussion durable sur la capacité de travail (CIM-DSM)",
    answer:
      "F40.1 — Phobie sociale légère. Sans impact fonctionnel significatif dans un cadre professionnel adapté. Pas de traitement spécifique requis pour cette composante.",
  },
];

type Phase = "upload" | "generating" | "done";

export default function ReportMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [phase, setPhase] = useState<Phase>("upload");
  const [visibleSections, setVisibleSections] = useState(0);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const run = async () => {
      // Phase 1: Show upload state
      await delay(1200);
      if (cancelled) return;

      // Phase 2: Generating
      setPhase("generating");
      await delay(800);

      // Phase 3: Show sections one by one with typing
      for (let s = 0; s < RAPPORT_SECTIONS.length; s++) {
        if (cancelled) return;
        setVisibleSections(s + 1);
        setTypingIndex(s);
        const section = RAPPORT_SECTIONS[s];
        const totalChars = section.answer.length;

        // Type out the answer
        for (let c = 0; c <= totalChars; c += 3) {
          if (cancelled) return;
          setCharCounts((prev) => ({ ...prev, [section.id]: Math.min(c, totalChars) }));
          await delay(12);
        }
        setCharCounts((prev) => ({ ...prev, [section.id]: totalChars }));
        await delay(400);
      }
      if (cancelled) return;
      setTypingIndex(-1);
      setPhase("done");
    };
    run();
    return () => { cancelled = true; };
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="mockup-window w-full max-w-3xl mx-auto"
    >
      {/* Title bar */}
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-zinc-300" />
        <div className="mockup-dot bg-zinc-200" />
        <div className="mockup-dot bg-zinc-200" />
        <div className="ml-3 flex items-baseline gap-2">
          <span className="text-xs text-zinc-500 font-medium">Dr. N. Berset</span>
          <span className="text-[10px] text-zinc-300">·</span>
          <span className="text-[10px] text-zinc-400">Canton de Genève</span>
        </div>
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto flex items-center gap-2"
          >
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Rapport prêt
            </div>
            <div className="flex items-center gap-1 text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full font-medium cursor-pointer hover:bg-indigo-100 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Télécharger
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex min-h-[380px] sm:min-h-[420px]">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-52 border-r border-zinc-100 p-3 gap-1 shrink-0 bg-zinc-50/50">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-2 px-2 font-medium">
            Dossier patient
          </div>

          {/* Patient file items */}
          <div className="space-y-1 mb-4">
            {["Notes cliniques.pdf", "Historique traitements.pdf", "Bilan psychologique.pdf"].map(
              (file, i) => (
                <motion.div
                  key={file}
                  initial={{ opacity: 0.4 }}
                  animate={isInView ? { opacity: phase === "upload" && i === 0 ? 1 : phase !== "upload" ? 0.5 : 0.4 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] text-zinc-500"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="truncate">{file}</span>
                </motion.div>
              )
            )}
          </div>

          <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-2 px-2 font-medium">
            Sections du rapport
          </div>
          {RAPPORT_SECTIONS.map((section, i) => (
            <div
              key={section.id}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-all duration-300 ${
                i < visibleSections
                  ? i === typingIndex
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-zinc-600"
                  : "text-zinc-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  i < visibleSections && i !== typingIndex
                    ? "bg-emerald-100 text-emerald-700"
                    : i === typingIndex
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-zinc-100 text-zinc-400"
                }`}
              >
                {i < visibleSections && i !== typingIndex ? (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  section.number
                )}
              </div>
              <span className="truncate">Q{section.number}</span>
            </div>
          ))}

          {/* Progress */}
          <div className="mt-auto pt-4">
            <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
              <span>Progression</span>
              <span>{Math.round((visibleSections / RAPPORT_SECTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500 rounded-full"
                animate={{ width: `${(visibleSections / RAPPORT_SECTIONS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 sm:p-5 overflow-hidden">
          {/* Upload / Generate state */}
          {phase === "upload" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-4"
            >
              <div className="w-full max-w-xs border-2 border-dashed border-zinc-200 rounded-xl p-6 text-center">
                <svg className="w-8 h-8 text-zinc-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-xs text-zinc-400">Dossier patient importé</p>
                <p className="text-[10px] text-zinc-300 mt-1">3 fichiers — 24 pages</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                Générer le rapport AI →
              </motion.div>
            </motion.div>
          )}

          {/* Generating state */}
          {phase === "generating" && visibleSections === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-zinc-200 border-t-indigo-500 rounded-full"
              />
              <p className="text-xs text-zinc-400">Analyse du dossier en cours…</p>
            </motion.div>
          )}

          {/* Report content */}
          {visibleSections > 0 && (
            <div className="space-y-4">
              {/* Document header */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-100">
                <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-zinc-700">Rapport AI — Évaluation psychiatrique</div>
                  <div className="text-[10px] text-zinc-400">Office cantonal AI — Genève</div>
                </div>
              </div>

              {/* Sections */}
              {RAPPORT_SECTIONS.slice(0, visibleSections).map((section, i) => {
                const chars = charCounts[section.id] ?? 0;
                const isTyping = i === typingIndex;
                const displayedAnswer = section.answer.slice(0, chars);

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-3 border-b border-zinc-50 last:border-0"
                  >
                    <div className="text-[10px] font-semibold text-zinc-800 mb-1">
                      <span className="text-indigo-500 mr-1">{section.number}.</span>
                      {section.question}
                    </div>
                    <div className="text-[11px] leading-relaxed text-zinc-500">
                      {displayedAnswer}
                      {isTyping && chars < section.answer.length && (
                        <span className="cursor-blink text-indigo-500">▌</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
