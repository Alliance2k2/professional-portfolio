export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  synthetic?: boolean;
  label?: string;
};

export const projectImages: Record<string, ProjectImage[]> = {
  'cs-ircfs': [
    {
      src: '/projects/cs-ircfs-landing.webp',
      width: 1270,
      height: 650,
      alt: 'CS-IRCFS public landing page introducing community reporting and irrigation decision support.',
      caption:
        'Original landing-page excerpt, 24 November 2026. Contextual imagery is illustrative, not verified pilot-site photography.',
      synthetic: true,
    },
    {
      src: '/projects/cs-ircfs-district-map.webp',
      width: 1462,
      height: 702,
      alt: 'District map displaying the Bugesera area, basemap controls and evidence-layer selectors.',
      caption:
        'Candidate-supplied district-map screenshot, 26 November 2026. Layer counts do not establish verified field coverage.',
      label: 'Interface screenshot',
    },
  ],
  'cs-evidence-assistant': [
    {
      src: '/projects/cs-assistant-workspace.webp',
      width: 950,
      height: 595,
      alt: 'CS Assistant document workspace with suggested questions, source controls and a message input.',
      caption:
        'Original CS-IRCFS assistant workspace, 20 November 2026. The interface explicitly shows that AI is not connected; this is not evidence of a generated answer.',
      label: 'Prototype interface',
    },
  ],
  'financial-stability-africa': [
    {
      src: '/projects/financial-crisis-countries.webp',
      width: 1080,
      height: 720,
      alt: 'Stacked bars comparing historical systemic, banking, currency and inflation crisis-years across African countries.',
      caption:
        'Original project chart: historical crisis frequency by country, 1860–2014. Observation coverage varies by country.',
      label: 'Original analysis',
    },
    {
      src: '/projects/financial-crisis-models.webp',
      width: 700,
      height: 600,
      alt: 'ROC curves comparing logistic regression, random forest and gradient boosting for systemic crisis classification.',
      caption:
        'Saved model-comparison chart. The code uses a stratified random 75/25 split, not country-held-out or chronological validation; these are not validated forecasting scores.',
    },
  ],
  'malaria-functional-analysis': [
    {
      src: '/projects/malaria-national-curves.webp',
      width: 1440,
      height: 900,
      alt: 'Modeled national malaria incidence trajectories for Burundi, Kenya, Rwanda, Tanzania and Uganda from 2000 to 2024.',
      caption:
        'Original aggregate research figure from the local manuscript package. National incidence is modeled, not a count of verified individual cases.',
      label: 'Research under review',
    },
    {
      src: '/projects/malaria-regional-estimates.webp',
      width: 1440,
      height: 810,
      alt: 'Regional Rwanda child microscopy positivity estimates across three survey waves with available uncertainty intervals.',
      caption:
        'Original aggregate survey research figure. Three survey waves support descriptive comparisons; survey documentation and ethics review remain unresolved. No individual survey records are shown.',
    },
  ],
  'arrowstack-identity': [
    {
      src: '/projects/arrowstack-identity-overview.webp',
      width: 1662,
      height: 898,
      alt: 'Arrowstack Identity signed-in overview showing the account role, profile access and session status.',
      caption:
        'Candidate-supplied application screenshot, 26 November 2026. Signed-in account overview showing role, profile access and session status. Desktop taskbar cropped out.',
      label: 'Application screenshot',
    },
    {
      src: '/projects/identity-architecture.svg',
      width: 1200,
      height: 675,
      alt: 'Conceptual flow from a React client through Express and Prisma to PostgreSQL account and session records.',
      caption:
        'Architecture illustration based on the inspected repository README. This is a diagram, not an application screenshot.',
      label: 'Architecture diagram',
    },
  ],
  'arrowstack-task-manager': [
    {
      src: '/projects/arrowstack-task-manager.webp',
      width: 1303,
      height: 857,
      alt: 'Arrowstack Task Manager with task-status summary cards, a new-task form, search and priority filters, and an empty task list.',
      caption:
        'Candidate-supplied application screenshot, 26 November 2026. The workspace is empty: zero tasks demonstrate the initial state, not measured productivity results.',
      label: 'Application screenshot',
    },
  ],
  'last-mile-logistics': [
    {
      src: '/projects/logistics-delivery-states.webp',
      width: 1800,
      height: 900,
      alt: 'Bar chart ranking Brazilian customer states by late-delivery rate, with an 8.1 percent national reference line.',
      caption:
        'Original Olist project export: late-delivery rates by customer state. Missing actual delivery timestamps are excluded from the delivered-order analysis.',
      label: 'Original analysis',
    },
    {
      src: '/projects/logistics-review-scores.webp',
      width: 1050,
      height: 750,
      alt: 'Average customer review scores for on-time, late and super-late orders: 4.29, 3.46 and 1.79 out of five.',
      caption:
        'Original project export: mean review scores by delivery status. The association does not establish that delays caused the score differences.',
    },
  ],
  'production-optimization': [
    {
      src: '/projects/production-method.svg',
      width: 1200,
      height: 675,
      alt: 'Method diagram linking labor, capital and resource constraints to CES or Cobb-Douglas models and Lagrange or KKT optimization.',
      caption:
        'Method illustration from the supplied project brief. Original empirical charts are unavailable; no estimated results are represented.',
      label: 'Method illustration',
    },
  ],
};
