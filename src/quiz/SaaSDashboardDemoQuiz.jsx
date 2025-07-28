// src/quiz/SaaSDashboardDemoQuiz.jsx

import React, { useState } from "react";

const questions = [
  {
    id: 1,
    text: "How do you currently track your key business metrics (users, revenue, growth, etc)?",
    options: [
      { value: 2, label: "Mostly manual: spreadsheets, email, etc." },
      { value: 1, label: "Basic dashboards, but they’re not real-time or are hard to use." },
      { value: 0, label: "We have a robust, automated dashboard already." },
    ],
  },
  {
    id: 2,
    text: "How important is real-time visibility into your metrics for day-to-day operations?",
    options: [
      { value: 2, label: "Critical for our decision-making and client reporting." },
      { value: 1, label: "Nice to have, but not urgent." },
      { value: 0, label: "Not needed right now." },
    ],
  },
  {
    id: 3,
    text: "Who needs access to business dashboards in your organization?",
    options: [
      { value: 2, label: "Many people, with different access/permission needs." },
      { value: 1, label: "A few managers only." },
      { value: 0, label: "Just me or one person." },
    ],
  },
  {
    id: 4,
    text: "How much time does your team spend compiling reports or chasing down numbers each week?",
    options: [
      { value: 2, label: "Several hours (or more) each week." },
      { value: 1, label: "An hour or two per week." },
      { value: 0, label: "Very little, it’s all automated." },
    ],
  },
  {
    id: 5,
    text: "Are you looking to provide your customers, vendors, or clients with a custom analytics portal?",
    options: [
      { value: 2, label: "Yes, this is a top priority." },
      { value: 1, label: "Maybe in the future." },
      { value: 0, label: "No, not needed." },
    ],
  },
  {
    id: 6,
    text: "How flexible and scalable do you need your reporting to be as you grow?",
    options: [
      { value: 2, label: "Very: multiple data sources, user roles, custom views, etc." },
      { value: 1, label: "Somewhat: a few custom reports would be nice." },
      { value: 0, label: "We’re fine with static reports." },
    ],
  },
];

function getResults(score) {
  if (score >= 10) {
    return {
      headline: "You’re an Excellent Match for a Custom SaaS Dashboard!",
      detail: "Based on your answers, your team would benefit greatly from an automated, scalable analytics dashboard. Let’s chat about building a solution tailored to your workflow and goals.",
      recommend: null,
    };
  } else if (score >= 6) {
    return {
      headline: "You Could Benefit from Dashboard Automation",
      detail:
        "A custom dashboard would help streamline your workflow and provide better insight as your needs grow. Want a free strategy session?",
      recommend: null,
    };
  } else {
    return {
      headline: "You May Not Need a Full SaaS Dashboard (Yet)",
      detail:
        "Right now, it seems your existing processes are meeting your needs. But if your reporting becomes more complex, we can help!",
      recommend:
        "Consider: periodic data audits, or automation for other business bottlenecks.",
    };
  }
}

const SaaSDashboardDemoQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (val) => {
    setAnswers((prev) => [...prev, val]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  const score = answers.reduce((sum, n) => sum + n, 0);
  const result = getResults(score);

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-3 text-center">
        SaaS Dashboard Assessment
      </h3>
      {!showResult ? (
        <>
          <div className="mb-4">
            <p className="mb-2 font-medium text-gray-800">
              {questions[current].text}
            </p>
            <div className="space-y-2">
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.value)}
                  className="block w-full text-left bg-gray-50 hover:bg-blue-100 border border-gray-200 rounded px-3 py-2 text-gray-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Question {current + 1} of {questions.length}
          </p>
        </>
      ) : (
        <div className="text-center">
          <h4 className="text-xl font-bold mb-2">{result.headline}</h4>
          <p className="mb-2">{result.detail}</p>
          {result.recommend && (
            <div className="text-sm text-gray-600 italic mb-2">
              {result.recommend}
            </div>
          )}
          <button
            onClick={handleRestart}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default SaaSDashboardDemoQuiz;
