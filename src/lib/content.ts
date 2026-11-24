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
  category: string;
  status: string;
  summary: string;
  tags: string[];
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
    title: 'Community evidence. Better decisions.',
    category: 'Data systems',
    status: 'Working prototype',
    summary:
      'CS-IRCFS: a citizen science and agricultural monitoring platform for Bugesera, Rwanda.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'React'],
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
    title: 'Answers grounded in sources.',
    category: 'Applied AI',
    status: 'CS-IRCFS prototype',
    summary:
      'CS Assistant: role-aware retrieval-augmented answers with citations and an auditable document workflow.',
    tags: ['Python', 'FastAPI', 'React', 'BM25', 'RAG'],
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
    title: 'Signals of financial instability.',
    category: 'Data science',
    status: 'Completed analytics project',
    summary:
      'An interactive analysis of banking, currency, inflation and systemic crises across African economies.',
    tags: ['Python', 'scikit-learn', 'Streamlit', 'Machine learning'],
    problem:
      'Explore how economic conditions relate to financial crises across countries and time.',
    method:
      'Integrated 1,059 country-year observations from 13 African countries across 1860–2014 and compared logistic regression, random forest and gradient boosting.',
    implementation:
      'The CV describes a Streamlit dashboard for interactive crisis-risk exploration. The source repository and dashboard have not been supplied for independent implementation review.',
    results:
      'The CV reports up to 0.89 ROC-AUC. The precise model, validation procedure and test split behind that result require review of the original report before interpreting it as predictive performance.',
    limitations:
      'Underlying notebook, dataset provenance, model-level scores, validation design, dashboard screenshots and reproducibility materials have not been supplied.',
    source:
      'Supplied CV, July–August 2026. Reported dataset and model results are not independently verified.',
  },
  {
    slug: 'malaria-functional-analysis',
    title: 'Understanding malaria through time.',
    category: 'Research',
    status: 'Master’s research',
    summary:
      'Functional Data Analysis of malaria incidence, exploring temporal dynamics, seasonality and regional variation.',
    tags: ['R', 'Functional Data Analysis', 'Statistics'],
    problem:
      'Study patterns in malaria incidence over time and across regions rather than considering each observation in isolation.',
    method:
      'Functional Data Analysis. The supplied brief identifies B-spline smoothing, functional derivatives, principal components and clustering; the final thesis is needed to verify the exact analysis pipeline.',
    implementation:
      'The CV confirms the research topic and temporal, seasonal and regional scope. Code, figures and the thesis manuscript have not been supplied.',
    results:
      'Research topic verified against the CV. No numerical findings or publication status are asserted.',
    limitations:
      'Thesis PDF, reproducible code, figures and publication information are awaiting review.',
    source:
      'Supplied CV; methodological detail from the development brief is explicitly awaiting thesis verification.',
  },
  {
    slug: 'arrowstack-identity',
    title: 'Identity with accountability built in.',
    category: 'Software engineering',
    status: 'Portfolio implementation',
    summary:
      'A role-based authentication microservice with a React demonstration interface.',
    tags: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'React'],
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
    slug: 'last-mile-logistics',
    title: 'From delivery data to operational insight.',
    category: 'Analytics',
    status: 'Completed project',
    summary:
      'Last-mile logistics delivery performance and customer satisfaction analysis using the Brazilian Olist dataset.',
    tags: ['Python', 'SQL', 'Streamlit'],
    problem:
      'Understand delivery performance and the relationship between delivery timing and customer satisfaction.',
    method:
      'Relational data integration, cleaning, validation and feature engineering.',
    implementation:
      'An operational KPI dashboard developed May–June 2026, as recorded in the CV.',
    results:
      'Dashboard and analysis confirmed by the CV. No business improvement metrics or public demonstration are available.',
    limitations:
      'Repository, screenshots and detailed findings have not been supplied.',
    source: 'Supplied CV and project dataset description in the brief.',
  },
  {
    slug: 'production-optimization',
    title: 'A mathematical lens on production.',
    category: 'Research',
    status: 'Project described in brief',
    summary: 'Production optimization with CES and Cobb–Douglas functions.',
    tags: ['Optimization', 'Econometrics', 'Statistics'],
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
export const research = [
  {
    slug: 'malaria',
    title: 'Functional Data Analysis of Malaria Incidence',
    status: 'Master’s research',
    description:
      'Temporal dynamics, seasonality and regional variation in malaria incidence.',
    body: 'Research recorded in the AIMS Rwanda MSc entry in the supplied CV. The thesis manuscript and publication details have not been supplied. No DOI, citation, or publication status is inferred.',
    project: '/projects/malaria-functional-analysis',
  },
  {
    slug: 'citizen-science',
    title: 'Citizen science for agricultural resilience',
    status: 'Ongoing research',
    description:
      'Community evidence, agricultural monitoring and accountable information systems.',
    body: 'As a Citizen Science Research Fellow at AIMS Rwanda, Alliance coordinates community-based agricultural research and feedback. The CV also documents a CS Assistant prototype using BM25 retrieval, citations and permissions before retrieval. Optional provider adapters are implemented in that separate project; this portfolio assistant uses deterministic local search.',
    project: '/projects/cs-ircfs',
  },
];
export const interests = [
  'Agricultural data science',
  'Public health analytics',
  'Citizen science',
  'Machine learning',
  'Geospatial analytics',
  'Sustainable development',
];
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
