import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview.js';
import '../style/interview.scss';

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, report, error, fetchReport } = useInterview();
  const [expandedTech, setExpandedTech] = useState(null);
  const [expandedBehav, setExpandedBehav] = useState(null);

  useEffect(() => {
    if (id) fetchReport(id);
  }, [id]);

  if (loading) {
    return (
      <main className="interview-page">
        <div className="loader-wrap">
          <div className="spinner" />
          <p>Loading report…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="interview-page">
        <div className="error-wrap">
          <p className="error-msg">{error}</p>
          <button onClick={() => navigate('/home')}>← Back to Home</button>
        </div>
      </main>
    );
  }

  if (!report) return null;

  const scoreColor =
    report.matchScore >= 75 ? '#22c55e' :
    report.matchScore >= 50 ? '#f59e0b' : '#ef4444';

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (report.matchScore / 100) * circumference;

  return (
    <main className="interview-page">

      {/* ── HEADER ── */}
      <header className="report-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Back
        </button>
        <h1>Interview Report</h1>
      </header>

      {/* ── SCORE + SUMMARY ── */}
      <section className="score-section">
        <div className="score-ring">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="ring-bg" />
            <circle
              cx="60" cy="60" r="54"
              className="ring-fg"
              style={{
                stroke: scoreColor,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <div className="score-value">
            <span className="score-num">{report.matchScore}</span>
            <span className="score-label">Match</span>
          </div>
        </div>
        <div className="summary-block">
          <h2>Summary</h2>
          <p>{report.summary}</p>
        </div>
      </section>

      {/* ── STRENGTHS & WEAKNESSES ── */}
      <section className="sw-section">
        <div className="sw-card strengths-card">
          <h3>
            <span className="sw-icon">✦</span> Strengths
          </h3>
          <ul>
            {report.strengths?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="sw-card weaknesses-card">
          <h3>
            <span className="sw-icon">⚠</span> Weaknesses
          </h3>
          <ul>
            {report.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </section>

      {/* ── FOCUS AREAS ── */}
      {report.focusAreas?.length > 0 && (
        <section className="focus-section">
          <h3>Focus Areas</h3>
          <div className="tag-list">
            {report.focusAreas.map((f, i) => (
              <span className="tag" key={i}>{f}</span>
            ))}
          </div>
        </section>
      )}

      {/* ── SKILL GAPS ── */}
      {report.skillGaps?.length > 0 && (
        <section className="gaps-section">
          <h3>Skill Gaps</h3>
          <div className="gap-list">
            {report.skillGaps.map((g, i) => (
              <div className={`gap-chip severity-${g.severity.toLowerCase()}`} key={i}>
                <span className="gap-name">{g.skill}</span>
                <span className="gap-sev">{g.severity}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TECHNICAL QUESTIONS ── */}
      {report.technicalQuestions?.length > 0 && (
        <section className="questions-section">
          <h3>Technical Questions</h3>
          <div className="accordion">
            {report.technicalQuestions.map((q, i) => (
              <div
                className={`accordion-item ${expandedTech === i ? 'open' : ''}`}
                key={i}
              >
                <button
                  className="accordion-header"
                  onClick={() => setExpandedTech(expandedTech === i ? null : i)}
                >
                  <span className="q-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="q-text">{q.question}</span>
                  <span className="q-chevron">{expandedTech === i ? '−' : '+'}</span>
                </button>
                {expandedTech === i && (
                  <div className="accordion-body">
                    <div className="answer-block">
                      <span className="answer-label">Short Answer</span>
                      <p>{q.shortAnswer}</p>
                    </div>
                    <div className="answer-block">
                      <span className="answer-label">Detailed Answer</span>
                      <p>{q.detailedAnswer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── BEHAVIOURAL QUESTIONS ── */}
      {report.behaviouralQuestions?.length > 0 && (
        <section className="questions-section">
          <h3>Behavioural Questions</h3>
          <div className="accordion">
            {report.behaviouralQuestions.map((q, i) => (
              <div
                className={`accordion-item ${expandedBehav === i ? 'open' : ''}`}
                key={i}
              >
                <button
                  className="accordion-header"
                  onClick={() => setExpandedBehav(expandedBehav === i ? null : i)}
                >
                  <span className="q-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="q-text">{q.question}</span>
                  <span className="q-chevron">{expandedBehav === i ? '−' : '+'}</span>
                </button>
                {expandedBehav === i && (
                  <div className="accordion-body">
                    <div className="answer-block">
                      <span className="answer-label">Short Answer</span>
                      <p>{q.shortAnswer}</p>
                    </div>
                    <div className="answer-block">
                      <span className="answer-label">Detailed Answer</span>
                      <p>{q.detailedAnswer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PREPARATION PLAN ── */}
      {report.preparationPlan?.length > 0 && (
        <section className="plan-section">
          <h3>Preparation Plan</h3>
          <div className="timeline">
            {report.preparationPlan.map((d, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-marker">
                  <span className="day-badge">Day {d.day}</span>
                  <div className="marker-line" />
                </div>
                <div className="timeline-content">
                  <h4>{d.focus}</h4>
                  <ul>
                    {d.tasks.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Interview;