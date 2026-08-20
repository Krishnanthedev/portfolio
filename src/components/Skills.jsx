import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { skills } from "../data/portfolio";

const categoryIcons = {
  Frontend: "⚛️",
  Backend: "⚙️",
  "DevOps & Tools": "🛠️",
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Group skills by category
const groupedSkills = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {});

export default function Skills() {
  return (
    <SectionWrapper id="skills" aria-label="Technical Skills & Technologies">
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.p
          variants={cardVariants}
          style={{
            color: "#4facfe",
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          What I Work With
        </motion.p>
        <motion.h2
          variants={cardVariants}
          className="gradient-text-cyan"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Skills &amp; Technologies
        </motion.h2>
      </div>

      {/* Skill Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <motion.section key={category} variants={cardVariants} aria-label={`${category} Skills`}>
            {/* Category Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ fontSize: "1.25rem" }} aria-hidden="true">
                {categoryIcons[category] || "📦"}
              </span>
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                }}
              >
                {category}
              </h3>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, var(--border-subtle), transparent)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Skill Cards Grid */}
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "0.75rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {categorySkills.map((skill) => (
                <motion.li
                  key={skill.name}
                  className="glass-card"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(0, 242, 254, 0.3)",
                    boxShadow: "0 0 25px rgba(0, 242, 254, 0.08)",
                  }}
                  style={{
                    padding: "1rem 1.25rem",
                    textAlign: "center",
                    cursor: "default",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                    }}
                  >
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </SectionWrapper>
  );
}
