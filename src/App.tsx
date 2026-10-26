import React, { useEffect, useState } from "react";
import {
  Code2,
  Terminal,
  Server,
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  Eye,
  Award,
  BookOpen,
  Send,
  Sparkles,
  ChevronRight,
  Layers,
  ShieldCheck,
  X,
  Play,
  Sun,
  Type,
} from "lucide-react";

type Project = {
  title: string;
  category: "frontend" | "backend" | "a11y";
  role: string;
  desc: string;
  stack: string[];
  impact: string;
  codeSnippet: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "all" | "frontend" | "backend" | "a11y"
  >("all");
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">(
    "normal",
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!selectedProject) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedProject]);

  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ cmd: string; output: string }>
  >([
    {
      cmd: "whoami",
      output:
        "Joseph Betty — Senior Software Engineer (Frontend) & Web Accessibility Specialist",
    },
    {
      cmd: "stack",
      output:
        "PERN Stack: PostgreSQL, Express.js, React.js, Node.js, TypeScript, Tailwind CSS",
    },
    {
      cmd: "help",
      output:
        "Available commands: whoami, stack, experience, a11y-check, contact, clear",
    },
  ]);

  // Accessibility Audit Simulator State
  const [auditTarget, setAuditTarget] = useState(
    '<button onClick="submit()">Submit</button>',
  );
  const [auditResults, setAuditResults] = useState<
    Array<{ rule: string; status: "pass" | "fail" | "warn"; detail: string }>
  >([
    {
      rule: "WCAG 2.1 - 4.1.2 Name, Role, Value",
      status: "fail",
      detail:
        "Button missing accessible label or text content for screen readers.",
    },
    {
      rule: "WCAG 2.1 - 2.1.1 Keyboard Accessible",
      status: "pass",
      detail: "Native <button> element is focusable via Tab key.",
    },
    {
      rule: "WCAG 2.1 - 1.4.3 Contrast (Minimum)",
      status: "warn",
      detail: "Ensure background & text contrast ratio meets 4.5:1.",
    },
  ]);

  // API Playground State
  const [apiEndpoint, setApiEndpoint] = useState("/api/v1/accessibility/audit");
  const [apiMethod, setApiMethod] = useState<"GET" | "POST">("POST");
  const [apiResponse, setApiResponse] = useState<string>(
    JSON.stringify(
      {
        status: 200,
        message: "Accessibility audit initialized successfully",
        timestamp: new Date().toISOString(),
        auditor: "Joseph Betty PERN Engine",
        metrics: {
          complianceScore: "98%",
          wcagLevel: "AA",
          ariaValidation: "PASS",
        },
      },
      null,
      2,
    ),
  );

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    let output = "";

    switch (cmd) {
      case "whoami":
        output =
          "Joseph Betty | Software Engineer (Fullstack & Web Accessibility Specialist)";
        break;
      case "stack":
        output =
          "Frontend: React, TypeScript, Tailwind CSS, NuxtJS\nBackend: Node.js, Express, PostgreSQL, REST APIs\nSpecialties: WCAG 2.1, ARIA, WebRTC, TDD";
        break;
      case "experience":
        output =
          "Current: Integration Engineer (Web Accessibility Tester) @ Offpista / PAIT (March 2026 – Present)\nPast: AAJ Express, VankWallet, WhoGoHost, TNN Africa";
        break;
      case "a11y-check":
        output =
          "Running automated WCAG 2.1 audit... 100% compliant contrast, keyboard navigation, and semantic ARIA landmarking.";
        break;
      case "contact":
        output =
          "Email: josephhibetty@gmail.com | Phone: 09018258090 | GitHub: github.com/joseph1435";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        output = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, output }]);
    setTerminalInput("");
  };

  const runA11yAudit = () => {
    const isButtonWithoutLabel =
      auditTarget.includes("<button") &&
      !auditTarget.includes("aria-label") &&
      !auditTarget.includes(">") &&
      auditTarget.endsWith("/>");
    const hasAria =
      auditTarget.includes("aria-") || auditTarget.includes("role=");

    setAuditResults([
      {
        rule: "WCAG 2.1 - 4.1.2 Name, Role, Value",
        status: hasAria ? "pass" : "warn",
        detail: hasAria
          ? "Accessible name verified via ARIA attributes."
          : "Consider adding explicit aria-label or visible inner text.",
      },
      {
        rule: "WCAG 2.1 - 2.1.1 Keyboard Operability",
        status: "pass",
        detail: "Element registered in natural DOM focus order.",
      },
      {
        rule: "WCAG 2.1 - 1.4.11 Non-Text Contrast",
        status: isButtonWithoutLabel ? "fail" : "pass",
        detail: "Visual boundaries meet 3:1 contrast against adjacent colors.",
      },
    ]);
  };

  const fontClasses = {
    normal: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  }[fontSize];

  const projects: Project[] = [
    {
      title: "AAJ Express Logistics Engine",
      category: "frontend",
      role: "Senior Software Engineer (Frontend)",
      desc: "Automated business workflows for 500+ employees. Reduced wait times by >10% and increased annual revenue by 30%.",
      stack: ["React", "TypeScript", "Tailwind CSS", "REST API", "WebRTC"],
      impact: "35% reduction in API latency, 30% revenue growth",
      codeSnippet: `// Real-Time Logistics Socket Sync
const connectShipmentSocket = (trackingId: string) => {
  const ws = new WebSocket(\`wss://api.aajexpress.com/shipments/\${trackingId}\`);
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    dispatch(updateShipmentStatus(update));
  };
};`,
    },
    {
      title: "VankWallet Real-Estate Platform",
      category: "frontend",
      role: "Frontend Software Engineer",
      desc: "AI-powered fractional real-estate investment software featuring an integrated digital wallet system for 100+ investors.",
      stack: ["NuxtJS", "TypeScript", "Web3", "REST API", "Tailwind"],
      impact: "50% faster page load, 30% higher platform scalability",
      codeSnippet: `// Digital Wallet Balance Verification
export async function verifyWalletTransaction(txHash: string) {
  const res = await fetch(\`/api/v1/wallet/verify/\${txHash}\`);
  const data = await res.json();
  return data.status === 'CONFIRMED';
}`,
    },
    {
      title: "TNN Africa Telehealth Portal",
      category: "a11y",
      role: "Front-End Developer",
      desc: "Doctor-Patient health management app serving 1,000+ monthly active users with WebRTC video calls and document sharing.",
      stack: ["React", "WebRTC", "JavaScript", "Tailwind CSS", "WCAG 2.1"],
      impact: "50% reduction in training time, 20% faster consultations",
      codeSnippet: `// WebRTC Accessible Consultation Call Component
export const ConsultationCall = ({ peerId, ariaLabel }: Props) => (
  <div role="region" aria-label={ariaLabel} className="focus:ring-2 focus:ring-emerald-500">
    <video id="remoteVideo" autoPlay playsInline title="Doctor Stream" />
  </div>
);`,
    },
    {
      title: "WhoGoHost Digital Suite",
      category: "backend",
      role: "Frontend Software Engineer",
      desc: "Full product lifecycle execution from conceptualization to market release with strict Test-Driven Development (TDD).",
      stack: ["React", "TypeScript", "Tailwind CSS", "TDD", "GitHub Actions"],
      impact: "30% faster dev lifecycle, 15% fewer post-release bugs",
      codeSnippet: `// TDD Lighthouse Performance Metric Monitor
describe('Page Load Performance', () => {
  it('should render core hero in under 1.2 seconds', async () => {
    const startTime = performance.now();
    render(<HeroComponent />);
    expect(performance.now() - startTime).toBeLessThan(1200);
  });
});`,
    },
    {
      title: "JapaUpdate Scholarship Platform",
      category: "frontend",
      role: "Full-Stack Developer",
      desc: "A scholarship, immigration, and career opportunities platform with structured content, backend APIs, and a responsive frontend for discovering international programs.",
      stack: ["JavaScript", "React", "Node.js", "REST API", "PostgreSQL"],
      impact: "Structured opportunity discovery and career resources",
      codeSnippet: `// Opportunity discovery API
export async function getOpportunities(filters: OpportunityFilters) {
  const query = new URLSearchParams(filters);
  const response = await fetch('/api/opportunities?' + query);
  return response.json();
}`,
    },
    {
      title: "PerfectLooks Fitness Platform",
      category: "backend",
      role: "Full-Stack Developer",
      desc: "A fitness and wellness platform for workout programs, fitness plans, and healthy lifestyle content, designed for responsive delivery and future user personalization.",
      stack: ["JavaScript", "React", "Node.js", "PostgreSQL", "REST API"],
      impact: "Scalable foundation for fitness content and tracking",
      codeSnippet: `// Fitness plan service
export async function getFitnessPlans(userId: string) {
  const response = await fetch('/api/users/' + userId + '/plans');
  return response.json();
}`,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        highContrast
          ? "bg-black text-yellow-300 font-bold"
          : "bg-slate-950 text-slate-100 font-sans"
      } ${fontClasses}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-500 focus:px-4 focus:py-3 focus:font-bold focus:text-slate-950"
      >
        Skip to main content
      </a>
      {/* Accessibility Header Toolbar */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-4 py-3"
        aria-label="Site header"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-white flex items-center gap-2">
                Joseph Betty
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  PERN + A11y
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Senior Software Engineer & Web Accessibility Specialist
              </p>
            </div>
          </div>

          {/* Quick Contact & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighContrast(!highContrast)}
              type="button"
              aria-pressed={highContrast}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                highContrast
                  ? "bg-yellow-300 text-black border-yellow-400"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500"
              }`}
              title="Toggle High Contrast Mode (WCAG 2.1)"
            >
              <Sun className="w-4 h-4" />
              <span>{highContrast ? "Standard" : "High Contrast"}</span>
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
              type="button"
              aria-label={`Font size: ${fontSize}. Activate to change size.`}
              className="p-2 bg-slate-800 border border-slate-700 hover:border-emerald-500 rounded-lg text-xs text-slate-300 flex items-center gap-1.5"
              title="Adjust Font Size"
            >
              <Type className="w-4 h-4" />
              <span className="uppercase">{fontSize}</span>
            </button>

            <a
              href="mailto:josephhibetty@gmail.com"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg text-xs transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              Hire Joseph
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-8 items-center" aria-labelledby="hero-heading">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Integration Engineer @ Offpista / PAIT
            </div>

            <h2 id="hero-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building Scalable, Accessible{" "}
              <span className="text-emerald-400">PERN Stack</span> Applications.
            </h2>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Software Engineer passionate about building high-performance web
              applications with robust backend infrastructures. Currently
              serving as an Integration Engineer & Web Accessibility Tester at
              Offpista, ensuring digital interfaces are WCAG compliant and
              inclusive for all users.
            </p>

            {/* Quick Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "PostgreSQL",
                "Express.js",
                "React.js",
                "Node.js",
                "TypeScript",
                "Tailwind CSS",
                "WCAG 2.1",
                "Vite",
                "Git",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
              >
                Get In Touch
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/joseph1435"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-800 rounded-xl flex items-center gap-2 transition-all"
              >
                <Code2 className="w-4 h-4" />
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Profile Card & Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>

              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-2xl bg-slate-800">
                  {!imgError ? (
                    <img
                      src="/Joseph Betty.jpeg"
                      alt="Joseph Betty"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-emerald-400 font-bold text-3xl">
                      JB
                    </div>
                  )}
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-xl font-bold text-white">Joseph Betty</h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    Integration Engineer & A11y Tester
                  </p>
                  <p className="text-xs text-slate-400">
                    Federal University of Petroleum Resources, Effurun
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Phone:</span>
                    <span className="text-slate-200">09018258090</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Email:</span>
                    <span className="text-slate-200">
                      josephhibetty@gmail.com
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Location:</span>
                    <span className="text-slate-200">Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TERMINAL SIMULATOR */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 text-xs font-mono text-slate-400">
                joseph@pern-cli:~
              </span>
            </div>
            <Terminal className="w-4 h-4 text-slate-500" />
          </div>

          <div
            className="p-4 font-mono text-xs sm:text-sm space-y-3 max-h-64 overflow-y-auto"
            aria-label="Interactive terminal"
          >
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>$</span>
                  <span className="text-white">{item.cmd}</span>
                </div>
                <p aria-live="polite" className="text-slate-400 whitespace-pre-line pl-4">
                  {item.output}
                </p>
              </div>
            ))}

            <form
              onSubmit={handleTerminalSubmit}
              className="flex items-center gap-2 text-emerald-400"
            >
              <span>$</span>
              <label htmlFor="terminal-command" className="sr-only">
                Terminal command
              </label>
              <input
                id="terminal-command"
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help', 'stack', 'experience', 'a11y-check'..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600 focus:ring-0"
              />
            </form>
          </div>
        </section>

        {/* ACCESSIBILITY (A11Y) AUDITOR SIMULATOR */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  WCAG 2.1 Accessibility Auditor Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Test DOM elements for keyboard focus, contrast, and ARIA
                  attributes.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              Live Inspector
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-6 space-y-3">
              <label className="block text-xs font-mono text-slate-400">
                Target HTML Element Snippet:
              </label>
              <textarea
                id="audit-target"
                aria-describedby="audit-target-help"
                value={auditTarget}
                onChange={(e) => setAuditTarget(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-300 focus:border-emerald-500 focus:outline-none"
              />
              <p id="audit-target-help" className="sr-only">
                Enter an HTML element snippet to check for accessibility issues.
              </p>
              <button
                onClick={runA11yAudit}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                Run Compliance Audit
              </button>
            </div>

            <div className="md:col-span-6 space-y-3">
              <p className="block text-xs font-mono text-slate-400" id="audit-results-label">
                Audit Results:
              </p>
              <div className="space-y-2" aria-labelledby="audit-results-label" aria-live="polite">
                {auditResults.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3"
                  >
                    {res.status === "pass" && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    )}
                    {res.status === "fail" && (
                      <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    )}
                    {res.status === "warn" && (
                      <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    )}
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-white">{res.rule}</p>
                      <p className="text-xs text-slate-400">{res.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE TIMELINE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Professional Experience
              </h3>
              <p className="text-xs text-slate-400">
                Proven track record across fullstack frontend engineering and
                accessibility.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Gofree Global Company Limited */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">Gofree Global Company Limited</h4>
                  <p className="text-xs text-emerald-400 font-mono">Web Developer · Part-time</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">August 2025 – Present</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Teach web development and mentor students through practical projects.</li>
                <li>Create and maintain websites for the company.</li>
                <li>Apply technical and teaching skills to real-world web projects.</li>
              </ul>
            </div>

            {/* DevByte Community */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">DevByte Community</h4>
                  <p className="text-xs text-emerald-400 font-mono">Back End Developer · Volunteer</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">August 2025 – Present</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Share coding resources and assist with online development workshops.</li>
                <li>Contribute to community projects and mentorship programs.</li>
                <li>Support aspiring developers while strengthening collaboration and communication skills.</li>
              </ul>
            </div>

            {/* DKOO Company */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">DKOO Company</h4>
                  <p className="text-xs text-emerald-400 font-mono">Web Administrator · Part-time</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">November 2025 – March 2026</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Manage company websites, updates, patches, uptime, and security.</li>
                <li>Resolve technical issues and optimize speed, functionality, and user experience.</li>
                <li>Build reliable solutions with PERN, Next.js, Tailwind, and PostgreSQL.</li>
              </ul>
            </div>

            {/* DYEN Academy */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">DYEN Academy</h4>
                  <p className="text-xs text-emerald-400 font-mono">Web Development Intern · On-site</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">July 2025 – December 2025</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Built responsive web pages and implemented interactive user interfaces.</li>
                <li>Collaborated on academy projects using HTML, CSS, and JavaScript.</li>
                <li>Strengthened frontend design and responsive layout skills through real-world work.</li>
              </ul>
            </div>

            {/* CodeAlpha */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">CodeAlpha</h4>
                  <p className="text-xs text-emerald-400 font-mono">Frontend Development Intern · Remote</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">October 2025 – November 2025</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Built responsive and user-friendly web applications with modern frontend practices.</li>
                <li>Worked with HTML, CSS, and JavaScript on real-world development projects.</li>
                <li>Delivered weekly tasks, created GitHub repositories, and documented project work.</li>
              </ul>
            </div>

            {/* FlexiSAF Edusoft Limited */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">FlexiSAF Edusoft Limited</h4>
                  <p className="text-xs text-emerald-400 font-mono">Back End Developer Intern · Remote</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">May 2025 – August 2025</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>Completed Java backend development training and practical assignments.</li>
                <li>Applied object-oriented programming principles to functional backend solutions.</li>
                <li>Developed a Cooperative and Thrift Association application as a final project.</li>
              </ul>
            </div>

            {/* Role 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">
                    Offpista / PAIT
                  </h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    Integration Engineer & Web Accessibility Tester
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                  March 2026 – Present
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>
                  Developed and maintained web applications with strict focus on
                  web accessibility, usability, and inclusive UX.
                </li>
                <li>
                  Implemented WCAG best practices ensuring interfaces are usable
                  by assistive technologies and keyboard-only users.
                </li>
                <li>
                  Applied semantic HTML, screen reader labels, keyboard
                  navigation, and custom ARIA landmark attributes.
                </li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">
                    AAJ EXPRESS
                  </h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    Senior Software Engineer (Frontend)
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                  September 2023 – February 2026
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>
                  Led frontend development for a logistics platform serving 500+
                  employees, increasing annual revenue by 30%.
                </li>
                <li>
                  Automated business processes, reducing customer wait times by
                  over 10%.
                </li>
                <li>
                  Integrated frontend applications with REST APIs and real-time
                  WebSockets, cutting peak latency by 35%.
                </li>
              </ul>
            </div>

            {/* Role 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">VankWallet</h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    Frontend Software Engineer
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                  January 2023 – September 2023
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>
                  Developed AI-powered real-estate software enabling 100+ users
                  to hold fractional property ownership.
                </li>
                <li>
                  Designed in-app digital wallet facilitating secure investment
                  payment transactions.
                </li>
                <li>
                  Leveraged Web3 and NuxtJS to improve platform efficiency by
                  30% and cut page load times by 50%.
                </li>
              </ul>
            </div>

            {/* Role 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">WhoGoHost</h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    Frontend Software Engineer
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                  March 2022 – January 2023
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>
                  Collaborated across full product lifecycles, achieving a 30%
                  reduction in development time via iterative sprints.
                </li>
                <li>
                  Implemented Test-Driven Development (TDD), boosting code
                  reliability and reducing bugs by 15%.
                </li>
              </ul>
            </div>

            {/* Role 5 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-base">TNN Africa</h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    Front-End Developer
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                  February 2021 – February 2022
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                <li>
                  Developed doctor-patient health portal with WebRTC video
                  consultations and document sharing for 1,000+ users.
                </li>
                <li>
                  Reduced user training time by 50% through intuitive,
                  accessible UI/UX design.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Featured Engineering Projects
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive applications showcasing PERN architecture and WCAG
                  compliance.
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div
              className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium"
              role="tablist"
              aria-label="Project categories"
            >
              {(["all", "frontend", "backend", "a11y"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  tabIndex={activeTab === tab ? 0 : -1}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    activeTab === tab
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400">
                      {p.role}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
                      {p.impact}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-300 text-xs font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(p)}
                    className="w-full py-2 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    Inspect Implementation Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LICENSES & CERTIFICATIONS */}
        <section className="space-y-6" aria-labelledby="certifications-heading">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 id="certifications-heading" className="text-xl font-bold text-white">
                Licenses &amp; Certifications
              </h3>
              <p className="text-xs text-slate-400">
                Verified training and professional learning milestones.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Java Training Complete Course for Java Beginners All in One",
                issuer: "Udemy",
                date: "March 2025",
                credential: "UC-3617dcf5-d4b6-435f-aad9-4f01bb5e8bbe",
                skills: "Object-Oriented Programming, File I/O in Java",
                link: "https://www.udemy.com/certificate/UC-3617dcf5-d4b6-435f-aad9-4f01bb5e8bbe/",
              },
              {
                title: "Python For Complete Beginners",
                issuer: "Udemy",
                date: "March 2025",
                credential: "UC-7fc99aab-111c-4d54-b1d6-32b3a7ee94b7",
                skills: "Python programming, Basic Syntax & Semantics",
                link: "https://www.udemy.com/certificate/UC-7fc99aab-111c-4d54-b1d6-32b3a7ee94b7/",
              },
              {
                title: "Legacy Front End",
                issuer: "freeCodeCamp",
                date: "March 2025",
                credential: "bettyjoseff-lfe",
                skills: "Legacy frontend development",
                link: "https://freecodecamp.org/certification/Bettyjoseff/legacy-front-end",
              },
              {
                title: "Front End Development Libraries",
                issuer: "freeCodeCamp",
                date: "March 2025",
                credential: "bettyjoseff-fedl",
                skills: "React.js, HTML5",
                link: "https://freecodecamp.org/certification/Bettyjoseff/front-end-development-libraries",
              },
              {
                title: "JavaScript Algorithms and Data Structures",
                issuer: "freeCodeCamp",
                date: "March 2025",
                credential: "bettyjoseff-jaads",
                skills: "JavaScript, Problem Solving",
                link: "https://freecodecamp.org/certification/Bettyjoseff/javascript-algorithms-and-data-structures-v8",
              },
              {
                title: "Responsive Web Design",
                issuer: "freeCodeCamp",
                date: "March 2025",
                credential: "bettyjoseff-rwd",
                skills: "React.js, HTML5, CSS3, Responsive Design",
                link: "https://freecodecamp.org/certification/Bettyjoseff/responsive-web-design",
              },
            ].map((certificate) => (
              <article
                key={certificate.credential}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div>
                  <p className="text-xs text-emerald-400 font-mono">
                    {certificate.issuer}
                  </p>
                  <h4 className="mt-2 text-base font-bold text-white">
                    {certificate.title}
                  </h4>
                </div>
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Issued</dt>
                    <dd className="text-slate-300">{certificate.date}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Credential</dt>
                    <dd className="text-right text-slate-300 break-all">
                      {certificate.credential}
                    </dd>
                  </div>
                </dl>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">Skills:</span>{" "}
                  {certificate.skills}
                </p>
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verify credential
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* PERN REST API PLAYGROUND */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  PERN REST API Playground Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Test Node.js + Express backend endpoint responses.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4" aria-label="API request controls">
            <div className="flex flex-wrap gap-2">
              <label htmlFor="api-method" className="sr-only">
                API request method
              </label>
              <select
                id="api-method"
                value={apiMethod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setApiMethod(e.target.value as "GET" | "POST")
                }
                className="bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs rounded-xl px-3 py-2 outline-none"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
              </select>

              <input
                id="api-endpoint"
                aria-label="API endpoint"
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500"
              />

              <button
                onClick={() =>
                  setApiResponse(
                    JSON.stringify(
                      {
                        status: 200,
                        endpoint: apiEndpoint,
                        method: apiMethod,
                        timestamp: new Date().toISOString(),
                        db: "PostgreSQL Active",
                        server: "Express.js Node Engine",
                      },
                      null,
                      2,
                    ),
                  )
                }
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Execute API Call
              </button>
            </div>

            <pre
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto"
              aria-live="polite"
              aria-label="API response"
            >
              {apiResponse}
            </pre>
          </div>
        </section>

        {/* EDUCATION & CONTACT SECTION */}
        <section id="contact" className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Education & Details
                </h3>
                <p className="text-xs text-slate-400">
                  Academic foundation and links
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="border-l-2 border-emerald-500 pl-4 space-y-1">
                <p className="font-bold text-white">
                  B.Eng Software Engineering (In View)
                </p>
                <p className="text-slate-400">
                  Federal University of Petroleum Resources, Effurun, Nigeria
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href="mailto:josephhibetty@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>josephhibetty@gmail.com</span>
                </a>
                <a
                  href="tel:09018258090"
                  className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>09018258090</span>
                </a>
                <a
                  href="https://github.com/joseph1435"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>github.com/joseph1435</span>
                </a>
                <a
                  href="https://linkedin.com/in/joseph-betty-350a72246"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>linkedin.com/in/joseph-betty-350a72246</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Send Message</h3>
            <p className="text-xs text-slate-400">
              Reach out for fullstack web engineering or web accessibility
              contracts.
            </p>

            {contactSubmitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Thank you! Your message has been sent to Joseph Betty.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = String(formData.get("name") ?? "");
                  const email = String(formData.get("email") ?? "");
                  const message = String(formData.get("message") ?? "");
                  const subject = encodeURIComponent(`Portfolio message from ${name}`);
                  const body = encodeURIComponent(
                    `${message}\n\nReply to: ${email}`,
                  );

                  window.location.href =
                    `mailto:josephhibetty@gmail.com?subject=${subject}&body=${body}`;
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <label htmlFor="contact-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    required
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500"
                  />
                  <label htmlFor="contact-email" className="sr-only">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    required
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  required
                  name="message"
                  rows={4}
                  placeholder="Your Message..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* CODE MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 id="project-dialog-title" className="font-bold text-white text-base">
                {selectedProject.title} Implementation
              </h4>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
              {selectedProject.codeSnippet}
            </pre>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Joseph Betty. Built with PERN Stack,
        TypeScript, Tailwind CSS & WCAG Compliance.
      </footer>
    </div>
  );
}
