// src/quiz/LeadershipDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'feedback',
    text: "How comfortable are you giving constructive feedback to team members who are underperforming?",
    options: [
      { value: 'avoid', label: "I tend to avoid it and hope things improve" },
      { value: 'direct', label: "I'm direct, sometimes too blunt" },
      { value: 'supportive', label: "I give supportive, actionable feedback and help them improve" }
    ],
    match: { avoid: 1, direct: 0.6, supportive: 0 }
  },
  {
    id: 'delegation',
    text: "When you delegate a task, what's your approach?",
    options: [
      { value: 'do_myself', label: "I often end up doing it myself" },
      { value: 'dump', label: "I hand off the task and don't check in" },
      { value: 'empower', label: "I empower the person, clarify expectations, and check progress" }
    ],
    match: { do_myself: 1, dump: 0.6, empower: 0 }
  },
  {
    id: 'conflict',
    text: "How do you typically handle conflict within your team?",
    options: [
      { value: 'ignore', label: "I ignore it unless it blows up" },
      { value: 'mediate', label: "I try to mediate, but struggle with difficult conversations" },
      { value: 'address', label: "I address it openly, seeking a fair, win-win solution" }
    ],
    match: { ignore: 1, mediate: 0.7, address: 0 }
  },
  {
    id: 'motivation',
    text: "When a project loses momentum, how do you get things back on track?",
    options: [
      { value: 'push_harder', label: "I push the team harder to meet goals" },
      { value: 'connect', label: "I reconnect with team members to find root causes and re-inspire them" },
      { value: 'accept', label: "I accept things sometimes stall—it's just business" }
    ],
    match: { push_harder: 0.7, connect: 0, accept: 1 }
  },
  {
    id: 'development',
    text: "How often do you invest in developing your own leadership or communication skills?",
    options: [
      { value: 'never', label: "Never—there’s no time" },
      { value: 'sometimes', label: "Occasionally, if there's a problem" },
      { value: 'regularly', label: "Regularly, I seek out resources, feedback, or training" }
    ],
    match: { never: 1, sometimes: 0.7, regularly: 0 }
  },
  {
    id: 'teaser',
    text: "Which situation is most stressful for you as a leader?",
    options: [
      { value: 'unhappy_team', label: "Managing a disengaged or unhappy team" },
      { value: 'tough_convo', label: "Giving tough feedback or handling conflict" },
      { value: 'none', label: "I feel confident in most situations" }
    ],
    match: { unhappy_team: 1, tough_convo: 1, none: 0 }
  }
];

const recommendations = {
  best: "You’d greatly benefit from modern leadership development! Our coaching and interactive training can help you build a high-performing, engaged team and handle tough situations with confidence.",
  maybe: "You show some strengths, but also a few risk areas—targeted leadership workshops or coaching could help you level up.",
  alt: "You’re already demonstrating strong leadership behaviors! If you want to grow further or support others, consider our advanced or team-based offerings."
};

const LeadershipDemoQuiz = ({ onClose }) => {
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

  // Example feedback for their biggest stressor
  let bonusExample = null;
  switch (answers.teaser) {
    case 'unhappy_team':
      bonusExample = "Example: Disengaged teams cost businesses billions in lost productivity every year.";
      break;
    case 'tough_convo':
      bonusExample = "Example: Leaders who address conflict directly see higher retention and trust.";
      break;
    default:
      break;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Leadership Training Quiz</h3>
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
          {bonusExample && (
            <div className="mb-3 text-blue-900 bg-blue-50 border-l-4 border-blue-300 p-3 rounded text-sm">
              <span className="font-semibold">Example:</span> {bonusExample}
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

export default LeadershipDemoQuiz;
