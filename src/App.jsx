import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SEO from "./components/SEO";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CursorGlow from "./components/CursorGlow";
import ThemeToggle from "./components/ThemeToggle";
import IntroSection from "./components/IntroSection";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  const handleIntroDone = () => {
    setIntroDone(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      {/* Dynamic SEO & Schema.org JSON-LD */}
      <SEO />

      {/* Accessible Skip Link for Keyboard Navigation & Web Standards */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Splash / Loading Screen */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Cursor-following glow spotlight */}
      {!loading && <CursorGlow />}

      {/* Dark / Light mode toggle */}
      {!loading && <ThemeToggle />}

      {/* Ambient background glows */}
      <div
        className="ambient-glow"
        aria-hidden="true"
        style={{
          width: "400px",
          height: "400px",
          background: "#4facfe",
          top: "30%",
          left: "-10%",
        }}
      />
      <div
        className="ambient-glow"
        aria-hidden="true"
        style={{
          width: "350px",
          height: "350px",
          background: "#7f00ff",
          top: "60%",
          right: "-8%",
        }}
      />
      <div
        className="ambient-glow"
        aria-hidden="true"
        style={{
          width: "300px",
          height: "300px",
          background: "#ff758c",
          top: "85%",
          left: "20%",
        }}
      />

      {/* Main Landmark & Content Sections */}
      {!loading && (
        <main id="main-content">
          {!introDone && <IntroSection onDone={handleIntroDone} />}
          <Hero />
          <AboutMe />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
          <Footer />
        </main>
      )}

      {/* Floating Dock Navbar (rendered last for z-index & semantic landmark) */}
      {!loading && <Navbar />}
    </>
  );
}
