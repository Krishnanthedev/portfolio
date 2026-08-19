import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(1); // 1 = "Loading...", 2 = done

  // Auto-advance from phase 1 after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => setPhase(2), 2500);
    return () => clearTimeout(timer);
  }, []);

  // When phase 2 is reached, signal App to unmount loader
  useEffect(() => {
    if (phase === 2) {
      // Small delay so the exit animation plays
      const t = setTimeout(() => onComplete?.(), 100);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase === 1 && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Loading... text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "0.15em",
              }}
            >
              Loading
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                ...
              </motion.span>
            </p>

            {/* Subtle gradient line */}
            <div className="loader-line" style={{ margin: "1.5rem auto 0" }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
