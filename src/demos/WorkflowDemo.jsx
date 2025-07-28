// demos/WorkflowDemo.jsx

import React, { useState } from 'react';

const manualSteps = [
  "Walk the warehouse and check each item by hand.",
  "Write down inventory counts on a clipboard.",
  "Enter numbers manually into a spreadsheet.",
  "Find errors and re-check problem shelves.",
];

const WorkflowDemo = () => {
  const [stage, setStage] = useState(0); // 0: intro, 1-n: manual steps, n+1: automation
  const [processing, setProcessing] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);

  const nextManualStep = () => setStage(stage + 1);

  const startAutomation = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setAutoComplete(true);
    }, 1600);
  };

  const resetDemo = () => {
    setStage(0);
    setProcessing(false);
    setAutoComplete(false);
  };

  // Manual steps phase
  if (!autoComplete && stage <= manualSteps.length) {
    return (
      <div className="text-center p-4 min-h-[290px] flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-2">
          {stage === 0 ? 'Manual Inventory Workflow' : `Step ${stage} of ${manualSteps.length}`}
        </h4>
        <div className="mb-4 text-gray-600 min-h-[48px]">
          {stage === 0
            ? "How long does it take your team to finish routine inventory? Let's see the old way..."
            : manualSteps[stage - 1]
          }
        </div>
        {stage === 0 ? (
          <button
            onClick={nextManualStep}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Start Manual Process
          </button>
        ) : (
          stage < manualSteps.length ? (
            <button
              onClick={nextManualStep}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={startAutomation}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              disabled={processing}
            >
              Automate This!
            </button>
          )
        )}
        <div className="text-xs text-gray-400 mt-4">
          {stage < manualSteps.length
            ? `${manualSteps.length - stage} manual steps left...`
            : stage === manualSteps.length
              ? "Ready to automate and reclaim your time?"
              : ""}
        </div>
      </div>
    );
  }

  // Automation animation & result
  if (processing) {
    return (
      <div className="text-center p-4 min-h-[290px] flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-2 text-green-700">Processing Automation...</h4>
        <div className="mb-4 text-gray-600">Running custom inventory automation tool...</div>
        <div className="flex items-center justify-center gap-2 mt-2 mb-3">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-green-600"></div>
          <span className="text-green-700 font-bold text-lg">⏳</span>
        </div>
        <div className="text-xs text-gray-400">This would take minutes, not hours!</div>
      </div>
    );
  }

  // Completion phase
  if (autoComplete) {
    return (
      <div className="text-center p-4 min-h-[290px] flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-2 text-green-700">After Automation</h4>
        <div className="mb-2 text-green-800 font-semibold text-xl">Inventory updated in real-time via custom app!</div>
        <div className="mb-3 text-gray-700">Process streamlined: checks now take minutes, not hours.</div>
        <ul className="mb-3 text-xs text-gray-600 text-left mx-auto max-w-xs list-disc pl-5">
          <li>Eliminate manual data entry and reduce errors</li>
          <li>Save team hours every week</li>
          <li>Inventory is always up to date</li>
        </ul>
        <button
          onClick={resetDemo}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  // fallback (should never reach here)
  return null;
};

export default WorkflowDemo;
