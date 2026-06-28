import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-lg border mb-3 overflow-hidden transition-colors"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        style={{ color: "var(--color-foreground)" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
          }}
        >
          Q{index + 1}
        </span>
        <p
          className="flex-1 text-sm font-medium leading-snug"
          style={{ color: "var(--color-foreground)" }}
        >
          {item.question}
        </p>
        <span
          className="shrink-0 transition-transform duration-200"
          style={{
            color: "var(--color-muted-foreground)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div
          className="px-4 pb-4 pt-2 flex flex-col gap-3 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded w-fit"
              style={{
                backgroundColor: "rgba(56,139,253,0.15)",
                color: "var(--color-ring)",
              }}
            >
              Intention
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {item.intention}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded w-fit"
              style={{
                backgroundColor: "rgba(35,134,54,0.15)",
                color: "var(--color-primary)",
              }}
            >
              Model Answer
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div
    className="rounded-lg border p-4 mb-3"
    style={{
      backgroundColor: "var(--color-card)",
      borderColor: "var(--color-border)",
    }}
  >
    <div className="flex items-center gap-3 mb-3">
      <span
        className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-foreground)",
        }}
      >
        Day {day.day}
      </span>
      <h3
        className="text-sm font-semibold"
        style={{ color: "var(--color-foreground)" }}
      >
        {day.focus}
      </h3>
    </div>
    <ul className="flex flex-col gap-2 pl-1">
      {day.tasks.map((task, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main
        className="flex flex-col items-center justify-center min-h-screen gap-3"
        style={{ backgroundColor: "#0d1117" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#238636", borderTopColor: "transparent" }}
        />
        <p className="text-sm" style={{ color: "#8b949e" }}>
          {!interviewId
            ? "No interview ID found."
            : "Loading your interview plan..."}
        </p>
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "var(--color-primary)"
      : report.matchScore >= 60
        ? "#d29922"
        : "#da3633";

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      <div className="flex h-screen overflow-hidden">
        {/* ── Left Nav ── */}
        <nav
          className="w-56 shrink-0 flex flex-col justify-between py-6 px-3 overflow-y-auto"
          style={{ borderRight: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col gap-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 px-2"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Sections
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left w-full"
                style={
                  activeNav === item.id
                    ? {
                        backgroundColor: "rgba(35,134,54,0.15)",
                        color: "var(--color-primary)",
                      }
                    : { color: "var(--color-muted-foreground)" }
                }
              >
                <span className="shrink-0">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => getResumePdf(interviewId)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90 mt-6"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
          >
            <svg
              height="14"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        {/* ── Center Content ── */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {activeNav === "technical" && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Technical Questions
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-muted-foreground)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div>
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Behavioral Questions
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-muted-foreground)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div>
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Preparation Road Map
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-muted-foreground)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div>
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── Right Sidebar ── */}
        <aside
          className="w-56 shrink-0 py-6 px-4 overflow-y-auto flex flex-col gap-5"
          style={{ borderLeft: "1px solid var(--color-border)" }}
        >
          {/* Match Score */}
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Match Score
            </p>
            <div
              className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 mt-1"
              style={{ borderColor: scoreColor }}
            >
              <span
                className="text-2xl font-bold leading-none"
                style={{ color: scoreColor }}
              >
                {report.matchScore}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                %
              </span>
            </div>
            <p
              className="text-xs text-center"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Strong match for this role
            </p>
          </div>

          <div
            className="w-full h-px"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          {/* Skill Gaps */}
          <div className="flex flex-col gap-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Skill Gaps
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {report.skillGaps.map((gap, i) => {
                const severityStyles = {
                  high: {
                    backgroundColor: "rgba(218,54,51,0.15)",
                    color: "#da3633",
                    border: "1px solid rgba(218,54,51,0.3)",
                  },
                  mid: {
                    backgroundColor: "rgba(210,153,34,0.15)",
                    color: "#d29922",
                    border: "1px solid rgba(210,153,34,0.3)",
                  },
                  low: {
                    backgroundColor: "rgba(35,134,54,0.15)",
                    color: "var(--color-primary)",
                    border: "1px solid rgba(35,134,54,0.3)",
                  },
                };
                return (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={severityStyles[gap.severity] ?? severityStyles.low}
                  >
                    {gap.skill}
                  </span>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
