import ReportMockup from "./_components/report-mockup";
import CompliancePanel from "./_components/compliance-panel";
import TimeComparison from "./_components/time-comparison";
import WaitlistForm from "./_components/waitlist-form";
import { Logo } from "@/components/logo";

const NAV_LINKS = [
  { href: "#probleme", label: "Le problème" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#conformite", label: "Conformité" },
  { href: "#partenaires", label: "Devenir partenaire" },
];

const FEATURES = [
  {
    title: "Critères de Foerster intégrés",
    description:
      "Chaque rapport est structuré autour de l'ATF 141 V 281 et des indicateurs d'évaluation structurée exigés par la jurisprudence cantonale.",
  },
  {
    title: "Conformité au formulaire cantonal",
    description:
      "Le rapport généré respecte exactement le format de votre office AI cantonal — en commençant par Genève, puis tous les cantons suisses.",
  },
  {
    title: "Précision médicale",
    description:
      "Codage CIM-10, évaluation des limitations fonctionnelles et capacité de travail fondés sur vos observations cliniques.",
  },
  {
    title: "Vos constats, structurés",
    description:
      "Adminds n'invente rien. Il prend vos notes cliniques et les organise dans le cadre juridique exigé par le formulaire cantonal.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Logo size="md" href="/" />
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#partenaires"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Nous rejoindre
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs text-indigo-600 font-medium">
                4/15 psychiatres inscrits — Accès privé et gratuit
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-zinc-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Du dossier patient au{" "}
              <span className="gradient-text">rapport AI conforme.</span>
              <br />
              En quelques minutes.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Adminds aide les psychiatres à rédiger des rapports d&apos;assurance
              invalidité conformes aux exigences cantonales — structurés,
              juridiquement valides, et prêts à soumettre.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#partenaires"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-indigo-200 text-center"
              >
                Devenir partenaire bêta
              </a>
              <a
                href="#probleme"
                className="w-full sm:w-auto px-6 py-3 border border-zinc-200 text-zinc-700 rounded-xl text-sm font-semibold hover:bg-zinc-50 transition-colors text-center"
              >
                Voir comment ça marche
              </a>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="mt-16 sm:mt-20">
            <ReportMockup />
          </div>
        </div>
      </section>

      {/* Time comparison */}
      <section id="probleme" className="py-20 sm:py-28 px-6 bg-zinc-50/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
              Le problème
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              2–3 heures par rapport.{" "}
              <span className="text-zinc-400">C&apos;est trop.</span>
            </h2>
            <p className="mt-4 text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Parcourir le dossier complet, répondre à chaque question du
              formulaire cantonal, vérifier la conformité juridique — autant de
              temps perdu loin de vos patients.
            </p>
          </div>
          <TimeComparison />
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="py-20 sm:py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
              Comment ça marche
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Trois étapes. Un rapport conforme.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                number: "01",
                title: "Importez le dossier patient",
                description:
                  "Déposez ou importez les notes cliniques, bilans et courriers du patient. Aucun formatage spécifique requis.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                ),
              },
              {
                number: "02",
                title: "L'IA génère le rapport",
                description:
                  "Adminds analyse le dossier et remplit chaque section du formulaire cantonal en respectant les critères de Foerster.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                ),
              },
              {
                number: "03",
                title: "Relisez et soumettez",
                description:
                  "Vérifiez le rapport, ajustez si nécessaire, puis exportez dans le format exact exigé par votre office AI cantonal.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                ),
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-xl border border-zinc-100 bg-white p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      {step.icon}
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-zinc-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance showcase */}
      <section id="conformite" className="py-20 sm:py-28 px-6 bg-zinc-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
                Conformité légale
              </div>
              <h2
                className="text-3xl sm:text-4xl font-normal tracking-tight leading-tight text-zinc-900"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Conforme par conception,{" "}
                <span className="text-zinc-400">pas par hasard.</span>
              </h2>
              <p className="mt-4 text-zinc-500 leading-relaxed">
                Chaque rapport est validé en temps réel contre les exigences
                cantonales. Critères de Foerster, indicateurs d&apos;évaluation
                structurée, formats de formulaires — vérifiés automatiquement
                pour que vos rapports ne soient plus jamais retournés.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Vérification automatique des critères de Foerster",
                  "Indicateurs d'évaluation structurée (ATF 141 V 281)",
                  "Conformité au format du formulaire cantonal",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <CompliancePanel />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-28 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
              Conçu pour les psychiatres
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tout ce qu&apos;un rapport conforme exige.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-100 bg-white p-6 card-hover"
              >
                <h3 className="text-base font-semibold text-zinc-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section
        id="partenaires"
        className="py-20 sm:py-28 px-6 bg-zinc-50/50"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Construisons-le ensemble.
          </h2>
          <p className="mt-4 text-zinc-500 leading-relaxed">
            Nous cherchons des psychiatres pour co-développer Adminds.
            Les places sont limitées — rejoignez la bêta gratuitement et
            testez l&apos;outil sur vos propres rapports. Vos retours
            façonneront le produit.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-xs text-zinc-400">
            Nous vous contacterons uniquement pour votre
            accès à la bêta et pour recueillir vos retours.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 px-6">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" href="/" />
            <span className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Confidentialité
            </a>
            <a
              href="#"
              className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Conditions
            </a>
            <a
              href="mailto:contact@adminds.ch"
              className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
