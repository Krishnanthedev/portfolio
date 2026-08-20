import { motion } from "framer-motion";
import { User, Briefcase, Coffee, Lightbulb } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "../data/portfolio";

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stats = [
  { icon: Briefcase, value: "10+", label: "Projects Completed" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
  { icon: Lightbulb, value: "0+", label: "Years Experience" },
];

export default function AboutMe() {
  return (
    <SectionWrapper id="about" aria-label="About Me & Background">
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
          Get To Know Me
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
          About Me
        </motion.h2>
      </div>

      {/* Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* About Text Article */}
        <motion.article
          variants={itemVariants}
          className="glass-card"
          style={{ padding: "2.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "rgba(0, 242, 254, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00f2fe",
              }}
              aria-hidden="true"
            >
              <User size={20} />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Who I Am
            </h3>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            {personalInfo.aboutMe}
          </p>
        </motion.article>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          role="region"
          aria-label="Professional Statistics"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="glass-card about-stat-card"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(0, 242, 254, 0.3)",
                }}
              >
                <div
                  style={{
                    marginBottom: "0.75rem",
                    color: "#4facfe",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </div>
                <p className="about-stat-value gradient-text-cyan">
                  {stat.value}
                </p>
                <p className="about-stat-label">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
