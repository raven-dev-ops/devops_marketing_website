// src/quiz/ChatbotDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'usecase',
    text: 'Do you have a customer support or internal workflow that could be improved by automated conversation (chatbot) technology?',
    options: [
      { value: 'yes', label: 'Yes, definitely!' },
      { value: 'maybe', label: 'Maybe, but I’m not sure how.' },
      { value: 'no', label: 'Not really.' },
    ],
    match: { yes: 1, maybe: 0.5, no: 0 },
  },
  {
    id: 'volume',
    text: 'How many customer (or internal) questions, requests, or tickets do you typically handle per month?',
    options: [
      { value: 'high', label: 'Hundreds or more' },
      { value: 'medium', label: 'Dozens' },
      { value: 'low', label: 'Less than 10' },
    ],
    match: { high: 1, medium: 0.7, low: 0.2 },
  },
  {
    id: 'integrations',
    text: 'Would you benefit from a chatbot that can integrate with your website, Slack/Teams, or CRM?',
    options: [
      { value: 'yes', label: 'Yes, absolutely!' },
      { value: 'maybe', label: 'Maybe, if it’s simple.' },
      { value: 'no', label: 'No, just basic info is fine.' },
    ],
    match: { yes: 1, maybe: 0.6, no: 0.2 },
  },
  {
    id: 'budget',
    text: 'Do you have budget for new technology solutions this quarter?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'unsure', label: 'Not sure' },
      { value: 'no', label: 'No' },
    ],
    match: { yes: 1, unsure: 0.5, no: 0 },
  },
  {
    id: 'example',
    text: 'Which of these best matches your main need?',
    options: [
      { value: 'support', label: 'Automated customer support FAQs' },
      { value: 'lead', label: 'Qualify/schedule leads or demo requests' },
      { value: 'internal', label: 'Help staff find info/processes faster' },
      { value: 'none', label: 'None of these' },
    ],
    match: { support: 1, lead: 1, internal: 0.7, none: 0 },
  },
];

const recommendations = {
  chatbot: "Your needs strongly align with a custom chatbot solution. Automated conversations can save you time, reduce costs, and delight your users. Ask us for a tailored demo!",
  maybe: "You have some alignment with chatbot technology. A quick strategy call may help clarify if it’s right for you.",
  alt: "A chatbot may not be your highest-impact investment. Consider knowledge base tools, basic web forms, or help desk software instead."
};

const ChatbotDemoQuiz = ({ onClose }) => {
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
    if (match >= 0.8) return recommendations.chatbot;
    if (match >= 0.5) return recommendations.maybe;
    return recommendations.alt;
  };

  // Example "teased out" scenario for extra depth (appears in result if a specific answer is given)
  const bonusExample = answers.example === 'support'
    ? "Example: Deploying a chatbot to answer FAQs can reduce staff workload by 30–50%."
    : answers.example === 'lead'
    ? "Example: Use a bot to capture and qualify leads 24/7—even while you sleep."
    : answers.example === 'internal'
    ? "Example: Help your employees instantly access how-to guides and company info."
    : null;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Is a Chatbot Right for You?</h3>
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
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded transition duration-200 text-left"
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
          {bonusExample && (
            <div className="mb-3 text-blue-900 bg-blue-50 border-l-4 border-blue-300 p-3 rounded text-sm">
              <span className="font-semibold">Example:</span> {bonusExample}
            </div>
          )}
          <div className="flex flex-col items-center mt-4 gap-2">
            <button
              onClick={resetQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition font-medium"
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

export default ChatbotDemoQuiz;
