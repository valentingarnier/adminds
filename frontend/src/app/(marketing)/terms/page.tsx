import { Logo } from "@/components/logo";

export const metadata = {
  title: "Conditions générales — Adminds",
};

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Logo size="md" href="/" />
          <a
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            &larr; Retour
          </a>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 sm:py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Conditions générales d&apos;utilisation
          </h1>
          <p className="text-sm text-zinc-400 mb-12">
            Dernière mise à jour : février 2026
          </p>

          <div className="prose prose-zinc max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-zinc-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-zinc-600 [&_li]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
            <h2>Contrat de licence logicielle (SaaS)</h2>
            <p>
              Le présent contrat de licence logicielle (le « Contrat ») est
              conclu entre Adminds et ses filiales (collectivement désignées
              « Adminds », « nous », « notre société ») et la personne physique
              ou morale souscrivant au logiciel et/ou aux services en vertu du
              présent Contrat (« vous » ou « le Client », et ensemble avec
              Adminds, les « Parties »), et régit l&apos;accès et l&apos;utilisation du
              logiciel et/ou des services par le Client.
            </p>

            <h2>1. Préambule</h2>
            <p>
              Adminds est un outil d&apos;assistance à la rédaction de rapports
              médico-légaux, en particulier les rapports d&apos;assurance invalidité
              (AI), destiné aux professionnels de la santé en Suisse. Le Service
              utilise l&apos;intelligence artificielle pour aider à structurer et
              rédiger des rapports conformes aux exigences légales suisses
              (critères de Foerster, indicateurs d&apos;évaluation structurée,
              jurisprudence du Tribunal fédéral).
            </p>
            <p>
              Adminds est une plateforme d&apos;infrastructure et de service
              uniquement. Adminds ne se substitue pas au jugement médical
              professionnel et ne produit pas de rapports médicaux de manière
              autonome. Les modèles d&apos;IA utilisés sont fournis par des tiers
              (notamment Anthropic) et sont soumis à leurs propres conditions
              d&apos;utilisation.
            </p>

            <h2>2. Acceptation des conditions</h2>
            <p>
              En souscrivant aux services d&apos;Adminds, le Client accepte les
              présentes conditions générales d&apos;utilisation (CGU) dans leur
              intégralité.
            </p>
            <p>
              Le Client confirme qu&apos;il est autorisé à représenter son
              organisation et à accepter les présentes CGU en son nom.
            </p>
            <p>
              Les CGU peuvent être mises à jour, et les renouvellements seront
              soumis à la version en vigueur au moment du renouvellement.
            </p>
            <p>
              Le présent Contrat peut être mis à disposition via Stripe ou une
              autre plateforme de paiement en ligne, et l&apos;acceptation des CGU
              peut intervenir via un clic de confirmation lors de la
              souscription.
            </p>

            <h2>3. Description du Service</h2>
            <p>Adminds fournit les éléments suivants :</p>
            <ul>
              <li>
                Une application web sécurisée permettant le téléchargement de
                dossiers médicaux et la génération assistée de rapports
                médico-légaux.
              </li>
              <li>
                Un système d&apos;IA capable d&apos;analyser des dossiers patients et de
                produire des ébauches de rapports structurés conformes aux
                formulaires cantonaux.
              </li>
              <li>
                Une gestion de l&apos;infrastructure incluant l&apos;hébergement sécurisé,
                le chiffrement des données et la maintenance du service.
              </li>
              <li>
                L&apos;accès à des modèles d&apos;IA de fournisseurs tiers (notamment
                Anthropic) pour le traitement et la génération de contenu.
              </li>
            </ul>

            <h2>4. Accès au logiciel et restrictions</h2>
            <p>
              Adminds accorde un droit limité, non transférable et non exclusif
              d&apos;accès et d&apos;utilisation du Service via l&apos;interface web. Rien dans
              le présent Contrat ne transfère de droits de propriété
              intellectuelle.
            </p>
            <p>Il est interdit de :</p>
            <ul>
              <li>
                Utiliser le Service à des fins illégales, frauduleuses ou
                nuisibles.
              </li>
              <li>
                Utiliser le Service pour générer des rapports médicaux
                frauduleux, trompeurs ou non conformes à la déontologie médicale.
              </li>
              <li>
                Revendre, redistribuer ou exploiter commercialement le Service
                sans consentement écrit.
              </li>
              <li>
                Utiliser des outils automatisés pour extraire, copier ou
                surveiller le contenu du Service.
              </li>
              <li>
                Tenter d&apos;obtenir un accès non autorisé aux données d&apos;autres
                utilisateurs ou à l&apos;infrastructure.
              </li>
              <li>
                Contourner les limites de débit, les plafonds d&apos;utilisation ou
                d&apos;autres restrictions techniques.
              </li>
              <li>
                Utiliser le Service pour générer du contenu violant les lois
                applicables ou les droits de tiers.
              </li>
            </ul>
            <p>
              L&apos;accès au Service est soumis aux lois applicables, et Adminds se
              réserve le droit de suspendre ou de résilier les comptes en cas de
              violation sans préavis ni remboursement.
            </p>

            <h2>5. IA — Clause de non-responsabilité</h2>
            <p>
              <strong>
                CETTE SECTION EST ESSENTIELLE. LE CLIENT DOIT LA LIRE ET LA
                COMPRENDRE AVANT D&apos;UTILISER LE SERVICE.
              </strong>
            </p>

            <h3>5.1 Nature de l&apos;assistant IA</h3>
            <p>
              L&apos;assistant Adminds est alimenté par des modèles de langage
              (LLM) de tiers. Il est capable de générer du texte, d&apos;analyser
              des documents et de produire des rapports structurés. Ces actions
              sont effectuées sur la base des instructions du Client et de
              l&apos;interprétation par le modèle d&apos;IA.
            </p>

            <h3>5.2 Aucun contrôle sur les résultats de l&apos;IA</h3>
            <p>
              Adminds ne contrôle pas, ne surveille pas, ne vérifie pas et
              n&apos;approuve pas les résultats, actions ou décisions de l&apos;IA.
              Adminds ne garantit pas et ne peut pas garantir l&apos;exactitude,
              l&apos;exhaustivité, la fiabilité, la sécurité, la légalité ou la
              pertinence de tout contenu généré par l&apos;IA.
            </p>

            <h3>5.3 Responsabilité exclusive du Client</h3>
            <p>Le Client reconnaît et accepte que :</p>
            <ul>
              <li>
                Le Client est seul et entièrement responsable de tous les
                rapports générés par le Service, y compris leur contenu, leur
                exactitude et leur conformité aux exigences légales.
              </li>
              <li>
                Le Client est responsable de la vérification, de la validation
                et de la signature de tout rapport avant sa soumission aux
                autorités.
              </li>
              <li>
                Le Client assume tous les risques liés à l&apos;utilisation de
                contenu généré par l&apos;IA, y compris les erreurs, inexactitudes
                ou non-conformités.
              </li>
              <li>
                Le Client ne doit pas se fier au Service pour des décisions
                critiques sans vérification indépendante, notamment pour les
                décisions médicales, juridiques ou administratives.
              </li>
            </ul>

            <h3>5.4 Absence de garantie sur le comportement de l&apos;IA</h3>
            <p>
              Adminds ne fait aucune déclaration ni garantie, expresse ou
              implicite, concernant :
            </p>
            <ul>
              <li>
                L&apos;exactitude, la correction ou la fiabilité du contenu généré
                par l&apos;IA.
              </li>
              <li>
                La conformité de l&apos;IA à des normes, réglementations ou
                pratiques spécifiques.
              </li>
              <li>
                L&apos;absence d&apos;erreurs, de biais, d&apos;hallucinations ou de
                résultats inappropriés dans le contenu généré.
              </li>
              <li>
                L&apos;adéquation des résultats de l&apos;IA à un usage particulier.
              </li>
            </ul>

            <h3>5.5 Modèles et services d&apos;IA tiers</h3>
            <p>
              L&apos;assistant IA est alimenté par des modèles de langage tiers
              (notamment les modèles d&apos;Anthropic). Adminds n&apos;a aucun contrôle
              sur le comportement, les données d&apos;entraînement, les biais, les
              capacités ou les limitations de ces modèles. L&apos;utilisation de ces
              modèles est en outre soumise aux conditions d&apos;utilisation et aux
              politiques d&apos;utilisation acceptable de chaque fournisseur. Adminds
              décline toute responsabilité quant au comportement, aux résultats
              ou à la disponibilité de ces modèles tiers.
            </p>

            <h3>5.6 Indemnisation</h3>
            <p>
              Le Client accepte d&apos;indemniser, de défendre et de dégager de
              toute responsabilité Adminds, ses dirigeants, directeurs, employés
              et agents contre toutes réclamations, dommages, pertes,
              responsabilités, coûts et dépenses (y compris les honoraires
              d&apos;avocat raisonnables) résultant de ou liés à :
            </p>
            <ul>
              <li>
                Tout rapport ou contenu généré via le Service du Client.
              </li>
              <li>
                L&apos;utilisation par le Client des résultats générés par l&apos;IA.
              </li>
              <li>
                Toute violation des droits de tiers résultant de l&apos;utilisation
                du Service.
              </li>
              <li>
                La violation par le Client des présentes Conditions ou des lois
                applicables.
              </li>
            </ul>

            <h2>6. Protection des données et vie privée</h2>
            <p>
              Adminds se conforme à la Loi fédérale sur la protection des
              données (LPD/nLPD) et au RGPD le cas échéant.
            </p>
            <p>
              Un accord de traitement des données (DPA) distinct est fourni sur
              demande.
            </p>
            <p>
              Les documents téléchargés et les rapports générés sont stockés de
              manière sécurisée et chiffrée. Adminds n&apos;accède pas, ne consulte
              pas et n&apos;utilise pas ces données sauf à des fins de maintenance
              technique.
            </p>
            <p>
              Les fournisseurs de modèles d&apos;IA tiers (notamment Anthropic)
              peuvent traiter le contenu conformément à leurs propres politiques
              de confidentialité. Le Client doit consulter ces politiques avant
              utilisation.
            </p>
            <p>
              Les Clients seront informés en cas de violation de sécurité, et
              des mesures correctives seront mises en œuvre immédiatement.
            </p>
            <p>
              Les Clients peuvent demander l&apos;accès, la correction, la
              suppression ou la portabilité de leurs données personnelles à tout
              moment.
            </p>
            <p>
              Pour plus de détails, consultez notre{" "}
              <a
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Politique de confidentialité
              </a>
              .
            </p>

            <h2>7. Abonnement et résiliation</h2>

            <h3>Durée et renouvellement</h3>
            <p>
              Les abonnements mensuels se renouvellent automatiquement chaque
              mois. Une période d&apos;essai gratuite peut être proposée.
              L&apos;abonnement sera automatiquement converti en plan payant à la fin
              de la période d&apos;essai, sauf annulation.
            </p>

            <h3>Annulation</h3>
            <p>
              Les Clients peuvent annuler leur abonnement à tout moment via leur
              tableau de bord ou en contactant contact@adminds.ch.
              L&apos;annulation prend effet à la fin de la période de facturation en
              cours. Aucun remboursement au prorata n&apos;est prévu.
            </p>
            <p>
              En cas d&apos;annulation, les données du Client seront supprimées dans
              un délai de 30 jours, sauf demande d&apos;exportation préalable.
            </p>

            <h3>Non-paiement</h3>
            <p>
              Suspension du compte après 30 jours d&apos;impayé. Le Service sera
              inaccessible pendant la suspension.
            </p>

            <h2>8. Taxes et facturation</h2>
            <ul>
              <li>
                <strong>Clients en Suisse</strong> : les prix incluent la TVA
                suisse le cas échéant.
              </li>
              <li>
                <strong>Clients hors de Suisse</strong> : les prix sont hors
                taxes. Le Client est responsable de toutes les taxes applicables
                dans sa juridiction.
              </li>
              <li>
                Les paiements sont traités via Stripe. Toute contestation de
                facturation doit être adressée à contact@adminds.ch.
              </li>
            </ul>

            <h2>9. Disponibilité du Service et suspension</h2>
            <p>
              Adminds s&apos;efforce de maintenir une haute disponibilité du Service
              mais ne garantit pas un accès ininterrompu. Le Service dépend
              d&apos;infrastructures et de fournisseurs tiers.
            </p>
            <p>
              Adminds se réserve le droit de suspendre un compte sans préavis en
              cas de :
            </p>
            <ul>
              <li>Non-paiement après 30 jours.</li>
              <li>
                Violations des présentes Conditions, y compris les utilisations
                interdites.
              </li>
              <li>
                Modes d&apos;utilisation abusifs ou consommation de ressources
                impactant d&apos;autres utilisateurs.
              </li>
              <li>Exigences légales ou réglementaires.</li>
            </ul>

            <h2>10. Sauvegardes et données</h2>
            <p>
              Adminds ne garantit pas les sauvegardes du contenu généré par
              l&apos;IA, des fichiers de travail ou de l&apos;historique au-delà des
              mesures d&apos;infrastructure standard.
            </p>
            <p>
              Les Clients sont responsables de l&apos;exportation ou de la
              sauvegarde de toute donnée qu&apos;ils souhaitent conserver.
            </p>
            <p>
              Sur demande écrite dans les 30 jours suivant la résiliation,
              Adminds peut fournir une copie des données stockées lorsque cela
              est techniquement possible.
            </p>

            <h2>11. Limitation de responsabilité</h2>
            <p>
              <strong>
                DANS LA MESURE MAXIMALE AUTORISÉE PAR LA LOI APPLICABLE, ADMINDS
                NE SERA PAS RESPONSABLE DE :
              </strong>
            </p>
            <ul>
              <li>
                Tout rapport, résultat ou contenu généré par l&apos;IA.
              </li>
              <li>
                Tout dommage résultant de la confiance du Client dans le contenu
                généré par l&apos;IA.
              </li>
              <li>
                Les défaillances techniques, interruptions de service ou pannes
                d&apos;infrastructure.
              </li>
              <li>
                Le comportement, les erreurs, les biais ou la disponibilité des
                modèles d&apos;IA tiers.
              </li>
              <li>
                La perte ou la corruption de données dans l&apos;espace de travail du
                Client.
              </li>
              <li>
                Le non-respect par le Client des présentes Conditions ou des
                lois applicables.
              </li>
              <li>
                Les événements de force majeure (catastrophes naturelles,
                cyberattaques, changements réglementaires, etc.).
              </li>
              <li>
                Tout dommage indirect, accessoire, spécial, consécutif ou
                punitif.
              </li>
            </ul>
            <p>
              <strong>
                EN AUCUN CAS LA RESPONSABILITÉ TOTALE CUMULÉE D&apos;ADMINDS NE
                DÉPASSERA LES MONTANTS PAYÉS PAR LE CLIENT AU COURS DES DOUZE
                (12) MOIS PRÉCÉDANT LA RÉCLAMATION.
              </strong>
            </p>

            <h2>12. Propriété intellectuelle</h2>
            <ul>
              <li>
                La plateforme, la marque et la technologie propriétaire
                d&apos;Adminds restent la propriété exclusive d&apos;Adminds.
              </li>
              <li>
                Le contenu généré avec l&apos;aide du Service appartient au Client,
                sous réserve des conditions des fournisseurs de modèles d&apos;IA
                sous-jacents.
              </li>
              <li>
                Le Client n&apos;accorde à Adminds aucun droit sur ses données ou
                son contenu généré par l&apos;IA au-delà de ce qui est nécessaire
                pour fournir le Service.
              </li>
            </ul>

            <h2>13. Arbitrage et juridiction</h2>
            <p>
              Tout litige découlant du présent Contrat sera réglé par arbitrage
              à Genève, Suisse.
            </p>
            <p>
              Les tribunaux de Genève ont compétence exclusive en cas de litige.
            </p>
            <p>
              Le présent Contrat est régi et interprété conformément au droit
              suisse.
            </p>

            <h2>14. Modifications des conditions</h2>
            <p>
              Adminds se réserve le droit de modifier les présentes Conditions à
              tout moment. Les modifications importantes seront communiquées au
              Client par e-mail ou notification dans le tableau de bord au moins
              30 jours avant leur entrée en vigueur. L&apos;utilisation continue du
              Service après la date d&apos;entrée en vigueur constitue l&apos;acceptation
              des Conditions mises à jour.
            </p>

            <h2>15. Contact et mentions légales</h2>
            <ul>
              <li>
                <strong>Raison sociale</strong> : Adminds (constitution en cours)
              </li>
              <li>
                <strong>Adresse</strong> : Genève, Suisse (adresse complète
                disponible sur demande)
              </li>
              <li>
                <strong>E-mail</strong> :{" "}
                <a
                  href="mailto:contact@adminds.ch"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  contact@adminds.ch
                </a>
              </li>
              <li>
                <strong>Site web</strong> :{" "}
                <a
                  href="https://www.adminds.ch"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  www.adminds.ch
                </a>
              </li>
              <li>
                <strong>For juridique</strong> : Genève, Suisse
              </li>
            </ul>

            <h2>Avertissement</h2>
            <p>
              Adminds est un fournisseur de services d&apos;assistance à la
              rédaction de rapports médico-légaux. Adminds ne développe pas, ne
              forme pas et ne contrôle pas les modèles d&apos;IA utilisés. Malgré
              un contrôle attentif du contenu, nous déclinons toute
              responsabilité quant au contenu des rapports générés par l&apos;IA. Le
              Client est seul responsable de toute utilisation du Service et de
              toutes les conséquences qui en découlent.
            </p>
          </div>
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
              href="/privacy"
              className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Confidentialité
            </a>
            <a
              href="/terms"
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
