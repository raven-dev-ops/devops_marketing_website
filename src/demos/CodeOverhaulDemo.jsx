// demos/CodeOverhaul.jsx

import React, { useState } from 'react';

const overhaulTasks = [
  { id: 1, name: 'Initial Code Audit', prompt: 'What tool might you use to audit code quality?' },
  { id: 2, name: 'Modularize Components', prompt: 'Why is modular code easier to maintain?' },
  { id: 3, name: 'Refactor Legacy Logic', prompt: 'What is a code smell you might refactor?' },
  { id: 4, name: 'Upgrade Dependencies', prompt: 'What command upgrades dependencies in most JS projects?' },
  { id: 5, name: 'Improve Documentation', prompt: 'Why is good documentation critical for teams?' },
  { id: 6, name: 'Review & QA', prompt: 'What does QA stand for?' },
  { id: 7, name: 'Deploy Updated Codebase', prompt: 'Name a popular CI/CD tool for deployment.' },
];

const answers = [
  'ESLint, SonarQube, etc.',
  'Easier to test, update, and debug.',
  'Long functions, duplicated code, etc.',
  'npm update / yarn upgrade',
  'It helps others understand, use, and maintain the code.',
  'Quality Assurance',
  'GitHub Actions, Jenkins, CircleCI, etc.',
];

const reviewQuiz = [
  {
    question: "What’s the main goal of a code audit?",
    options: [
      "Write more code",
      "Identify issues and improve code quality",
      "Delete old files",
    ],
    correct: 1,
  },
  {
    question: "Why is refactoring important?",
    options: [
      "To keep the codebase healthy",
      "To increase file size",
      "To add bugs",
    ],
    correct: 0,
  },
];

const CodeOverhaul = () => {
  const [step, setStep] = useState(0); // 0 = not started
  const [showPrompt, setShowPrompt] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [reviewStep, setReviewStep] = useState(0);
  const [reviewAnswers, setReviewAnswers] = useState([]);

  const startOverhaul = () => {
    setStep(1);
    setShowPrompt(true);
    setUserInput('');
    setFeedback('');
    setReviewStep(0);
    setReviewAnswers([]);
  };

  const handleTaskAdvance = () => {
    if (userInput.trim().length < 2) {
      setFeedback('Type a quick answer to proceed!');
      return;
    }
    setFeedback(`Manager: Great! Example: ${answers[step - 1]}`);
    setTimeout(() => {
      setShowPrompt(false);
      setFeedback('');
      setUserInput('');
      setStep((prev) => prev + 1);
      if (step < overhaulTasks.length) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 700);
      }
    }, 1200);
  };

  // End-of-overhaul review
  const handleReview = (idx) => {
    setReviewAnswers([...reviewAnswers, idx]);
    setTimeout(() => setReviewStep((prev) => prev + 1), 500);
  };

  const complete = step > overhaulTasks.length;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col min-h-[420px]">
      <h4 className="text-lg font-semibold mb-2 text-center">Code Overhaul Project Simulation</h4>
      <div className="mb-4 w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-purple-600 h-2.5 rounded-full transition-all"
          style={{
            width: `${Math.min(100, Math.round((step - 1) / overhaulTasks.length * 100))}%`,
            transition: 'width 0.6s cubic-bezier(.4,2,.6,1)',
          }}
        />
      </div>

      {step === 0 && (
        <button
          onClick={startOverhaul}
          className="w-full mb-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Start Overhaul
        </button>
      )}

      {/* In-progress tasks */}
      {step > 0 && step <= overhaulTasks.length && (
        <div>
          <div className="mb-2 text-md font-medium text-purple-800">
            <span className="font-bold">{overhaulTasks[step - 1].name}</span>
          </div>
          {showPrompt && (
            <div className="flex flex-col mb-2">
              <span className="mb-1 text-gray-700">{overhaulTasks[step - 1].prompt}</span>
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="border rounded px-3 py-1 mt-1 mb-2 text-sm"
                placeholder="Type your answer here…"
                disabled={feedback !== ''}
              />
              <button
                onClick={handleTaskAdvance}
                className="self-end bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded disabled:opacity-60"
                disabled={feedback !== ''}
              >
                Complete Task
              </button>
              {feedback && (
                <div className="mt-2 text-sm text-green-700">{feedback}</div>
              )}
            </div>
          )}

          {/* Show status of all tasks */}
          <ul className="space-y-1 text-sm max-h-[120px] overflow-y-auto pr-2 mt-2">
            {overhaulTasks.map((task, idx) => (
              <li
                key={task.id}
                className={`flex justify-between items-center p-1 border-b border-gray-100 ${
                  idx < step - 1
                    ? 'text-green-700'
                    : idx === step - 1
                    ? 'text-purple-800'
                    : 'text-gray-400'
                }`}
              >
                <span>
                  {task.name}
                </span>
                <span className="font-mono font-bold text-lg">
                  {idx < step - 1
                    ? '✔️'
                    : idx === step - 1
                    ? '🟣'
                    : '…'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Project Review/Quiz */}
      {complete && reviewStep < reviewQuiz.length && (
        <div className="mt-6">
          <div className="text-purple-800 font-semibold mb-2">
            Project Review
          </div>
          <div className="mb-2 text-gray-700">{reviewQuiz[reviewStep].question}</div>
          <div className="space-y-2">
            {reviewQuiz[reviewStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleReview(idx)}
                className="w-full bg-gray-100 hover:bg-purple-600 hover:text-white px-3 py-2 rounded text-left transition"
                disabled={reviewAnswers.length > reviewStep}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* End Summary */}
      {complete && reviewStep >= reviewQuiz.length && (
        <div className="mt-8 text-center">
          <div className="mb-3 text-xl text-green-800 font-semibold">Project Complete!</div>
          <div className="mb-2 text-sm">
            {reviewAnswers.filter(
              (ans, idx) => ans === reviewQuiz[idx].correct
            ).length === reviewQuiz.length
              ? "Perfect review! You're ready to manage code overhauls like a pro."
              : "Nice work! For more advanced project scenarios, contact our team."}
          </div>
          <button
            onClick={() => startOverhaul()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-2"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeOverhaul;
