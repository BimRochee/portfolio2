import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  Menu,
  MoonStar,
  SunMedium,
  X,
} from "lucide-react";
import portrait from "@/assets/bim-portrait.jpg";
import traksIcon from "@/assets/traks-icon.png";
import tracoIcon from "@/assets/traco-icon.png";
import tracoIconLight from "@/assets/traco-icon(light mode).png";
import bumblebeeIcon from "@/assets/bumblebee-icon.png";

const portraitFrameModules = import.meta.glob("../assets/bim-portraitVideo/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const portraitFrames = Object.entries(portraitFrameModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, src]) => src);

const aboutDetails = [
  "Mobile and Web",
  "Developer",
  "Based in Philippines",
  "4+ Months of Industry",
  "Experience",
];

const proficiencies = [
  {
    label: "Skills",
    items: ["API Integration", "Frontend Architecture", "Backend Logic", "UX and Layout"],
  },
  {
    label: "Tools",
    items: ["VS Code", "Figma", "Postman", "Notion", "Ai Tools"],
  },
  {
    label: "Tech Stack",
    items: ["React", "Php", "C#", "React Native", "JavaScript", "Dart", "SQL"],
  },
  {
    label: "Spoken Languages",
    items: ["English", "Tagalog", "Bisaya"],
  },
];

const workItems = [
  {
    title: "Web Developer",
    badge: "Current",
    period: "2025 - Now",
    company: "Hyper Access",
    location: "Philippines",
    description:
      "At Hyper Access Solutions, I strengthened my foundation, and core software development practices through hands-on experience.",
  },
  {
    title: "Freelance Developer",
    badge: "Current",
    period: "2024 - Now",
    company: "Freelance",
    location: "Philippines",
    description:
      "As a freelance developer, I design and develop custom systems across web and mobile platforms, delivering solutions tailored to client requirements.",
  },
  {
    title: "Internship",
    badge: "",
    period: "2024 - 2025",
    company: "DOST-PCAARRD",
    location: "Philippines",
    description:
      "During my internship under a DOST-PCAARRD project, I worked as a full-stack developer for a cacao traceability system, building backend components while also assisting in training end-users on system adoption.",
  },
];

const projects = [
  {
    name: "Traks",
    subtitle: "Tourist Tracker",
    icon: traksIcon,
    href: "https://drive.google.com/drive/u/0/folders/1ZKQQNe7yk_EQnFMBiuqjVKWRkr4fwyGp?fbclid=IwY2xjawKJLetleHRuA2FlbQIxMABicmlkETFXRUhHZ01kbVNRRDJKRkI2AR45IWSAklKZxh4AYyBMoy3UZAGKBu0nakxquSFGpS8wkX9Fwr6FT7sQohwtvw_aem_Am2PyZHQu6eeo0isMtmuUA",
  },
  {
    name: "Traco",
    subtitle: "Cacao Traceability",
    icon: tracoIcon,
    lightIcon: tracoIconLight,
    href: "https://drive.google.com/file/d/1yfkAcxMFBXaXA50rj5AQlHkrmXD0lrWT/view?fbclid=IwY2xjawLdx6BleHRuA2FlbQIxMABicmlkETFLaTBUdmlHZXlTMkdDU0lsAR4mGNYKRxkpKjYuDDEy0YgC656KhZczBP-KaIYz4v391ZzJsz__Cg2dcAq7eQ_aem_mKxicc3co5B-Ojy-06q-Lg",
  },
  {
    name: "BumbleBee",
    subtitle: "Smart Gym Guide",
    icon: bumblebeeIcon,
    status: "Releasing Soon",
  },
];

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

type ThemeMode = "dark" | "light";

const Section = ({ id, title, children, className = "" }: SectionProps) => (
  <section
    id={id}
    className={`resume-section ${className}`}
  >
    <div className="resume-section-title-track">
      <h2 className="resume-section-title">
        {title}
      </h2>
    </div>
    <div className="resume-section-content">{children}</div>
  </section>
);

const Index = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPortraitSequenceReady, setIsPortraitSequenceReady] = useState(false);
  const portraitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const portraitImagesRef = useRef<HTMLImageElement[]>([]);
  const portraitAnimationFrameRef = useRef<number | null>(null);
  const portraitProgressRef = useRef(themeMode === "light" ? 1 : 0);
  const pendingPortraitTargetRef = useRef<number | null>(null);

  const maxPortraitFrameIndex = useMemo(
    () => Math.max(portraitFrames.length - 1, 0),
    [],
  );

  const cancelPortraitAnimation = () => {
    if (portraitAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(portraitAnimationFrameRef.current);
      portraitAnimationFrameRef.current = null;
    }
  };

  const drawPortraitFrame = (frameIndex: number) => {
    const canvas = portraitCanvasRef.current;
    const image = portraitImagesRef.current[frameIndex];
    if (!canvas || !image) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const renderWidth = Math.max(Math.round(bounds.width), 1);
    const renderHeight = Math.max(Math.round(bounds.height), 1);
    const devicePixelRatio = window.devicePixelRatio || 1;
    const targetWidth = Math.max(Math.round(renderWidth * devicePixelRatio), 1);
    const targetHeight = Math.max(Math.round(renderHeight * devicePixelRatio), 1);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    const sourceAspectRatio = image.naturalWidth / image.naturalHeight;
    const targetAspectRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (sourceAspectRatio > targetAspectRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * sourceAspectRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / sourceAspectRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  const syncPortraitToProgress = (progress: number) => {
    const clampedProgress = Math.min(1, Math.max(0, progress));
    portraitProgressRef.current = clampedProgress;
    drawPortraitFrame(Math.round(clampedProgress * maxPortraitFrameIndex));
  };

  const animatePortraitTo = (targetProgress: number) => {
    cancelPortraitAnimation();

    const startProgress = portraitProgressRef.current;
    const clampedTarget = Math.min(1, Math.max(0, targetProgress));

    if (Math.abs(startProgress - clampedTarget) < 0.001) {
      syncPortraitToProgress(clampedTarget);
      return;
    }

    const durationMs = Math.max(Math.abs(clampedTarget - startProgress) * 1800, 16);
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const linearProgress = Math.min(elapsed / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
      const nextProgress = startProgress + (clampedTarget - startProgress) * easedProgress;

      syncPortraitToProgress(nextProgress);

      if (linearProgress < 1) {
        portraitAnimationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      portraitAnimationFrameRef.current = null;
      syncPortraitToProgress(clampedTarget);
    };

    portraitAnimationFrameRef.current = window.requestAnimationFrame(step);
  };

  useEffect(() => {
    let cancelled = false;

    const preloadFrame = (src: string) =>
      new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();

        const finish = async () => {
          if (typeof image.decode === "function") {
            try {
              await image.decode();
            } catch {
              // Ignore decode failures and still use the loaded frame.
            }
          }

          resolve(image);
        };

        image.onload = finish;
        image.onerror = () => resolve(image);
        image.decoding = "async";
        image.src = src;

        if (image.complete) {
          void finish();
        }
      });

    Promise.all(portraitFrames.map((src) => preloadFrame(src))).then((images) => {
      if (cancelled) {
        return;
      }

      portraitImagesRef.current = images;
      setIsPortraitSequenceReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    const targetProgress = themeMode === "light" ? 1 : 0;

    if (!isPortraitSequenceReady) {
      pendingPortraitTargetRef.current = targetProgress;
      return;
    }

    const queuedTarget = pendingPortraitTargetRef.current;
    pendingPortraitTargetRef.current = null;
    animatePortraitTo(queuedTarget ?? targetProgress);
  }, [isPortraitSequenceReady, themeMode]);

  useEffect(() => {
    if (!isPortraitSequenceReady) {
      return;
    }

    syncPortraitToProgress(portraitProgressRef.current);

    const handleResize = () => {
      syncPortraitToProgress(portraitProgressRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isPortraitSequenceReady]);

  useEffect(() => {
    return () => {
      cancelPortraitAnimation();
    };
  }, []);

  const toggleTheme = () => {
    setThemeMode((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="resume-topbar">
        <div className="resume-topbar-inner">
          <p className="resume-topbar-title">Bim Rochee&apos;s Resume</p>
          <div className="relative flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
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
                  {["about", "proficiencies", "work", "education", "projects", "contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setMenuOpen(false)}
                      className="resume-menu-link"
                    >
                      {item[0].toUpperCase() + item.slice(1)}
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[58rem] px-5 pb-12 pt-10 md:px-8 md:pb-14 md:pt-14">
        <section id="about" className="hero-frame">
          <div className="hero-title-wrap">
            <h1 className="hero-title">
              Bim Rochee P.
              <br />
              Agliam
            </h1>
          </div>

          <div className="hero-aside">
            <div aria-hidden="true" className="hero-grid" />

            <div className="hero-content">
              <div className="hero-meta-row">
                <div>
                  <div className="hero-portrait-shell">
                    <img
                      src={portrait}
                      className={`hero-portrait hero-portrait-fallback${isPortraitSequenceReady ? " hero-portrait-fallback--hidden" : ""}`}
                      alt="Bim Rochee P. Agliam portrait"
                    />
                    <canvas
                      ref={portraitCanvasRef}
                      className={`hero-portrait hero-portrait-canvas${isPortraitSequenceReady ? " hero-portrait-canvas--ready" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="hero-about-label">About</p>
                </div>

                <div className="hero-detail-list">
                  {aboutDetails.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>

              <div className="hero-divider" />

              <p className="hero-summary">
                When I&apos;m not coding, you&apos;ll find me on the badminton court, gym, pool table, basketball
                court, or frisbee field.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-14 md:mt-16">
          <Section id="proficiencies" title="Proficiencies" className="section-gap-proficiencies">
            <div className="proficiencies-panel">
              {proficiencies.map((group, index) => (
                <div
                  key={group.label}
                  className={`proficiencies-row ${index < proficiencies.length - 1 ? "proficiencies-row--divided" : ""}`}
                >
                  <p className="proficiencies-label">{group.label}</p>
                  <div className="proficiencies-items">
                    {group.items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="work" title="Work" className="section-gap-work">
            <div className="work-panel">
              {workItems.map((item, index) => (
                <article
                  key={item.title}
                  className={`work-item ${index < workItems.length - 1 ? "work-item--divided" : ""}`}
                >
                  <div className="work-heading-row">
                    <h3 className="work-title">{item.title}</h3>
                    {item.badge ? (
                      <span className="work-badge">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="work-meta-row">
                    <span className="work-meta-item">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </span>
                    <span className="work-meta-item">
                      <Briefcase className="h-3.5 w-3.5" />
                      {item.company}
                    </span>
                    <span className="work-meta-item">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <p className="work-description">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education" className="section-gap-education">
            <div className="education-panel">
              <article className="education-item">
                <div className="education-heading-row">
                  <h3 className="education-title">BS in Information Technology</h3>
                  <span className="education-badge">Highest</span>
                </div>

                <div className="education-meta-row">
                  <span className="education-meta-item">
                    <Calendar className="h-3.5 w-3.5" />
                    2021 - 2025
                  </span>
                  <span className="education-meta-item">
                    <GraduationCap className="h-3.5 w-3.5" />
                    USeP
                  </span>
                  <span className="education-meta-item">
                    <MapPin className="h-3.5 w-3.5" />
                    Philippines
                  </span>
                </div>

                <p className="education-description">
                  For my capstone project, I developed TraKs, a full-stack mobile and web system featuring
                  real-time alerts, onboarding flows, and reporting functionalities. Graduated as Cum Laude.
                </p>
              </article>
            </div>
          </Section>

          <Section id="projects" title="Projects" className="section-gap-projects">
            <div className="projects-panel">
              <div
                aria-hidden="true"
                className="projects-grid"
              />

              <div className="projects-stack">
                <div className="projects-list">
                  {projects.map((project) => {
                    const cardContent = (
                      <>
                        <div className="project-card-main">
                          <img
                            src={themeMode === "light" && "lightIcon" in project ? project.lightIcon ?? project.icon : project.icon}
                            alt={project.name}
                            className="project-card-icon"
                          />
                          <div>
                            <p className="project-card-title">{project.name}</p>
                            <p className="project-card-subtitle">{project.subtitle}</p>
                          </div>
                        </div>
                        {"status" in project && project.status ? (
                          <span className="project-card-status">{project.status}</span>
                        ) : (
                          <ArrowUpRight className="project-card-arrow" strokeWidth={1.8} />
                        )}
                      </>
                    );

                    if (project.href) {
                      return (
                        <a
                          key={project.name}
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="project-card"
                        >
                          {cardContent}
                        </a>
                      );
                    }

                    return (
                      <div
                        key={project.name}
                        className="project-card project-card--static"
                      >
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="contact-panel">
              <a
                href="mailto:dev.bimrochee@gmail.com"
                className="contact-link"
              >
                <span>Mail</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <br />
              <a
                href="https://github.com/BimRochee"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>GitHub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <br />
              <a
                href="https://www.linkedin.com/in/bim-rochee-agliam-606840167/"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>LinkedIn</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Section>
        </div>

        <footer className="footer-fullbleed">
          <div className="footer-inner footer-copy">
            <span>© 2026 Bim Rochee Agliam</span>
            <span>For Commission Contact Me</span>
            <span>Let's Create Something Amazing Together!</span>
            <span>Created with ❤️</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
