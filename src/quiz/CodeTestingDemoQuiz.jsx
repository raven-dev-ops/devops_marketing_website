// src/quiz/ITConsultingDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'infrastructure',
    text: "How reliable is your office network and computer hardware?",
    options: [
      { value: 'frequent_issues', label: "Frequent issues and downtime" },
      { value: 'occasional', label: "Occasional problems, but manageable" },
      { value: 'reliable', label: "Very reliable, no real complaints" }
    ],
    match: { frequent_issues: 1, occasional: 0.5, reliable: 0 }
  },
  {
    id: 'backups',
    text: "How would you rate your business’s backup and recovery plan?",
    options: [
      { value: 'no_plan', label: "We have no formal backup plan" },
      { value: 'partial', label: "We have some backups, but not regular or tested" },
      { value: 'robust', label: "We have a robust, regularly tested backup system" }
    ],
    match: { no_plan: 1, partial: 0.7, robust: 0 }
  },
  {
    id: 'cybersecurity',
    text: "How protected are you against modern cybersecurity threats (ransomware, phishing, etc.)?",
    options: [
      { value: 'not_protected', label: "We are not sure, or not protected" },
      { value: 'basic', label: "We have basic protections (antivirus, firewall)" },
      { value: 'proactive', label: "We actively manage security and train our team" }
    ],
    match: { not_protected: 1, basic: 0.6, proactive: 0 }
  },
  {
    id: 'compliance',
    text: "Does your business need to follow compliance rules (HIPAA, PCI, SOC2, etc.)?",
    options: [
      { value: 'yes', label: "Yes, and it’s stressful/unclear" },
      { value: 'no', label: "No, we’re not regulated" },
      { value: 'unsure', label: "Unsure or partially" }
    ],
    match: { yes: 1, unsure: 0.6, no: 0 }
  },
  {
    id: 'support',
    text: "Do you have a go-to IT support person or team for emergencies?",
    options: [
      { value: 'no', label: "No, we just try to fix it ourselves" },
      { value: 'sort_of', label: "Sort of—depends on the issue" },
      { value: 'yes', label: "Yes, always someone available" }
    ],
    match: { no: 1, sort_of: 0.7, yes: 0 }
  },
  {
    id: 'cloud',
    text: "How does your business use cloud services (Microsoft 365, Google Workspace, etc.)?",
    options: [
      { value: 'not_using', label: "Not using, or unsure how to manage" },
      { value: 'basic_usage', label: "We use some but don’t maximize value" },
      { value: 'optimized', label: "We’re set up well and confident" }
    ],
    match: { not_using: 1, basic_usage: 0.6, optimized: 0 }
  },
  {
    id: 'teaser',
    text: "Which scenario worries you most?",
    options: [
      { value: 'data_loss', label: "Losing critical business data" },
      { value: 'downtime', label: "Network or system outages" },
      { value: 'security', label: "Getting hacked or scammed" },
      { value: 'none', label: "None of these" }
    ],
    match: { data_loss: 1, downtime: 1, security: 1, none: 0 }
  }
];

const recommendations = {
  best: "You’d strongly benefit from a strategic IT assessment! We can strengthen your backup, security, cloud, and support so you can focus on business—not tech headaches.",
  maybe: "You show some risk areas—let’s discuss a targeted IT tune-up, such as better backups or security training.",
  alt: "Your IT setup is pretty solid! If you need help with digital transformation, compliance, or scaling up, we can still offer specialized advice."
};

const ITConsultingDemoQuiz = ({ onClose }) => {
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

  // Bonus example
  let bonusExample = null;
  switch (answers.teaser) {
    case 'data_loss':
      bonusExample = "Example: Even a simple ransomware attack can put your company out of business without tested backups.";
      break;
    case 'downtime':
      bonusExample = "Example: The average small business loses thousands per day during IT outages.";
      break;
    case 'security':
      bonusExample = "Example: Over 60% of cyber attacks hit small and midsize businesses.";
      break;
    default:
      break;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">IT Consulting & Security Quiz</h3>
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

export default ITConsultingDemoQuiz;
