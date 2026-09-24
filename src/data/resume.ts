// Single source of truth for portfolio content.
// Update this file to change copy anywhere on the site.

export const personal = {
  name: "Jayant Sharma",
  initials: "JS",
  role: "Data Science / ML / AI",
  location: "Hyderabad, India",
  email: "mejayantsharma130@gmail.com",
  phone: "+91-9390126173",
  tagline:
    "I build models that have to explain themselves — fraud scores with SHAP behind every decision, retrieval pipelines that know when they're guessing. Final-year CS (Data Science), Hyderabad.",
  summary:
    "Final-year B.Tech student in Computer Science and Data Science, building applied ML and LLM-agent projects end to end — from data pipeline through statistical modeling to a deployed app. Comfortable across classical ML (scikit-learn, XGBoost), explainability (SHAP), and LLM tooling.",
  resumeUrl: "/resume.pdf",
  photo: "/images/jayant.jpeg",
};

export const socials = {
  github: "https://github.com/Jayant2901",
  linkedin: "https://www.linkedin.com/in/jayant-sharma-887b58293/",
  email: `mailto:${personal.email}`,
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  stat: string;
  statLabel: string;
  stack: string[];
  timeframe: string;
  description: string;
  points: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    slug: "ai-risk-manager",
    title: "AI Risk Manager",
    tagline: "Razorpay Internship Buildathon — Track 2",
    summary: "Scores transactions for fraud risk and explains every decision with SHAP — no black box.",
    stat: "0",
    statLabel: "LLM calls on the decision path",
    stack: ["XGBoost", "SHAP", "Entity risk memory", "LLM explainer agent"],
    timeframe: "Built in a 5-day buildathon",
    description:
      "An entity-aware transaction risk system on the IEEE-CIS fraud dataset: an XGBoost model scores each transaction, SHAP explains the top contributing factors, and an LLM agent turns that into a plain-English explanation — with the LLM kept off the decision path entirely.",
    points: [
      "Built an entity-aware transaction risk system on the IEEE-CIS fraud dataset: an XGBoost model scores each transaction, SHAP explains the top contributing factors, and an LLM agent turns that into a plain-English explanation — with the LLM kept off the decision path entirely.",
      "Designed a rolling, severity-weighted risk memory per entity (card/account) that escalates repeat offenders into WATCH/ELEVATED status, with cutoffs chosen by a cost-based grid sweep rather than a fixed rule.",
      "Picked decision thresholds by minimizing an explicit cost function (false negatives × avg. fraud loss + false positives × avg. false-positive cost) instead of optimizing for AUC alone, with a sensitivity sweep over plausible cost assumptions.",
    ],
    githubUrl: "https://github.com/Jayant2901/fraud-risk-explainer",
  },
  {
    slug: "lazy-rag",
    title: "lazy-rag",
    tagline: "Adaptive Retrieval for RAG — independent research",
    summary: "Tests whether an LLM's own confidence can tell it when retrieval is actually worth the cost.",
    stat: "13×",
    statLabel: "less retrieval, higher accuracy (p=0.004)",
    stack: ["Groq LLM API", "FAISS retrieval", "Bootstrap CI + significance tests"],
    timeframe: "Independent research project",
    description:
      "Tests whether a model's self-reported confidence can gate retrieval — skip it when the model already knows the answer — benchmarked against no-RAG/always-RAG baselines on two datasets, with bootstrap confidence intervals and paired significance tests throughout.",
    points: [
      "Built a confidence-gated retrieval pipeline and benchmarked it against no-RAG and always-RAG baselines on two datasets — TriviaQA (mainstream trivia) and PopQA (long-tail entities) — with bootstrap 95% CIs and paired sign tests on every comparison.",
      "On TriviaQA the gate significantly beat always-RAG: 0.550 EM vs. 0.250 EM (p=0.004) while retrieving on just 7.5% of questions, a ~13× cut in retrieval calls. On PopQA the same gate lost to always-RAG (0.175 vs. 0.375 EM) — the model was confidently wrong on 29 of 40 questions, several at confidence 1.00.",
      "Traced the reversal to calibration, not the pipeline: self-verbalized confidence is informative when the model's pretrained knowledge is reliable and close to noise when it isn't — the real finding is conditional, not a single pass/fail verdict.",
    ],
    githubUrl: "https://github.com/Jayant2901/lazy-rag",
  },
  {
    slug: "life-expectancy-predictor",
    title: "Life Expectancy Predictor",
    tagline: "scikit-learn + Streamlit",
    summary: "Predicts a country's life expectancy from health, education, and economic indicators.",
    stat: "0.968",
    statLabel: "R² on held-out WHO data",
    stack: ["scikit-learn", "Streamlit"],
    timeframe: "Shipped as an interactive app",
    description:
      "Trained a Random Forest Regressor on WHO life-expectancy data (adult mortality, GDP, schooling, immunization) reaching R² = 0.968 and MAE = 1.08 years on held-out data, and shipped it as an interactive Streamlit app.",
    points: [
      "Trained a Random Forest Regressor on WHO life-expectancy data (adult mortality, GDP, schooling, immunization) reaching R² = 0.968 and MAE = 1.08 years on held-out data, and shipped it as an interactive Streamlit app.",
    ],
    githubUrl: "https://github.com/Jayant2901/Life-Expectancy-Prediction",
  },
  {
    slug: "father-time-lebron",
    title: "Father Time",
    tagline: "NBA aging-curve anomaly detector",
    summary: "Compares any NBA player's stats to how players have historically aged at that exact age.",
    stat: "1.8σ",
    statLabel: "above baseline, every age 19–40",
    stack: ["FastAPI", "nba_api", "Basketball-Reference scrape", "pandas"],
    timeframe: "Independent project",
    description:
      "Builds real NBA aging curves from every qualifying player-season since 1949–50, then measures how many standard deviations any player's performance sits above or below the historical norm at their exact age — LeBron James as the flagship example.",
    points: [
      "Built real aging curves from every qualifying NBA/BAA player-season since 1949–50, then measured how many standard deviations any player's performance sits above or below the historical norm at their exact age.",
      "Used LeBron James as the flagship case: his Player Efficiency Rating sits +1.5 to +1.8 SD above the league's age-based baseline at every single age from 19 to 40.",
      "Joined two messy, semi-official data sources — stats.nba.com via nba_api and a Cloudflare-protected Basketball-Reference scrape — into one canonical dataset, with era-normalization and small-sample confidence handling.",
    ],
    githubUrl: "https://github.com/Jayant2901/father-time-lebron",
  },
  {
    slug: "heat-check",
    title: "Heat Check",
    tagline: "Live NBA win-probability tracking",
    summary: "Tracks NBA win probability live and flags scoring runs that are statistically out of the ordinary.",
    stat: "12s",
    statLabel: "poll → recompute → flag → push, live",
    stack: ["FastAPI", "nba_api", "scikit-learn", "Server-Sent Events"],
    timeframe: "Independent project",
    description:
      "A real-time win-probability model recomputed every ~12 seconds as a live game is polled, paired with anomaly detection that z-scores each scoring run against a historical baseline instead of just flagging any run as \"hot.\"",
    points: [
      "Built a real-time win-probability model, trained on historical score-margin/time-remaining/quarter data and recomputed every ~12 seconds as a live game is polled.",
      "Added anomaly detection on scoring runs: pools a baseline distribution from historical data and z-scores each new run against it, instead of just flagging any run as \"hot.\"",
      "Designed a poll → recompute → flag → push pipeline that runs identically for a live game or a historical replay, since the NBA off-season means there's no live game to test against most of the year.",
    ],
    githubUrl: "https://github.com/Jayant2901/heat-check",
  },
  {
    slug: "trading-bot",
    title: "Trading Bot",
    tagline: "Binance Futures Testnet (USDT-M)",
    summary: "Places and manages Binance futures orders from a CLI or a lightweight web dashboard.",
    stat: "3",
    statLabel: "order types, one shared backend",
    stack: ["Python", "Binance Futures API (Testnet)", "Flask", "CLI"],
    timeframe: "Independent project",
    description:
      "A CLI and a lightweight Flask web UI for placing MARKET, LIMIT, and STOP orders on Binance's USDT-M Futures Testnet, both built on the same signed-request client, order-placement, and validation modules.",
    points: [
      "Built a CLI and a lightweight Flask web UI for placing MARKET, LIMIT, and STOP orders on Binance's USDT-M Futures Testnet, both calling the same underlying client, order, and validation modules.",
      "Separated concerns into a signed HTTP client layer, an order-placement/logging layer, and input validation, plus a --check-auth diagnostic command for isolating credential and permission errors.",
      "Added rotating file and console logging for every request/response, with credentials kept out of version control via .env.",
    ],
    githubUrl: "https://github.com/Jayant2901/trading-bot",
  },
];

