"use client";

import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { Badge } from "@/components/badge";
import {
  FileText,
  Shield,
  TrendingDown,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Report categories shown as sections on the page.
interface ReportCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  // If templates is set, show one card per template (e.g. one per insurer).
  // Otherwise show a single card for the category.
  templates?: { id: string; name: string }[];
}

// Swiss private insurers — each has its own report template.
const SWISS_INSURERS = [
  { id: "sanitas", name: "Sanitas" },
  { id: "groupe-mutuel", name: "Groupe Mutuel" },
  { id: "axa", name: "AXA" },
  { id: "css", name: "CSS" },
  { id: "swica", name: "Swica" },
  { id: "helsana", name: "Helsana" },
];

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    id: "rapport-ai",
    name: "Rapport AI",
    // The canton selected in settings determines which template is used.
    description:
      "Rapport d'assurance invalidité. Le modèle utilisé dépend du canton configuré dans vos paramètres.",
    icon: FileText,
  },
  {
    id: "rapport-assurance-privee",
    name: "Rapport assurance privée",
    description:
      "Rapport pour les assurances privées du patient. Chaque assureur a son propre formulaire.",
    icon: Shield,
    templates: SWISS_INSURERS,
  },
  {
    id: "rapport-perte-de-gain",
    name: "Rapport perte de gain",
    description: "Rapport d'évaluation de la perte de gain.",
    icon: TrendingDown,
  },
];

export default function ModelesPage() {
  return (
    <div>
      <Heading>Modèles de rapports</Heading>
      <Text className="mt-2">
        Modèles utilisés pour générer les rapports de vos patients.
      </Text>

      {/* One section per report category */}
      <div className="mt-10" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {REPORT_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <section key={category.id}>
              {/* Category header */}
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-50 p-2">
                  <Icon className="size-5 text-indigo-500" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">{category.name}</p>
                  <p className="text-sm text-zinc-500">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* If the category has per-insurer templates, show them as a grid */}
              {category.templates ? (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {category.templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <Building2 className="size-4 text-zinc-400 shrink-0" />
                      <span className="text-sm font-medium text-zinc-900">
                        {tpl.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Single-template category — show a subtle card */
                <div className="mt-4 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Badge color="indigo">Canton</Badge>
                    <span className="text-sm text-zinc-500">
                      Le modèle est déterminé par votre canton
                    </span>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
