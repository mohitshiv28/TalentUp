import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      const resumeFile = resumeInputRef.current.files[0];
      console.log("Sending:", { jobDescription, selfDescription, resumeFile });
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      console.log("Response:", data);
      navigate(`/interview/${data._id}`);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) {
    return (
      <main
        className="flex flex-col items-center justify-center min-h-screen gap-3"
        style={{ backgroundColor: "#0d1117" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#238636", borderTopColor: "transparent" }}
        />
        <p className="text-sm" style={{ color: "#8b949e" }}>
          Loading your interview plan...
        </p>
      </main>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-12 flex flex-col items-center gap-10"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* ── Page Header ── */}
      <header className="text-center flex flex-col gap-3 max-w-2xl">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--color-foreground)" }}
        >
          Create Your Custom{" "}
          <span style={{ color: "var(--color-primary)" }}>Interview Plan</span>
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* ── Main Card ── */}
      <div
        className="w-full max-w-5xl rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* ── Left Panel — Job Description ── */}
          <div className="flex-1 flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--color-primary)" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                Target Job Description
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: "rgba(218,54,51,0.15)",
                  color: "#da3633",
                  border: "1px solid rgba(218,54,51,0.3)",
                }}
              >
                Required
              </span>
            </div>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              className="flex-1 w-full rounded-md p-3 text-sm resize-none outline-none min-h-64 transition-colors"
              style={{
                backgroundColor: "var(--color-input)",
                border: "1px solid var(--color-border)",
                color: "var(--color-foreground)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-ring)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--color-border)")
              }
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <p
              className="text-xs text-right"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {jobDescription.length} / 5000 chars
            </p>
          </div>

          {/* ── Vertical Divider ── */}
          <div
            className="w-px hidden md:block"
            style={{ backgroundColor: "var(--color-border)" }}
          />
          <div
            className="h-px md:hidden"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          {/* ── Right Panel — Profile ── */}
          <div className="flex-1 flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--color-primary)" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                Your Profile
              </h2>
            </div>

            {/* Upload Resume */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label
                  className="text-xs font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Upload Resume
                </label>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "rgba(35,134,54,0.15)",
                    color: "var(--color-primary)",
                    border: "1px solid rgba(35,134,54,0.3)",
                  }}
                >
                  Best Results
                </span>
              </div>
              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed py-8 cursor-pointer transition-colors"
                style={{
                  borderColor: selectedFile
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = selectedFile
                    ? "var(--color-primary)"
                    : "var(--color-border)")
                }
              >
                <span
                  style={{
                    color: selectedFile
                      ? "var(--color-primary)"
                      : "var(--color-muted-foreground)",
                  }}
                >
                  {selectedFile ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <polyline points="9 15 11 17 15 13" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  )}
                </span>
                {selectedFile ? (
                  <>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {selectedFile.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      {(selectedFile.size / 1024).toFixed(1)} KB &bull; Click to
                      change
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Click to upload or drag &amp; drop
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      PDF or DOCX (Max 5MB)
                    </p>
                  </>
                )}
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                OR
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />
            </div>

            {/* Quick Self-Description */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="selfDescription"
                className="text-xs font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                Quick Self-Description
              </label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                name="selfDescription"
                rows={4}
                className="w-full rounded-md p-3 text-sm resize-none outline-none transition-colors"
                style={{
                  backgroundColor: "var(--color-input)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--color-ring)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--color-border)")
                }
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* Info Box */}
            <div
              className="flex items-start gap-2 rounded-md p-3 text-xs leading-relaxed"
              style={{
                backgroundColor: "rgba(56,139,253,0.1)",
                border: "1px solid rgba(56,139,253,0.2)",
                color: "var(--color-muted-foreground)",
              }}
            >
              <span
                className="shrink-0 mt-0.5"
                style={{ color: "var(--color-ring)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                    stroke="#0d1117"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                    stroke="#0d1117"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <p>
                Either a{" "}
                <strong style={{ color: "var(--color-foreground)" }}>
                  Resume
                </strong>{" "}
                or a{" "}
                <strong style={{ color: "var(--color-foreground)" }}>
                  Self Description
                </strong>{" "}
                is required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* ── Card Footer ── */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "rgba(13,17,23,0.5)",
          }}
        >
          <span
            className="text-xs"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* ── Recent Reports ── */}
      {reports.length > 0 && (
        <section className="w-full max-w-5xl flex flex-col gap-4">
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--color-foreground)" }}
          >
            My Recent Interview Plans
          </h2>
          <ul className="flex flex-col gap-3">
            {reports.map((report) => {
              const scoreColor =
                report.matchScore >= 80
                  ? "var(--color-primary)"
                  : report.matchScore >= 60
                    ? "#d29922"
                    : "#da3633";
              const scoreBg =
                report.matchScore >= 80
                  ? "rgba(35,134,54,0.15)"
                  : report.matchScore >= 60
                    ? "rgba(210,153,34,0.15)"
                    : "rgba(218,54,51,0.15)";
              return (
                <li
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-colors"
                  style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-border)")
                  }
                >
                  <div className="flex flex-col gap-0.5">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {report.title || "Untitled Position"}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-muted-foreground)" }}
                    >
                      Generated on{" "}
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: scoreBg, color: scoreColor }}
                  >
                    {report.matchScore}% Match
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ── Page Footer ── */}
      <footer className="flex items-center gap-6 pt-4">
        {["Privacy Policy", "Terms of Service", "Help Center"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-xs transition-colors hover:underline"
            style={{ color: "var(--color-muted-foreground)" }}
            onMouseEnter={(e) =>
              (e.target.style.color = "var(--color-foreground)")
            }
            onMouseLeave={(e) =>
              (e.target.style.color = "var(--color-muted-foreground)")
            }
          >
            {link}
          </a>
        ))}
      </footer>
    </div>
  );
};

export default Home;
