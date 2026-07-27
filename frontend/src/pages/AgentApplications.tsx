import { Block, Eyebrow } from "@/components/PortfolioBlocks";
import Tilt3D from "@/components/Tilt3D";

/**
 * The live agent runs on a machine I control and is reachable through a tunnel
 * whose hostname changes between sessions, so it is read from the environment
 * rather than hardcoded. When it is unset the page shows the case study and
 * omits the launch button instead of offering a dead link.
 */
const AGENT_URL = import.meta.env.VITE_AGENT_APP_URL as string | undefined;

const PIPELINE = [
  {
    stage: "Discover",
    detail:
      "Pulls postings from six sources, including the German federal employment agency and company applicant tracking systems. Filters to Germany, to the last seven days, and to roles matching at least one real skill.",
  },
  {
    stage: "Match",
    detail:
      "Scores every posting against the profile and writes the reasoning down, so a weak fit is visibly weak rather than a silent number.",
  },
  {
    stage: "Tailor",
    detail:
      "Rewrites CV bullets and the Anschreiben to speak to the specific role, working only from experience the profile actually evidences.",
  },
  {
    stage: "Render",
    detail:
      "Writes the tailored text into my own document templates and renders one-page PDFs, verifying the rendered line count rather than guessing at it.",
  },
  {
    stage: "Review",
    detail:
      "Parks the finished application and stops. Submitting is mine to do.",
  },
];

const STACK = [
  "FastAPI",
  "Claude",
  "PostgreSQL + pgvector",
  "Next.js",
  "Docker",
  "Redis",
];

export default function AgentApplications() {
  return (
    <Block bg="#0d0d0f" dark className="overflow-hidden">
      <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-14 items-start">
        <div>
          <Eyebrow>Agent Applications</Eyebrow>
          <h2 className="font-extrabold leading-[1.02] tracking-tight text-[clamp(2.4rem,5.5vw,4.6rem)] mb-6 text-white">
            An agent that
            <br />
            prepares, not
            <br />
            pretends
          </h2>
          <p className="text-lg text-white/70 max-w-xl mb-6">
            A multi-agent system that finds relevant German engineering roles,
            tailors my CV and cover letter to each one, and renders submission
            ready PDFs. It stops before sending. That boundary is deliberate.
          </p>
          <p className="text-white/50 max-w-xl mb-10">
            Auto submitting breaches the terms of most application portals and
            risks the account it applies from. The interesting engineering was
            never the click. It was reading the posting properly, rewriting
            honestly, and holding a strict document format under machine
            control.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {AGENT_URL ? (
              <a
                href={AGENT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff5b2e] px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Open the agent
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            ) : (
              <span className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/50">
                Runs on my own machine. Available on request.
              </span>
            )}
            <a
              href="https://github.com/Gaurang8200/Agent-Applications"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white/90 transition-colors hover:bg-white/5"
            >
              Read the code
            </a>
          </div>

          {AGENT_URL && (
            <p className="mt-5 max-w-xl text-sm text-white/40">
              Sign in is restricted to my account.
            </p>
          )}

          <div className="mt-12 flex flex-wrap gap-2">
            {STACK.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-white/60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <Tilt3D max={4}>
          <div className="rounded-2xl bg-white p-8 text-[#111111] md:p-10">
            <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-[#ff5b2e]">
              The pipeline
            </p>
            <ol className="space-y-6">
              {PIPELINE.map(({ stage, detail }, index) => (
                <li key={stage} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-bold">{stage}</span>
                    <span className="text-[15px] leading-relaxed text-[#4a4a48]">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Tilt3D>
      </div>
    </Block>
  );
}
