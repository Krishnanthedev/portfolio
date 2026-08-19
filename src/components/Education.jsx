import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { education } from "../data/portfolio";

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Education() {
  return (
    <SectionWrapper id="education">
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.p
          variants={itemVariants}
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
          Academic Background
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="gradient-text-cyan"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Education
        </motion.h2>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          maxWidth: "48rem",
          margin: "0 auto",
        }}
      >
        {/* Timeline Line */}
        <div className="timeline-line" />

        {/* Education Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              variants={itemVariants}
              style={{
                position: "relative",
                paddingLeft: "3rem",
              }}
            >
              {/* Timeline Dot */}
              <div className="timeline-dot" />

              {/* Card */}
              <div
                className="glass-card"
                style={{
                  padding: "1.75rem",
                }}
              >
                {/* Year Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: "rgba(0, 242, 254, 0.08)",
                    border: "1px solid rgba(0, 242, 254, 0.15)",
                    borderRadius: "999px",
                    padding: "0.25rem 0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Calendar size={12} style={{ color: "#4facfe" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "#4facfe",
                      fontWeight: 500,
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Degree */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <GraduationCap
                    size={20}
                    style={{
                      color: "#4facfe",
                      marginTop: "0.125rem",
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.degree}
                  </h3>
                </div>

                {/* Institution */}
                <p
                  style={{
                    color: "#4facfe",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    marginBottom: "0.75rem",
                    paddingLeft: "2rem",
                  }}
                >
                  {item.institution}
                </p>

                {/* Description */}
                {item.description && (
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      paddingLeft: "2rem",
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
