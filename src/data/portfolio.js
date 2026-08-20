// ─── Portfolio Data & SEO Configuration ──────────────────────────
// Central configuration file for all content, structured data, and SEO.

import imgCloudSync from "../assets/project_cloudsync.jpg";
import imgAiStudio from "../assets/project_ai_studio.jpg";
import imgDevFlow from "../assets/project_devflow.jpg";
import imgEcoTrack from "../assets/project_ecotrack.jpg";

export const siteConfig = {
  siteUrl: "https://krishnam.dev",
  siteName: "Krishna M Portfolio",
  defaultTitle: "Krishna M | Full-Stack Developer & AI Engineer",
  titleTemplate: "%s | Krishna M",
  description:
    "Portfolio of Krishna M — Full-Stack Developer and AI Engineer specializing in React, Node.js, Next.js, Three.js, and scalable cloud architectures. Discover featured projects, technical skills, and production systems.",
  keywords: [
    "Krishna M",
    "Full-Stack Developer",
    "AI Engineer",
    "React Developer",
    "Node.js Developer",
    "Three.js Portfolio",
    "Next.js Developer",
    "Frontend Specialist",
    "Backend Architect",
    "Software Engineer Portfolio",
    "Cloud Architecture",
    "Distributed Systems",
  ],
  author: {
    name: "Krishna M",
    role: "Full-Stack Developer & AI Engineer",
    email: "krishna@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    twitterHandle: "@krishna",
  },
  ogImage: "/og-preview.png",
  ogImageAlt: "Krishna M — Full-Stack Developer & AI Engineer Portfolio Preview",
  locale: "en_US",
  themeColorDark: "#0b0f19",
  themeColorLight: "#f8fafc",
};

export const personalInfo = {
  name: "Krishna M",
  givenName: "Krishna",
  familyName: "M",
  title: "Full-Stack Developer & AI Engineer",
  tagline: "Crafting scalable architectures and high-performance digital experiences with modern web technologies.",
  description:
    "A passionate developer and software engineer who transforms complex business challenges into elegant, scalable solutions. With deep expertise across full-stack engineering, distributed systems, and AI integrations, I build resilient products designed for speed, accessibility, and intuitive user delight.",
  resumeUrl: "/resume.pdf",
  phone: "+91 XXXXXXXXXX",
  email: "krishna@example.com",
  location: "Bengaluru, India",
  addressLocality: "Bengaluru",
  addressCountry: "IN",
  roles: [
    "Full-Stack Developer",
    "Backend Architect",
    "AI Engineer",
    "3D Web Specialist",
  ],
  aboutMe:
    "I'm an engineer at heart who thrives at the intersection of architectural logic and interactive creativity. With years of experience building production-grade distributed applications, I've developed an uncompromised dedication to clean architecture, high performance (Core Web Vitals), and user-first design. Whether building high-throughput microservices, integrating cutting-edge LLMs and AI pipelines, or crafting responsive 3D WebGL interfaces — I bring relentless craftsmanship and engineering rigor to every project. When not coding, I contribute to open-source software, write technical deep dives, and mentor emerging engineers.",
  quote:
    "First, solve the problem. Then, write the code. — John Johnson",
};

export const socialLinks = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  x: "https://x.com",
  leetcode: "https://leetcode.com",
  medium: "https://medium.com",
};

export const skills = [
  // ── Frontend ──
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Three.js", category: "Frontend" },
  // ── Backend ──
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  // ── DevOps & Tools ──
  { name: "Docker", category: "DevOps & Tools" },
  { name: "AWS", category: "DevOps & Tools" },
  { name: "Git", category: "DevOps & Tools" },
  { name: "CI/CD", category: "DevOps & Tools" },
  { name: "Linux", category: "DevOps & Tools" },
  { name: "Figma", category: "DevOps & Tools" },
];

export const projects = [
  {
    id: "cloudsync-dashboard",
    title: "CloudSync Dashboard",
    description:
      "A real-time cloud infrastructure monitoring dashboard with interactive charts, alert management, and multi-tenant support.",
    tags: ["React", "Node.js", "WebSocket", "D3.js", "PostgreSQL"],
    image: imgCloudSync,
    imageAlt: "CloudSync Dashboard - Real-time cloud infrastructure and cluster monitoring UI",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    dateCreated: "2024",
  },
  {
    id: "ai-content-studio",
    title: "AI Content Studio",
    description:
      "An AI-powered content generation platform with a rich text editor, GPT integration, SEO analysis, and team collaboration features.",
    tags: ["Next.js", "OpenAI", "Prisma", "Tailwind", "Stripe"],
    image: imgAiStudio,
    imageAlt: "AI Content Studio - Generative AI collaborative editor with SEO scoring",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    dateCreated: "2024",
  },
  {
    id: "devflow",
    title: "DevFlow",
    description:
      "A developer productivity suite featuring code snippet management, project time tracking, and GitHub integration with analytics.",
    tags: ["TypeScript", "React", "Express", "MongoDB", "OAuth"],
    image: imgDevFlow,
    imageAlt: "DevFlow - Developer productivity workstation and snippet manager",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    dateCreated: "2023",
  },
  {
    id: "ecotrack-mobile",
    title: "EcoTrack Mobile",
    description:
      "A cross-platform mobile app for carbon footprint tracking with gamification, social challenges, and environmental impact reports.",
    tags: ["React Native", "Firebase", "Charts", "Notifications"],
    image: imgEcoTrack,
    imageAlt: "EcoTrack Mobile - Carbon footprint tracking and sustainability application",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    dateCreated: "2023",
  },
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    year: "2022 – 2024",
    startDate: "2022",
    endDate: "2024",
    description:
      "Specialized in Artificial Intelligence and Distributed Systems. Published research on scalable microservice architectures.",
  },
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: "Indian Institute of Technology",
    year: "2018 – 2022",
    startDate: "2018",
    endDate: "2022",
    description:
      "Graduated with honors. Led the university's open-source development club and participated in multiple hackathons.",
  },
];

export const certifications = [
  {
    name: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    verifyUrl: "https://aws.amazon.com/verification",
  },
  {
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2024",
    verifyUrl: "https://cloud.google.com/certification",
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    date: "2023",
    verifyUrl: "https://coursera.org/verify",
  },
  {
    name: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    date: "2023",
    verifyUrl: "https://university.mongodb.com",
  },
];
