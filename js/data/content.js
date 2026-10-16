/* =====================================================================
   CONTENT — edit text and data here. No layout or styling in this file.
   Source of truth: Paulo_Coelho_Resume.txt. Keep this file aligned with it.
   ===================================================================== */
const NOW=new Date(), NOW_Y=NOW.getFullYear()+NOW.getMonth()/12;

const CONTENT = {

  /* Boot screen lines (shown once per visit) */
  bootLines: ['PAULO COELHO · GLOBAL IT PROJECT & PMO LEADER','> Experience ......................... 20+ YEARS','> PMO governance & delivery .......... READY',
    '> Portfolio: 21 projects · 11 countries READY','> AI implementation .................. ACTIVE','> Certifications: PMP · PSM I',
    '> Welcome.'],

  /* Rotating line under the hero text */
  heroRotator: ['> PMO Leadership & Governance','> AI Implementation & AI SDLC','> Global IT Project Delivery','> Business Transformation & Change Management','> Agile, Hybrid & Waterfall Delivery'],

  /* Example suggestions typed into the contact "details" field */
  contactPlaceholders: ['Briefly describe the role or project…','e.g. Senior IT Project Manager role in Ottawa','e.g. Build or restructure a PMO','e.g. Lead a company-wide AI implementation'],

  /* Email that receives messages from the contact form */
  email: 'prlcjobs@proton.me',

  /* LinkedIn profile */
  linkedin: 'https://www.linkedin.com/in/paulocoelho-pm',

  /* Experience timeline. s/e = start/end as decimal years; b = bullet points shown in the brief.
     Listed oldest → newest; the page shows newest first. now: true marks the current role. */
  missions: [
 {co:'HSBC Bank Corporation',role:'Business Development Analyst → Executive Trainee',loc:'Curitiba, Brazil',per:'2006 – 2007',s:2006,e:2008,
  sum:'Business Development Analyst (2006) and Executive Trainee (2006 – 2007).',b:[]},
 {co:'ExxonMobil',role:'Business Analyst → Software Architect / Team Leader → Project Coordinator',loc:'Curitiba, Brazil',per:'2007 – 2010',s:2007,e:2011,
  sum:'Business Analyst (2007 – 2008), Software Architect / Team Leader (2008 – 2010), Project Coordinator (2010).',b:[]},
 {co:'Volvo Trucks',role:'IT Software Architect → Architect & BA Team Leader',loc:'Curitiba, Brazil, and Gothenburg, Sweden',per:'2010 – 2012',s:2010,e:2013,
  sum:'IT Software Architect (2010) and Architect & BA Team Leader (2010 – 2012).',b:[]},
 {co:'Volvo Construction Equipment North America',role:'Process & IT Business Analyst · Operational Development Consultant',loc:'Shippensburg, PA, USA',per:'2012 – 2014',s:2012,e:2015,
  sum:'Process & IT Business Analyst (2012 – 2014) and Operational Development Consultant (2012 – 2014).',b:[]},
 {co:'Organizational Change Management Consulting',role:'Founder / Owner',loc:'Curitiba, Brazil',per:'2015 – 2017',s:2015,e:2017.67,
  sum:'Founder and owner of an organizational change management consulting practice.',b:[]},
 {co:'T-Systems',role:'Head of Global PLM',loc:'Blumenau, Brazil',per:'Sep 2017 – Jun 2018',s:2017.67,e:2018.5,
  sum:'Directed 300 professionals across 13 service delivery streams with an annual budget of approximately €10 million.',
  b:['Managed global PLM service delivery, projects, processes, resources, and operational performance.','Designed and standardized PLM delivery processes across LATAM operations.',
     'Served as the expert point of contact for projects and processes within the global organization.','Increased portfolio ROI by approximately 7% in Q1 2018.',
     'Improved customer satisfaction from 2.1 to 4.7/5 through the Operational Development program.']},
 {co:'Cinco',role:'Activation Producer / IT Functional Manager',loc:'Montreal, QC',per:'Aug 2018 – Dec 2018',s:2018.58,e:2019,
  sum:'Directed major projects and managed the IT delivery team.',
  b:['Restructured processes, tools, methodologies, and operating practices.','Introduced Jira and Agile across the IT organization.','Provided strategic consulting and delivery guidance to company leadership.']},
 {co:'HCL — at Pratt & Whitney Canada',role:'PLM Manager / Group Project Manager',loc:'Longueuil, QC',per:'Feb 2019 – Oct 2019',s:2019.08,e:2019.75,
  sum:'Managed PLM support services and project delivery while liaising with executives, project managers, business owners, and technical teams.',
  b:['Restructured teams and processes to improve operational efficiency and service delivery.','Implemented Scrum, automated reporting, live dashboards, and structured patch-delivery scheduling.',
     'Improved First Contact Resolution from 68% to 94%.','Improved Mean Time to Resolution (MTTR) within SLA from 78% to 92%.',
     'Initiated an AI chat project to improve customer support and service delivery.']},
 {co:'Jesta IS',role:'Senior IT Project Manager / PMO Head',loc:'Montreal, QC',per:'Oct 2019 – Apr 2020',s:2019.75,e:2020.33,
  sum:'Led the Project Management Office and transformed project governance and delivery practices.',
  b:['Restructured PMO processes and integrated Project Managers, Business Analysts, and Account Managers.','Established project management standards, governance, prioritization, workload management, and Agile delivery practices.',
     'Mentored PMO members and trained Account Managers, Software Architects, DBAs, and Business Analysts.',
     'Managed two business-critical projects through stakeholder alignment, contract renegotiation, milestone restructuring, and delivery improvements.',
     'Improved software development, testing, release management, and deployment processes.']},
 {co:'Le Cordon Bleu Ottawa',role:'Global Project Manager',loc:'Ottawa, ON',per:'Sep 2020 – May 2021',s:2020.67,e:2021.38,
  sum:'Managed a program of 21 concurrent IT and business projects across 11 countries.',
  b:['Managed projects including website transformation, alumni financial systems, CMS migration to HubSpot, digital certification, and other enterprise initiatives.',
     'Developed and implemented an Agile delivery methodology.',
     'Managed project priorities, requirements, dependencies, risks, schedules, deliverables, and stakeholder expectations across multiple countries and time zones.',
     'Restructured IT software delivery processes and project management practices.','Implemented and configured Azure DevOps, SharePoint, MS Project, MS Teams, Power Automate, and Power BI.',
     'Developed reporting and dashboards to improve project visibility and management decision-making.','Guided and mentored project managers across the international organization.']},
 {co:'Insight Global — at Ford Motor Company',role:'Senior Project Manager',loc:'Ottawa, ON',per:'May 2021 – Jul 2023',s:2021.38,e:2023.58,
  sum:'Led a highly confidential R&D program for Apple Enhanced CarPlay, coordinating Ford business, IT, engineering, and external technology partners.',
  b:['Managed complex software and hardware dependencies across Ford and external suppliers.',
     'Coordinated requirements, technical dependencies, deliverables, risks, issues, and project priorities across multiple organizations.',
     'Directed multidisciplinary engineering teams and facilitated cross-functional issue resolution.','Managed stakeholder and supplier relationships across Ford and external technology partners.',
     'Maintained controlled project documentation, including contracts, NDAs, confidentiality agreements, requirements, and project artifacts.',
     'Coordinated delivery within a highly confidential environment subject to strict information-access controls.']},
 {co:'Syntronic — at Gentex',role:'Senior Project Manager',loc:'Kanata, ON',per:'Mar 2024 – Jun 2025',s:2024.17,e:2025.5,
  sum:'Oversaw embedded software and systems engineering projects supporting major automotive OEM technology.',
  b:['Led software and systems engineering projects using SDLC and V-Model delivery frameworks.','Managed project scope, requirements, schedules, dependencies, risks, issues, and deliverables.',
     'Coordinated software and systems engineering stakeholders throughout project delivery.',
     'Supported technical issue resolution, project governance, and delivery planning for complex automotive technology.']},
 {co:'Plantum',role:'Transformation Portfolio Manager',loc:'Curitiba and São Paulo, Brazil (Remote)',per:'Aug 2025 – Present',s:2025.58,e:Math.max(2025.75,NOW_Y),now:true,
  sum:'Guided the PMO implementation strategy and currently lead the company-wide AI implementation.',
  b:['Guided stakeholders in developing their project methodology.','Reorganized the AI and IT group into value-driven project and R&D teams.',
     'Created the PMO team and refocused efforts on value-delivery projects.']}
],

  /* Scrolling list: companies in the experience portfolio */
  companies: ['PLANTUM','SYNTRONIC','GENTEX','INSIGHT GLOBAL','FORD MOTOR COMPANY','LE CORDON BLEU','JESTA IS','HCL','PRATT & WHITNEY CANADA','CINCO','T-SYSTEMS','VOLVO CONSTRUCTION EQUIPMENT','VOLVO TRUCKS','EXXONMOBIL','HSBC'],

  /* Toolset hexagons */
  tools: ['AI SDLC','Azure DevOps','Jira','MS Project','Power BI','Power Automate','SharePoint','MS Teams','Agile','Scrum','Waterfall','V-Model','SDLC','ITIL'],

  /* Globe markers: [label, latitude, longitude]. The first one is "home" (arcs start there). */
  places: [['Ottawa',45.42,-75.70],['Montreal',45.50,-73.57],['Shippensburg',40.05,-77.52],['Curitiba',-25.43,-49.27],['Blumenau',-26.92,-49.07],['São Paulo',-23.55,-46.63],['Gothenburg',57.71,11.97]],

  /* Countries outlined on the globe — names must match keys in js/data/geo.js */
  countriesWorkedIn: ['Canada','United States','Brazil','Sweden']
};
