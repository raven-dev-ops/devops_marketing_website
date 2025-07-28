// demos/ITConsultingDemo.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'q1',
    text: 'Is your team frequently frustrated by slow computers or network issues?',
    options: ['Yes', 'No', 'Sometimes'],
    feedback: {
      Yes: "Performance problems often indicate outdated hardware or network bottlenecks.",
      No: "Great! A reliable infrastructure is the backbone of productivity.",
      Sometimes: "Intermittent slowdowns can be caused by network spikes or aging equipment.",
    }
  },
  {
    id: 'q2',
    text: 'Do you have a reliable, tested backup system for your critical business data?',
    options: ['Yes', 'No', 'Unsure'],
    feedback: {
      Yes: "Regularly test backups and document your recovery process.",
      No: "Implementing automated, offsite backups is critical to avoid catastrophic data loss.",
      Unsure: "It's important to verify your backup system and know exactly how to recover.",
    }
  },
  {
    id: 'q3',
    text: 'Are you confident your business data is protected against cybersecurity threats?',
    options: ['Yes', 'No', 'Somewhat'],
    feedback: {
      Yes: "Consider periodic security assessments to stay ahead of new threats.",
      No: "Cybersecurity should be a top priority—consider a layered defense strategy.",
      Somewhat: "Periodic vulnerability scanning and staff training improve your security posture.",
    }
  },
  {
    id: 'q4',
    text: 'Do you have an up-to-date inventory of all company devices and software?',
    options: ['Yes', 'No', 'Partially'],
    feedback: {
      Yes: "An up-to-date asset inventory is vital for compliance and rapid troubleshooting.",
      No: "Start by cataloging all devices and software; this helps control costs and reduce risk.",
      Partially: "Regular inventory audits make future upgrades and support much easier.",
    }
  },
  {
    id: 'q5',
    text: 'Is your team trained to recognize phishing emails and social engineering attacks?',
    options: ['Yes', 'No', 'Unsure'],
    feedback: {
      Yes: "Great! Ongoing security training reduces breach risk.",
      No: "Training is an easy and effective way to prevent the most common cyberattacks.",
      Unsure: "You may benefit from a simulated phishing test and short awareness training.",
    }
  },
  {
    id: 'q6',
    text: 'How quickly can your business recover from a major IT outage?',
    options: ['Within hours', 'Within a day', 'Not sure'],
    feedback: {
      "Within hours": "Excellent! Fast recovery shows strong planning and resilience.",
      "Within a day": "A solid start. Consider drills to improve recovery speed.",
      "Not sure": "Regular disaster recovery tests are key to minimizing downtime.",
    }
  },
  {
    id: 'q7',
    text: 'Do you have a dedicated IT strategy for business growth in the next year?',
    options: ['Yes', 'No', 'Working on it'],
    feedback: {
      Yes: "Strategic IT planning drives sustainable growth and innovation.",
      No: "A proactive IT roadmap will help you scale securely and efficiently.",
      "Working on it": "A focused strategy ensures tech investments support your business goals.",
    }
  },
];

const recommendations = {
  slow: "Consider performance optimization, hardware upgrades, or network analysis.",
  backup: "Implementing a robust, automated backup and recovery plan is crucial.",
  security: "A cybersecurity assessment and multi-layered protection (firewall, antivirus, training) is recommended.",
  inventory: "Keeping a detailed device and software inventory improves support and security.",
  training: "Regular staff training on phishing and social engineering can reduce risk.",
  dr: "A documented disaster recovery plan is essential for rapid response to outages.",
  strategy: "An IT strategy aligned to business goals unlocks growth and cost savings.",
  general: "A comprehensive IT assessment can identify key areas for improvement in efficiency and security."
};

function getResultText(answers) {
  let result = [recommendations.general];
  if (answers.q1 === 'Yes' || answers.q1 === 'Sometimes') result.push(recommendations.slow);
  if (answers.q2 === 'No' || answers.q2 === 'Unsure') result.push(recommendations.backup);
  if (answers.q3 === 'No' || answers.q3 === 'Somewhat') result.push(recommendations.security);
  if (answers.q4 !== 'Yes') result.push(recommendations.inventory);
  if (answers.q5 !== 'Yes') result.push(recommendations.training);
  if (answers.q6 === 'Not sure') result.push(recommendations.dr);
  if (answers.q7 !== 'Yes') result.push(recommendations.strategy);
  return [...new Set(result)].join('\n\n');
}

const ITConsultingDemo = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[current].id]: answer });
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setShowResults(true);
      }
    }, 1700);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers({});
    setShowFeedback(false);
    setShowResults(false);
  };

  // Progress as percent
  const progress = Math.round((current / questions.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col min-h-[340px]">
      <h4 className="text-lg font-semibold mb-4 text-center">IT Health Check & Advisor Demo</h4>
      {/* Progress bar */}
      {!showResults && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-500 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {!showResults ? (
        <div className="flex-grow flex flex-col justify-center">
          <div className="text-gray-700 mb-4 text-center font-medium">
            {questions[current].text}
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            {questions[current].options.map(option => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className="bg-blue-100 hover:bg-blue-200 text-raven-blue font-medium py-2 px-4 rounded text-sm transition duration-200 disabled:opacity-60"
              >
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="text-center mt-4 text-blue-700 bg-blue-50 p-2 rounded transition-all">
              {questions[current].feedback[answers[questions[current].id]]}
            </div>
          )}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Question {current + 1} of {questions.length}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-center">
          <h5 className="font-semibold text-center mb-2">Sample Recommendations:</h5>
          <pre className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-line">{getResultText(answers)}</pre>
          <p className="text-xs text-gray-500 mb-3 text-center">
            This is a simplified demo. A full consultation provides in-depth analysis.
          </p>
        </div>
      )}

      {/* Footer area for reset */}
      <div className="mt-auto pt-4">
        {showResults ? (
          <button onClick={resetQuiz} className="block mx-auto text-sm text-blue-600 hover:underline">
            Start Over
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ITConsultingDemo;
