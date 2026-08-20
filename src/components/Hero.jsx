import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import Scene3D from "./Scene3D";
import { personalInfo } from "../data/portfolio";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="hero"
      aria-label="Introduction & Hero Section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glows */}
      <div
        className="ambient-glow"
        aria-hidden="true"
        style={{
          width: "600px",
          height: "600px",
          background: "#00f2fe",
          top: "-10%",
          right: "-5%",
        }}
      />
      <div
        className="ambient-glow"
        aria-hidden="true"
        style={{
          width: "500px",
          height: "500px",
          background: "#7f00ff",
          bottom: "-10%",
          left: "-5%",
        }}
      />

      {/* 3D Scene with Deferred Performance Loading & 2D Fallback */}
      <Scene3D />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "56rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Open to Opportunities Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ marginBottom: "1.25rem" }}
          >
            <span className="opportunities-badge" role="status" aria-label="Available for hire">
              <span className="pulse-dot" aria-hidden="true" />
              Open to Opportunities
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              color: "#4facfe",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name — Primary SEO Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="gradient-text-animated"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Rotating Role Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              height: "clamp(2rem, 4vw, 3rem)",
              overflow: "hidden",
              marginBottom: "1.5rem",
            }}
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="gradient-text-coral"
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 2rem)",
                  fontWeight: 700,
                }}
              >
                {personalInfo.roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
              maxWidth: "38rem",
              margin: "0 auto 1.5rem",
              lineHeight: 1.8,
            }}
          >
            {personalInfo.description}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              color: "var(--text-muted)",
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              fontStyle: "italic",
              maxWidth: "36rem",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.a
              href={personalInfo.resumeUrl}
              download="Krishna_M_Resume.pdf"
              className="gradient-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download Krishna M's Resume (PDF)"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              <span>Download Resume</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <Download size={18} />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "-6rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.a
            href="#about"
            aria-label="Scroll down to About section"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ color: "var(--text-muted)", display: "inline-block", textDecoration: "none" }}
          >
            <ArrowDown size={20} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
}
