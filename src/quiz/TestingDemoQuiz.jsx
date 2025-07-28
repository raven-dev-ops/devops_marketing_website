// src/quiz/TestingDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'manual_tests',
    text: "How do you currently test new features or changes before going live?",
    options: [
      { value: 'automated', label: "We have automated tests integrated into our workflow" },
      { value: 'manual', label: "Manual testing by developers or QA team" },
      { value: 'minimal', label: "We mostly do visual/manual checks, sometimes we skip testing" }
    ],
    match: { automated: 0, manual: 0.5, minimal: 1 }
  },
  {
    id: 'regression',
    text: "How often do previously working features break after a new release?",
    options: [
      { value: 'never', label: "Rarely or never – regression is very rare" },
      { value: 'sometimes', label: "Sometimes – issues slip through occasionally" },
      { value: 'often', label: "Frequently – regressions are a constant risk" }
    ],
    match: { often: 1, sometimes: 0.6, never: 0 }
  },
  {
    id: 'coverage',
    text: "How much of your codebase is covered by automated unit or integration tests?",
    options: [
      { value: 'over80', label: "Over 80%" },
      { value: 'about50', label: "Around 50%" },
      { value: 'under20', label: "Less than 20% or unknown" }
    ],
    match: { under20: 1, about50: 0.6, over80: 0 }
  },
  {
    id: 'test_reports',
    text: "Do you get test result reports and coverage info as part of every deployment?",
    options: [
      { value: 'always', label: "Always – we see reports every build" },
      { value: 'sometimes', label: "Sometimes – but not every time" },
      { value: 'never', label: "Never or rarely" }
    ],
    match: { never: 1, sometimes: 0.7, always: 0 }
  },
  {
    id: 'bugfix',
    text: "What happens when a bug is found in production?",
    options: [
      { value: 'has_process', label: "We quickly add tests to catch this scenario in the future" },
      { value: 'patch', label: "We fix the bug, but don't always update our tests" },
      { value: 'ad_hoc', label: "We just patch it and move on" }
    ],
    match: { ad_hoc: 1, patch: 0.7, has_process: 0 }
  }
];

const recommendations = {
  best: "You would greatly benefit from a formalized, automated testing suite! Our QA and automation services can help you prevent bugs, accelerate development, and sleep easy before every release.",
  maybe: "You have some good practices, but we can help you reach the next level with full automation, better reporting, and more robust coverage.",
  alt: "Your testing process is already mature. Consider test strategy consulting or advanced CI/CD integration for even smoother development."
};

const TestingDemoQuiz = ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [questions[current].id]: val }));
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
  };

  const getMatchScore = () => {
    let score = 0;
    questions.forEach(q => {
      const v = answers[q.id];
      score += q.match[v] || 0;
    });
    return score / questions.length;
  };

  const getResult = () => {
    const match = getMatchScore();
    if (match >= 0.8) return recommendations.best;
    if (match >= 0.5) return recommendations.maybe;
    return recommendations.alt;
  };

  // Identify the primary pain point
  let painPoint = null;
  if (showResult) {
    if (answers.manual_tests === 'minimal') painPoint = "No formal or automated testing in place.";
    else if (answers.regression === 'often') painPoint = "Frequent regressions after updates.";
    else if (answers.coverage === 'under20') painPoint = "Very low or unknown code coverage.";
    else if (answers.test_reports === 'never') painPoint = "No regular test reports or visibility.";
    else if (answers.bugfix === 'ad_hoc') painPoint = "Bugs are patched without learning for the future.";
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Testing & QA Assessment</h3>
      {!showResult ? (
        <>
          <div className="mb-6">
            <p className="text-md font-medium text-gray-800 mb-2">
              {questions[current].text}
            </p>
            <div className="flex flex-col gap-2">
              {questions[current].options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold py-2 px-4 rounded transition duration-200 text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center mt-2">
            Question {current + 1} of {questions.length}
          </div>
        </>
      ) : (
        <div>
          <div className="mb-4 text-lg text-center">
            <span className="font-bold text-blue-700">Your Result:</span>
            <p className="mt-2">{getResult()}</p>
          </div>
          {painPoint && (
            <div className="mb-3 text-blue-900 bg-blue-50 border-l-4 border-blue-300 p-3 rounded text-sm">
              <span className="font-semibold">Key Issue:</span> {painPoint}
            </div>
          )}
          <div className="flex flex-col items-center mt-4 gap-2">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-medium"
            >
              Retake Quiz
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-xs text-gray-500 hover:underline mt-2"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingDemoQuiz;
