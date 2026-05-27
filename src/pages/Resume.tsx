import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Menu, MoonStar, SunMedium, X } from "lucide-react";
import resumePdf from "@/assets/Resume-CV.pdf";
import { GravityStarsBackground } from "@/components/GravityStarsBackground";
import { StarsBackground } from "@/components/StarsBackground";

type ThemeMode = "dark" | "light";

type ResumeBlock = {
  title: string;
  subtitle: string;
  metaRightTop?: string;
  metaRightBottom?: string;
  bullets?: string[];
};

const experienceItems: ResumeBlock[] = [
  {
    title: "Hyper Access Solutions",
    subtitle: "Web Developer",
    metaRightTop: "Davao City, Philippines",
    metaRightBottom: "Nov 2025 - Present",
    bullets: [
      "Developed and maintained web-based business applications for accounting, inventory, and operational workflows using C#, JavaScript, HTML, CSS, and MySQL.",
      "Built and refined user interfaces for transaction-heavy modules, improving usability, data entry flow, and system consistency.",
      "Debugged application issues across frontend, backend, and database layers to improve reliability before deployment.",
      "Collaborated with developers and end users to translate workflow issues into practical system fixes and feature improvements.",
    ],
  },
];

const projectItems: ResumeBlock[] = [
  {
    title: "Semi | Mobile App",
    subtitle: "React Native, Expo, Offline-First Architecture",
    bullets: [
      "Built an offline-first personal finance app for salary planning, wallet-based budgeting, and payable tracking.",
      "Designed budgeting flows for income allocation, balance monitoring, and reduced manual computation errors.",
      "Implemented core modules for salary plans, wallets, payables, transaction history, and settings.",
    ],
  },
  {
    title: "BumbleBee | Mobile App",
    subtitle: "React Native, Offline-First Design",
    bullets: [
      "Developed an offline-first workout planning app built for real training conditions with unreliable internet access.",
      "Structured the app around fast routine access, simple navigation, and practical workout planning flows.",
      "Focused on usability, reliability, and offline access instead of generic fitness tracking features.",
    ],
  },
  {
    title: "Traco | Web App",
    subtitle: "Traceability System, Supply Chain Monitoring",
    bullets: [
      "Built a cacao traceability system to improve record consistency and operational visibility across supply chain workflows.",
      "Supported real-time tracking and user-facing workflows for field users and supply chain stakeholders.",
      "Centralized traceability records in a web-based system for easier access, monitoring, and management.",
    ],
  },
  {
    title: "RaHike | Mobile App",
    subtitle: "React Native, Live Tracking",
    bullets: [
      "Developed a hiking companion app for trail discovery, live tracking, and progress-based outdoor exploration.",
      "Designed features for route visibility, activity monitoring, and user progress tracking.",
      "Built the app around practical hiking use cases rather than static location browsing.",
    ],
  },
  {
    title: "TraKs | Mobile App",
    subtitle: "Capstone Project, Tourism Monitoring",
    bullets: [
      "Developed a capstone tourism tracking application for activity monitoring and report generation.",
      "Built features that improved activity tracking, reporting accuracy, and tourism data visibility.",
      "Designed the system to support organized field reporting and monitoring workflows.",
    ],
  },
];

const skillGroups = [
  "Languages: PHP, C#, JavaScript, HTML, CSS, Dart",
  "Frameworks: Laravel, React, Flutter",
  "Tools: VS Code, Visual Studio, MySQL, Firebase, Supabase",
];

const ResumeSection = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => (
  <section className="resume-paper-section">
    <div className="resume-paper-rule" />
    <h2 className="resume-paper-section-title">{heading}</h2>
    <div className="resume-paper-section-content">{children}</div>
  </section>
);

