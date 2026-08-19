import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function IntroSection({ onDone }) {
  const containerRef = useRef(null);
  const hasFired = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Fade out as user scrolls past
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  // When user scrolls past 85%, unmount permanently
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.85 && !hasFired.current) {
        hasFired.current = true;
        onDone?.();
      }
    });
    return unsubscribe;
  }, [scrollYProgress, onDone]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{ opacity, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: "48rem",
          }}
        >
          {/* Code block styled intro */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "1rem",
              padding: "2.5rem 3rem",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              textAlign: "left",
              fontFamily: "var(--font-mono)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Editor dots */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ff5f57",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ffbd2e",
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#28c840",
                }}
              />
            </div>

            {/* Line 1: import */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ marginBottom: "0.75rem" }}
            >
              <span style={{ color: "#c678dd", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                import{" "}
              </span>
              <span
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  fontWeight: 700,
                }}
                className="gradient-text-cyan"
              >
                Coffee
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                ;
              </span>
            </motion.div>

            {/* Line 2: export */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ marginBottom: "0.75rem" }}
            >
              <span style={{ color: "#c678dd", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                export{" "}
              </span>
              <span
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  fontWeight: 700,
                }}
                className="gradient-text-coral"
              >
                Code
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                ;
              </span>
            </motion.div>

            {/* Line 3: comment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                  fontStyle: "italic",
                }}
              >
                {"// building things that matter ✨"}
              </span>
            </motion.div>

            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.25rem",
                background: "#4facfe",
                marginLeft: "4px",
                verticalAlign: "text-bottom",
              }}
            />
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
