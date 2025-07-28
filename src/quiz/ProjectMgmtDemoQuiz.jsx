// src/quiz/ProjectMgmtDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'scope',
    text: "How often does your project’s scope or requirements change mid-way through execution?",
    options: [
      { value: 'rare', label: "Rarely – we define everything upfront" },
      { value: 'sometimes', label: "Sometimes – we adjust when needed" },
      { value: 'often', label: "Frequently – scope creep is a major pain" }
    ],
    match: { often: 1, sometimes: 0.6, rare: 0 }
  },
  {
    id: 'timeline',
    text: "Do your projects usually finish on time?",
    options: [
      { value: 'always', label: "Yes, almost always" },
      { value: 'sometimes', label: "Sometimes, but not consistently" },
      { value: 'never', label: "Rarely – we’re usually behind" }
    ],
    match: { never: 1, sometimes: 0.7, always: 0 }
  },
  {
    id: 'tools',
    text: "Which best describes your team’s project management tools?",
    options: [
      { value: 'spreadsheets', label: "Spreadsheets, emails, or sticky notes" },
      { value: 'pm_software', label: "We use a dedicated project management platform" },
      { value: 'none', label: "No formal system – we just talk it out" }
    ],
    match: { spreadsheets: 1, none: 1, pm_software: 0 }
  },
  {
    id: 'visibility',
    text: "Can you easily see real-time status of all your project tasks?",
    options: [
      { value: 'yes', label: "Yes, everything’s visible to the team" },
      { value: 'partial', label: "Somewhat – but some things fall through the cracks" },
      { value: 'no', label: "No, it’s hard to know what’s going on" }
    ],
    match: { no: 1, partial: 0.7, yes: 0 }
  },
  {
    id: 'meetings',
    text: "How effective are your team meetings at solving problems and making decisions?",
    options: [
      { value: 'very', label: "Very – our meetings are focused and productive" },
      { value: 'sometimes', label: "Sometimes – depends on the meeting" },
      { value: 'inefficient', label: "Not very – meetings often drag with little outcome" }
    ],
    match: { inefficient: 1, sometimes: 0.6, very: 0 }
  },
  {
    id: 'risk',
    text: "How does your team handle project risks and blockers?",
    options: [
      { value: 'plan', label: "We proactively identify and address risks" },
      { value: 'react', label: "We address issues as they appear" },
      { value: 'ignore', label: "We usually scramble once things break down" }
    ],
    match: { ignore: 1, react: 0.7, plan: 0 }
  }
];

const recommendations = {
  best: "Your team would strongly benefit from structured project management services! We can help you control scope, hit deadlines, and improve visibility so nothing slips through the cracks.",
  maybe: "You have some strengths, but your project processes could use a tune-up. A project management consultation could increase your team’s reliability and speed.",
  alt: "Your team already has good project management habits! If you’d like to optimize further, we offer advanced workflow automation or training."
};

const ProjectMgmtDemoQuiz = ({ onClose }) => {
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

  // Bonus: surface their weakest area as a “teaser” for services
  let painPoint = null;
  if (showResult) {
    if (answers.scope === 'often') painPoint = "Uncontrolled scope changes";
    else if (answers.timeline === 'never') painPoint = "Missed deadlines";
    else if (answers.tools === 'none' || answers.tools === 'spreadsheets') painPoint = "Lack of project visibility";
    else if (answers.meetings === 'inefficient') painPoint = "Unproductive meetings";
    else if (answers.risk === 'ignore') painPoint = "No risk planning";
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Project Management Assessment</h3>
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
                  className="w-full bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-2 px-4 rounded transition duration-200 text-left"
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
            <span className="font-bold text-green-700">Your Result:</span>
            <p className="mt-2">{getResult()}</p>
          </div>
          {painPoint && (
            <div className="mb-3 text-green-900 bg-green-50 border-l-4 border-green-300 p-3 rounded text-sm">
              <span className="font-semibold">Key Issue:</span> {painPoint} is likely holding your projects back.
            </div>
          )}
          <div className="flex flex-col items-center mt-4 gap-2">
            <button
              onClick={resetQuiz}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition font-medium"
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

export default ProjectMgmtDemoQuiz;
