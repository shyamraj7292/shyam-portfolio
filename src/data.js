// Single source of truth for all three experiences (landing / world / terminal).
// Content compiled from Shyamraj H's résumé.

export const profile = {
  name: "Shyamraj H",
  role: "B.Tech CSE (Cybersecurity) · Software Engineer & Offensive-Security enthusiast",
  tagline: "I build secure software & offensive-security tooling.",
  location: "Coimbatore, India",
  email: "shyamraj10335@gmail.com",
  github: "https://github.com/shyamraj7292",
  githubShort: "github.com/shyamraj7292",
  linkedin: "https://www.linkedin.com/in/shyam-raj-a64435373",
  linkedinShort: "linkedin.com/in/shyam-raj",
  summary:
    "Computer Science student specialising in Cybersecurity with hands-on backend " +
    "development across Python, FastAPI and Flask, plus offensive-security tooling. " +
    "I ship production-adjacent backend modules, build full-stack applications, and " +
    "perform under pressure in hackathons and CTFs.",
};

export const education = [
  { title: "B.Tech — Computer Science (Cybersecurity)", org: "Amrita Vishwa Vidyapeetham, Coimbatore", meta: "Expected 2027 · CGPA 8.19" },
  { title: "Class 12 — Chinmaya Vidyalaya, Kilpauk", org: "", meta: "2023 · 88%" },
  { title: "Class 10 — Chinmaya Vidyalaya, Kilpauk", org: "", meta: "2021 · 90%" },
];

export const skills = [
  { group: "Languages", items: "Python, C, C++, JavaScript/TypeScript, SQL, Bash" },
  { group: "Backend & APIs", items: "FastAPI, Flask, REST, WebSockets, PostgreSQL, SQLite, ChromaDB" },
  { group: "Frontend", items: "React, TypeScript, Vite, Tailwind CSS" },
  { group: "Offensive security", items: "Scapy, socket programming, port/subdomain scanning, password cracking" },
  { group: "Security tools", items: "Burp Suite, Nmap, Metasploit, Wireshark, GDB, radare2" },
  { group: "Cryptography", items: "Argon2, bcrypt, AES-GCM, secure coding, null-safety" },
  { group: "Data & ML", items: "Scikit-learn, TensorFlow, NumPy, Pandas, Matplotlib" },
  { group: "Blockchain", items: "Solidity, Hardhat" },
  { group: "Dev & OS", items: "Git, GitHub, GitLab, Linux, Docker" },
];

export const experience = [
  {
    role: "Security Intern", org: "CAMS Limited", dates: "Apr 2026 – Present",
    points: ["Security engineering within a large financial-services environment."],
  },
  {
    role: "Backend Developer Intern", org: "Springer Capital Investments LLC, USA", dates: "Jan 2026 – Apr 2026",
    points: [
      "Improved database interaction, query processing and result-handling in Redtail Services.",
      "Added validation, safer attribute access and null-safety to harden backend reliability.",
      "Contributed to PII-protection and pseudonymization workflows for sensitive data.",
    ],
  },
  {
    role: "Cybersecurity Intern", org: "Redynox", dates: "Dec 2025 – Jan 2026",
    points: ["Worked on secure systems, digital-infrastructure protection and cyber-awareness."],
  },
  {
    role: "Offensive Cyber Security Intern", org: "InLighnX Global Pvt. Ltd.", dates: "Oct 2025 – Dec 2025",
    points: [
      "Built network & port scanners with Scapy and socket programming.",
      "Developed subdomain-enumeration, PDF-protection and PDF-cracking tooling.",
      "Applied multithreading and system-level programming to build security tools from scratch.",
    ],
  },
];

