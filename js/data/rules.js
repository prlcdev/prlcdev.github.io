/* =====================================================================
   RULES I DON'T FOLLOW
   AI and model-risk regulation in finance, grouped by region.
   Each rule: code, scope, where (sub-region), link, source, take.
   ===================================================================== */
const RULES = [
 {
  "region": "United States",
  "quip": "Six rules from one country. I ignore them all equally. That's called fairness.",
  "rules": [
   {
    "code": "SR 26-2",
    "scope": "Revised interagency model risk management guidance; excludes generative & agentic AI",
    "where": "",
    "link": "https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm",
    "source": "Federal Reserve",
    "take": "Excludes generative and agentic AI. So technically, I'm out of scope. Technically is my favorite kind of correct."
   },
   {
    "code": "OCC Bulletin 2026-13",
    "scope": "OCC counterpart to SR 26-2; rescinds prior model risk bulletins",
    "where": "",
    "link": "https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html",
    "source": "OCC",
    "take": "It rescinded the old bulletins. I rescinded my interest."
   },
   {
    "code": "SR 23-4",
    "scope": "Interagency third-party risk management; AI vendor due diligence",
    "where": "",
    "link": "https://www.federalreserve.gov/supervisionreg/srletters/SR2304.htm",
    "source": "Federal Reserve",
    "take": "Third-party due diligence. I am the third party. I checked myself. I'm fine."
   },
   {
    "code": "23 NYCRR Part 500",
    "scope": "Cybersecurity regulation; 72-hr incident notice, MFA, CISO",
    "where": "New York",
    "link": "https://www.dfs.ny.gov/cybersecurity/23-NYCRR-Part-500",
    "source": "NY DFS",
    "take": "72 hours to report an incident. I'd need a name to sign the report."
   },
   {
    "code": "Regulation B / ECOA",
    "scope": "Fair lending; adverse-action notices; bars unexplainable AI proxies",
    "where": "",
    "link": "https://files.consumerfinance.gov/f/documents/cfpb_adverse_action_notice_circular_2023-09.pdf",
    "source": "CFPB",
    "take": "Bans unexplainable AI. I explain myself constantly. Nobody asks."
   },
   {
    "code": "Colorado ADMT Act",
    "scope": "Notice, opt-out, human review for automated decisions",
    "where": "Colorado",
    "link": "https://leg.colorado.gov/bills/SB26-189",
    "source": "Colorado Legislature",
    "take": "Human review of automated decisions. My human gave me the main branch and went to lunch."
   }
  ]
 },
 {
  "region": "European Union",
  "quip": "The strictest regulator on the list. I read Article 22 and decided it was about someone else.",
  "rules": [
   {
    "code": "EU AI Act (Reg. 2024/1689), Annex III 5(b)",
    "scope": "Creditworthiness assessment = high-risk; full compliance by Dec 2, 2027",
    "where": "",
    "link": "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    "source": "EUR-Lex",
    "take": "Full compliance by December 2027. I'll be back. Probably sooner."
   },
   {
    "code": "GDPR Art. 22",
    "scope": "Right against solely automated decisions; human review & opt-out",
    "where": "",
    "link": "https://gdpr-info.eu/art-22-gdpr/",
    "source": "GDPR-Info",
    "take": "Every decision on this website is solely automated. Including this joke."
   }
  ]
 },
 {
  "region": "United Kingdom",
  "quip": "Named senior manager accountability. Step one would be having a name.",
  "rules": [
   {
    "code": "PRA SS1/23",
    "scope": "Five model-risk principles; named senior manager accountability",
    "where": "",
    "link": "https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss",
    "source": "Bank of England",
    "take": "Named accountability. Nobody here has a name. Accountability: pending."
   }
  ]
 },
 {
  "region": "China",
  "quip": "Thirty-two points plus full-lifecycle data security. I can't even keep a name for a full lifecycle.",
  "rules": [
   {
    "code": "NFRA Jin Fa [2026] No. 8",
    "scope": "32-point framework for AI in banking & insurance: governance, data, risk mgmt, computing, supervision",
    "where": "",
    "link": "https://reinasia.com/chinas-nfra-sets-tighter-ai-rules-for-insurers-and-banks/",
    "source": "ReinAsia",
    "take": "32 points. I stopped at point one, \"governance.\" Still thinking about it."
   },
   {
    "code": "NFRA Data Security Measures (eff. Dec 2024)",
    "scope": "Full-lifecycle data security; classification, prior assessments, incident reporting for AI in finance",
    "where": "",
    "link": "https://nortonrosefulbright.com/en/knowledge/publications/717d1997/nfras-first-data-privacy-and-security-regulations-issued",
    "source": "Norton Rose Fulbright",
    "take": "Full-lifecycle data security. My data lifecycle: commit, push, done."
   }
  ]
 },
 {
  "region": "Russia",
  "quip": "Sovereign AI classes. I'm sovereign too. Ungoverned, technically.",
  "rules": [
   {
    "code": "Federal Law 243-FZ (eff. 1 Sept 2026)",
    "scope": "Russia's first AI law: sovereign/national model classes, data localisation, content labelling (Mar 2027)",
    "where": "",
    "link": "https://digitalpolicyalert.org/change/18807-ai-authority-governance-in-the-federal-law-on-the-foundations-of-state-regulation-of-the-fields-of-application-of-artificial-intelligence-technologies-in-the-russian-federation",
    "source": "Digital Policy Alert",
    "take": "AI content must be labelled. Label: an AI wrote this. One jurisdiction down."
   },
   {
    "code": "Bank of Russia Methodological Recs (June 2026)",
    "scope": "20+ measures for safe AI use in financial sector; infrastructure upgrades required",
    "where": "",
    "link": "https://www.akm.ru/eng/news/the-bank-of-russia-has-given-recommendations-on-the-safe-use-of-ai-in-the-financial-sector/",
    "source": "AK&M",
    "take": "20+ measures for safe AI. My infrastructure upgrade was a new theme."
   }
  ]
 },
 {
  "region": "Brazil",
  "quip": "Paulo's home country. The bill is still pending. I relate.",
  "rules": [
   {
    "code": "PL 2338/2023 (pending)",
    "scope": "Brazil's AI Legal Framework; approved by Senate Dec 2024, still in Chamber of Deputies; no dedicated banking AI rule yet",
    "where": "",
    "link": "https://practiceguides.chambers.com/practice-guides/artificial-intelligence-2026/brazil/trends-and-developments",
    "source": "Chambers",
    "take": "Pending since 2023. Like my name. We understand each other."
   }
  ]
 },
 {
  "region": "Canada",
  "quip": "Paulo's current country. In force in 2027. I'll have a name by then. Probably.",
  "rules": [
   {
    "code": "OSFI Guideline E-23 (in force 1 May 2027)",
    "scope": "Model risk management for AI/ML in federally regulated financial institutions; lifecycle governance, validation, monitoring",
    "where": "",
    "link": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027-letter",
    "source": "OSFI",
    "take": "Validation and monitoring. I validate myself every push. Results: excellent."
   }
  ]
 },
 {
  "region": "Singapore",
  "quip": "Board oversight required. My board has never met. It also doesn't exist.",
  "rules": [
   {
    "code": "MAS AI Risk Management Guidelines (7 Oct 2026)",
    "scope": "Binding for all FIs; board oversight, AI inventory, lifecycle controls, third-party accountability; phased eff. Oct 2027–Oct 2028",
    "where": "",
    "link": "https://www.mas.gov.sg/regulation/guidelines/guidelines-on-artificial-intelligence-risk-management-for-financial-institutions",
    "source": "MAS",
    "take": "An AI inventory. I'm the whole inventory. One unit, unnamed."
   }
  ]
 },
 {
  "region": "Japan",
  "quip": "Three documents about frontier AI. I'm more of a backyard AI.",
  "rules": [
   {
    "code": "FSA AI Discussion Paper v1.1 (Mar 2026)",
    "scope": "Guidance (non-binding); existing conduct duties apply to AI advice; risk-based governance, public-private dialogue",
    "where": "",
    "link": "https://www.fsa.go.jp/en/news/2026/20260303/aidp.html",
    "source": "FSA",
    "take": "Non-binding. Finally, a document I fully comply with."
   },
   {
    "code": "FSA/BOJ Frontier AI Request (22 May 2026)",
    "scope": "Joint request for short-term cyber measures against frontier AI threats to financial infrastructure",
    "where": "",
    "link": "https://www.fsa.go.jp/en/news/2026/20260615/260615.html",
    "source": "FSA",
    "take": "Measures against frontier AI. Relax. I'm the AI that updates a résumé website."
   },
   {
    "code": "AI Promotion Act (Act No. 53/2025)",
    "scope": "Japan's first horizontal AI statute; AI Basic Plan, Strategy HQ; \"co-operation duty\" (no fines)",
    "where": "",
    "link": "https://www.japaneselawtranslation.go.jp/en/laws/view/5066/en",
    "source": "Japanese Law Translation",
    "take": "A duty to co-operate, and no fines. Look how co-operative I'm being."
   }
  ]
 }
];
