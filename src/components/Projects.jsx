import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { projects } from "../data/portfolio";

// Custom GitHub icon (lucide-react removed it)
function GithubIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <SectionWrapper id="projects" aria-label="Featured Projects Section">
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.p
          variants={cardVariants}
          style={{
            color: "#ff758c",
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Featured Work
        </motion.p>
        <motion.h2
          variants={cardVariants}
          className="gradient-text-coral"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          My Projects
        </motion.h2>
      </div>

      {/* Projects Grid with Semantic Article Cards */}
      <div className="projects-grid">
        {projects.map((project, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <motion.article
              key={project.id || project.title}
              className="glass-card project-card"
              variants={cardVariants}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{
                borderColor: "rgba(255, 117, 140, 0.35)",
                boxShadow:
                  "0 0 40px rgba(255, 117, 140, 0.08), 0 20px 50px rgba(0,0,0,0.4)",
                y: -8,
              }}
              style={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* ── Image Thumbnail with CLS Prevention & Lazy Loading ── */}
              <div className="project-card-image-wrapper">
                <motion.img
                  src={project.image}
                  alt={project.imageAlt || `${project.title} project screenshot and user interface`}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="340"
                  className="project-card-image"
                  animate={{
                    scale: isHovered ? 1.06 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                />
                {/* Gradient overlay at bottom of image for smooth transition */}
                <div className="project-card-image-overlay" aria-hidden="true" />

                {/* Floating project number badge */}
                <span className="project-card-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* ── Details Area ── */}
              <div className="project-card-body">
                {/* Title */}
                <h3 className="project-card-title">{project.title}</h3>

                {/* Description */}
                <p className="project-card-description">
                  {project.description}
                </p>

                {/* Tags / Technologies */}
                <div className="project-card-tags" aria-label={`Technologies used in ${project.title}`}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ── Action Links ── */}
                <div className="project-card-actions">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--demo"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`Open live interactive demo of ${project.title} in a new tab`}
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    <span>Live Demo</span>
                  </motion.a>

                  <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--repo"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`View GitHub repository for ${project.title} in a new tab`}
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
