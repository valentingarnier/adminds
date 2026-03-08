"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Button } from "@/components/button";

// Tab definitions — same pattern as patient detail page.
const TABS = [
  { id: "profil", label: "Profil" },
  { id: "abonnement", label: "Abonnement" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// All 26 Swiss cantons — the canton determines which AI office receives
// the rapport and which cantonal rules apply to the report generation.
const CANTONS = [
  { value: "", label: "Sélectionner un canton" },
  { value: "AG", label: "Argovie (AG)" },
  { value: "AI", label: "Appenzell Rhodes-Intérieures (AI)" },
  { value: "AR", label: "Appenzell Rhodes-Extérieures (AR)" },
  { value: "BE", label: "Berne (BE)" },
  { value: "BL", label: "Bâle-Campagne (BL)" },
  { value: "BS", label: "Bâle-Ville (BS)" },
  { value: "FR", label: "Fribourg (FR)" },
  { value: "GE", label: "Genève (GE)" },
  { value: "GL", label: "Glaris (GL)" },
  { value: "GR", label: "Grisons (GR)" },
  { value: "JU", label: "Jura (JU)" },
  { value: "LU", label: "Lucerne (LU)" },
  { value: "NE", label: "Neuchâtel (NE)" },
  { value: "NW", label: "Nidwald (NW)" },
  { value: "OW", label: "Obwald (OW)" },
  { value: "SG", label: "Saint-Gall (SG)" },
  { value: "SH", label: "Schaffhouse (SH)" },
  { value: "SO", label: "Soleure (SO)" },
  { value: "SZ", label: "Schwyz (SZ)" },
  { value: "TG", label: "Thurgovie (TG)" },
  { value: "TI", label: "Tessin (TI)" },
  { value: "UR", label: "Uri (UR)" },
  { value: "VD", label: "Vaud (VD)" },
  { value: "VS", label: "Valais (VS)" },
  { value: "ZG", label: "Zoug (ZG)" },
  { value: "ZH", label: "Zurich (ZH)" },
] as const;

// Simple form field wrapper: label on top, control below, with consistent gap.
function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <label className="block text-sm font-medium text-zinc-900">
        {label}
      </label>
      {hint && <p className="mt-1 text-sm text-zinc-500">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabId>("profil");

  // Pre-fill from Clerk profile; canton stored in unsafeMetadata for now.
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [canton, setCanton] = useState(
    (user?.unsafeMetadata?.canton as string) ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setSaved(false);

    try {
      // Update Clerk profile: name fields + canton in metadata.
      await user.update({
        firstName,
        lastName,
        unsafeMetadata: { ...user.unsafeMetadata, canton },
      });
      setSaved(true);
      // Hide confirmation after 2 seconds.
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Page header */}
      <Heading>Paramètres</Heading>
      <Text className="mt-1">
        Gérez votre profil et les préférences de votre cabinet.
      </Text>

      {/* Tab bar — matches patient detail page style */}
      <div className="mt-6 border-b border-zinc-200">
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-10 max-w-xl">
        {/* ── Profile tab ── */}
        {activeTab === "profil" && (
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Informations personnelles
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Ces informations apparaîtront sur vos rapports AI générés.
            </p>

            <div className="mt-8">
              <FormField label="Prénom">
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                />
              </FormField>

              <FormField label="Nom">
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Dupont"
                />
              </FormField>

              <FormField
                label="Canton"
                hint="Le canton détermine les directives appliquées lors de la génération du rapport AI."
              >
                <Select
                  value={canton}
                  onChange={(e) => setCanton(e.target.value)}
                >
                  {CANTONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>

            {/* Save button */}
            <div className="mt-10 flex items-center gap-4">
              <Button color="indigo" onClick={handleSave} disabled={saving}>
                {saving ? "Enregistrement…" : "Enregistrer"}
              </Button>
              {saved && (
                <span className="text-sm text-green-600">
                  Modifications enregistrées.
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Subscription tab ── */}
        {activeTab === "abonnement" && (
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Votre abonnement
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Informations sur votre forfait et votre utilisation.
            </p>

            <div className="mt-8">
              <FormField label="Forfait actuel">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-indigo-200 ring-inset">
                  Bêta gratuite
                </span>
              </FormField>

              <FormField label="Email">
                <Input
                  value={user?.primaryEmailAddress?.emailAddress ?? ""}
                  disabled
                />
              </FormField>

              <FormField
                label="Identifiant du compte"
                hint="Communiquez cet identifiant en cas de demande de support."
              >
                <Input value={user?.id ?? ""} disabled />
              </FormField>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
