import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI-only — hook up your preferred backend/service here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <SectionWrapper id="contact">
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
          Let&apos;s Connect
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="gradient-text-cyan"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          variants={itemVariants}
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            maxWidth: "28rem",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Have a project in mind or want to collaborate? Drop me a message and
          I&apos;ll get back to you soon.
        </motion.p>
      </div>

      {/* Contact Form Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card"
        style={{
          maxWidth: "36rem",
          margin: "0 auto",
          padding: "2.5rem",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Name Field */}
          <div style={{ position: "relative" }}>
            <User
              size={16}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              style={{ paddingLeft: "2.75rem" }}
            />
          </div>

          {/* Email Field */}
          <div style={{ position: "relative" }}>
            <Mail
              size={16}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              style={{ paddingLeft: "2.75rem" }}
            />
          </div>

          {/* Message Field */}
          <div style={{ position: "relative" }}>
            <MessageSquare
              size={16}
              style={{
                position: "absolute",
                left: "1rem",
                top: "1rem",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <textarea
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="input-field"
              style={{
                paddingLeft: "2.75rem",
                resize: "vertical",
                minHeight: "120px",
              }}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="gradient-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "1rem",
              marginTop: "0.5rem",
              width: "100%",
            }}
          >
            <span>{submitted ? "Message Sent! ✓" : "Send Message"}</span>
            {!submitted && (
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <Send size={16} />
              </motion.span>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Footer spacer for navbar clearance */}
      <div style={{ height: "5rem" }} />
    </SectionWrapper>
  );
}
