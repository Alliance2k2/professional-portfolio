import { projectImages, type ProjectImage } from './project-images';

export const profile = {
  name: 'Irigenera Alliance',
  location: 'Kigali, Rwanda',
  headline: 'Data Science Professional | Data Systems, Applied AI & RAG',
  email: 'alliance.irigenera@aims.ac.rw',
  github: 'https://github.com/Alliance2k2',
  linkedin: 'https://www.linkedin.com/in/alliance-irigenera',
  summary:
    'Data science professional and Citizen Science Research Fellow at AIMS Rwanda, with an MSc in Mathematical Sciences specializing in Data Science. I build Python and SQL workflows, APIs, dashboards and evidence-grounded applications that connect rigorous research with practical decisions.',
};
export const experience = [
  {
    title: 'Full Stack Development Intern',
    organization: 'Arrowstack Technologies',
    date: 'November 2026–Present',
    detail:
      'Remote, part-time. Developing assigned full-stack projects with API integration, relational data, validation and role-based workflows. Maintaining version-controlled code and technical documentation.',
  },
  {
    title: 'Citizen Science Research Fellow',
    organization: 'AIMS Rwanda · Knowledge Technology Transfer',
    date: 'July 2026–Present',
    detail:
      'Designing and coordinating community-based agricultural research. Planning community engagement and research feedback with communities, AIMS and government stakeholders.',
  },
  {
    title: 'Data Science Intern',
    organization: 'National Bank of Rwanda',
    date: 'July 2024',
    detail:
      'Exploratory credit-data analysis in Python; Consumer Price Index analysis, inflation calculations and GDP sector analysis in Excel.',
  },
];
export const education = [
  {
    title: 'MSc in Mathematical Sciences',
    organization: 'AIMS Rwanda',
    date: 'June 2026',
    detail:
      'Specialization in Data Science. Research: Functional Data Analysis of Malaria Incidence — temporal dynamics, seasonality and regional variation.',
  },
  {
    title: 'BSc in Mathematics',
    organization: 'University of Rwanda · College of Science and Technology',
    date: 'October 2025',
    detail:
      'Specialization in Statistics. Mathematical optimization, statistical modeling and econometrics.',
  },
];
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  summary: string;
  tags: string[];
  technologies?: string[];
  duration?: string;
  contribution?: string;
  objectives?: string[];
  architecture?: { stage: string; detail: string }[];
  architectureSource?: string;
  gallery?: ProjectImage[];
  liveDemo?: { href: string; label: string };
  technicalChallenges?: string[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
  problem: string;
  method: string;
  implementation: string;
  results: string;
  limitations: string;
  repo?: string;
  source: string;
};
export const projects: Project[] = [
  {
    slug: 'cs-ircfs',
    title: 'Community Science & Irrigation Monitoring Platform',
    subtitle: 'Community evidence. Better decisions.',
    category: 'Data systems',
    status: 'Working prototype',
    summary:
      'CS-IRCFS: a citizen science and agricultural monitoring platform for Bugesera, Rwanda.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'React'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'React'],
    objectives: [
      'Collect community agricultural reports, including from phones without internet.',
      'Turn validated reports into traceable district-level review and decision workflows.',
    ],
    contribution:
      'The CV records Alliance’s citizen-science research work; the repository documents the platform. A task-by-task contribution breakdown is not available in the reviewed materials.',
    architecture: [
      { stage: 'Community reports', detail: 'USSD and SMS field submissions' },
      { stage: 'Message gateway', detail: 'Africa’s Talking delivery' },
      { stage: 'Application API', detail: 'FastAPI validation and workflows' },
      { stage: 'Spatial data', detail: 'PostgreSQL and PostGIS' },
      { stage: 'Review', detail: 'District dashboards and case workflows' },
    ],
    architectureSource:
      'Architecture summarized from the inspected public repository README.',
    gallery: [
      ...projectImages['cs-ircfs'],
      {
        src: '/projects/cs-ircfs-dashboard.jpg',
        width: 1440,
        height: 900,
        alt: 'CS-IRCFS Bugesera District decision-support dashboard showing example reports and irrigation metrics.',
        caption:
          'District decision-support dashboard from the public CS-IRCFS repository.',
        synthetic: true,
      },
      {
        src: '/projects/cs-ircfs-trends.jpg',
        width: 1440,
        height: 900,
        alt: 'CS-IRCFS trends screen with example report, rainfall, case and harvest charts.',
        caption: 'Trends view from the public CS-IRCFS repository.',
        synthetic: true,
      },
      {
        src: '/projects/cs-ircfs-monthly-report.jpg',
        width: 1440,
        height: 1100,
        alt: 'CS-IRCFS monthly report with example agriculture and irrigation summaries.',
        caption: 'Monthly report view from the public CS-IRCFS repository.',
        synthetic: true,
      },
    ],
    technicalChallenges: [
      'The repository documents duplicate-delivery handling for USSD and SMS messages, where retries can otherwise create repeated reports.',
      'The local demonstration path and production PostgreSQL/PostGIS path have different storage requirements.',
    ],
    problem:
      'Bring community field reports into traceable agricultural and irrigation decisions, including reporting from phones without internet.',
    method:
      'Validated REST APIs, relational data models, geospatial workflows and role- and area-based access.',
    implementation:
      'The inspected repository documents USSD/SMS reporting, duplicate delivery handling, district dashboards, audited case workflows, aggregate public reporting and local SQLite demonstrations. PostgreSQL/PostGIS supports deployment.',
    results:
      'Implemented prototype workflows are documented in the repository. No field-impact measurements or live service claims are made here.',
    limitations:
      'Official evidence approval, field acceptance, telecom credentials and hosted verification remain pending. Sample screenshots in the source repository contain invented demonstration data.',
    repo: 'https://github.com/Alliance2k2/cs-ircfs-platform',
    source: 'CV and repository README inspected 24 November 2026.',
  },
  {
    slug: 'cs-evidence-assistant',
    gallery: projectImages['cs-evidence-assistant'],
    title: 'Evidence-Grounded Assistant for Field Teams',
    subtitle: 'Answers grounded in sources.',
    category: 'Applied AI',
    status: 'CS-IRCFS prototype',
    summary:
      'CS Assistant: role-aware retrieval-augmented answers with citations and an auditable document workflow.',
    tags: ['Python', 'FastAPI', 'React', 'BM25', 'RAG'],
    technologies: ['Python', 'FastAPI', 'React', 'BM25', 'RAG'],
    contribution:
      'The supplied CV records this assistant prototype within CS-IRCFS. The linked repository documents its retrieval, citations and access-control approach; detailed individual ownership has not been independently reviewed.',
    objectives: [
      'Help authorized staff find guidance in approved documents.',
      'Return source-linked answers and abstain when supported material is unavailable.',
    ],
    problem:
      'Help authorized staff find practical information in approved documents, with visible citations and access checks.',
    method:
      'Lexical BM25 retrieval and document chunking, with role and sector permissions applied before source retrieval.',
    implementation:
      'The CV records an assistant prototype with optional OpenAI Responses and Ollama adapters, prompt-injection guards, citation validation, local fallback, chat, source versioning and approval, index recovery and audit trails.',
    results:
      'The CV reports an evaluation of 64 engineering-labeled queries and Recall@3 of 0.83. It also records tests for citations, abstention and source permissions. These figures are self-reported and have not been independently rerun for this portfolio.',
    limitations:
      'Evaluation data, code and test reports should be reviewed before external use of the reported measurement. Provider-backed generation is optional and belongs to the CS-IRCFS project. This portfolio assistant is a separate deterministic local search tool.',
    repo: 'https://github.com/Alliance2k2/cs-ircfs-platform',
    source:
      'Supplied CV, with details corroborated by the inspected CS-IRCFS repository README on 24 November 2026.',
  },
  {
    slug: 'financial-stability-africa',
    gallery: projectImages['financial-stability-africa'],
    repo: 'https://github.com/Alliance2k2/African-Financial-Crises-Analysis',
    title: 'Financial Stability Analysis Across African Economies',
    subtitle: 'Signals of financial instability.',
    category: 'Data science',
    status: 'Completed analytics project',
    summary:
      'An interactive analysis of banking, currency, inflation and systemic crises across African economies.',
    tags: ['Python', 'scikit-learn', 'Streamlit', 'Machine learning'],
    technologies: ['Python', 'scikit-learn', 'Streamlit', 'Machine learning'],
    duration: 'July–August 2026',
    objectives: [
      'Explore how macroeconomic indicators relate to observed financial crises across countries and years.',
      'Compare classification approaches using the evaluation described in the CV.',
    ],
    contribution:
      'The CV describes the country-year analysis and model comparison. The project repository and local analysis package provide original charts, notebook outputs and Streamlit dashboard code.',
    futureImprovements: [
      'Review the original notebook, data provenance and validation design before interpreting the reported ROC-AUC.',
    ],
    problem:
      'Explore how economic conditions relate to financial crises across countries and time.',
    method:
      'Integrated 1,059 country-year observations from 13 African countries across 1860–2014 and compared logistic regression, random forest and gradient boosting.',
    implementation:
      'The inspected project contains exploratory charts, an executed notebook, classifier comparison code and a Streamlit dashboard for interactive crisis-risk exploration.',
    results:
      'Original country-level crisis charts and saved ROC curves are available below. Model code uses a stratified random 75/25 train/test split; saved scores describe this historical classification exercise, not validated future forecasting.',
    limitations:
      'The analysis has not been independently rerun here. Country and temporal dependence are not held out, and contemporaneous crisis indicators limit early-warning interpretation. A saved dashboard screenshot is unavailable.',
    source:
      'CV, public African-Financial-Crises-Analysis repository and local analysis package inspected 26 November 2026.',
  },
  {
    slug: 'malaria-functional-analysis',
    gallery: projectImages['malaria-functional-analysis'],
    repo: 'https://github.com/Alliance2k2/my_thesis',
    title: 'Functional Data Analysis of Malaria Incidence',
    subtitle: 'Understanding malaria through time.',
    category: 'Research',
    status: 'Master’s research',
    summary:
      'Functional Data Analysis of malaria incidence, exploring temporal dynamics, seasonality and regional variation.',
    tags: ['R', 'Functional Data Analysis', 'Statistics'],
    technologies: ['R', 'Functional Data Analysis', 'Statistics'],
    contribution:
      'The CV identifies this as Alliance’s MSc research. The local thesis and revised manuscript package contain the aggregate research figures presented below; publication and review status remain separate.',
    objectives: [
      'Examine temporal patterns, seasonality and regional variation in malaria incidence.',
    ],
    futureImprovements: [
      'Add an approved thesis abstract, verified methods, figures and public-safe download after manuscript review.',
    ],
    problem:
      'Study patterns in malaria incidence over time and across regions rather than considering each observation in isolation.',
    method:
      'Penalized B-spline smoothing, functional derivatives, clustering and sensitivity checks for national modeled incidence; survey-weighted regional positivity estimates and exploratory functional principal components for three Rwanda survey waves.',
    implementation:
      'R analysis using fda, survey and ggplot2, with aggregate figures and a maintained manuscript package. The national modeled-incidence analysis and regional child microscopy-positivity analysis use distinct outcomes.',
    results:
      'Original national trajectory and regional estimate figures are shown below. The work is research under review; no publication acceptance or causal intervention effect is asserted.',
    limitations:
      'The manuscript is not cleared for journal submission. Ethics determination, survey-denominator/subsample documentation and full isolated dependency restoration remain unresolved. Three regional waves support descriptive profiles rather than continuous transmission dynamics.',
    source:
      'CV and local My_Thesis aggregate manuscript figures and review documentation inspected 26 November 2026. Public repository content may lag the local review package.',
  },
  {
    slug: 'arrowstack-identity',
    gallery: projectImages['arrowstack-identity'],
    title: 'Role-Based Identity & Authentication Microservice',
    subtitle: 'Identity with accountability built in.',
    category: 'Software engineering',
    status: 'Portfolio implementation',
    summary:
      'A role-based authentication microservice with a React demonstration interface.',
    tags: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'React'],
    technologies: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'React'],
    architecture: [
      { stage: 'Web client', detail: 'React demonstration interface' },
      { stage: 'API', detail: 'TypeScript and Express' },
      { stage: 'Data access', detail: 'Prisma ORM' },
      { stage: 'Database', detail: 'PostgreSQL account and session records' },
    ],
    architectureSource:
      'High-level architecture summarized from the inspected public repository README.',
    objectives: [
      'Support validated account registration and role-based access.',
      'Make refresh-token rotation, replay detection and revocation traceable.',
    ],
    problem:
      'Provide validated account registration and controlled access with traceable session behavior.',
    method:
      'A TypeScript/Express API, relational PostgreSQL models managed by Prisma, and a React client.',
    implementation:
      'The inspected README documents Argon2id passwords, JWT authentication, rotating refresh-token families, replay detection, revocation, ADMIN access controls, browser origin checks and audit records.',
    results:
      'Implementation and verification procedures are available in the source repository. This portfolio has not independently rerun that project’s tests.',
    limitations:
      'No independent penetration test or production-readiness claim. Deployment requires separate migration and restricted runtime roles.',
    repo: 'https://github.com/Alliance2k2/arrowstack-auth-microservice',
    source: 'CV and repository README inspected 24 November 2026.',
  },
  {
    slug: 'arrowstack-task-manager',
    title: 'Arrowstack Task Management System',
    subtitle: 'Clear priorities. Steady progress.',
    category: 'Software engineering',
    status: 'Portfolio implementation',
    summary:
      'A private task workspace with status summaries, priorities, deadlines, search and account ownership controls.',
    tags: ['React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL'],
    gallery: projectImages['arrowstack-task-manager'],
    objectives: [
      'Give each signed-in user a private workspace for creating and organizing tasks.',
      'Make task status, priority and deadlines easy to review without exposing other users’ records.',
    ],
    problem:
      'Keep personal tasks organized while enforcing account ownership throughout the application.',
    method:
      'A React interface backed by a TypeScript/Express API, Prisma data models and PostgreSQL. Ownership checks scope task operations; stale concurrent edits return a conflict response.',
    implementation:
      'The repository documents task creation, editing and deletion, status and priority filters, deadline tracking, search, pagination and account summaries. Authentication patterns were adapted from the separate Arrowstack identity project.',
    results:
      'The supplied screenshot shows the implemented initial workspace, including summary cards, task creation and filtering controls. Zero task counts describe the empty account, not a performance benchmark.',
    limitations:
      'No productivity improvement or production deployment is claimed. Team sharing, reminders, password reset, email verification and MFA are outside the documented implementation.',
    repo: 'https://github.com/Alliance2k2/arrowstack-task-management-system',
    source:
      'Public repository README previously inspected and candidate-supplied application screenshot dated 26 November 2026.',
  },
  {
    slug: 'last-mile-logistics',
    gallery: projectImages['last-mile-logistics'],
    repo: 'https://github.com/Alliance2k2/amalitech',
    title: 'Last-Mile Delivery Performance Analytics',
    subtitle: 'From delivery data to operational insight.',
    category: 'Analytics',
    status: 'Completed project',
    summary:
      'Last-mile logistics delivery performance and customer satisfaction analysis using the Brazilian Olist dataset.',
    tags: ['Python', 'SQL', 'Streamlit'],
    technologies: ['Python', 'SQL', 'Streamlit'],
    duration: 'May–June 2026',
    contribution:
      'The project repository documents the Olist delivery audit, a Streamlit KPI dashboard and product-category risk analysis, with original chart exports and aggregate summary tables.',
    objectives: [
      'Explore delivery performance and its relationship to customer satisfaction.',
    ],
    problem:
      'Understand delivery performance and the relationship between delivery timing and customer satisfaction.',
    method:
      'Relational data integration, cleaning, validation and feature engineering.',
    implementation:
      'The inspected amalitech repository contains a reproducible notebook, original chart exports and a Streamlit dashboard that reads aggregate summaries. Reviews are aggregated to one row per order before joining.',
    results:
      'The aggregate tables contain 96,476 delivered orders, of which 7,827 were late or super late (8.1%). Mean review scores are 4.29/5 for on-time orders and 1.79/5 for super-late orders. Original charts are shown below.',
    limitations:
      'Missing actual delivery dates are excluded from delivered-order analysis. Descriptive associations do not establish causality or achieved business improvement; the full raw-data analysis has not been independently rerun here.',
    source:
      'CV, public amalitech repository and downloaded original charts and aggregate tables inspected 26 November 2026.',
  },
  {
    slug: 'production-optimization',
    gallery: projectImages['production-optimization'],
    title: 'Production Optimization with Economic Functions',
    subtitle: 'A mathematical lens on production.',
    category: 'Research',
    status: 'Project described in brief',
    summary: 'Production optimization with CES and Cobb–Douglas functions.',
    tags: ['Optimization', 'Econometrics', 'Statistics'],
    technologies: ['Optimization', 'Econometrics', 'Statistics'],
    objectives: [
      'Study how constrained inputs affect production under CES and Cobb–Douglas functions.',
    ],
    problem: 'Explore how constrained resources shape production output.',
    method:
      'The project brief identifies Lagrange multipliers, KKT conditions and statistical estimation.',
    implementation:
      'Included from the supplied development brief. The CV does not provide implementation artifacts for this project.',
    results: 'No numerical results are available for verification.',
    limitations:
      'Report, code, dates and academic affiliation require supporting material.',
    source: 'User-supplied development brief; additional verification pending.',
  },
];
export const skills = [
  {
    title: 'Data science & statistics',
    items: [
      'Python',
      'R',
      'Pandas',
      'NumPy',
      'scikit-learn',
      'Time series',
      'Functional Data Analysis',
      'Mathematical optimization',
    ],
    evidence: '/projects/malaria-functional-analysis',
  },
  {
    title: 'Data systems & engineering',
    items: [
      'SQL',
      'PostgreSQL',
      'SQLAlchemy',
      'FastAPI',
      'Prisma',
      'Data validation',
      'Database migrations',
    ],
    evidence: '/projects/cs-ircfs',
  },
  {
    title: 'Applied AI & retrieval',
    items: [
      'BM25',
      'Document chunking',
      'Citation validation',
      'Retrieval evaluation',
      'Optional LLM adapters',
    ],
    evidence: '/research/citizen-science',
  },
  {
    title: 'Software & visualization',
    items: [
      'TypeScript',
      'React',
      'REST APIs',
      'Git',
      'Streamlit',
      'Power BI',
      'Excel',
      'Matplotlib',
      'Seaborn',
      'ggplot2',
    ],
    evidence: '/projects/arrowstack-identity',
  },
];
export const development = [
  ['Data Science — Advanced (DTP)', 'MINICT', 'July 2025'],
  [
    'Rwanda School on Internet Governance',
    'Professional development',
    'June 2025',
  ],
  ['Business Management', 'iiAfrica · ESMT Berlin & AWB Canada', 'July 2026'],
  [
    'A-PIC Summer School: Probability, Information, Computing',
    'JLU Giessen & AIMS Rwanda',
    'July–August 2026',
  ],
  [
    'School on Arithmetic, Geometry and Algorithms',
    'ICTP / Addis Ababa University',
    'August 2026',
  ],
];
export type ResearchItem = {
  slug: string;
  title: string;
  status: string;
  description: string;
  body: string;
  project: string;
  abstract?: string;
  methodology?: string[];
  equations?: { label: string; tex: string }[];
  figures?: ProjectImage[];
  download?: { href: string; label: string };
  citation?: { apa?: string; bibtex?: string };
  publicationStatus?: string;
  materialsNote?: string;
  researchInterests?: string[];
};
export const research: ResearchItem[] = [
  {
    slug: 'malaria',
    title: 'Functional Data Analysis of Malaria Incidence',
    status: 'Master’s research',
    description:
      'Temporal dynamics, seasonality and regional variation in malaria incidence.',
    body: 'MSc research examining national modeled malaria incidence in five East African countries during 2000–2024 and exploratory regional child microscopy positivity in Rwanda across three survey waves. These are distinct outcomes. The local revised manuscript package provides the aggregate figures shown here; the work remains under review.',
    project: '/projects/malaria-functional-analysis',
    figures: projectImages['malaria-functional-analysis'],
    methodology: [
      'Penalized B-spline smoothing and functional derivatives for national trajectories.',
      'Integrated-distance clustering and smoothing sensitivity analysis.',
      'Survey-weighted regional child positivity estimates and exploratory functional principal components.',
    ],
    publicationStatus:
      'Research under review; not cleared for journal submission.',
    materialsNote:
      'Selected aggregate figures are available here. Ethics determination, survey-denominator/subsample documentation and full isolated dependency restoration remain unresolved. No individual-level survey records or public manuscript download are included.',
    researchInterests: [
      'Functional data analysis',
      'Malaria incidence',
      'Temporal statistics',
    ],
  },
  {
    slug: 'citizen-science',
    title: 'Citizen science for agricultural resilience',
    status: 'Ongoing research',
    description:
      'Community evidence, agricultural monitoring and accountable information systems.',
    body: 'As a Citizen Science Research Fellow at AIMS Rwanda, Alliance coordinates community-based agricultural research and feedback. The CV also documents a CS Assistant prototype using BM25 retrieval, citations and permissions before retrieval. Optional provider adapters are implemented in that separate project; this portfolio assistant uses deterministic local search.',
    project: '/projects/cs-ircfs',
    figures: projectImages['cs-ircfs'],
    publicationStatus: 'Ongoing research; no publication status supplied.',
    materialsNote:
      'No reviewed abstract, research report or downloadable manuscript has been supplied for this portfolio.',
    researchInterests: [
      'Citizen science',
      'Agricultural resilience',
      'Evidence-grounded systems',
    ],
  },
];
export const professionalInterests = [
  'Agricultural data science',
  'Public health analytics',
  'Citizen science',
  'Machine learning',
  'Geospatial analytics',
  'Financial analytics',
  'Sustainable development',
];
export const personalInterests = ['Baking'];
export const interests = [...professionalInterests, ...personalInterests];
export const routes = [
  'about',
  'experience',
  'education',
  'projects',
  'research',
  'skills',
  'certifications',
  'blog',
  'resume',
  'contact',
  'privacy',
];
