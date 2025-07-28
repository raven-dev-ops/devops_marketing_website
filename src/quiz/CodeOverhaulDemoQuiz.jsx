// src/quiz/CodeOverhaulDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'legacy',
    text: 'Is your codebase more than 2 years old, or built by multiple different developers/teams?',
    options: [
      { value: 'yes', label: 'Yes, it’s pretty old and/or has been through many hands.' },
      { value: 'some', label: 'Somewhat—parts are legacy, parts are new.' },
      { value: 'no', label: 'No, it’s modern and built by one team.' },
    ],
    match: { yes: 1, some: 0.7, no: 0 },
  },
  {
    id: 'painpoints',
    text: 'How often do you struggle with bugs, hard-to-maintain code, or confusing project structure?',
    options: [
      { value: 'often', label: 'Very often (it slows us down).' },
      { value: 'sometimes', label: 'Sometimes, but not always.' },
      { value: 'rarely', label: 'Rarely.' },
    ],
    match: { often: 1, sometimes: 0.6, rarely: 0 },
  },
  {
    id: 'deployment',
    text: 'Does deploying new features or bugfixes often take longer than you’d like?',
    options: [
      { value: 'yes', label: 'Yes, deployment is slow or risky.' },
      { value: 'sometimes', label: 'Sometimes, especially for big changes.' },
      { value: 'no', label: 'No, it’s quick and safe.' },
    ],
    match: { yes: 1, sometimes: 0.5, no: 0 },
  },
  {
    id: 'docs',
    text: 'How would you rate your code documentation and onboarding process for new developers?',
    options: [
      { value: 'poor', label: 'Poor – new devs struggle to get up to speed.' },
      { value: 'fair', label: 'Fair – could be better.' },
      { value: 'good', label: 'Good – docs are up-to-date and onboarding is smooth.' },
    ],
    match: { poor: 1, fair: 0.6, good: 0 },
  },
  {
    id: 'priority',
    text: 'How high a priority is improving code quality, maintainability, or tech debt this quarter?',
    options: [
      { value: 'top', label: 'Top priority!' },
      { value: 'medium', label: 'Medium – if we have bandwidth.' },
      { value: 'low', label: 'Low – not urgent.' },
    ],
    match: { top: 1, medium: 0.5, low: 0 },
  },
  {
    id: 'budget',
    text: 'Do you have budget and stakeholder support for a professional refactor or modernization project?',
    options: [
      { value: 'yes', label: 'Yes, we’re ready to invest.' },
      { value: 'maybe', label: 'Maybe – if the case is clear.' },
      { value: 'no', label: 'No, not at this time.' },
    ],
    match: { yes: 1, maybe: 0.5, no: 0 },
  },
  {
    id: 'teaser',
    text: 'Which of these matches your main motivation for a code overhaul?',
    options: [
      { value: 'speed', label: 'Ship features and bugfixes faster' },
      { value: 'quality', label: 'Reduce bugs and improve reliability' },
      { value: 'future', label: 'Prepare for scaling or major new features' },
      { value: 'none', label: 'None of these' },
    ],
    match: { speed: 1, quality: 1, future: 0.8, none: 0 },
  }
];

const recommendations = {
  overhaul: "You’re a strong candidate for a Code Overhaul project! Refactoring, documentation, and process upgrades will unlock faster development and more reliable releases.",
  maybe: "You have several signs a code overhaul could help, especially with a targeted assessment. Let’s explore your key pain points and priorities together.",
  alt: "A full overhaul may not be needed now. Consider small improvements—like focused code review, targeted refactoring, or documentation upgrades."
};

const CodeOverhaulDemoQuiz = ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerValue) => {
    setAnswers(prev => ({ ...prev, [questions[current].id]: answerValue }));
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
  };

  // Calculate match score (0–1)
  const getMatchScore = () => {
    let score = 0;
    questions.forEach(q => {
      const v = answers[q.id];
      score += q.match[v] || 0;
    });
    return score / questions.length;
  };

  // Recommendation logic
  const getResult = () => {
    const match = getMatchScore();
    if (match >= 0.8) return recommendations.overhaul;
    if (match >= 0.5) return recommendations.maybe;
    return recommendations.alt;
  };

  // Teased-out, practical examples based on motivation
  const bonusExample =
    answers.teaser === 'speed'
      ? "Example: After a code overhaul, teams often cut release cycles in half—going from weeks to days."
      : answers.teaser === 'quality'
      ? "Example: Refactoring legacy code and adding tests can reduce bug reports by 60%+."
      : answers.teaser === 'future'
      ? "Example: A well-architected codebase is easier to scale and adapt to new business needs."
      : null;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Do You Need a Code Overhaul?</h3>
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
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 font-semibold py-2 px-4 rounded transition duration-200 text-left"
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
            <span className="font-bold text-purple-700">Your Result:</span>
            <p className="mt-2">{getResult()}</p>
          </div>
          {bonusExample && (
            <div className="mb-3 text-purple-900 bg-purple-50 border-l-4 border-purple-300 p-3 rounded text-sm">
              <span className="font-semibold">Example:</span> {bonusExample}
            </div>
          )}
          <div className="flex flex-col items-center mt-4 gap-2">
            <button
              onClick={resetQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition font-medium"
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

export default CodeOverhaulDemoQuiz;