const ResumeEntry = ({
  item,
  compact = false,
}: {
  item: ResumeBlock;
  compact?: boolean;
}) => (
  <article className={`resume-entry${compact ? " resume-entry--compact" : ""}`}>
    <div className="resume-entry-header">
      <div>
        <h3 className="resume-entry-title">{item.title}</h3>
        <p className="resume-entry-subtitle">{item.subtitle}</p>
      </div>
      {(item.metaRightTop || item.metaRightBottom) && (
        <div className="resume-entry-meta">
          {item.metaRightTop ? <p>{item.metaRightTop}</p> : null}
          {item.metaRightBottom ? <p>{item.metaRightBottom}</p> : null}
        </div>
      )}
    </div>
    {item.bullets?.length ? (
      <ul className="resume-entry-bullets">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

const Resume = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      <StarsBackground
        aria-hidden="true"
        starColor={themeMode === "dark" ? "rgba(255, 255, 255, 0.92)" : "rgba(20, 28, 40, 0.62)"}
        className={`portfolio-stars-background${themeMode === "dark" ? "" : " portfolio-stars-background--hidden"}`}
      />
      <GravityStarsBackground
        aria-hidden="true"
        className={`portfolio-gravity-background${themeMode === "light" ? "" : " portfolio-gravity-background--hidden"}`}
      />

      <div className="relative z-10">
        <header className="resume-topbar">
          <div className="resume-topbar-inner">
            <Link to="/" className="resume-topbar-title">
              Bim Rochee&apos;s Portfolio
            </Link>
            <div className="relative flex items-center gap-3">
              <button
                type="button"
                onClick={() => setThemeMode((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
                className="theme-toggle-button"
                aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
              >
                {themeMode === "dark" ? <SunMedium className="h-3.5 w-3.5" strokeWidth={1.8} /> : <MoonStar className="h-3.5 w-3.5" strokeWidth={1.8} />}
                <span>{themeMode === "dark" ? "Light" : "Dark"}</span>
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="resume-menu-button"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-3.5 w-3.5" strokeWidth={1.8} /> : <Menu className="h-3.5 w-3.5" strokeWidth={1.8} />}
                <span>Menu</span>
              </button>
              {menuOpen && (
                <nav className="resume-menu-popover">
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className="resume-menu-link"
                    >
                      Portfolio
                    </Link>
                    <a
                      href={resumePdf}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="resume-menu-link"
                    >
                      Open PDF
                    </a>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </header>

        <main className="portfolio-page-main mx-auto max-w-[58rem] px-5 pb-12 md:px-8 md:pb-14">
          <section className="resume-paper-shell">
            <div className="resume-paper-toolbar">
              <div className="resume-paper-heading-group">
                <Link to="/" className="resume-paper-back">
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                  <span>Back</span>
                </Link>
                <p className="resume-paper-label">Resume</p>
                <h1 className="resume-paper-heading">Resume</h1>
              </div>
              <a
                href={resumePdf}
                download="Resume-CV.pdf"
                className="resume-paper-action"
              >
                <span>Download PDF</span>
                <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
              </a>
            </div>

            <article className="resume-paper">
              <header className="resume-paper-header">
                <h1 className="resume-paper-name">BIM ROCHEE P. AGLIAM</h1>
                <div className="resume-paper-rule" />
                <p className="resume-paper-contact">
                  Davao City, Davao del Sur | 8000 | dev.bimrochee@gmail.com | +639103679602 | bimrochee.online
                </p>
              </header>

              <ResumeSection heading="Education">
                <article className="resume-entry resume-entry--compact">
                  <div className="resume-entry-header">
                    <div>
                      <h3 className="resume-entry-title">University of Southeastern Philippines</h3>
                      <p className="resume-entry-subtitle">Bachelor of Science in Information Technology</p>
                      <p className="resume-entry-subtitle">Cum Laude</p>
                    </div>
                    <div className="resume-entry-meta">
                      <p>Davao, Philippines</p>
                      <p>June 2025</p>
                    </div>
                  </div>
                </article>
              </ResumeSection>

              <ResumeSection heading="Experience">
                {experienceItems.map((item) => (
                  <ResumeEntry key={item.title} item={item} />
                ))}
              </ResumeSection>

              <ResumeSection heading="Skills">
                <ul className="resume-skill-list">
                  {skillGroups.map((group) => (
                    <li key={group}>{group}</li>
                  ))}
                </ul>
              </ResumeSection>

              <ResumeSection heading="Projects">
                {projectItems.map((item) => (
                  <ResumeEntry key={item.title} item={item} compact />
                ))}
              </ResumeSection>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resume;
