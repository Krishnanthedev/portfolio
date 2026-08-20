import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Code,
  FolderGit2,
  Code2,
} from "lucide-react";

// Custom GitHub icon (lucide-react removed it)
function GithubIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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
function LinkedinIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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

// Custom X (Twitter) icon
function XIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 4l11.733 16H20L8.267 4z" />
      <path d="M4 20l6.768-6.768" />
      <path d="M20 4l-6.768 6.768" />
    </svg>
  );
}

// Custom DEV Community icon
function DevIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="3" />
      <path d="M6 9h1.5a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 7.5 15H6V9z" />
      <path d="M12 9h2M12 12h1.5M12 15h2" />
      <path d="M16.5 9l1.5 6 1.5-6" />
    </svg>
  );
}

import { socialLinks } from "../data/portfolio";

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "#hero", type: "scroll" },
  {
    id: "skills",
    icon: Code,
    label: "Skills",
    href: "#skills",
    type: "scroll",
  },
  {
    id: "projects",
    icon: FolderGit2,
    label: "Projects",
    href: "#projects",
    type: "scroll",
  },
  {
    id: "github",
    icon: GithubIcon,
    label: "GitHub",
    href: socialLinks.github,
    type: "external",
  },
  {
    id: "linkedin",
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: socialLinks.linkedin,
    type: "external",
  },
  {
    id: "x",
    icon: XIcon,
    label: "X",
    href: socialLinks.x,
    type: "external",
  },
  {
    id: "leetcode",
    icon: Code2,
    label: "LeetCode",
    href: socialLinks.leetcode,
    type: "external",
  },
  {
    id: "dev",
    icon: DevIcon,
    label: "DEV Community",
    href: socialLinks.devCommunity || socialLinks.dev || socialLinks.Dev,
    type: "external",
  },
];

const tooltipVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.8,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = ["hero", "skills", "projects", "education", "certifications", "contact"];
    const observers = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const mapped = sectionId === "hero" ? "home" : sectionId;
            setActiveSection(mapped);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClick = (item) => {
    if (item.type === "external") {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      const target = item.href === "#hero" ? "#hero" : item.href;
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className="glass-nav"
      aria-label="Main Navigation Dock"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        borderRadius: "9999px",
        padding: "0.75rem 1.25rem",
        display: "flex",
        gap: "0.25rem",
        alignItems: "center",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <div
            key={item.id}
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  role="tooltip"
                  id={`tooltip-${item.id}`}
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginBottom: "0.75rem",
                    whiteSpace: "nowrap",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(148, 163, 184, 0.15)",
                    backdropFilter: "blur(12px)",
                    color: "#f1f5f9",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    padding: "0.375rem 0.75rem",
                    borderRadius: "0.5rem",
                    pointerEvents: "none",
                  }}
                >
                  {item.label}
                  {/* Tooltip arrow */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: "8px",
                      height: "8px",
                      background: "rgba(15, 23, 42, 0.9)",
                      borderRight: "1px solid rgba(148, 163, 184, 0.15)",
                      borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
                    }}
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Icon Button */}
            <motion.button
              onClick={() => handleClick(item)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={item.type === "external" ? `External link to ${item.label}` : `Navigate to ${item.label} section`}
              aria-current={isActive ? (item.type === "scroll" ? "true" : undefined) : undefined}
              aria-describedby={hoveredItem === item.id ? `tooltip-${item.id}` : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isActive
                  ? "rgba(0, 242, 254, 0.12)"
                  : "transparent",
                color: isActive ? "#00f2fe" : "#94a3b8",
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
}
