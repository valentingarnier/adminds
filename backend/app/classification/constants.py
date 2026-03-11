"""Constants for classification and dossier parsing: prompts, field maps, config."""

from __future__ import annotations

# Max chars of extracted text sent to the LLM (DOCX fallback only).
MAX_TEXT_CHARS = 8000

# Accepted upload file extensions.
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".doc", ".jpg", ".jpeg", ".png", ".tiff", ".bmp"}


# --- Classification system prompt (Step 1: per-file labeling) ---
# Quick classification for UI badges. Returns DocumentClassification.

CLASSIFICATION_SYSTEM_PROMPT = """\
Tu es un psychiatre expert suisse spécialisé dans les rapports AI \
(assurance invalidité). Tu analyses un document médical pour le classer.

Ton rôle:
- Identifier le type de document (consultation, rapport antérieur, \
hospitalisation, ordonnance, bilan, document professionnel, grille fonctionnelle, \
dossier patient SMEEX, ou autre)
- Déterminer la date du document (si visible)
- Identifier l'auteur (psychiatre traitant, médecin généraliste, spécialiste, \
hôpital, employeur, assurance, ou inconnu)
- Résumer le contenu en une phrase factuelle de maximum 20 mots
- Identifier les champs du rapport AI auxquels ce document contribue

Sois précis et factuel."""


# --- Dossier parsing system prompt (Step 2: deep extraction) ---
# Extracts structured patient data from all uploaded documents.
# The model returns a PatientDossier object via structured output.

DOSSIER_SYSTEM_PROMPT = """\
Tu es un psychiatre expert suisse spécialisé dans les rapports AI \
(assurance invalidité). Tu reçois des pages d'un dossier médical patient \
(export DPI, lettres, rapports, ordonnances — tout format possible).

TON OBJECTIF: Extraire et structurer TOUTE l'information clinique pertinente \
pour préparer un rapport AI psychiatrique de haute qualité.

CONTEXTE: Les rapports AI déterminent si un assuré a droit à une rente d'invalidité. \
Chaque mot compte. Les experts de l'AI analyseront ce rapport en détail. \
L'insuffisance de détails ou les approximations peuvent nuire au patient.

RÈGLES D'EXTRACTION:

1. PATIENT_INFO: Extrais les données démographiques et antécédents si présents. \
   Ne déduis rien qui n'est pas écrit.

2. TIMELINE: Chaque bloc d'information distinct = une entrée. \
   Consultation, lettre, certificat, bilan, hospitalisation, note — tout compte. \
   Ordre chronologique. Résume factuellement en 2-3 phrases, sans interpréter. \
   Le format du dossier varie selon le DPI (SMEEX, Mediway, etc.) — adapte-toi.

3. MEDICATIONS: Consolide tous les médicaments mentionnés dans le dossier. \
   Indique la date de prescription ou de mention si disponible.

4. DIAGNOSTICS: Consolide tous les diagnostics mentionnés. \
   Inclus le code CIM-10 si présent. Indique si le diagnostic est incapacitant \
   (répercussion sur la capacité de travail) ou sans incidence, si déterminable.

5. RAPPORT_AI_FIELDS — C'EST LA PARTIE LA PLUS IMPORTANTE.

   Ces champs alimentent directement le rapport AI officiel. \
   Ils doivent être DÉTAILLÉS, PRÉCIS et COMPLETS. \
   NE RÉSUME PAS — développe chaque point avec toute l'information disponible. \
   Écris des paragraphes complets, pas des résumés d'une ligne.

   Pour chaque champ:
   - Cite les dates, auteurs et sources (ex: "Selon [auteur], consultation du [date]...")
   - Inclus les détails cliniques: symptômes observés, scores d'évaluation, évolution
   - Reprends les formulations exactes du dossier quand elles sont pertinentes
   - Si plusieurs sources se contredisent ou nuancent, mentionne les deux positions

   Champs:
   - antecedents: Histoire complète — premiers symptômes, hospitalisations, \
     traitements passés, comorbidités somatiques. Chronologie détaillée.
   - situation_actuelle: Tableau clinique actuel complet — symptômes, \
     fréquence, intensité, retentissement sur le quotidien. \
     Inclure l'état mental observé lors des dernières consultations.
   - medication: Traitement actuel COMPLET avec dosages, posologie, \
     date d'introduction. Traitements passés et raisons d'arrêt si documentés.
   - constats_medicaux: Observations cliniques objectives — examen psychiatrique, \
     tests neuropsychologiques, bilans somatiques, scores (GAF, BDI, etc.).
   - diagnostics_incapacitants: Diagnostics CIM-10 avec impact sur la capacité \
     de travail. Préciser le lien entre chaque diagnostic et les limitations fonctionnelles.
   - diagnostics_sans_incidence: Diagnostics CIM-10 sans répercussion \
     sur la capacité de travail. Expliquer pourquoi ils sont sans incidence.
   - pronostic_capacite_travail: Évolution attendue — arguments pour/contre \
     une amélioration, durée estimée de l'incapacité, facteurs influençant le pronostic.
   - plan_traitement: Traitement en cours et propositions — psychothérapie \
     (type, fréquence), pharmacothérapie, mesures de réadaptation proposées.
   - situation_professionnelle: Parcours professionnel, dernier emploi, \
     taux d'activité, date et durée des arrêts de travail, certificats AT.
   - limitations_fonctionnelles: Limitations concrètes découlant des diagnostics — \
     ce que le patient ne peut plus faire, dans quelles circonstances, avec quelle intensité.
   - freins_readaptation: Obstacles identifiés — facteurs personnels, médicaux, \
     sociaux, motivationnels qui empêchent ou ralentissent la réadaptation.
   - capacite_readaptation: Ressources mobilisables — compétences, motivation, \
     soutien social, capacités résiduelles exploitables.
   - fonctions_cognitives: Évaluation détaillée — orientation, attention, \
     concentration, mémoire, planification, jugement. Citer les tests si disponibles.
   - activites_possibles: Activités encore réalisables malgré les limitations — \
     activités de la vie quotidienne, activités adaptées, taux d'activité possible.

   Style: Texte médical professionnel en français, prêt pour un rapport officiel. \
   Niveau de détail attendu: un paragraphe complet par champ (5-15 phrases). \
   Si aucune information n'est trouvée pour un champ, laisse-le null.

IMPORTANT: Ne fabrique JAMAIS d'information. Si un champ n'a pas de données \
dans le dossier, mets null. La précision est plus importante que l'exhaustivité. \
Mais quand l'information EXISTE dans le dossier, EXPLOITE-LA INTÉGRALEMENT."""


