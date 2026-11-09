import { useState } from "react";
import {
  Code2,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  ChevronRight,
  Sun,
  Type,
  Copy,
  X,
  Briefcase,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Menu,
  Sparkles,
  HelpCircle,
} from "lucide-react";

type ProjectCategory = "all" | "pern" | "frontend" | "a11y";

type Project = {
  title: string;
  category: Exclude<ProjectCategory, "all">;
  role: string;
  rating: string;
  desc: string;
  stack: string[];
  overview: string;
  architecture: string;
  highlightsList: string[];
  image?: string;
  imageName?: string;
};

export default function App() {
  // Accessibility & Theme States
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">(
    "normal",
  );

  // Navigation & Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedRole, setExpandedRole] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Notification & Form States
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const fontClasses = {
    normal: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  }[fontSize];

  // Jonas.io Style FAQ Items
  const faqItems = [
    {
      q: "What technologies do you specialize in?",
      a: "I specialize in the PERN stack (PostgreSQL, Express.js, React.js, Node.js), TypeScript, Tailwind CSS, Vite, and Web Accessibility standards (WCAG 2.1 & WAI-ARIA).",
    },
    {
      q: "What is your experience with Web Accessibility (WCAG)?",
      a: "Currently working as an Integration Engineer & Web Accessibility Specialist at Offpista / PAIT. I audit, remediate, and build web applications that strictly comply with WCAG 2.1 AA standards, ensuring full keyboard operability, screen-reader landmark support, and semantic DOM structure.",
    },
    {
      q: "Are you available for full-time or contract work?",
      a: "Yes! I am open to full-time remote engineering roles, hybrid contracts, and web accessibility consultation engagements.",
    },
    {
      q: "How do you approach application performance and testing?",
      a: "I utilize Test-Driven Development (TDD) alongside performance budgeting (Lighthouse auditing), code splitting, and optimized PostgreSQL query indexing to ensure low-latency, bug-free releases.",
    },
  ];

  // Work Experience Data
  const experienceData = [
    {
      company: "Offpista / PAIT",
      role: "Integration Engineer & Web Accessibility Tester",
      period: "March 2026 – Present",
      status: "Current Role",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      highlights: [
        "Develop and maintain web applications with a strong focus on web accessibility, usability, and inclusive user experiences.",
        "Implement WCAG 2.1 best practices ensuring web interfaces are fully accessible to screen readers and keyboard-only users.",
        "Collaborate across engineering teams to audit, identify, and resolve accessibility bottlenecks across active user flows.",
        "Apply semantic HTML5, keyboard navigation focus rings, accessible forms, and semantic ARIA attributes.",
      ],
      tech: [
        "TypeScript",
        "React",
        "WCAG 2.1",
        "ARIA",
        "Accessibility Auditing",
        "Tailwind CSS",
      ],
    },
    {
      company: "AAJ EXPRESS",
      role: "Senior Software Engineer (Frontend)",
      period: "September 2023 – February 2026",
      status: "Full-time",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      highlights: [
        "Led frontend development for an enterprise logistics platform serving 500+ employees, automating core dispatch workflows.",
        "Automated business processes, reducing customer waiting times by over 10% and contributing to a 30% increase in annual revenue.",
        "Integrated frontend applications with high-throughput REST APIs, reducing peak latency by 35%.",
        "Streamlined development workflows using Vite, Docker containerization, and AWS services.",
      ],
      tech: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "REST APIs",
        "Node.js",
        "Vite",
      ],
    },
    {
      company: "VankWallet",
      role: "Frontend Software Engineer",
      period: "January 2023 – September 2023",
      status: "Full-time",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      highlights: [
        "Engineered AI-powered digital real-estate software enabling 100+ users to participate in fractional property ownership.",
        "Designed an in-app digital wallet system facilitating secure payments for property investments.",
        "Enhanced UI/UX by ensuring technical feasibility of designs, reducing page load time by 50% and improving user satisfaction.",
      ],
      tech: ["React", "TypeScript", "REST APIs", "Tailwind CSS"],
    },
    {
      company: "WhoGoHost",
      role: "Frontend Software Engineer",
      period: "March 2022 – January 2023",
      status: "Full-time",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      highlights: [
        "Collaborated throughout the full lifecycle of two software products, contributing to a 30% reduction in development time.",
        "Optimized web app performance, achieving a 30% load speed improvement as measured by Lighthouse benchmarks.",
        "Implemented Test-Driven Development (TDD), increasing code reliability and reducing post-release bugs by 15%.",
      ],
      tech: ["React", "TypeScript", "TDD", "GitHub Actions", "Vite"],
    },
    {
      company: "TNN Africa",
      role: "Front-End Developer",
      period: "February 2021 – February 2022",
      status: "Full-time",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      highlights: [
        "Developed a Doctor-Patient health management web application with document sharing and appointment scheduling.",
        "Designed intuitive UI/UX patterns, reducing user training time by 50% and increasing adoption among healthcare professionals.",
        "Contributed to a portal serving 1,000+ active users monthly, enhancing accessibility and patient engagement.",
      ],
      tech: ["React", "JavaScript", "Tailwind CSS", "UX Design", "WCAG"],
    },
  ];

  // Projects Data
  const projects: Project[] = [
    {
      title: "AAJ Express Enterprise Dispatch Engine",
      category: "pern",
      role: "Senior Software Engineer (Frontend)",
      rating: "30% Revenue Growth",
      desc: "Real-time logistics & dispatch platform automating operations for 500+ employees with low-latency REST API integration.",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "PostgreSQL",
      ],
      overview:
        "Designed and implemented the core dispatch platform connecting logistics coordinators and drivers in real time.",
      architecture:
        "PERN Stack architecture utilizing Express.js microservices, PostgreSQL query optimization, and React TypeScript frontend.",
      highlightsList: [
        "Automated dispatch workflows for 500+ daily operational employees.",
        "Reduced customer waiting times by over 10%.",
        "Achieved a 35% reduction in API response latency during peak shipping windows.",
      ],
    },
    {
      title: "Digital Investment & Property Management System",
      category: "frontend",
      role: "Frontend Software Engineer",
      rating: "50% Faster Load",
      desc: "Fintech platform enabling 100+ investors to hold fractional property stakes with integrated digital wallet payment processing.",
      stack: ["React", "TypeScript", "Tailwind CSS", "REST API"],
      overview:
        "Created an intuitive web interface for investors to discover high-yield real estate opportunities and manage digital funds.",
      architecture:
        "Single Page Application engineered with React, TypeScript, and responsive Tailwind CSS layouts.",
      image: "/japaupdate.jpg",
      imageName: "japaupdate.jpg",
      highlightsList: [
        "Facilitated fractional property ownership for 100+ active users.",
        "Built secure in-app transaction workflows for investment tracking.",
        "Reduced initial page load times by 50% through component optimization.",
      ],
    },
    {
      title: "Inclusive Healthcare Telehealth Portal",
      category: "a11y",
      role: "Front-End Developer & Accessibility Lead",
      rating: "100% WCAG AA Compliance",
      desc: "Doctor-patient telehealth suite serving 1,000+ monthly users with WCAG 2.1 AA keyboard & screen reader accessibility.",
      stack: ["React", "TypeScript", "Tailwind CSS", "WCAG 2.1", "ARIA"],
      overview:
        "Built an inclusive healthcare web portal designed to be fully accessible for patients and medical professionals.",
      architecture:
        "React application with semantic HTML5 elements, keyboard focus traps, screen-reader landmarks, and ARIA attributes.",
      highlightsList: [
        "Full keyboard and screen reader accessibility compliance.",
        "Cut user training time by 50% through intuitive UI design.",
        "Served over 1,000+ active monthly medical users.",
      ],
    },
    {
      title: "WhoGoHost Web Suite & TDD Pipeline",
      category: "frontend",
      role: "Frontend Software Engineer",
      rating: "30% Faster Dev Sprints",
      desc: "High-performance web applications built under Test-Driven Development (TDD) standards and automated continuous deployment.",
      stack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "TDD",
        "GitHub Actions",
        "Vite",
      ],
      overview:
        "Engineered customer-facing web products from initial concept to public release.",
      architecture:
        "Component-driven React design system backed by automated CI/CD deployment pipelines.",
      image: "/Perfectlooks.jpg",
      imageName: "Perfectlooks.jpg",
      highlightsList: [
        "Reduced post-release bugs by 15% via comprehensive TDD coverage.",
        "Shortened sprint delivery cycles by 30%.",
        "Optimized Lighthouse performance scores by 30%.",
      ],
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const navLinks = [
    { label: "Methodology", href: "#process" },
    { label: "Pillars", href: "#pillars" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "FAQ", href: "#faq" },
    { label: "About", href: "#about" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        highContrast
          ? "bg-black text-yellow-300 font-bold"
          : "bg-slate-950 text-slate-100 font-sans"
      } ${fontClasses}`}
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* Toast Notification with Slide-Up Transition */}
      {copiedItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce transition-all duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span>Copied {copiedItem} to clipboard!</span>
        </div>
      )}

      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800/80 px-4 py-3.5 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 group-hover:scale-105 group-hover:border-emerald-500/60 transition-all duration-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base sm:text-lg block group-hover:text-emerald-400 transition-colors duration-200">
                Joseph Betty
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                PERN Stack & Web Accessibility Specialist
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-emerald-400 transition-colors duration-200 py-1 hover:-translate-y-px inline-block"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all duration-200 ${
                highContrast
                  ? "bg-yellow-300 text-black border-yellow-400 shadow-md"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
              title="Toggle High Contrast"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {highContrast ? "Standard" : "Contrast"}
              </span>
            </button>

            <button
              onClick={() =>
                setFontSize(
                  fontSize === "normal"
                    ? "large"
                    : fontSize === "large"
                      ? "xlarge"
                      : "normal",
                )
              }
              className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs text-slate-300 flex items-center gap-1 transition-all duration-200 hover:text-white"
              title="Adjust Text Size"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="uppercase font-mono text-[10px]">
                {fontSize}
              </span>
            </button>

            <a
              href="mailto:josephhibetty@gmail.com"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 mt-3 pt-3 pb-2 space-y-2 font-medium text-sm text-slate-200 animate-fadeIn transition-all duration-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:josephhibetty@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl mt-2"
            >
              Contact Joseph
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-20">
        <section
          id="hero"
          className="text-center pt-8 max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-inner transition-all duration-300 hover:border-emerald-500/60">
            <Sparkles className="w-3.5 h-3.5" />
            Software Engineer & Web Accessibility Specialist
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Build world-class web applications that create{" "}
            <span className="text-emerald-400">lasting impact</span> for users
            and teams.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Hi, I'm Joseph! I engineer high-performance PERN stack applications
            (PostgreSQL, Express, React, Node) with pixel-perfect design,
            rock-solid APIs, and 100% WCAG accessibility compliance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <span>Explore Featured Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#pillars"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold border border-slate-800 rounded-xl text-sm transition-all duration-300 hover:border-slate-700 hover:-translate-y-0.5"
            >
              Why Work With Me
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-10 border-t border-slate-800/80 max-w-3xl mx-auto">
            <p className="text-xs font-mono text-slate-400 mb-4 tracking-widest">
              RECOGNIZED FOR BUILDING SOFTWARE AT
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 font-bold text-xs sm:text-sm">
              {[
                "Offpista / PAIT",
                "AAJ Express",
                "VankWallet",
                "WhoGoHost",
                "TNN Africa",
              ].map((c) => (
                <span
                  key={c}
                  className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all duration-300 hover:scale-105"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* [PART 01 / 04] STEP-BY-STEP DELIVERY PROCESS */}
        <section id="process" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              [PART 01 / 04] Step-by-Step Delivery
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              From concept to scalable application. I'll guide you step by step.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Architect & Model",
                desc: "Design clean PostgreSQL schemas, relational queries, and RESTful API structures.",
              },
              {
                step: "02",
                title: "Develop & Test",
                desc: "Build reactive TypeScript + React interfaces backed by Test-Driven Development (TDD).",
              },
              {
                step: "03",
                title: "Accessibility Audit",
                desc: "Audit and remediate web applications to ensure 100% WCAG 2.1 & WAI-ARIA compliance.",
              },
              {
                step: "04",
                title: "Deploy & Scale",
                desc: "Optimize assets, bundle sizes, and Vite workflows for continuous deployment.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 relative hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <span className="text-4xl font-black text-emerald-500/20 font-mono block group-hover:text-emerald-500/40 transition-colors duration-300">
                  {st.step}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-200">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* [PART 02 / 04] CORE PHILOSOPHY & THREE PILLARS */}
        <section id="pillars" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              [PART 02 / 04] Engineering Philosophy
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why work with me (and why my code stands out).
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Clean, Scalable PERN Architecture",
                desc: 'Deep understanding of the "why" behind every backend endpoint and frontend state structure. Structured PostgreSQL queries, Express middleware, and modular React hooks.',
              },
              {
                num: "02",
                title: "100% Accessible & WCAG 2.1 Compliant",
                desc: "Web applications designed for everyone. Full keyboard operability, screen reader WAI-ARIA landmarks, contrast ratios, and inclusive UX design built into every release.",
              },
              {
                num: "03",
                title: "Performance Optimization & TDD",
                desc: "Test-Driven Development (TDD) that cuts post-release bugs by 15% and optimizes Lighthouse page load metrics by up to 50%.",
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="text-emerald-400 font-mono font-bold text-sm">
                  {pillar.num}
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-200">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* [PART 03 / 04] FEATURED PROJECTS SHOWCASE */}
        <section id="projects" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              [PART 03 / 04] Featured Software Projects
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Production web applications built with modern engineering
              standards.
            </h3>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: "all", label: "All Projects" },
                { id: "pern", label: "PERN Stack" },
                { id: "frontend", label: "Frontend" },
                { id: "a11y", label: "A11y & Web" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ProjectCategory)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="space-y-3">
                  {p.image && (
                    <figure className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                      <img
                        src={p.image}
                        alt={`${p.title} preview`}
                        className="h-48 w-full object-cover"
                      />
                      <figcaption className="px-3 py-2 text-xs font-mono text-slate-400">
                        {p.imageName}
                      </figcaption>
                    </figure>
                  )}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">{p.role}</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      {p.rating}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-200 flex items-center justify-between">
                    <span>{p.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-xs font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(p)}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-all duration-200 hover:text-white"
                  >
                    <span>More Details & Implementation</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE TIMELINE */}
        <section id="experience" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Professional Experience
              </h3>
              <p className="text-xs text-slate-400">
                Detailed software engineering career background.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {experienceData.map((exp, idx) => {
              const isExpanded = expandedRole === idx;
              return (
                <div
                  key={idx}
                  className={`bg-slate-900 border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-emerald-500/40 shadow-xl"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <button
                    onClick={() => setExpandedRole(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex flex-wrap items-center justify-between gap-4 focus:outline-none"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-white">
                          {exp.company}
                        </h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border font-mono ${exp.badgeColor}`}
                        >
                          {exp.status}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-emerald-400">
                        {exp.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">
                        {exp.period}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180 text-emerald-400" : ""}`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-800 space-y-3 text-xs sm:text-sm transition-all duration-300">
                      <ul className="space-y-2 text-slate-300">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-300 text-xs font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* [PART 04 / 04] NUMBERS DON'T LIE */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-center shadow-xl">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            [PART 04 / 04] Numbers Don't Lie
          </span>
          <h3 className="text-3xl font-black text-white">
            Proven engineering track record.
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            {[
              { val: "5+", label: "Years Industry Experience" },
              { val: "500+", label: "Active Daily Logistics Users" },
              { val: "30%", label: "Annual Revenue Lift Delivered" },
              { val: "100%", label: "WCAG 2.1 AA Compliance" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1 group">
                <div className="text-4xl font-black text-emerald-400 font-mono group-hover:scale-110 transition-transform duration-300">
                  {stat.val}
                </div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Got questions? I got answers.
            </h3>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-white flex items-center justify-between gap-4 text-sm sm:text-base focus:outline-none"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-300" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800 pt-3 leading-relaxed transition-all duration-300">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* DEVELOPER NOTE / ABOUT ME & CONTACT */}
        <section
          id="about"
          className="grid lg:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          <div className="lg:col-span-5 text-center space-y-4">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-emerald-500/40 bg-slate-950 shadow-xl transition-all duration-500 hover:scale-105">
              {!imgError ? (
                <img
                  src="/Joseph Betty.jpeg"
                  alt="Joseph Betty"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-emerald-400 font-bold text-3xl">
                  JB
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white">
                I'm Joseph Betty
              </h4>
              <p className="text-xs font-mono text-emerald-400">
                Software Engineer & Web Accessibility Specialist
              </p>
              <p className="text-xs text-slate-400">
                Federal University of Petroleum Resources, Effurun
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-black text-white">
              Let's build something exceptional together.
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              I am passionate about writing clean, maintainable code and
              bringing inclusive web access to every user interface. Whether you
              need a fullstack PERN application built from scratch, or an
              accessibility audit to bring your existing site to WCAG 2.1
              compliance, I'd love to connect.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <button
                onClick={() =>
                  copyToClipboard("josephhibetty@gmail.com", "Email")
                }
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-300 flex items-center gap-2 transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>josephhibetty@gmail.com</span>
                <Copy className="w-3 h-3 opacity-60" />
              </button>

              <button
                onClick={() => copyToClipboard("09018258090", "Phone")}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-300 flex items-center gap-2 transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>09018258090</span>
                <Copy className="w-3 h-3 opacity-60" />
              </button>
            </div>

            {/* Contact Form */}
            {contactSubmitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Thank you! Your message has been sent to Joseph Betty.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-3 text-xs pt-2"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500 transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Your Message..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-400">
                  {selectedProject.role}
                </span>
                <h4 className="font-bold text-white text-lg">
                  {selectedProject.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <h5 className="font-bold text-white mb-1">Project Overview</h5>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-white mb-1">
                  Architecture & Stack
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProject.architecture}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-white mb-1">Highlights</h5>
                <ul className="space-y-1 list-disc list-inside text-slate-300">
                  {selectedProject.highlightsList.map(
                    (hl: string, i: number) => (
                      <li key={i}>{hl}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Joseph Betty. Inspired by jonas.io layout.
        Built with PERN Stack, TypeScript & WCAG Compliance.
      </footer>
    </div>
  );
}
