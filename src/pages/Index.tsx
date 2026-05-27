import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  Calendar,
  Database,
  GraduationCap,
  MapPin,
  Menu,
  MoonStar,
  Smartphone,
  SunMedium,
  WifiOff,
  X,
} from "lucide-react";
import portrait from "@/assets/bim-portrait.jpg";
import traksIcon from "@/assets/traks-icon.png";
import tracoIcon from "@/assets/traco-icon.png";
import tracoIconLight from "@/assets/traco-icon(light mode).png";
import bumblebeeIcon from "@/assets/bumblebee-icon.png";
import payvaultIcon from "@/assets/payvault-icon.png";
import rahikeIcon from "@/assets/rahike-icon.png";
import semiIcon from "@/assets/semi-icon.png";
import { GravityStarsBackground } from "@/components/GravityStarsBackground";
import { StarsBackground } from "@/components/StarsBackground";

const portraitFrameModules = import.meta.glob("../assets/bim-portraitVideo/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const portraitFrames = Object.entries(portraitFrameModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, src]) => src);

const industryExperienceStartDate = new Date(2025, 10, 26);

const getCompletedMonthsSince = (startDate: Date, currentDate: Date) => {
  let completedMonths =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12
    + (currentDate.getMonth() - startDate.getMonth());

  if (currentDate.getDate() < startDate.getDate()) {
    completedMonths -= 1;
  }

  return Math.max(completedMonths, 0);
};

const getNextMonthAnniversary = (startDate: Date, currentDate: Date) => {
  const completedMonths = getCompletedMonthsSince(startDate, currentDate);
  return new Date(
    startDate.getFullYear(),
    startDate.getMonth() + completedMonths + 1,
    startDate.getDate(),
  );
};

const workItems = [
  {
    title: "Web Developer",
    badge: "Current",
    period: "2025 - Now",
    company: "Hyper Access",
    location: "Philippines",
    summary:
      "Contributed to production web systems by implementing feature updates and workflow improvements based on structured GAP analysis documents. Translated business requirements into functional UI behavior, integrated with existing backend services, and ensured system reliability across real-world use cases, leveraging AI-assisted development to accelerate delivery.",
    highlights: [
      "Implemented frontend features and workflow updates by aligning UI behavior with defined GAP analysis and business process flows.",
      "Integrated and consumed existing backend APIs to support new and updated system functionality.",
      "Reused and extended existing UI components, improving performance, usability, and consistency across the application.",
      "Debugged and maintained features within a shared production codebase, ensuring stability under real-world constraints.",
      "Leveraged AI-assisted tools to accelerate development, code iteration, and problem-solving while maintaining code quality.",
      "Worked within evolving requirements, existing architecture, and cross-team handoffs in a production environment.",
    ],
  },
  {
    title: "Freelance Developer",
    badge: "Current",
    period: "2024 - Now",
    company: "Freelance",
    location: "Philippines",
    summary:
      "Design and ship custom mobile and web systems with a focus on usable flows, clear data models, and solutions that match real client operations.",
    highlights: [
      "Scoped features from business needs, then translated them into concrete interfaces, logic, and database-backed workflows.",
      "Took ownership from initial structure through implementation, iteration, and client-facing adjustments.",
    ],
  },
  {
    title: "Internship",
    badge: "",
    period: "2024 - 2025",
    company: "DOST-PCAARRD",
    location: "Philippines",
    summary:
      "Contributed to a cacao traceability system used in a real agricultural workflow, covering backend implementation, mobile support, and end-user adoption.",
    highlights: [
      "Helped shape a system where data quality, traceability, and field usability mattered more than a polished demo.",
      "Supported onboarding and training, which improved how I design software for people who need clarity and reliability first.",
    ],
  },
];

const flagshipProject = {
  name: "BumbleBee",
  subtitle: "Offline-first training system",
  icon: bumblebeeIcon,
  status: "Preparing for release",
  summary:
    "BumbleBee is my flagship project: a workout planning system designed to keep working in real training conditions, with guided plan generation, structured progression, and logic that stays useful even when connectivity is unreliable.",
  details: [
    {
      title: "Problem",
      description:
        "Most fitness apps assume stable internet, generic templates, or manual planning. I wanted a system that could adapt to user constraints while staying dependable during actual workouts.",
    },
    {
      title: "System Design",
      description:
        "I structured the product around offline-first data access, deterministic progression rules, and AI-assisted planning where guidance helps the user without making the experience unpredictable.",
    },
    {
      title: "Why It Matters",
      description:
        "The result is a product that reduces planning friction, supports decision-making in context, and treats reliability as a feature instead of an afterthought.",
    },
  ],
  signals: [
    "Offline-first workflow support",
    "AI-assisted plan generation",
    "Rule-based progression logic",
    "Mobile-first product design",
  ],
  metrics: [
    "Keeps core planning workflows usable without internet",
    "Turns broad user constraints into structured workout recommendations",
    "Balances deterministic system logic with assisted guidance",
  ],
};

const supportingProjects = [
  {
    name: "RaHike",
    subtitle: "Outdoor trail and hike companion",
    icon: rahikeIcon,
    overview:
      "Built as a hiking companion focused on trail discovery, live tracking, and progress-driven outdoor exploration across curated routes, climb stats, and achievement-style momentum.",
    impact:
      "Packages trail exploration, live hike tracking, and long-term outdoor progress into one mobile experience designed to feel premium and motivating.",
    tags: ["React Native", "Expo Router", "Live tracking", "Product design"],
    note: "Releasing soon",
  },
  {
    name: "Semi",
    subtitle: "Offline salary planning ledger",
    icon: semiIcon,
    overview:
      "Built as an offline-first personal finance app for Filipino employees, centered on semi-monthly salary planning, wallet-based allocations, and a ledger approach that computes balances from actual money movement.",
    impact:
      "Turns payday budgeting into a more disciplined flow by giving every peso a destination, keeping financial data private on-device, and reducing balance errors through ledger-based tracking.",
    tags: ["React Native", "Expo", "Offline-first", "Ledger-based"],
    note: "In active testing",
  },
  {
    name: "PayVault",
    subtitle: "Private salary record vault",
    icon: payvaultIcon,
    overview:
      "Built as a privacy-first salary tracker for a real payday workflow: record the amount received first, complete the payslip breakdown later, and keep everything secured on-device with PIN and optional biometrics.",
    impact:
      "Turns a messy real-life payroll habit into a structured mobile flow with local history, analytics, JSON backup and restore, and CSV export.",
    tags: ["React Native", "Local-first", "Biometrics", "Export tools"],
    note: "Releasing soon",
  },
  {
    name: "Traks",
    subtitle: "Tourism tracking and reporting",
    icon: traksIcon,
    overview:
      "Built as a full-stack capstone system for tourism operations, with real-time alerts, reporting flows, and onboarding paths that make tracking activity easier for teams on the ground.",
    impact:
      "Reduced manual monitoring steps and made location-based updates easier to review and act on.",
    tags: ["Full-stack", "Real-time alerts", "Reporting", "Onboarding"],
    href: "https://drive.google.com/drive/u/0/folders/1ZKQQNe7yk_EQnFMBiuqjVKWRkr4fwyGp?fbclid=IwY2xjawKJLetleHRuA2FlbQIxMABicmlkETFXRUhHZ01kbVNRRDJKRkI2AR45IWSAklKZxh4AYyBMoy3UZAGKBu0nakxquSFGpS8wkX9Fwr6FT7sQohwtvw_aem_Am2PyZHQu6eeo0isMtmuUA",
  },
  {
    name: "Traco",
    subtitle: "Cacao traceability workflow",
    icon: tracoIcon,
    lightIcon: tracoIconLight,
    overview:
      "Supported a traceability system for cacao workflows where consistent records, operational clarity, and adoption by real users mattered more than a portfolio-friendly demo.",
    impact:
      "Improved traceability flow by organizing backend-backed records and making field processes easier to follow and explain.",
    tags: ["Traceability", "Backend logic", "Field workflow", "System adoption"],
    href: "https://drive.google.com/file/d/1yfkAcxMFBXaXA50rj5AQlHkrmXD0lrWT/view?fbclid=IwY2xjawLdx6BleHRuA2FlbQIxMABicmlkETFLaTBUdmlHZXlTMkdDU0lsAR4mGNYKRxkpKjYuDDEy0YgC656KhZczBP-KaIYz4v391ZzJsz__Cg2dcAq7eQ_aem_mKxicc3co5B-Ojy-06q-Lg",
  },
];

const approachItems = [
  {
    title: "Design for real usage, not ideal conditions",
    description:
      "I pay attention to weak connectivity, user interruptions, and practical constraints because systems should stay helpful outside perfect demo environments.",
  },
  {
    title: "Use structure before complexity",
    description:
      "When a product needs guidance, I prefer clear rules, strong data models, and predictable behavior before adding heavier automation.",
  },
  {
    title: "Make tradeoffs visible",
    description:
      "I like systems where the reasoning behind the architecture is clear: what stays local, what syncs later, and where assistance should remain explainable.",
  },
];

const stackItems = [
  {
    icon: Smartphone,
    title: "React Native",
    description:
      "My default choice when I want to move quickly across platforms while still shaping a mobile-first product experience around real user flows.",
  },
  {
    icon: WifiOff,
    title: "Local-first persistence",
    description:
      "I reach for local storage and offline-friendly state when the product has to remain useful during interruptions, poor signal, or field usage.",
  },
  {
    icon: Database,
    title: "Backend and data modeling",
    description:
      "I care about clean records, predictable relationships, and structures that make reporting, traceability, or progression logic easier to maintain.",
  },
  {
    icon: BrainCircuit,
    title: "AI with guardrails",
    description:
      "I use AI where it improves guidance or planning, but I pair it with product constraints and deterministic logic so the outcome stays understandable.",
  },
];

const scrollSections = [
  { id: "about", label: "About" },
  { id: "flagship", label: "BumbleBee" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
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
  const [industryExperienceMonths, setIndustryExperienceMonths] = useState(() =>
    getCompletedMonthsSince(industryExperienceStartDate, new Date()),
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(scrollSections[0].id);
  const [scrollIndicatorTransitionMs, setScrollIndicatorTransitionMs] = useState(140);
  const portraitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const portraitImagesRef = useRef<HTMLImageElement[]>([]);
  const portraitAnimationFrameRef = useRef<number | null>(null);
  const portraitProgressRef = useRef(themeMode === "light" ? 1 : 0);
  const pendingPortraitTargetRef = useRef<number | null>(null);
  const lastScrollSampleRef = useRef({
    scrollY: 0,
    timestamp: 0,
  });

  const aboutDetails = useMemo(
    () => [
      "Offline-first mobile systems",
      "AI-assisted product logic",
      "React Native, web, and backend",
      "Based in Philippines",
      `${industryExperienceMonths} ${industryExperienceMonths === 1 ? "Month" : "Months"} in industry`,
    ],
    [industryExperienceMonths],
  );

  const maxPortraitFrameIndex = useMemo(
    () => Math.max(portraitFrames.length - 1, 0),
    [],
  );

  const activeSectionLabel = useMemo(
    () => scrollSections.find((section) => section.id === activeSectionId)?.label ?? scrollSections[0].label,
    [activeSectionId],
  );

  const scrollIndicatorProgress = Math.min(Math.max(scrollProgress, 0), 1);
  const scrollLabelPosition = scrollIndicatorProgress * 100;
  const activeSectionLabelTransform = scrollIndicatorProgress <= 0.04
    ? "translateX(0)"
    : scrollIndicatorProgress >= 0.96
      ? "translateX(-100%)"
      : "translateX(-50%)";

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
    let animationFrameId: number | null = null;

    const updateScrollIndicator = () => {
      animationFrameId = null;
      const timestamp = performance.now();

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextScrollProgress = scrollableHeight > 0
        ? Number((window.scrollY / scrollableHeight).toFixed(4))
        : 0;
      const deltaScrollY = Math.abs(window.scrollY - lastScrollSampleRef.current.scrollY);
      const deltaTime = Math.max(timestamp - lastScrollSampleRef.current.timestamp, 1);
      const scrollVelocity = deltaScrollY / deltaTime;
      const anchorPosition = window.scrollY + window.innerHeight * 0.32;
      const speedFactor = Math.min(scrollVelocity / 2.4, 1);
      const nextTransitionMs = Math.round(160 - speedFactor * 120);

      let nextActiveSectionId = scrollSections[0].id;

      for (const section of scrollSections) {
        const sectionElement = document.getElementById(section.id);

        if (!sectionElement) {
          continue;
        }

        if (anchorPosition >= sectionElement.offsetTop) {
          nextActiveSectionId = section.id;
        }
      }

      setScrollProgress(nextScrollProgress);
      setScrollIndicatorTransitionMs((currentDuration) => (
        Math.abs(currentDuration - nextTransitionMs) >= 8 ? nextTransitionMs : currentDuration
      ));
      setActiveSectionId((currentSectionId) => (
        currentSectionId === nextActiveSectionId ? currentSectionId : nextActiveSectionId
      ));

      lastScrollSampleRef.current = {
        scrollY: window.scrollY,
        timestamp,
      };
    };

    const requestScrollIndicatorUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateScrollIndicator);
    };

    lastScrollSampleRef.current = {
      scrollY: window.scrollY,
      timestamp: performance.now(),
    };

    requestScrollIndicatorUpdate();

    window.addEventListener("scroll", requestScrollIndicatorUpdate, { passive: true });
    window.addEventListener("resize", requestScrollIndicatorUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", requestScrollIndicatorUpdate);
      window.removeEventListener("resize", requestScrollIndicatorUpdate);
    };
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const nextMonthAnniversary = getNextMonthAnniversary(industryExperienceStartDate, currentDate);
    const timeoutMs = Math.max(nextMonthAnniversary.getTime() - currentDate.getTime(), 0);

    const timeoutId = window.setTimeout(() => {
      setIndustryExperienceMonths(getCompletedMonthsSince(industryExperienceStartDate, new Date()));
    }, timeoutMs + 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [industryExperienceMonths]);

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
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
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
            <p className="resume-topbar-title">Bim Rochee&apos;s Portfolio</p>
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
                    {scrollSections.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="resume-menu-link"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </nav>
              )}
            </div>
          </div>
          <div className="resume-scroll-progress" aria-hidden="true">
            <div
              className="resume-scroll-progress-inner"
              style={{ "--scroll-indicator-duration": `${scrollIndicatorTransitionMs}ms` } as CSSProperties}
            >
              <div className="resume-scroll-progress-track">
                <span
                  className="resume-scroll-progress-fill"
                  style={{ transform: `scaleX(${scrollIndicatorProgress})` }}
                />
                <span
                  className="resume-scroll-progress-glow"
                  style={{ left: `calc(${scrollIndicatorProgress * 100}% - 12px)` }}
                />
                {scrollSections.map((section, index) => (
                  <span
                    key={section.id}
                    className={`resume-scroll-progress-stop${activeSectionId === section.id ? " resume-scroll-progress-stop--active" : ""}`}
                    style={{
                      left: `${(index / Math.max(scrollSections.length - 1, 1)) * 100}%`,
                    }}
                  />
                ))}
              </div>
              <p
                className="resume-scroll-progress-label"
                style={{
                  left: `${scrollLabelPosition}%`,
                  transform: activeSectionLabelTransform,
                }}
              >
                {activeSectionLabel}
              </p>
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

              <div className="hero-summary">
                <p>
                  I build mobile and web products that stay useful in real-world conditions, from low-connectivity
                  workflows to guided user decisions shaped by structured system logic.
                </p>
                <p className="hero-proof">
                  Selected work includes tourism tracking, cacao traceability, and BumbleBee, an offline-first
                  training system with AI-assisted planning and progression rules.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14 md:mt-16">
          <section id="flagship" className="flagship-section">
            <div className="flagship-heading">
              <p className="flagship-label">Flagship Project</p>
              <h2 className="flagship-title">BumbleBee</h2>
            </div>

            <article className="flagship-card">
              <div className="flagship-topbar">
                <div className="flagship-identity">
                  <img src={flagshipProject.icon} alt={flagshipProject.name} className="flagship-icon" />
                  <div>
                    <p className="flagship-name">{flagshipProject.name}</p>
                    <p className="flagship-subtitle">{flagshipProject.subtitle}</p>
                  </div>
                </div>
                <span className="flagship-status">{flagshipProject.status}</span>
              </div>

              <p className="flagship-summary">{flagshipProject.summary}</p>

              <div className="flagship-signals">
                {flagshipProject.signals.map((signal) => (
                  <span key={signal} className="flagship-signal">
                    {signal}
                  </span>
                ))}
              </div>

              <div className="flagship-details">
                {flagshipProject.details.map((detail) => (
                  <div key={detail.title} className="flagship-detail-card">
                    <p className="flagship-detail-title">{detail.title}</p>
                    <p className="flagship-detail-description">{detail.description}</p>
                  </div>
                ))}
              </div>

              <div className="flagship-impact">
                <p className="flagship-impact-title">What this proves</p>
                <div className="flagship-impact-list">
                  {flagshipProject.metrics.map((metric) => (
                    <p key={metric}>{metric}</p>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <Section id="projects" title="Projects" className="section-gap-projects">
            <div className="projects-panel">
              <div
                aria-hidden="true"
                className="projects-grid"
              />

              <div className="projects-stack">
                <div className="projects-list">
                  {supportingProjects.map((project) => {
                    const cardContent = (
                      <>
                      <div className="project-card-header">
                        <div className="project-card-main">
                          <img
                            src={themeMode === "light" && project.lightIcon ? project.lightIcon : project.icon}
                            alt={project.name}
                            className="project-card-icon"
                          />
                          <div>
                            <p className="project-card-title">{project.name}</p>
                            <p className="project-card-subtitle">{project.subtitle}</p>
                          </div>
                        </div>
                        {project.href ? <ArrowUpRight className="project-card-arrow" strokeWidth={1.8} /> : null}
                      </div>
                      <p className="project-card-overview">{project.overview}</p>
                      <p className="project-card-impact">{project.impact}</p>
                      <div className="project-card-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.note ? <p className="project-card-note">{project.note}</p> : null}
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
                      <article
                        key={project.name}
                        className="project-card project-card--static"
                      >
                        {cardContent}
                      </article>
                    );
                  })}
                </div>
              </div>
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

                  <p className="work-description">{item.summary}</p>
                  <div className="work-highlights">
                    {item.highlights.map((highlight) => (
                      <p key={highlight}>{highlight}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="approach" title="How I Think" className="section-gap-approach">
            <div className="approach-panel">
              {approachItems.map((item, index) => (
                <article
                  key={item.title}
                  className={`approach-item ${index < approachItems.length - 1 ? "approach-item--divided" : ""}`}
                >
                  <h3 className="approach-title">{item.title}</h3>
                  <p className="approach-description">{item.description}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section id="stack" title="Stack" className="section-gap-stack">
            <div className="stack-panel">
              {stackItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="stack-card">
                    <div className="stack-card-header">
                      <span className="stack-icon-shell">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <h3 className="stack-card-title">{item.title}</h3>
                    </div>
                    <p className="stack-card-description">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </Section>

          <Section id="education" title="Education" className="section-gap-education">
            <div className="education-panel">
              <article className="education-item">
                <div className="education-heading-row">
                  <h3 className="education-title">BS in Information Technology</h3>
                  <span className="education-badge">Cum Laude</span>
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
                  Graduated Cum Laude. Built TraKs as a full-stack capstone project with real-time alerts, onboarding
                  flows, and reporting features, which helped shape how I think about systems that need both usability
                  and operational clarity.
                </p>
              </article>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="contact-panel">
              <p className="contact-copy">
                Open to freelance work and junior-to-mid engineering roles focused on mobile products, frontend
                systems, and reliability-driven user experiences.
              </p>
              <a
                href="mailto:dev.bimrochee@gmail.com"
                className="contact-link"
              >
                <span>Email</span>
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
            <span>Built to present systems thinking clearly.</span>
            <span>Available for product-focused freelance and engineering work.</span>
          </div>
        </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
