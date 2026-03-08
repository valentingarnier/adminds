import type { LucideIcon } from "lucide-react";
import { FileText, Shield, TrendingDown } from "lucide-react";

// --- Patient types & mock data ---

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date
  avsNumber: string; // Swiss social security number (numéro AVS)
  createdAt: string; // ISO datetime
  hasReport: boolean; // true = at least one rapport has been generated
  documentsCount: number;
}

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dupont",
    dateOfBirth: "1985-03-12",
    avsNumber: "756.1234.5678.90",
    createdAt: "2026-03-08T09:30:00",
    hasReport: false,
    documentsCount: 3,
  },
  {
    id: "2",
    firstName: "Jean-Pierre",
    lastName: "Müller",
    dateOfBirth: "1972-07-25",
    avsNumber: "756.9876.5432.10",
    createdAt: "2026-03-08T11:15:00",
    hasReport: false,
    documentsCount: 0,
  },
  {
    id: "3",
    firstName: "Sophie",
    lastName: "Rochat",
    dateOfBirth: "1990-11-03",
    avsNumber: "756.5555.1234.56",
    createdAt: "2026-03-07T14:00:00",
    hasReport: true,
    documentsCount: 5,
  },
  {
    id: "4",
    firstName: "Ahmed",
    lastName: "Benali",
    dateOfBirth: "1968-01-18",
    avsNumber: "756.3333.7890.12",
    createdAt: "2026-03-06T10:45:00",
    hasReport: false,
    documentsCount: 2,
  },
  {
    id: "5",
    firstName: "Isabelle",
    lastName: "Favre",
    dateOfBirth: "1995-09-30",
    avsNumber: "756.7777.4567.89",
    createdAt: "2026-03-05T16:20:00",
    hasReport: true,
    documentsCount: 1,
  },
];

// --- Patient notes ---

export interface PatientNote {
  id: string;
  patientId: string;
  createdAt: string; // ISO datetime
  type: "text" | "voice"; // how the note was created
  summary: string; // short title or auto-generated summary
  content: string; // full note body
  durationSeconds?: number; // only for voice notes
}

export const MOCK_NOTES: PatientNote[] = [
  {
    id: "n1",
    patientId: "1",
    createdAt: "2026-03-08T10:15:00",
    type: "text",
    summary: "Première consultation — anamnèse",
    content:
      "Patiente se présente pour évaluation AI. Antécédents de trouble dépressif récurrent depuis 2018. Actuellement sous Sertraline 100mg. Dernier épisode majeur en novembre 2025, ayant conduit à un arrêt de travail prolongé.",
  },
  {
    id: "n2",
    patientId: "1",
    createdAt: "2026-03-08T11:00:00",
    type: "voice",
    summary: "Observation clinique — état mental",
    content:
      "Patiente orientée dans les trois sphères. Contact adéquat mais ralenti. Thymie abaissée, affect restreint. Pas d'idéation suicidaire active. Sommeil perturbé avec réveils précoces. Concentration diminuée, décrit des difficultés à maintenir l'attention au travail.",
    durationSeconds: 127,
  },
  {
    id: "n3",
    patientId: "1",
    createdAt: "2026-03-07T14:30:00",
    type: "text",
    summary: "Capacité de travail — évaluation",
    content:
      "Capacité de travail estimée à 50% dans l'activité habituelle. Limitations fonctionnelles : concentration réduite, fatigabilité accrue, difficultés relationnelles avec la hiérarchie. Pronostic réservé à 6 mois.",
  },
];

// --- Patient documents ---

export interface PatientDocument {
  id: string;
  patientId: string;
  category: "dpi-smeex" | "antecedents" | "autre";
  fileName: string;
  fileSize: number; // bytes
  uploadedAt: string; // ISO datetime
  mimeType: string;
}

export const MOCK_DOCUMENTS: PatientDocument[] = [
  {
    id: "d1",
    patientId: "1",
    category: "dpi-smeex",
    fileName: "DPI_Dupont_Marie_SMEEX.xml",
    fileSize: 245_000,
    uploadedAt: "2026-03-08T09:45:00",
    mimeType: "application/xml",
  },
  {
    id: "d2",
    patientId: "1",
    category: "antecedents",
    fileName: "Rapport_Dr_Weber_2024.pdf",
    fileSize: 1_230_000,
    uploadedAt: "2026-03-08T09:50:00",
    mimeType: "application/pdf",
  },
  {
    id: "d3",
    patientId: "1",
    category: "antecedents",
    fileName: "Bilan_neuropsychologique_2025.pdf",
    fileSize: 890_000,
    uploadedAt: "2026-03-07T15:20:00",
    mimeType: "application/pdf",
  },
  {
    id: "d4",
    patientId: "1",
    category: "autre",
    fileName: "Formulaire_AI_rempli.pdf",
    fileSize: 156_000,
    uploadedAt: "2026-03-07T15:25:00",
    mimeType: "application/pdf",
  },
];

