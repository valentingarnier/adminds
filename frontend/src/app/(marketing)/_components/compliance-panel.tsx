"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const CHECKS = [
  {
    label: "Critères de Foerster",
    detail: "ATF 141 V 281 — évaluation structurée",
  },
  {
    label: "Indicateurs standardisés",
    detail: "Grille d'évaluation cantonale",
  },
  {
    label: "Formulaire cantonal",
    detail: "Format conforme aux exigences de l'office AI",
  },
  {
    label: "Jurisprudence citée",
    detail: "Références à jour du Tribunal fédéral",
  },
  {
    label: "Cohérence diagnostique",
    detail: "Codes CIM-10 vérifiés automatiquement",
  },
];

export default function CompliancePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className="mockup-window w-full max-w-sm mx-auto"
    >
      {/* Title bar */}
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-zinc-300" />
        <div className="mockup-dot bg-zinc-200" />
        <div className="mockup-dot bg-zinc-200" />
        <span className="ml-3 text-xs text-zinc-400 font-medium">
          Conformité légale
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Status header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700">
            Rapport conforme
          </span>
          <span className="ml-auto text-[10px] text-emerald-500">
            5/5 critères
          </span>
        </motion.div>

        {/* Checks */}
        {CHECKS.map((check, i) => (
          <motion.div
            key={check.label}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.8 + i * 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-zinc-100 hover:border-zinc-200 transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-emerald-600"
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
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-zinc-700">
                {check.label}
              </div>
              <div className="text-[10px] text-zinc-400">{check.detail}</div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: 1.0 + i * 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
