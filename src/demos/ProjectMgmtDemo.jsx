// demos/ProjectMgmtDemo.jsx

import React, { useState } from 'react';

const initialTasks = [
  { id: 't1', content: 'User Authentication Setup', status: 'todo' },
  { id: 't2', content: 'Dashboard UI Design', status: 'todo' },
  { id: 't3', content: 'API Integration - Phase 1', status: 'inprogress' },
  { id: 't4', content: 'Initial Database Schema', status: 'done' },
  { id: 't5', content: 'Client Feedback Session 1', status: 'done' },
];

const statuses = ['todo', 'inprogress', 'done'];
const statusLabels = { todo: 'To Do', inprogress: 'In Progress', done: 'Done' };
const statusStyles = {
  todo: 'bg-gray-100 border-gray-300 text-gray-800',
  inprogress: 'bg-blue-100 border-blue-300 text-blue-800',
  done: 'bg-green-100 border-green-300 text-green-800'
};
const columnHeaderStyles = {
  todo: 'bg-gray-200 text-gray-700',
  inprogress: 'bg-blue-200 text-blue-700',
  done: 'bg-green-200 text-green-700'
};

const walkthroughSteps = [
  {
    title: "Welcome to Project Task Board",
    text: "In this demo, you'll move tasks through 'To Do', 'In Progress', and 'Done'—just like real project management tools."
  },
  {
    title: "How to Use",
    text: "Click the ◀ or ▶ arrows to move tasks between columns. Try to get every task to 'Done'!"
  },
  {
    title: "Tip",
    text: "Tracking progress visually keeps your team focused and motivated. Kanban boards are great for agile projects!"
  }
];

const reflectionQuiz = [
  {
    question: "What is a key benefit of a Kanban-style task board?",
    options: [
      "Hides progress from the team",
      "Visualizes workflow and bottlenecks",
      "Makes work harder to organize"
    ],
    correct: 1,
  },
  {
    question: "When should you move a task to 'Done'?",
    options: [
      "When partially complete",
      "After it’s reviewed and meets requirements",
      "Any time you want",
    ],
    correct: 1,
  },
];

