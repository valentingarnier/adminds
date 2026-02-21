import { Logo } from "@/components/logo";

export const metadata = {
  title: "Politique de confidentialité — Adminds",
};

export default function PrivacyPolicyPage() {
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
            Politique de confidentialité
          </h1>
          <p className="text-sm text-zinc-400 mb-12">
            Dernière mise à jour : janvier 2026
          </p>

          <div className="prose prose-zinc max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-zinc-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-zinc-600 [&_li]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
            <p>
              La présente politique de confidentialité décrit nos pratiques
              concernant la collecte, l&apos;utilisation et la divulgation de vos
              informations lorsque vous utilisez le Service, et vous informe de
              vos droits en matière de vie privée et de la protection que la loi
              vous accorde.
            </p>
            <p>
              Nous utilisons vos données personnelles pour fournir et améliorer
              le Service. En utilisant le Service, vous acceptez la collecte et
              l&apos;utilisation de vos informations conformément à la présente
              politique de confidentialité.
            </p>

            <h2>Interprétation et définitions</h2>

            <h3>Interprétation</h3>
            <p>
              Les mots dont la première lettre est en majuscule ont la
              signification définie dans les conditions ci-dessous. Les
              définitions suivantes ont la même signification qu&apos;elles
              apparaissent au singulier ou au pluriel.
            </p>

            <h3>Définitions</h3>
            <p>Aux fins de la présente politique de confidentialité :</p>
            <ul>
              <li>
                <strong>Compte</strong> désigne un compte unique créé pour vous
                permettre d&apos;accéder à notre Service ou à des parties de notre
                Service.
              </li>
              <li>
                <strong>Société</strong> (désignée par « la Société », « Nous »,
                « Notre » ou « Nos » dans le présent accord) fait référence à
                Adminds, Genève, Suisse.
              </li>
              <li>
                <strong>Cookies</strong> sont de petits fichiers placés sur votre
                ordinateur, appareil mobile ou tout autre appareil par un site
                web, contenant les détails de votre historique de navigation sur
                ce site parmi ses nombreux usages.
              </li>
              <li>
                <strong>Pays</strong> fait référence à : la Suisse.
              </li>
              <li>
                <strong>Appareil</strong> désigne tout appareil pouvant accéder
                au Service, tel qu&apos;un ordinateur, un téléphone portable ou une
                tablette numérique.
              </li>
              <li>
                <strong>Données personnelles</strong> désigne toute information
                relative à une personne physique identifiée ou identifiable.
              </li>
              <li>
                <strong>Service</strong> fait référence au site web et à
                l&apos;application web Adminds.
              </li>
              <li>
                <strong>Prestataire de services</strong> désigne toute personne
                physique ou morale qui traite les données pour le compte de la
                Société.
              </li>
              <li>
                <strong>Données d&apos;utilisation</strong> désigne les données
                collectées automatiquement, générées par l&apos;utilisation du
                Service ou par l&apos;infrastructure du Service elle-même.
              </li>
              <li>
                <strong>Site web</strong> fait référence à Adminds :{" "}
                <a
                  href="https://www.adminds.ch"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  www.adminds.ch
                </a>
              </li>
              <li>
                <strong>Vous</strong> désigne la personne physique accédant ou
                utilisant le Service, ou la société ou toute autre entité
                juridique au nom de laquelle cette personne accède ou utilise le
                Service, selon le cas.
              </li>
            </ul>

            <h2>Collecte et utilisation de vos données personnelles</h2>

            <h3>Types de données collectées</h3>

            <h3>Données personnelles</h3>
            <p>
              Lors de l&apos;utilisation de notre Service, nous pouvons vous
              demander de nous fournir certaines informations personnellement
              identifiables pouvant être utilisées pour vous contacter ou vous
              identifier. Ces informations peuvent inclure, sans s&apos;y limiter :
            </p>
            <ul>
              <li>Adresse e-mail</li>
              <li>Nom et prénom</li>
              <li>Données de connexion (via Google OAuth)</li>
              <li>
                Documents médicaux téléchargés dans le cadre de la génération de
                rapports (dossiers patients, rapports existants)
              </li>
              <li>
                Rapports générés par le Service
              </li>
            </ul>
            <p>
              Lorsque vous visitez ou vous connectez à notre site web, nous
              utilisons des cookies et des technologies similaires pour collecter
              certaines informations sur votre visite. Cela inclut : (i) les{" "}
              <strong>données d&apos;utilisation</strong> (informations sur la
              manière dont vous utilisez notre site, telles que les pages
              visitées, le temps passé sur les pages et les liens cliqués) ;
              (ii) les <strong>informations sur l&apos;appareil</strong> (détails sur
              l&apos;appareil que vous utilisez pour accéder à notre site, y compris
              l&apos;adresse IP, le type de navigateur et le système
              d&apos;exploitation) ; et (iii) les{" "}
              <strong>données personnelles</strong> (si vous les fournissez, nous
              pouvons collecter des informations telles que votre adresse e-mail
              ou d&apos;autres coordonnées).
            </p>

            <h3>Données d&apos;utilisation</h3>
            <p>
              Les données d&apos;utilisation sont collectées automatiquement lors de
              l&apos;utilisation du Service. Elles peuvent inclure des informations
              telles que l&apos;adresse de protocole Internet de votre appareil
              (adresse IP), le type de navigateur, la version du navigateur, les
              pages de notre Service que vous visitez, la date et l&apos;heure de
              votre visite, le temps passé sur ces pages, les identifiants
              uniques d&apos;appareil et d&apos;autres données de diagnostic.
            </p>

            <h3>Technologies de suivi et cookies</h3>
            <p>
              Nous utilisons des cookies et des technologies de suivi similaires
              pour suivre l&apos;activité sur notre Service et stocker certaines
              informations.
            </p>

            <p>
              <strong>Types de cookies que nous utilisons :</strong>
            </p>
            <ul>
              <li>
                <strong>Cookies nécessaires / essentiels</strong> — Cookies de
                session administrés par nous. Ces cookies sont essentiels pour
                vous fournir les services disponibles via le site web et vous
                permettre d&apos;utiliser certaines de ses fonctionnalités. Ils
                aident à authentifier les utilisateurs et à prévenir
                l&apos;utilisation frauduleuse des comptes.
              </li>
              <li>
                <strong>Cookies d&apos;acceptation</strong> — Cookies persistants
                administrés par nous. Ces cookies identifient si les
                utilisateurs ont accepté l&apos;utilisation de cookies sur le site
                web.
              </li>
              <li>
                <strong>Cookies de fonctionnalité</strong> — Cookies persistants
                administrés par nous. Ces cookies nous permettent de mémoriser
                vos choix lors de votre utilisation du site web, tels que vos
                identifiants de connexion ou vos préférences linguistiques.
              </li>
            </ul>

            <h2>Utilisation de vos données personnelles</h2>
            <p>
              La Société peut utiliser les données personnelles aux fins
              suivantes :
            </p>
            <ul>
              <li>
                <strong>Fournir et maintenir notre Service</strong>, y compris
                surveiller l&apos;utilisation de notre Service.
              </li>
              <li>
                <strong>Gérer votre compte</strong> : gérer votre inscription en
                tant qu&apos;utilisateur du Service.
              </li>
              <li>
                <strong>Exécution d&apos;un contrat</strong> : le développement, la
                conformité et l&apos;exécution du contrat d&apos;achat pour les services
                que vous avez acquis.
              </li>
              <li>
                <strong>Vous contacter</strong> : vous contacter par e-mail
                concernant des mises à jour ou des communications informatives
                liées au Service.
              </li>
              <li>
                <strong>Gérer vos demandes</strong> : traiter et gérer vos
                demandes auprès de nous.
              </li>
              <li>
                <strong>Transferts d&apos;entreprise</strong> : nous pouvons utiliser
                vos informations pour évaluer ou effectuer une fusion, cession,
                restructuration ou autre vente ou transfert d&apos;actifs.
              </li>
              <li>
                <strong>Autres finalités</strong> : analyse de données,
                identification des tendances d&apos;utilisation et amélioration de
                notre Service.
              </li>
            </ul>

            <h2>Traitement des données médicales et IA</h2>
            <p>
              Adminds fournit des services d&apos;assistance à la rédaction de
              rapports médico-légaux via l&apos;intelligence artificielle. Voici
              comment nous traitons ces données :
            </p>
            <ul>
              <li>
                <strong>Traitement des documents</strong> : les documents
                médicaux que vous téléchargez sont traités par notre système
                d&apos;IA pour générer des rapports structurés conformes aux
                exigences légales.
              </li>
              <li>
                <strong>Stockage des données</strong> : vos documents et rapports
                sont stockés de manière sécurisée et chiffrée (Fernet), associés
                à votre compte.
              </li>
              <li>
                <strong>Analyse IA</strong> : nous utilisons l&apos;IA (basée sur les
                modèles d&apos;Anthropic) pour analyser les dossiers et générer des
                rapports. Vos données ne sont pas partagées avec des tiers, sauf
                dans la mesure nécessaire pour fournir le Service.
              </li>
              <li>
                <strong>Confidentialité médicale</strong> : nous sommes
                pleinement conscients de la nature sensible des données médicales
                traitées. Toutes les données de santé sont chiffrées au repos et
                en transit.
              </li>
              <li>
                <strong>Suppression des données</strong> : vous pouvez demander
                la suppression de vos données à tout moment en nous contactant.
              </li>
            </ul>

            <h2>Partage de vos informations personnelles</h2>
            <p>
              Nous pouvons partager vos informations personnelles dans les
              situations suivantes :
            </p>
            <ul>
              <li>
                <strong>Avec des prestataires de services</strong> : nous pouvons
                partager vos informations personnelles avec des prestataires de
                services pour surveiller et analyser l&apos;utilisation de notre
                Service.
              </li>
              <li>
                <strong>Pour des transferts d&apos;entreprise</strong> : nous pouvons
                partager ou transférer vos informations personnelles dans le
                cadre de toute fusion, vente d&apos;actifs de la Société, financement
                ou acquisition.
              </li>
              <li>
                <strong>Avec des affiliés</strong> : nous pouvons partager vos
                informations avec nos affiliés, auquel cas nous exigerons de ces
                affiliés qu&apos;ils respectent la présente politique de
                confidentialité.
              </li>
              <li>
                <strong>Avec votre consentement</strong> : nous pouvons divulguer
                vos informations personnelles à toute autre fin avec votre
                consentement.
              </li>
            </ul>

            <h2>Conservation de vos données personnelles</h2>
            <p>
              La Société conservera vos données personnelles uniquement aussi
              longtemps que nécessaire aux fins énoncées dans la présente
              politique de confidentialité. Nous conserverons et utiliserons vos
              données personnelles dans la mesure nécessaire pour nous conformer
              à nos obligations légales, résoudre les litiges et appliquer nos
              accords et politiques juridiques.
            </p>
            <p>
              La Société conservera également les données d&apos;utilisation à des
              fins d&apos;analyse interne. Les données d&apos;utilisation sont
              généralement conservées pour une période plus courte, sauf
              lorsqu&apos;elles sont utilisées pour renforcer la sécurité ou
              améliorer la fonctionnalité de notre Service.
            </p>

            <h2>Transfert de vos données personnelles</h2>
            <p>
              Vos informations, y compris les données personnelles, sont traitées
              dans les bureaux d&apos;exploitation de la Société et dans tout autre
              lieu où les parties impliquées dans le traitement sont situées.
              Cela signifie que ces informations peuvent être transférées et
              conservées sur des ordinateurs situés en dehors de votre canton,
              pays ou autre juridiction gouvernementale où les lois sur la
              protection des données peuvent différer de celles de votre
              juridiction.
            </p>
            <p>
              Votre consentement à la présente politique de confidentialité,
              suivi de votre soumission de ces informations, représente votre
              accord à ce transfert. La Société prendra toutes les mesures
              raisonnablement nécessaires pour s&apos;assurer que vos données sont
              traitées de manière sécurisée et conformément à la présente
              politique de confidentialité.
            </p>

            <h2>Suppression de vos données personnelles</h2>
            <p>
              Vous avez le droit de supprimer ou de demander que nous vous
              aidions à supprimer les données personnelles que nous avons
              collectées vous concernant. Notre Service peut vous donner la
              possibilité de supprimer certaines informations vous concernant
              depuis le Service.
            </p>
            <p>
              Vous pouvez mettre à jour, modifier ou supprimer vos informations
              à tout moment en vous connectant à votre compte, le cas échéant,
              et en accédant à la section des paramètres du compte. Vous pouvez
              également nous contacter pour demander l&apos;accès, la correction ou
              la suppression de toute information personnelle que vous nous avez
              fournie.
            </p>

            <h2>Divulgation de vos données personnelles</h2>

            <h3>Transactions commerciales</h3>
            <p>
              Si la Société est impliquée dans une fusion, acquisition ou vente
              d&apos;actifs, vos données personnelles peuvent être transférées. Nous
              vous informerons avant que vos données personnelles ne soient
              transférées et ne deviennent soumises à une politique de
              confidentialité différente.
            </p>

            <h3>Application de la loi</h3>
            <p>
              Dans certaines circonstances, la Société peut être tenue de
              divulguer vos données personnelles si la loi l&apos;exige ou en
              réponse à des demandes valides des autorités publiques.
            </p>

            <h3>Autres exigences légales</h3>
            <p>
              La Société peut divulguer vos données personnelles en croyant de
              bonne foi qu&apos;une telle action est nécessaire pour :
            </p>
            <ul>
              <li>Se conformer à une obligation légale</li>
              <li>
                Protéger et défendre les droits ou la propriété de la Société
              </li>
              <li>
                Prévenir ou enquêter sur d&apos;éventuels actes répréhensibles en
                lien avec le Service
              </li>
              <li>
                Protéger la sécurité personnelle des utilisateurs du Service ou
                du public
              </li>
              <li>Se protéger contre la responsabilité juridique</li>
            </ul>

            <h2>Sécurité de vos données personnelles</h2>
            <p>
              La sécurité de vos données personnelles est importante pour nous.
              Nous utilisons le chiffrement Fernet pour les données sensibles au
              repos et le protocole HTTPS pour toutes les communications. Cependant,
              aucune méthode de transmission sur Internet ni aucune méthode de
              stockage électronique n&apos;est sûre à 100 %. Bien que nous nous
              efforcions d&apos;utiliser des moyens commercialement acceptables pour
              protéger vos données personnelles, nous ne pouvons garantir leur
              sécurité absolue.
            </p>

            <h2>Protection des mineurs</h2>
            <p>
              Notre Service ne s&apos;adresse pas aux personnes de moins de 18 ans.
              Nous ne collectons pas sciemment d&apos;informations personnellement
              identifiables auprès de personnes de moins de 18 ans. Si vous êtes
              parent ou tuteur et que vous savez que votre enfant nous a fourni
              des données personnelles, veuillez nous contacter.
            </p>

            <h2>Contact</h2>
            <p>
              Si vous avez des questions concernant la présente politique de
              confidentialité, vous pouvez nous contacter :
            </p>
            <ul>
              <li>
                Par e-mail :{" "}
                <a
                  href="mailto:contact@adminds.ch"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  contact@adminds.ch
                </a>
              </li>
            </ul>
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
