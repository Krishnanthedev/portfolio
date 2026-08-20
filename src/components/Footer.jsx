import { personalInfo } from "../data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site Footer">
      <div className="footer-inner">
        <blockquote className="footer-quote">
          &ldquo;{personalInfo.quote}&rdquo;
        </blockquote>
        <p className="footer-copyright">
          &copy; {currentYear} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
