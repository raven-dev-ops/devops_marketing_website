// demos/LeadershipDemo.jsx

import React, { useState } from 'react';

const scenarios = [
  {
    question: "A key project deadline is approaching, but a team member is struggling with their tasks and falling behind. What's the BEST first step?",
    options: [
      { id: 'a', text: 'Take over the tasks yourself to ensure the deadline is met.' },
      { id: 'b', text: 'Privately meet with the team member to understand the challenges and offer support/resources.' },
      { id: 'c', text: 'Announce in the team meeting that everyone needs to pick up the slack.' },
      { id: 'd', text: 'Reassign the tasks to a more capable team member immediately.' },
    ],
    correct: 'b',
    feedback: {
      a: "While proactive, this doesn't address the root cause and can lead to burnout or demotivation.",
      b: "Correct! Understanding the problem and offering support fosters trust and helps the team member grow.",
      c: "This can create resentment and doesn’t directly help the struggling individual.",
      d: "This might be necessary later, but jumping to this step undermines trust and misses a coaching opportunity.",
    }
  },
  {
    question: "During a team meeting, two members start to disagree loudly about the best way to proceed with a task. What's your best move as the leader?",
    options: [
      { id: 'a', text: 'End the meeting immediately.' },
      { id: 'b', text: 'Let them argue so the team sees open debate.' },
      { id: 'c', text: 'Intervene, acknowledge both perspectives, and guide the conversation back to the project goals.' },
      { id: 'd', text: 'Pick a side to resolve the disagreement quickly.' },
    ],
    correct: 'c',
    feedback: {
      a: "This avoids conflict but misses a chance to resolve the core issue.",
      b: "Open debate is good, but as leader, you must keep discussions productive and respectful.",
      c: "Correct! Great leaders facilitate respectful dialogue and keep the team focused on goals.",
      d: "Quick decisions can help, but showing fairness and mediation skills builds trust and alignment.",
    }
  },
  {
    question: "You notice one of your top performers seems disengaged and less communicative lately. What should you do first?",
    options: [
      { id: 'a', text: 'Ignore it—they’re probably just busy.' },
      { id: 'b', text: 'Increase their workload to motivate them.' },
      { id: 'c', text: 'Privately check in and ask if everything is okay or if they need support.' },
      { id: 'd', text: 'Mention your concern publicly in a team meeting.' },
    ],
    correct: 'c',
    feedback: {
      a: "Ignoring changes in behavior can lead to bigger issues later.",
      b: "Increasing their workload could backfire and increase disengagement.",
      c: "Correct! Private, supportive check-ins show you care and can uncover hidden issues.",
      d: "Publicly discussing personal issues may embarrass or alienate the team member.",
    }
  },
];

const LeadershipDemo = () => {
  const [step, setStep] = useState(0); // scenario index
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentScenario = scenarios[step];
  const isCorrect = selected === currentScenario?.correct;

  const handleSelect = (optionId) => {
    setSelected(optionId);
    setShowFeedback(true);
    if (optionId === currentScenario.correct) setScore((s) => s + 1);
  };

  const nextScenario = () => {
    setSelected(null);
    setShowFeedback(false);
    setStep((s) => s + 1);
  };

  const resetDemo = () => {
    setStep(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
  };

  const finished = step >= scenarios.length;

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 min-h-[340px] flex flex-col">
      <h4 className="text-lg font-semibold mb-1 text-center">Leadership Training Scenario Demo</h4>
      {!finished ? (
        <>
          <p className="text-sm text-gray-600 mb-4 text-center italic">{currentScenario.question}</p>
          <div className="space-y-2 mb-4">
            {currentScenario.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showFeedback}
                className={`block w-full text-left text-sm px-3 py-2 border rounded transition duration-150 ${
                  showFeedback && option.id === currentScenario.correct ? 'bg-green-100 border-green-300 text-green-800 ring-2 ring-green-400'
                  : showFeedback && option.id === selected ? 'bg-red-100 border-red-300 text-red-800'
                  : 'border-gray-300 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed'
                }`}
              >
                <span className="font-bold mr-2">{option.id.toUpperCase()}.</span> {option.text}
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className={`p-3 rounded text-sm mb-3 ${isCorrect ? 'bg-green-50 border-l-4 border-green-500 text-green-800' : 'bg-red-50 border-l-4 border-red-500 text-red-800'}`}>
              <p><span className="font-bold">{isCorrect ? 'Correct!' : 'Consider this:'}</span> {currentScenario.feedback[selected]}</p>
            </div>
          )}
          {!showFeedback && <p className="text-xs text-gray-500 text-center">Scenario {step + 1} of {scenarios.length}: Select the best option.</p>}
          {showFeedback && (
            <button
              onClick={nextScenario}
              className="mt-1 text-xs text-blue-600 hover:underline block mx-auto"
            >
              Next Scenario
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="text-green-700 font-bold text-xl mb-3 text-center">Great job!</div>
          <div className="text-gray-700 mb-4 text-center text-base">
            {score === scenarios.length
              ? "You answered all scenarios correctly. That's strong leadership instinct!"
              : <>You answered <b>{score}</b> out of <b>{scenarios.length}</b> scenarios correctly.<br />Every leader can improve with practice.</>
            }
          </div>
          <ul className="mb-4 text-xs text-gray-600 text-left list-disc pl-5">
            <li>Effective leaders communicate privately and supportively.</li>
            <li>Resolving conflict respectfully builds team trust.</li>
            <li>Personal check-ins show you value team wellbeing.</li>
          </ul>
          <button onClick={resetDemo} className="mt-1 text-sm text-blue-600 hover:underline block mx-auto">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadershipDemo;
