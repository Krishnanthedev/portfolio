import { personalInfo } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-quote">
          &ldquo;{personalInfo.quote}&rdquo;
        </p>
        <p className="footer-copyright">
          &copy; 2026 Krishna. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
