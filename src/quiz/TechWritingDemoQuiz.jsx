// src/quiz/TechWritingDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'docs_findable',
    text: "Can your users or team easily find up-to-date documentation for your products or processes?",
    options: [
      { value: 'always', label: "Yes, documentation is always available and current" },
      { value: 'sometimes', label: "Sometimes – but some info is hard to find or outdated" },
      { value: 'never', label: "No, documentation is missing or confusing" }
    ],
    match: { always: 0, sometimes: 0.6, never: 1 }
  },
  {
    id: 'clarity',
    text: "How often do users or staff ask the same questions about using your software or tools?",
    options: [
      { value: 'rarely', label: "Rarely – instructions are clear and comprehensive" },
      { value: 'sometimes', label: "Sometimes – we get repeat questions" },
      { value: 'often', label: "Often – confusion is common" }
    ],
    match: { often: 1, sometimes: 0.6, rarely: 0 }
  },
  {
    id: 'updates',
    text: "When you update your product or process, how quickly is documentation updated?",
    options: [
      { value: 'immediate', label: "Immediately – we update docs before release" },
      { value: 'delayed', label: "After a delay – updates come eventually" },
      { value: 'notupdated', label: "Rarely – docs often fall behind" }
    ],
    match: { notupdated: 1, delayed: 0.7, immediate: 0 }
  },
  {
    id: 'format',
    text: "What format is your documentation in?",
    options: [
      { value: 'pro', label: "Professionally formatted guides and online help" },
      { value: 'mixed', label: "Mix of Google Docs, PDFs, and emails" },
      { value: 'none', label: "Nothing formal – mostly word-of-mouth or tribal knowledge" }
    ],
    match: { pro: 0, mixed: 0.5, none: 1 }
  },
  {
    id: 'training',
    text: "Do new team members or users need live training to get started?",
    options: [
      { value: 'no', label: "No – our docs allow self-serve onboarding" },
      { value: 'sometimes', label: "Sometimes – but docs help with the basics" },
      { value: 'always', label: "Yes – training is always required" }
    ],
    match: { always: 1, sometimes: 0.5, no: 0 }
  }
];

const recommendations = {
  best: "Your organization would greatly benefit from professional technical writing and clear documentation! We can help you reduce confusion, support growth, and ensure your knowledge is accessible for everyone.",
  maybe: "Your documentation is decent, but we can help you raise the bar! Consider a documentation tune-up to streamline onboarding and support.",
  alt: "You have strong documentation habits. If you want to go further, consider interactive guides, onboarding flows, or a style audit."
};

const TechWritingDemoQuiz = ({ onClose }) => {
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

  // Identify primary pain point
  let painPoint = null;
  if (showResult) {
    if (answers.docs_findable === 'never') painPoint = "Your team or customers can't find reliable documentation.";
    else if (answers.clarity === 'often') painPoint = "Frequent confusion about how to use your tools.";
    else if (answers.updates === 'notupdated') painPoint = "Docs fall behind when your product changes.";
    else if (answers.format === 'none') painPoint = "No formal documentation is available.";
    else if (answers.training === 'always') painPoint = "Onboarding always requires live training.";
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Technical Writing Assessment</h3>
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

export default TechWritingDemoQuiz;
