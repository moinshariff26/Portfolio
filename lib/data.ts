export const profile = {
  name: "Moin Shariff",
  initials: "MS",
  role: "Technology Consultant Intern",
  company: "Mphasis Ltd",
  client: "Hewlett Packard Enterprise",
  tagline: "Building AI-enabled enterprise systems at the intersection of full-stack engineering and intelligent automation.",
  email: "moinshariff2644@gmail.com",
  phone: "+91 8660957294",
  location: "Mysore, Karnataka, India",
  linkedin: "https://linkedin.com/in/moin-shariff/",
  github: "https://github.com/moinshariff26",
  githubUsername: "moinshariff26",
  portfolio: "https://portfolio.com",
  resumeUrl: "/resume.pdf",
  status: "open_to_work" as const,
  availability: "Open to Opportunities",
} as const

export const nowPanel = {
  currentFocus: "Building an Agentic AI Knowledge Management System at HPE (Project Delta)",
  learning: ["Vector Databases (ChromaDB)", "RAG Pipelines", "pydantic-ai", "Next.js 14 App Router"],
  building: "This Portfolio Dashboard",
  reading: "Designing Data-Intensive Applications — Martin Kleppmann",
  status: "open_to_work" as const,
  statusLabel: "Open to Opportunities",
  statusColor: "success" as const,
  updatedAt: "June 2026",
}

export type SkillLevel = "Advanced" | "Intermediate" | "Beginner"
export type SkillCategory = "Languages" | "Frontend" | "Backend" | "Databases" | "AI/ML" | "Tools"

export interface Skill {
  name: string
  category: SkillCategory
  siIcon: string
  brandColor: string
  level: SkillLevel
}