const GH = "https://github.com/shyamraj7292/";
export const projects = [
  {
    name: "Autonomous AI Compliance Platform",
    stack: "Python · FastAPI · React · Gemini · ChromaDB · PostgreSQL · Docker",
    repo: GH + "Autonomous-AI-compliance-platform",
    points: [
      "Multi-agent platform — 4 agents (Regulatory Scout, Gap Analyst, Risk Sentinel, Evidence Officer) collaborate with a Reason+Act loop to automate regulatory gap analysis.",
      "RAG pipeline (ChromaDB + Gemini 2.0 Flash) surfaces compliance gaps against internal policy documents.",
      "FastAPI + PostgreSQL backend, React frontend, automated PDF audit reports.",
    ],
  },
  {
    name: "ReconAI",
    stack: "Python · Gemini · SQLite · Streamlit",
    repo: GH + "ReconAI",
    points: [
      "Financial reconciliation agent that matches merchant ledgers against bank statements and payment-gateway reports using deterministic rules.",
      "An LLM classifies the remaining exceptions, then takes gated resolution actions with a full audit log.",
    ],
  },
  {
    name: "Sentinel — Agentic SOC Analyst",
    stack: "Python · FastAPI · MCP · Claude · Splunk Foundation-sec",
    repo: GH + "Splunk-Agentic-Ops",
    points: [
      "Autonomous SOC analyst that takes a Splunk notable event and works it end-to-end like a Tier-1 analyst.",
      "Integrates with Splunk over the Model Context Protocol (MCP); orchestrates multiple LLM backends behind a FastAPI dashboard.",
    ],
  },
  {
    name: "KronoTrace",
    stack: "Python · FastAPI · WebSockets · Scapy · Scikit-learn",
    repo: GH + "KronoTrace",
    points: [
      "Forensic log-analysis & real-time threat detection over Windows event logs, PCAPs, syslogs and CSV dumps unified into one timeline schema.",
      "Multi-pattern engine: brute force, privilege escalation, data exfiltration, anomalous file access, new-IP anomalies.",
      "Async FastAPI + WebSockets streams live alerts to an interactive timeline dashboard.",
    ],
  },
  {
    name: "Copa Agent — Autonomous DevOps",
    stack: "Python · FastAPI · Gemini 2.0 · Vertex AI · GitLab MCP · Cloud Run",
    repo: GH + "Google-Cloud-Rapid-Agent-",
    points: [
      "Autonomous DevOps agent that fixes failing CI/CD pipelines — reads logs, writes code fixes, opens merge requests and re-runs to verify.",
      "GitLab MCP integration; deployed on Cloud Run with Firestore for state.",
    ],
  },
  {
    name: "HiveWatch",
    stack: "Python · FastAPI · SQLAlchemy · PostgreSQL · React · Docker",
    repo: GH + "Hivewatch",
    points: [
      "IoT honeypot deception platform that captures and visualises attacker activity in real time.",
      "SQLAlchemy/PostgreSQL storage with an ingestion API for simulated IoT device telemetry.",
      "React/TypeScript admin dashboard with a live attack map and incident-response playbooks.",
    ],
  },
  {
    name: "Loop — Story-Tracking News",
    stack: "Python · FastAPI · PostgreSQL + pgvector · Redis · Celery · HTMX",
    repo: GH + "Loop",
    points: [
      "News aggregator for infrequent readers that tracks stories, not articles — showing only the developments you missed since your last visit.",
      "sentence-transformers embeddings + HDBSCAN clustering group articles into evolving stories.",
    ],
  },
  {
    name: "PhishGuard-Chain",
    stack: "Python · FastAPI · React · Solidity · Hardhat · Docker",
    repo: GH + "Phishguard-Chain",
    points: [
      "End-to-end phishing detection: FastAPI scoring API + React dashboard + on-chain provenance for trusted senders.",
      "Solidity smart contract (Hardhat) registers and verifies trusted sending domains on-chain.",
      "Modular pipeline splits ML scoring and blockchain verification via Docker Compose.",
    ],
  },
  {
    name: "SOC Dashboard (mini-SIEM)",
    stack: "Python · Flask · SQLite · Chart.js",
    repo: GH + "SOC-Dashboard",
    points: [
      "A small-scale SIEM: real-time log collection, threat detection, event correlation and security visualisation.",
    ],
  },
  {
    name: "Automata — Rust Mini-Compiler",
    stack: "Rust",
    repo: GH + "Automata-Project",
    points: [
      "A mini-compiler for a compiler-design course: a full pipeline from lexical analysis to MIPS assembly output.",
      "Includes an optional optimisation pass.",
    ],
  },
  {
    name: "CarbonCoach",
    stack: "Python · FastAPI · Gemini · Chart.js",
    repo: GH + "CarbonCoach",
    points: [
      "AI agent that helps people understand, track and reduce their carbon footprint through conversation, photo logging and a live dashboard.",
    ],
  },
  {
    name: "GigShield",
    stack: "JavaScript · Chart.js · ML (GBT + LSTM)",
    repo: GH + "Guidewire-Hackathon-2026",
    points: [
      "Instant, automated parametric payouts triggered by real-time environmental data to protect gig workers from weather-driven income loss.",
      "Predictive analytics with gradient-boosted trees and LSTM models.",
    ],
  },
];

export const achievements = [
  "3rd place — ATC CTF ($200 prize)",
  "Best Innovation Award (Special Mention) — Prismatic'26 Hackathon",
  "Finalist — Visa 24Hr AI Hackathon, IITM (Top 50 / 450+ teams)",
  "Finalist — Hack2TechSustain 2.0 (Top 25 / 2000+ teams)",
  "Specathon'25 — selected through Round 4",
];

export const certs = [
  "Google Cybersecurity Professional Certificate — Coursera",
  "Cisco Networking Academy — Ethical Hacking",
  "CompTIA Security+ — (in progress)",
];