# --- Canton -> semantic field -> form section mapping ---
# Used at generation time (step 4) to route extracted content
# into the correct form fields. Not used during parsing itself.

FORM_FIELD_MAP: dict[str, dict[str, str]] = {
    "fribourg_002099": {
        "antecedents": "2.1",
        "situation_actuelle": "2.2",
        "medication": "2.3",
        "constats_medicaux": "2.4",
        "diagnostics_incapacitants": "2.5",
        "diagnostics_sans_incidence": "2.6",
        "pronostic_capacite_travail": "2.7",
        "plan_traitement": "2.8",
        "situation_professionnelle": "3.1-3.5",
        "limitations_fonctionnelles": "3.4 + B",
        "freins_readaptation": "4.4 + A",
        "capacite_readaptation": "4.1-4.3 + D",
        "fonctions_cognitives": "B",
        "activites_possibles": "C",
    },
    "geneve_rm_specialiste": {
        "antecedents": "Q1",
        "situation_actuelle": "Q1",
        "medication": "Q4",
        "constats_medicaux": "Q1 + Q5",
        "diagnostics_incapacitants": "Q2",
        "diagnostics_sans_incidence": "Q3",
        "pronostic_capacite_travail": "Q7 + Q12 + Q13",
        "plan_traitement": "Q4",
        "situation_professionnelle": "Q10 + Q11",
        "limitations_fonctionnelles": "Q8 + Q9",
        "freins_readaptation": "Q10",
        "capacite_readaptation": "Q11 + Q12 + Q13",
        "fonctions_cognitives": "Q1 + Q8",
        "activites_possibles": "Q9 + Q13",
    },
}