// --- Report template types ---

export interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

// --- Generated report content (mock) ---

export interface ReportSection {
  id: string;
  title: string;
  content: string;
}

// Realistic Rapport AI sections for patient Marie Dupont
export const MOCK_REPORT_SECTIONS: Record<string, ReportSection[]> = {
  "rapport-ai": [
    {
      id: "anamnese",
      title: "1. Anamnèse",
      content:
        "Mme Marie Dupont, née le 12.03.1985, est adressée pour une évaluation psychiatrique dans le cadre d'une demande de prestations de l'assurance-invalidité. La patiente rapporte un trouble dépressif récurrent diagnostiqué en 2018, initialement traité par psychothérapie ambulatoire. Un épisode dépressif majeur est survenu en novembre 2025, entraînant un arrêt de travail complet depuis le 15.11.2025.\n\nLa patiente travaillait comme assistante administrative à 100% depuis 2012. Elle décrit une dégradation progressive de son état depuis septembre 2025, avec des difficultés croissantes de concentration, une fatigue invalidante et des troubles du sommeil. Le traitement actuel comprend Sertraline 100mg/j et un suivi psychothérapeutique hebdomadaire.",
    },
    {
      id: "examen-clinique",
      title: "2. Examen clinique / Status psychique",
      content:
        "Patiente orientée dans les trois sphères. Présentation soignée, contact adéquat mais ralenti. Le discours est cohérent, de débit légèrement diminué. La thymie est abaissée avec un affect restreint. On note une anhédonie marquée et une perte d'intérêt pour les activités habituelles.\n\nPas d'idéation suicidaire active ni de symptômes psychotiques. Le sommeil est perturbé avec des réveils précoces vers 4h. L'appétit est diminué avec une perte de poids de 4 kg en 3 mois. La concentration est significativement réduite, la patiente décrit des difficultés à lire plus de 10 minutes et à maintenir le fil d'une conversation complexe.",
    },
    {
      id: "diagnostic",
      title: "3. Diagnostic (CIM-10)",
      content:
        "F33.1 — Trouble dépressif récurrent, épisode actuel moyen\nF51.0 — Insomnie non organique\n\nDiagnostics différentiels exclus : trouble bipolaire, trouble anxieux généralisé (pas de critères suffisants), trouble de la personnalité.",
    },
    {
      id: "limitations",
      title: "4. Limitations fonctionnelles",
      content:
        "Selon les indicateurs standards de la jurisprudence fédérale (ATF 141 V 281) :\n\n• Concentration et attention : Limitation sévère — incapacité à maintenir l'attention au-delà de 15-20 minutes sur une tâche cognitive\n• Endurance : Limitation modérée à sévère — fatigabilité accrue nécessitant des pauses fréquentes\n• Adaptabilité : Limitation modérée — difficultés face aux changements et aux situations imprévues\n• Relations interpersonnelles : Limitation légère à modérée — retrait social, mais capacité préservée de contacts brefs\n• Planification et organisation : Limitation modérée — difficultés à structurer une journée de travail complète",
    },
    {
      id: "capacite-travail",
      title: "5. Capacité de travail",
      content:
        "Dans l'activité habituelle d'assistante administrative :\n— Capacité de travail actuelle : 50%\n— Horaire adapté recommandé : mi-temps (4h/jour, 5 jours/semaine)\n— Limitations : pas de tâches nécessitant une concentration soutenue, pas de pression temporelle excessive, environnement de travail calme\n\nDans une activité adaptée :\n— Capacité de travail estimée : 60-70%\n— Activité sans exigence cognitive élevée, avec possibilité de pauses régulières\n\nL'exigibilité d'une reprise à temps plein n'est pas raisonnable dans l'état actuel.",
    },
    {
      id: "pronostic",
      title: "6. Pronostic",
      content:
        "Le pronostic est réservé à moyen terme (6-12 mois). L'évolution dépendra de la réponse au traitement antidépresseur en cours et de la poursuite de la psychothérapie. Une réévaluation est recommandée dans 6 mois.\n\nFacteurs favorables : compliance thérapeutique, motivation de la patiente, bon fonctionnement prémorbide.\nFacteurs défavorables : récurrence du trouble, durée de l'épisode actuel, persistance des troubles du sommeil malgré le traitement.",
    },
  ],
};

// The 3 rapport types available for each patient
export const REPORT_TYPES: ReportType[] = [
  {
    id: "rapport-ai",
    name: "Rapport AI",
    description: "Rapport d'assurance invalidité généré par IA",
    icon: FileText,
  },
  {
    id: "rapport-assurance-privee",
    name: "Rapport assurance privée",
    description: "Rapport pour les assurances privées du patient",
    icon: Shield,
  },
  {
    id: "rapport-perte-de-gain",
    name: "Rapport perte de gain",
    description: "Rapport d'évaluation de la perte de gain",
    icon: TrendingDown,
  },
];
