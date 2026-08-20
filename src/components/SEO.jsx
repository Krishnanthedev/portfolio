import { useEffect } from "react";
import { siteConfig, personalInfo, socialLinks, skills, education, certifications, projects } from "../data/portfolio";

export default function SEO() {
  useEffect(() => {
    // Generate structured data from the portfolio.js data source
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${siteConfig.siteUrl}/#person`,
          "name": personalInfo.name,
          "jobTitle": personalInfo.title,
          "description": personalInfo.description,
          "url": siteConfig.siteUrl,
          "image": `${siteConfig.siteUrl}${siteConfig.ogImage}`,
          "email": `mailto:${personalInfo.email}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": personalInfo.addressLocality || "Bengaluru",
            "addressCountry": personalInfo.addressCountry || "IN",
          },
          "sameAs": Object.values(socialLinks),
          "knowsAbout": skills.map((s) => s.name),
          "alumniOf": education.map((edu) => ({
            "@type": "EducationalOrganization",
            "name": edu.institution,
          })),
          "hasCredential": certifications.map((cert) => ({
            "@type": "EducationalOccupationalCredential",
            "name": cert.name,
            "recognizedBy": {
              "@type": "Organization",
              "name": cert.issuer,
            },
          })),
        },
        {
          "@type": "WebSite",
          "@id": `${siteConfig.siteUrl}/#website`,
          "url": siteConfig.siteUrl,
          "name": siteConfig.siteName,
          "description": siteConfig.description,
          "inLanguage": "en-US",
          "publisher": {
            "@id": `${siteConfig.siteUrl}/#person`,
          },
          "author": {
            "@id": `${siteConfig.siteUrl}/#person`,
          },
        },
        {
          "@type": "ProfilePage",
          "@id": `${siteConfig.siteUrl}/#webpage`,
          "url": siteConfig.siteUrl,
          "name": siteConfig.defaultTitle,
          "isPartOf": {
            "@id": `${siteConfig.siteUrl}/#website`,
          },
          "about": {
            "@id": `${siteConfig.siteUrl}/#person`,
          },
          "mainEntity": {
            "@id": `${siteConfig.siteUrl}/#person`,
          },
        },
        {
          "@type": "ItemList",
          "@id": `${siteConfig.siteUrl}/#projects`,
          "name": "Featured Projects",
          "itemListElement": projects.map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
              "@type": "SoftwareSourceCode",
              "name": p.title,
              "description": p.description,
              "codeRepository": p.repoUrl,
              "programmingLanguage": p.tags,
            },
          })),
        },
      ],
    };

    // Find or create dynamic JSON-LD tag
    let scriptTag = document.getElementById("dynamic-json-ld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "dynamic-json-ld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  return null;
}
