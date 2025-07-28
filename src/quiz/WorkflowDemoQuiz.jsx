// src/quiz/WorkflowDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'repetitive',
    text: "Do you have any processes (like data entry, approvals, inventory checks) that are repeated daily or weekly?",
    options: [
      { value: 'often', label: "Yes, frequently—these tasks are a big part of our day" },
      { value: 'sometimes', label: "Sometimes—depends on the week" },
      { value: 'rarely', label: "Rarely—we already have automated solutions" }
    ],
    match: { often: 0, sometimes: 0.5, rarely: 1 }
  },
  {
    id: 'paperwork',
    text: "How much paperwork or manual form handling does your team do?",
    options: [
      { value: 'lots', label: "A lot—most forms are on paper or emailed PDFs" },
      { value: 'some', label: "Some—we use a mix of digital and paper forms" },
      { value: 'little', label: "Very little—we use integrated digital forms and workflows" }
    ],
    match: { lots: 0, some: 0.6, little: 1 }
  },
  {
    id: 'tracking',
    text: "How do you track the status of ongoing tasks (e.g., approvals, deliveries, project steps)?",
    options: [
      { value: 'manual', label: "Mostly with spreadsheets or in email threads" },
      { value: 'mix', label: "A mix of spreadsheets and some basic tools" },
      { value: 'system', label: "A workflow system shows real-time status to everyone" }
    ],
    match: { manual: 0, mix: 0.6, system: 1 }
  },
  {
    id: 'bottlenecks',
    text: "Do you run into process bottlenecks because people are waiting for approvals or info handoffs?",
    options: [
      { value: 'regularly', label: "Regularly—things get stuck a lot" },
      { value: 'occasionally', label: "Occasionally—we find workarounds" },
      { value: 'rarely', label: "Rarely—processes flow smoothly" }
    ],
    match: { regularly: 0, occasionally: 0.6, rarely: 1 }
  },
  {
    id: 'reporting',
    text: "How easy is it to get up-to-date reports or analytics on your workflow?",
    options: [
      { value: 'hard', label: "Difficult—usually requires lots of manual effort" },
      { value: 'okay', label: "Okay—some data is available, but not always real-time" },
      { value: 'easy', label: "Very easy—we have dashboards or automated reports" }
    ],
    match: { hard: 0, okay: 0.5, easy: 1 }
  }
];

const recommendations = {
  best: "Your business could see huge time savings with custom workflow automation! Let's streamline those repetitive tasks and reduce bottlenecks.",
  maybe: "You have some digital processes, but automation could boost your team's efficiency, data visibility, and compliance.",
  alt: "Your workflows are already highly automated—consider integrating more advanced analytics or AI-powered process improvements."
};

const WorkflowDemoQuiz = ({ onClose }) => {
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

  // Pinpoint the biggest gap
  let painPoint = null;
  if (showResult) {
    if (answers.repetitive === 'often') painPoint = "Many of your tasks are repetitive and time-consuming.";
    else if (answers.paperwork === 'lots') painPoint = "Paperwork and manual forms are slowing your team down.";
    else if (answers.tracking === 'manual') painPoint = "Manual tracking in spreadsheets or emails causes confusion.";
    else if (answers.bottlenecks === 'regularly') painPoint = "Process bottlenecks regularly cause delays.";
    else if (answers.reporting === 'hard') painPoint = "Reporting and analytics are difficult and manual.";
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">Workflow Automation Assessment</h3>
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

export default WorkflowDemoQuiz;
