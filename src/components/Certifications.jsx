import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { certifications } from "../data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
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
          Credentials
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
          Certifications
        </motion.h2>
      </div>

      {/* Certifications Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1.25rem",
          maxWidth: "56rem",
          margin: "0 auto",
        }}
      >
        {certifications.map((cert) => (
          <motion.a
            key={cert.name}
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            variants={cardVariants}
            whileHover={{
              borderColor: "rgba(255, 117, 140, 0.3)",
              boxShadow:
                "0 0 30px rgba(255, 117, 140, 0.06), 0 8px 32px rgba(0,0,0,0.3)",
              y: -3,
            }}
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {/* Icon & External Link */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.625rem",
                  background: "rgba(255, 117, 140, 0.08)",
                  border: "1px solid rgba(255, 117, 140, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Award size={18} style={{ color: "#ff758c" }} />
              </div>
              <ExternalLink
                size={14}
                style={{ color: "var(--text-muted)" }}
              />
            </div>

            {/* Cert Name */}
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.4,
              }}
            >
              {cert.name}
            </h3>

            {/* Issuer & Date */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "auto",
              }}
            >
              <span
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.8125rem",
                }}
              >
                {cert.issuer}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Calendar size={11} />
                {cert.date}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