const ProjectMgmtDemo = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [walkthrough, setWalkthrough] = useState(0); // 0 = first walkthrough step
  const [reflectionStep, setReflectionStep] = useState(-1); // -1 = not started
  const [reflectionAnswers, setReflectionAnswers] = useState([]);

  // % complete: percent of tasks in 'done'
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  // User moves a task left/right
  const moveTask = (taskId, direction) => {
    setTasks(currentTasks => {
      const idx = currentTasks.findIndex(t => t.id === taskId);
      if (idx === -1) return currentTasks;
      const task = currentTasks[idx];
      const curStatusIdx = statuses.indexOf(task.status);
      let nextStatusIdx = curStatusIdx + direction;
      nextStatusIdx = Math.max(0, Math.min(statuses.length - 1, nextStatusIdx));
      if (nextStatusIdx !== curStatusIdx) {
        const updatedTasks = [...currentTasks];
        updatedTasks[idx] = { ...task, status: statuses[nextStatusIdx] };
        return updatedTasks;
      }
      return currentTasks;
    });
  };

  // Move to next walkthrough step
  const nextWalkthrough = () => setWalkthrough((w) => w + 1);

  // Start quiz after all tasks "Done"
  const startReflection = () => setReflectionStep(0);

  // Reflection quiz
  const handleReflection = (idx) => {
    setReflectionAnswers([...reflectionAnswers, idx]);
    setTimeout(() => setReflectionStep((r) => r + 1), 600);
  };

  // Reset board/demo
  const resetDemo = () => {
    setTasks(initialTasks);
    setWalkthrough(0);
    setReflectionStep(-1);
    setReflectionAnswers([]);
  };

  // All tasks completed and not yet in quiz
  const allDone = doneCount === tasks.length && reflectionStep === -1;

  // Quiz complete
  const quizComplete = reflectionStep >= reflectionQuiz.length;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col min-h-[430px]">
      <h4 className="text-lg font-semibold mb-4 text-center">Project Task Board (Demo)</h4>
      {/* Walkthrough before board appears */}
      {walkthrough < walkthroughSteps.length ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="mb-4 text-xl text-blue-700 font-semibold">{walkthroughSteps[walkthrough].title}</div>
          <div className="mb-6 text-gray-700 text-center max-w-lg">{walkthroughSteps[walkthrough].text}</div>
          <button
            onClick={nextWalkthrough}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded transition"
          >
            {walkthrough === walkthroughSteps.length - 1 ? 'Start Demo' : 'Next'}
          </button>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-green-500 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mb-2 text-center text-sm text-gray-700">
            Project completion: <b>{progress}%</b>
          </div>
          {/* Board */}
          <div className="grid grid-cols-3 gap-3">
            {statuses.map(status => (
              <div key={status} className="bg-gray-50 rounded border border-gray-200 flex flex-col">
                <h5 className={`font-semibold text-sm p-2 text-center rounded-t ${columnHeaderStyles[status]}`}>{statusLabels[status]}</h5>
                <div className="space-y-2 p-2 min-h-[150px] flex-grow">
                  {tasks.filter(t => t.status === status).map(task => (
                    <div key={task.id} className={`p-2 rounded border text-xs shadow-sm ${statusStyles[status]}`}>
                      <p className="mb-1 font-medium">{task.content}</p>
                      <div className="flex justify-between mt-1">
                        <button
                          onClick={() => moveTask(task.id, -1)}
                          disabled={status === 'todo'}
                          className="text-xs px-1 disabled:opacity-30 text-gray-500 hover:text-blue-600"
                          title="Move Left"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => moveTask(task.id, 1)}
                          disabled={status === 'done'}
                          className="text-xs px-1 disabled:opacity-30 text-gray-500 hover:text-blue-600"
                          title="Move Right"
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  ))}
                  {tasks.filter(t => t.status === status).length === 0 && (
                    <div className="text-center text-xs text-gray-400 italic mt-4">(Empty)</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            (Click arrows to move tasks between columns. Try to complete all tasks!)
          </p>
          {/* Show project reflection quiz if complete */}
          {allDone && (
            <div className="mt-6 text-center">
              <div className="text-green-700 font-semibold text-lg mb-3">All tasks completed! 🎉</div>
              <button
                onClick={startReflection}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              >
                Project Reflection Quiz
              </button>
            </div>
          )}
        </>
      )}

      {/* Project Reflection Quiz */}
      {reflectionStep > -1 && !quizComplete && (
        <div className="mt-8 text-center">
          <div className="text-blue-800 font-semibold mb-2">
            {reflectionQuiz[reflectionStep].question}
          </div>
          <div className="space-y-2">
            {reflectionQuiz[reflectionStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleReflection(idx)}
                className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded text-left transition"
                disabled={reflectionAnswers.length > reflectionStep}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Project Reflection Complete */}
      {quizComplete && (
        <div className="mt-8 text-center">
          <div className="text-green-700 font-bold text-xl mb-3">Demo Complete!</div>
          <div className="text-gray-700 mb-2">
            {reflectionAnswers.filter((ans, idx) => ans === reflectionQuiz[idx].correct).length === reflectionQuiz.length
              ? "You got every answer right! You're thinking like a project manager."
              : <>You answered <b>{reflectionAnswers.filter((ans, idx) => ans === reflectionQuiz[idx].correct).length}</b> out of <b>{reflectionQuiz.length}</b> correctly.<br />Practice makes perfect!</>
            }
          </div>
          <ul className="mb-4 text-xs text-gray-600 text-left list-disc pl-5">
            <li>Move tasks to 'Done' only when they're truly complete.</li>
            <li>Visual boards help your team collaborate and celebrate progress.</li>
          </ul>
          <button onClick={resetDemo} className="mt-1 text-sm text-blue-600 hover:underline block mx-auto">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectMgmtDemo;
