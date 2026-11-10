/* =====================================================================
   CONTENT — edit text and data here. No layout or styling in this file.
   Source of truth: master resume copy. Keep this file aligned with it.
   ===================================================================== */
const NOW=new Date(), NOW_Y=NOW.getFullYear()+NOW.getMonth()/12;

const CONTENT = {

  /* Boot screen lines (shown once per visit) */
  bootLines: ['PAULO · AI & TECHNOLOGY GOVERNANCE','> Experience ......................... 20+ YEARS','> Application Portfolio Management ... READY',
    '> IT & AI governance ................. READY','> Generative AI implementation ....... ACTIVE','> Certifications: PMP · PSM I',
    '> Welcome.'],

  /* Rotating line under the hero text */
  heroRotator: ['> AI Governance & Agentic AI','> Application Portfolio Management','> IT Governance & Technology Standards','> Operating Models & KPIs','> PMO Leadership & Executive Reporting'],

  /* Example suggestions typed into the contact "details" field */
  contactPlaceholders: ['Briefly describe the role or project…','e.g. IT or AI governance role in Ottawa','e.g. Application portfolio rationalization','e.g. Lead a company-wide AI implementation'],

  /* Email that receives messages from the contact form */
  email: 'prlcjobs@proton.me',

  /* LinkedIn profile */
  linkedin: 'https://www.linkedin.com/',

  /* Experience timeline. s/e = start/end as decimal years; b = bullet points shown in the brief.
     Listed oldest → newest; the page shows newest first. now: true marks the current role. */
  missions: [
 {co:'HSBC',role:'IT Intern → Business Development Analyst (HSBC Insurance) → Executive Trainee',loc:'Curitiba, Brazil',per:'2003 – 2007',s:2003,e:2007.5,
  sum:'Started in financial services: IT intern, then Business Development Analyst at HSBC Insurance, then Executive Trainee.',
  b:['Executive Trainee (Credit, MME/SME, 2006): analyzed SOx implementation feasibility and impact; Six Sigma project to shorten checking-account opening time.',
     'Business Development Analyst, HSBC Insurance: coordinated the insurance stream of the Customer Annual Financial Report project, redesigning information flow into the bank CRM.',
     'Delivered a process change saving R$300K+.']},
 {co:'ExxonMobil',role:'Business Analyst → Software Architect / Team Lead → Project Coordinator',loc:'Curitiba, Brazil',per:'2007 – 2010',s:2007.5,e:2010.5,
  sum:'Business analysis, software architecture and project coordination.',
  b:['Managed the Application Portfolio Management project: retired non-standard local applications and migrated their processes and workflows to global standard applications.',
     'Procurement Quality Auditor on a 7-analyst audit-quality team.','Built automation that cut three analysts\' manual effort by more than 50%.']},
 {co:'Volvo Trucks',role:'IT Software Architect → Architect & BA Team Leader → Business Architect',loc:'Brazil and Sweden',per:'2010 – 2012',s:2010.5,e:2012.4,
  sum:'Software and business architecture for the Volvo Group.',
  b:['Latin America representative on the Global Application Development Techniques team, which defined IT methodologies, tools and technology standards for the Volvo Group.',
     'Coordinated the Brazilian part of the newly formed code center.']},
 {co:'Volvo Construction Equipment North America',role:'Operational Development Consultant · Process & IT Business Analyst',loc:'Shippensburg, PA, USA',per:'2012 – 2014',s:2012.4,e:2015,
  sum:'Operational development, process and IT business analysis.',
  b:['Business Analyst, Systems Analyst and Project Manager for the Microsoft Dynamics implementation at Volvo Construction Equipment Americas, working directly with C-level executives.']},
 {co:'Organizational Change Management Consulting',role:'Founder / Principal Consultant',loc:'Curitiba, Brazil',per:'2015 – 2017',s:2015,e:2017.67,
  sum:'Founded and ran a consultancy guiding organizations through strategy, change management and transformation.',
  b:['Structured the R&D and Professional Services organizations at a SaaS company.',
     'Account Manager / Project Manager for Electrolux, Tupperware and the Union of Elementary School Teachers of Greater Curitiba, completing the implementation of a proprietary corporate training delivery service.']},
 {co:'T-Systems',role:'Head of Global PLM',loc:'Blumenau, Brazil',per:'Sep 2017 – Jun 2018',s:2017.67,e:2018.5,
  sum:'Directed 13 service-delivery streams with an annual budget of about €10M.',
  b:['Standardized PLM delivery processes across Latin America.','Designed and implemented a self-managed team model with rotating responsibilities.',
     'Improved customer satisfaction from 2.1 to 4.7 out of 5, ahead of the Indian and Chinese support centers.','Increased portfolio ROI by approximately 7% in Q1 2018.']},
 {co:'Cinco',role:'Activation Producer / IT Functional Manager',loc:'Montreal, QC',per:'Aug 2018 – Dec 2018',s:2018.58,e:2019,
  sum:'Restructured IT processes and tools.',
  b:['Introduced Jira and Agile across the IT organization.']},
 {co:'HCL — at Pratt & Whitney Canada',role:'PLM Manager / Group Project Manager',loc:'Longueuil, QC',per:'Feb 2019 – Oct 2019',s:2019.08,e:2019.75,
  sum:'Managed PLM support services and project delivery; reported portfolio performance quarterly to the COO and CTO.',
  b:['Improved First Contact Resolution from 68% to 94%.','Improved resolution within SLA from 78% to 92%.',
     'Implemented Scrum, automated reporting, live dashboards and structured patch-delivery scheduling.','Initiated an AI chat project for customer support.']},
 {co:'Jesta IS',role:'Senior IT Project Manager / PMO Head',loc:'Montreal, QC',per:'Oct 2019 – Apr 2020',s:2019.75,e:2020.33,
  sum:'Restructured PMO governance, prioritization and standards.',
  b:['Changes covered Project Managers, Business Analysts, Account Managers, Software Architects and DBAs.',
     'Recovered major POS implementations for CANEX and Harry Rosen through stakeholder alignment and contract renegotiation.']},
 {co:'Le Cordon Bleu',role:'Global Project Manager',loc:'Ottawa, ON',per:'Sep 2020 – May 2021',s:2020.67,e:2021.38,
  sum:'Governed a portfolio of 21 concurrent IT and business initiatives across 11 countries, including CMS migration to HubSpot and financial systems.',
  b:['Established governance: approval workflows, quality reviews, project audits, stage gates and delivery controls.',
     'Implemented Azure DevOps, SharePoint, Power Automate and Power BI dashboards.','Presented portfolio status to senior executives.']},
 {co:'Insight Global — at Ford Motor Company',role:'Senior Project Manager / Scrum Master',loc:'Ottawa, ON',per:'May 2021 – Jul 2023',s:2021.38,e:2023.58,
  sum:'Led a confidential Apple Enhanced CarPlay R&D program under strict information-access controls.',
  b:['Managed technical dependencies and partner relationships with Apple, Google, BlackBerry, Qualcomm, Cinemo and Infineon.']},
 {co:'Syntronic — at Gentex',role:'Senior Project Manager, Software and Systems',loc:'Kanata, ON',per:'Mar 2024 – Jun 2025',s:2024.17,e:2025.5,
  sum:'Coordinated about 13 technical resources across software, embedded, systems, architecture, testing, hardware and electrical engineering.',
  b:['Governed delivery under SDLC and V-Model frameworks.','Reported status, risks and dependencies to Toyota\'s program manager.']},
 {co:'Plantum',role:'Transformation Portfolio Manager',loc:'Brazil (Remote)',per:'Aug 2025 – Aug 2026',s:2025.58,e:2026.58,
  sum:'Joined Plantum in August 2025 as Transformation Portfolio Manager. Promoted to CTO & COO in August 2026.',
  b:['Designed the PMO strategy and operating model, created the PMO team and refocused the portfolio on value-delivery projects.','Reorganized the AI and IT group into value-driven project and R&D teams.']},
 {co:'Plantum',role:'Chief Technology Officer & Chief Operating Officer',loc:'Brazil (Remote)',per:'Aug 2026 – Present',s:2026.58,e:Math.max(2026.75,NOW_Y),now:true,
  sum:'Promoted from Transformation Portfolio Manager in August 2026. Leads the company-wide generative AI implementation, including use-case selection, prioritization by business value, team structure and adoption.',
  b:['Manages the AI project portfolio and leads a confidential AI R&D program for monitoring large forestry areas.']},
 {co:'AI Agent Designer and Operator (Independent)',role:'GitHub: prlcdev',loc:'Ottawa, ON',per:'2026 – Present',s:2026,e:Math.max(2026.25,NOW_Y),now:true,
  sum:'Designed, version-controls in GitHub and operates a multi-step AI agent (Claude skill) that drafts, verifies and publishes professional content.',
  b:['Built AI governance into the agent: explicit human approval before publishing, no credential access, source verification of every quote, a limit of one run per week and a run log for auditability.',
     'Used AI-assisted development to build and deploy this modular, multi-theme website on GitHub Pages.']}
],

  /* Scrolling list: companies in the experience portfolio */
  companies: ['PLANTUM','SYNTRONIC','GENTEX','INSIGHT GLOBAL','FORD MOTOR COMPANY','LE CORDON BLEU','JESTA IS','HCL','PRATT & WHITNEY CANADA','CINCO','T-SYSTEMS','VOLVO CONSTRUCTION EQUIPMENT','VOLVO TRUCKS','EXXONMOBIL','HSBC'],

  /* Toolset hexagons */
  tools: ['APM','Generative AI','Agentic AI','Claude','GitHub','Azure DevOps','Jira','Power BI','Power Automate','SharePoint','MS Project','Microsoft 365','Agile','Scrum','SDLC','V-Model'],

  /* Globe markers: [label, latitude, longitude]. The first one is "home" (arcs start there). */
  places: [['Ottawa',45.42,-75.70],['Montreal',45.50,-73.57],['Shippensburg',40.05,-77.52],['Curitiba',-25.43,-49.27],['Blumenau',-26.92,-49.07],['São Paulo',-23.55,-46.63],['Gothenburg',57.71,11.97],['Toronto',43.65,-79.38]],

  /* Countries outlined on the globe — names must match keys in js/data/geo.js */
  countriesWorkedIn: ['Canada','United States','Brazil','Sweden']
};
