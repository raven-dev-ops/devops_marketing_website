// src/quiz/TrainingToolDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'checklist',
    text: "How do new hires track their onboarding tasks and progress?",
    options: [
      { value: 'digital', label: "We use a digital checklist or onboarding app" },
      { value: 'paper', label: "We use printed checklists or email instructions" },
      { value: 'informal', label: "It's mostly informal—managers or HR tell them as they go" }
    ],
    match: { digital: 0, paper: 0.6, informal: 1 }
  },
  {
    id: 'self_serve',
    text: "Can new hires access training materials and company policies on their own, at any time?",
    options: [
      { value: 'yes', label: "Yes, all resources are online and self-serve" },
      { value: 'partial', label: "Some resources are online, some are sent by email" },
      { value: 'no', label: "No, most things are shared in meetings or 1:1" }
    ],
    match: { yes: 0, partial: 0.5, no: 1 }
  },
  {
    id: 'track_progress',
    text: "Is onboarding/training progress tracked for each employee and viewable by managers/HR?",
    options: [
      { value: 'always', label: "Always—managers can see who has completed each step" },
      { value: 'sometimes', label: "Sometimes—we follow up, but not in a central system" },
      { value: 'never', label: "No, we rely on trust and ad hoc check-ins" }
    ],
    match: { always: 0, sometimes: 0.6, never: 1 }
  },
  {
    id: 'updates',
    text: "How are updates to policies/training communicated to employees?",
    options: [
      { value: 'auto', label: "Automatically—staff are notified and required to acknowledge updates in our system" },
      { value: 'email', label: "Via email, staff are expected to read updates" },
      { value: 'meetings', label: "Mostly in meetings, may not always reach everyone" }
    ],
    match: { auto: 0, email: 0.5, meetings: 1 }
  },
  {
    id: 'completion',
    text: "How do you confirm that onboarding/training steps have actually been completed?",
    options: [
      { value: 'logged', label: "All steps are logged and verified digitally" },
      { value: 'verbal', label: "We ask for verbal confirmation or use signatures" },
      { value: 'assume', label: "We generally assume people complete them" }
    ],
    match: { logged: 0, verbal: 0.7, assume: 1 }
  }
];

const recommendations = {
  best: "You could benefit from a fully digital, interactive onboarding tool! Our custom platforms streamline the entire onboarding and training process, ensuring nothing falls through the cracks.",
  maybe: "You have some good practices, but modern onboarding apps can increase engagement, save time, and ensure compliance.",
  alt: "Your onboarding process is already well managed. Consider advanced training features, engagement surveys, or skill-tracking integrations."
};

const TrainingToolDemoQuiz = ({ onClose }) => {
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

  // Pinpoint the main weakness
  let painPoint = null;
  if (showResult) {
    if (answers.checklist === 'informal') painPoint = "No structured onboarding checklist—new hires may miss steps.";
    else if (answers.self_serve === 'no') painPoint = "New hires can't access resources or policies on demand.";
    else if (answers.track_progress === 'never') painPoint = "Managers have no easy way to track onboarding progress.";
    else if (answers.updates === 'meetings') painPoint = "Policy/training updates aren't reliably communicated.";
    else if (answers.completion === 'assume') painPoint = "You have no reliable record of onboarding completion.";
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Onboarding & Training Assessment</h3>
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
              <span className="font-semibold">Key Issue:</span> {painPoint}
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

export default TrainingToolDemoQuiz;