export const skills: Skill[] = [
  { name: "Python",       category: "Languages", siIcon: "SiPython",     brandColor: "#3776AB", level: "Advanced" },
  { name: "Java",         category: "Languages", siIcon: "SiJava",       brandColor: "#007396", level: "Advanced" },
  { name: "JavaScript",   category: "Languages", siIcon: "SiJavascript", brandColor: "#F7DF1E", level: "Advanced" },
  { name: "TypeScript",   category: "Languages", siIcon: "SiTypescript", brandColor: "#3178C6", level: "Intermediate" },
  { name: "C",            category: "Languages", siIcon: "SiC",          brandColor: "#A8B9CC", level: "Intermediate" },
  { name: "React",        category: "Frontend",  siIcon: "SiReact",      brandColor: "#61DAFB", level: "Advanced" },
  { name: "Next.js",      category: "Frontend",  siIcon: "SiNextdotjs",  brandColor: "#000000", level: "Intermediate" },
  { name: "HTML5",        category: "Frontend",  siIcon: "SiHtml5",      brandColor: "#E34F26", level: "Advanced" },
  { name: "CSS3",         category: "Frontend",  siIcon: "SiCss3",       brandColor: "#1572B6", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend",  siIcon: "SiTailwindcss",brandColor: "#06B6D4", level: "Intermediate" },
  { name: "Figma",        category: "Frontend",  siIcon: "SiFigma",      brandColor: "#F24E1E", level: "Intermediate" },
  { name: "Node.js",      category: "Backend",   siIcon: "SiNodedotjs",  brandColor: "#339933", level: "Intermediate" },
  { name: "Express.js",   category: "Backend",   siIcon: "SiExpress",    brandColor: "#000000", level: "Intermediate" },
  { name: "Flask",        category: "Backend",   siIcon: "SiFlask",      brandColor: "#000000", level: "Advanced" },
  { name: "MySQL",        category: "Databases", siIcon: "SiMysql",      brandColor: "#4479A1", level: "Intermediate" },
  { name: "MongoDB",      category: "Databases", siIcon: "SiMongodb",    brandColor: "#47A248", level: "Intermediate" },
  { name: "PostgreSQL",   category: "Databases", siIcon: "SiPostgresql", brandColor: "#4169E1", level: "Intermediate" },
  { name: "SQLite",       category: "Databases", siIcon: "SiSqlite",     brandColor: "#003B57", level: "Intermediate" },
  { name: "Scikit-learn", category: "AI/ML",     siIcon: "SiScikitlearn",brandColor: "#F7931E", level: "Intermediate" },
  { name: "Hugging Face", category: "AI/ML",     siIcon: "SiHuggingface",brandColor: "#FFD21E", level: "Intermediate" },
  { name: "OpenCV",       category: "AI/ML",     siIcon: "SiOpencv",     brandColor: "#5C3EE8", level: "Intermediate" },
  { name: "Jupyter",      category: "AI/ML",     siIcon: "SiJupyter",    brandColor: "#F37626", level: "Intermediate" },
  { name: "Git",          category: "Tools",     siIcon: "SiGit",        brandColor: "#F05032", level: "Advanced" },
  { name: "GitHub",       category: "Tools",     siIcon: "SiGithub",     brandColor: "#181717", level: "Advanced" },
  { name: "VS Code",      category: "Tools",     siIcon: "SiVisualstudiocode", brandColor: "#007ACC", level: "Advanced" },
  { name: "Postman",      category: "Tools",     siIcon: "SiPostman",    brandColor: "#FF6C37", level: "Advanced" },
  { name: "Linux",        category: "Tools",     siIcon: "SiLinux",      brandColor: "#FCC624", level: "Intermediate" },
  { name: "Docker",       category: "Tools",     siIcon: "SiDocker",     brandColor: "#2496ED", level: "Beginner" },
  { name: "Vercel",       category: "Tools",     siIcon: "SiVercel",     brandColor: "#000000", level: "Intermediate" },
]

export const experience = [
  {
    id: "mphasis-hpe",
    role: "Technology Consultant Intern",
    company: "Mphasis Ltd",
    client: "Hewlett Packard Enterprise",
    location: "Bengaluru, Karnataka",
    duration: "Feb 2026 – Present",
    type: "Internship",
    status: "current",
    stack: ["React", "REST APIs", "Python", "Agile", "AI/ML", "ChromaDB"],
    scope: "Enterprise Web Applications + Agentic AI Knowledge Management System (Project Delta)",
    achievements: [
      "Developing enterprise web applications with responsive frontend interfaces and integrated backend services using React and REST APIs.",
      "Participating in design and implementation of user workflows, interface components, and knowledge discovery experiences focused on usability and accessibility.",
      "Collaborating cross-functionally to translate business requirements into functional product features and intuitive user experiences.",
      "Supporting AI-enabled solutions by integrating intelligent search and content retrieval capabilities into enterprise platforms.",
      "Engaging in Agile practices: requirement analysis, feature development, testing, documentation, and continuous improvement.",
    ],
  },
] as const

export const projects = [
  {
    id: "tradenexus-ai",
    name: "TradeNexus AI",
    subtitle: "AI-Powered Financial Analysis Platform",
    description: "Full-stack financial intelligence platform with JWT-based auth, stock analysis, portfolio management, and an NLP-driven AI assistant — all in a unified dashboard.",
    stack: ["Next.js", "TypeScript", "Flask", "PostgreSQL", "NLP", "BeautifulSoup"],
    featured: true,
    emoji: "📈",
    highlights: [
      "Reduced manual stock research effort by ~70% via automated BeautifulSoup-based market intelligence pipelines.",
      "Engineered NLP sentiment analysis combining market data + financial news for data-backed investment decisions.",
      "Full-stack: JWT auth, portfolio management, market trend tracking, real-time analytics dashboards.",
    ],
    github: null as string | null,
    demo: null as string | null,
    hasDiagram: true,
    mermaidDiagram: `
graph TD
  A[User Browser] --> B[Next.js Frontend]
  B --> C[Flask API Server]
  C --> D[(PostgreSQL)]
  C --> E[NLP Engine]
  C --> F[BeautifulSoup Scraper]
  E --> G[Sentiment Analysis]
  F --> H[Market Data Pipeline]
  G --> I[Stock Recommendation Engine]
  H --> I
  I --> B
`,
  },
  {
    id: "ocr-translator",
    name: "OCR & Multilingual Translator",
    subtitle: "Web App for Image Text Extraction",
    description: "Flask-based OCR system integrating EasyOCR, PyTesseract, and OpenCV for multilingual text extraction from images with automated translation and database-driven record management.",
    stack: ["Python", "Flask", "EasyOCR", "OpenCV", "Google Translate API", "SQLite3"],
    featured: true,
    emoji: "🔍",
    highlights: [
      "Multilingual text extraction including handwritten recognition via EasyOCR + PyTesseract + OpenCV pipeline.",
      "Automated LangDetect + Google Translate API integration for seamless multi-language translation.",
      "SQLite3 record management storing image binaries, OCR outputs, translations, and timestamps.",
    ],
    github: null as string | null,
    demo: null as string | null,
    hasDiagram: true,
    mermaidDiagram: `
graph LR
  A[Image Upload] --> B[Flask Server]
  B --> C[OpenCV Preprocessing]
  C --> D[EasyOCR + PyTesseract]
  D --> E[LangDetect]
  E --> F[Google Translate API]
  D --> G[(SQLite3 Storage)]
  F --> G
  G --> H[Response to User]
`,
  },
  {
    id: "diabetes-prediction",
    name: "Diabetes Prediction Tool",
    subtitle: "ML-Based Clinical Prediction Web App",
    description: "Machine learning web application for diabetes prediction achieving 85% accuracy, with secure user authentication and cloud deployment.",
    stack: ["Python", "Flask", "Scikit-learn", "Render"],
    featured: false,
    emoji: "🏥",
    highlights: [
      "85% prediction accuracy using trained Scikit-learn ML models.",
      "Secure user authentication system built into the web application.",
      "Deployed and publicly accessible on Render cloud platform.",
    ],
    github: null as string | null,
    demo: null as string | null,
    hasDiagram: false,
    mermaidDiagram: null,
  },
] as const

export const education = [
  {
    degree: "B.E. in Computer Science",
    institution: "Maharaja Institute of Technology Mysore",
    duration: "2022 – 2026",
    score: "CGPA: 9.00 / 10.0",
    status: "current",
  },
  {
    degree: "Pre-University (PCMB)",
    institution: "Marimallappa PU College, Mysuru",
    duration: "2020 – 2022",
    score: "87.00%",
    status: "completed",
  },
  {
    degree: "SSLC",
    institution: "Sadvidya High School, Mysuru",
    duration: "2016 – 2020",
    score: "88.9%",
    status: "completed",
  },
] as const

export const certifications = [
  {
    id: "sigma",
    name: "Apna College Sigma 6.0",
    issuer: "Apna College",
    description: "Full-Stack Web Development (MERN Stack), Data Structures & Algorithms in Java, Quantitative Aptitude",
    status: "Ongoing",
    statusType: "warning" as const,
    badge: "🎓",
  },
  {
    id: "tejaspro",
    name: "AI & Data Science Applications",
    issuer: "TejasPro Trainings — Industry Skilling Program",
    description: "Hands-on training in AI, data science, machine learning, and data analysis via practical labs and project-based learning.",
    status: "Completed",
    statusType: "success" as const,
    badge: "🤖",
  },
  {
    id: "hackathon",
    name: "National Level Hackathon 5.0",
    issuer: "MIT Mysore — Cyber Security & Ethical Hacking (INVADERS)",
    description: "Designed innovative cybersecurity solutions competing among 50+ teams. November 2023.",
    status: "Achieved",
    statusType: "success" as const,
    badge: "🏆",
  },
] as const

export const underTheHood = {
  framework: "Next.js 14 (App Router)",
  language: "TypeScript — strict mode",
  styling: "Tailwind CSS + Framer Motion",
  fonts: "Syne + Space Grotesk + JetBrains Mono",
  hosting: "Vercel — Zero-config CI/CD",
  cicd: "GitHub → Vercel (Auto Deploy on push)",
  analytics: "Vercel Analytics",
  repo: "github.com/moinshariff26/portfolio",
  contact: "EmailJS",
} as const