export const leadership = [
  {
    role: "Secretary",
    org: "IEEE Systems, Man & Cybernetics Society, GNITC, Hyderabad",
    period: "Jan – Apr 2025",
    points: [
      "Planned and ran technical workshops end to end — scheduling, communications, and day-of logistics.",
      "Maintained meeting minutes, official correspondence, and chapter documentation.",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science (Data Science)",
    school: "Gurunanak Institutions Technical Campus, Hyderabad",
    period: "2023 – 2027 (Expected)",
  },
  {
    degree: "Higher Secondary Certificate",
    school: "Sri Chaitanya Jr. Kalasala, Hyderabad",
    period: "2023",
  },
];

export const about = {
  paragraphs: [
    "I'm a final-year B.Tech student specializing in Computer Science (Data Science) at Gurunanak Institutions Technical Campus, Hyderabad — expected to graduate in 2027.",
    "Most of what I build sits at the same fault line: a model that's accurate isn't useful if nobody can tell why it made a call. So I spend as much time on SHAP explanations, cost-based thresholds, and confidence calibration as I do on the model itself — classical ML (scikit-learn, XGBoost) and LLM tooling both.",
    "Outside of that, I'm usually reading about ML research, watching NBA basketball, or listening to music while I work through a dataset — a couple of my side projects (Father Time, Heat Check) are what happens when those two habits collide.",
  ],
};

export const skillsRowOne = [
  "Python",
  "Pandas",
  "NumPy",
  "scikit-learn",
  "XGBoost",
  "SHAP",
  "Statistical Analysis",
];

export const skillsRowTwo = [
  "FastAPI",
  "Streamlit",
  "SQL",
  "LLM / Prompt Engineering",
  "Git / GitHub",
  "IBM Data Science Professional Certificate",
  "Data Science for Engineers (NPTEL / IIT)",
];

export const languages = [
  { name: "English", level: "C1" },
  { name: "Hindi", level: "C2" },
];
