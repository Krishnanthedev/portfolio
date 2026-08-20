import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Phone, MapPin, Clock } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalInfo, socialLinks } from "../data/portfolio";

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

// Custom LinkedIn icon
function LinkedInIcon({ size = 24, ...props }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Custom X / Twitter icon
function XIcon({ size = 24, ...props }) {
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
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ── Contact detail items shown on the left ── */
const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Mon – Fri, 9 AM – 6 PM IST",
    href: null,
  },
];

/* ── Social links shown at the bottom of the left panel ── */
const socials = [
  { icon: GithubIcon, href: socialLinks.github, label: "GitHub" },
  { icon: LinkedInIcon, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: socialLinks.x, label: "X / Twitter" },
];

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
    // UI-only demonstration — easily wired to API or Formspree
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <SectionWrapper id="contact" aria-label="Contact and Social Connectivity">
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
            maxWidth: "32rem",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Have a project in mind or want to collaborate? Drop me a message and
          I&apos;ll get back to you soon.
        </motion.p>
      </div>

      {/* ── Two-column contact card ── */}
      <motion.div
        variants={itemVariants}
        className="glass-card contact-card"
      >
        {/* ━━━ LEFT: Contact Details & Location ━━━ */}
        <div className="contact-info-panel">
          <div>
            <h3 className="contact-info-heading">Contact Details</h3>
            <p className="contact-info-subtext">
              Feel free to reach out through any of the channels below.
            </p>
          </div>

          {/* Detail items */}
          <div className="contact-details-list">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href
                ? {
                    href: item.href,
                    target: item.href.startsWith("http") ? "_blank" : undefined,
                    rel: item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined,
                    "aria-label": `${item.label}: ${item.value}`,
                  }
                : {};

              return (
                <Wrapper
                  key={item.label}
                  className="contact-detail-item"
                  {...wrapperProps}
                >
                  <span className="contact-detail-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div>
                    <span className="contact-detail-label">{item.label}</span>
                    <span className="contact-detail-value">{item.value}</span>
                  </div>
                </Wrapper>
              );
            })}
          </div>

          {/* Divider */}
          <div className="contact-info-divider" aria-hidden="true" />

          {/* Social links */}
          <div>
            <p className="contact-info-socials-label">Follow me</p>
            <div className="contact-socials-row">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={`Visit Shree Krishna on ${s.label} in a new tab`}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ━━━ RIGHT: Message Form ━━━ */}
        <div className="contact-form-panel">
          <h3 className="contact-form-heading">Send a Message</h3>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Name Field */}
            <div style={{ position: "relative" }}>
              <label htmlFor="contact-name" className="sr-only">
                Your Full Name
              </label>
              <User
                size={16}
                aria-hidden="true"
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
                id="contact-name"
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
              <label htmlFor="contact-email" className="sr-only">
                Your Email Address
              </label>
              <Mail
                size={16}
                aria-hidden="true"
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
                id="contact-email"
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
              <label htmlFor="contact-message" className="sr-only">
                Your Message
              </label>
              <MessageSquare
                size={16}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "1rem",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <textarea
                id="contact-message"
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
              aria-label="Send message to Shree Krishna"
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
                  aria-hidden="true"
                >
                  <Send size={16} />
                </motion.span>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Footer spacer for navbar clearance */}
      <div style={{ height: "5rem" }} aria-hidden="true" />
    </SectionWrapper>
  );
}
