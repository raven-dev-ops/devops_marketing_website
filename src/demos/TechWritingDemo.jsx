// demos/TechWritingDemo.jsx

import React, { useState } from 'react';

const sections = [
  { id: 'intro', title: 'Introduction', content: 'Welcome to the user guide for the Awesome App! This guide helps you get started quickly.' },
  { id: 'setup', title: 'Setup Instructions', content: '1. Download the app.\n2. Create an account.\n3. Log in using your credentials.' },
  { id: 'usage', title: 'Basic Usage', content: 'Navigate using the sidebar.\nClick the "+" button to add new items.\nSave your work frequently.' },
  { id: 'features', title: 'Key Features', content: '• Real-time collaboration\n• Offline access\n• Powerful search and filtering' },
  { id: 'troubleshooting', title: 'Troubleshooting', content: 'Problem logging in?\n- Double-check your credentials.\n- Reset your password.\n- Contact support if issues persist.' },
  { id: 'faq', title: 'FAQ', content: 'Q: How do I reset my password?\nA: Click "Forgot Password" on the login screen.\n\nQ: Can I use the app offline?\nA: Yes, your data will sync when you reconnect.' }
];

const feedbackMessages = {
  yes: "Thanks for your feedback! We're glad this section helped.",
  no: "Sorry to hear that. We'll use your feedback to improve this guide.",
};

const TechWritingDemo = () => {
  const [activeIdx, setActiveIdx] = useState(0); // Index of active section
  const [feedback, setFeedback] = useState(Array(sections.length).fill(null)); // null/yes/no for each section
  const [visited, setVisited] = useState(new Set([0])); // Set of visited section indices

  const setSection = (idx) => {
    setActiveIdx(idx);
    setVisited(v => new Set(v).add(idx));
  };

  const handleFeedback = (value) => {
    setFeedback(fb => {
      const updated = [...fb];
      updated[activeIdx] = value;
      return updated;
    });
  };

  const allSectionsVisited = visited.size === sections.length;

  const resetDemo = () => {
    setActiveIdx(0);
    setFeedback(Array(sections.length).fill(null));
    setVisited(new Set([0]));
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 flex gap-4 min-h-[270px]">
      {/* Sidebar Navigation */}
      <div className="w-1/3 border-r border-gray-200 pr-4 flex-shrink-0">
        <h5 className="font-semibold text-sm mb-2 text-gray-700">User Guide Sections</h5>
        <ul className="space-y-1">
          {sections.map((section, idx) => (
            <li key={section.id}>
              <button
                onClick={() => setSection(idx)}
                className={`block w-full text-left text-sm px-2 py-1 rounded transition ${
                  activeIdx === idx ? 'bg-blue-100 text-raven-blue font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Content Area */}
      <div className="w-2/3 overflow-y-auto">
        {!allSectionsVisited ? (
          <>
            <h4 className="text-lg font-semibold mb-2 text-raven-dark">{sections[activeIdx].title}</h4>
            <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{sections[activeIdx].content}</p>
            {/* Feedback */}
            {feedback[activeIdx] === null ? (
              <div className="flex gap-2 items-center mb-2">
                <span className="text-xs text-gray-500">Did this help?</span>
                <button
                  onClick={() => handleFeedback('yes')}
                  className="text-green-700 hover:underline text-xs px-2 py-1 rounded"
                >Yes</button>
                <button
                  onClick={() => handleFeedback('no')}
                  className="text-red-700 hover:underline text-xs px-2 py-1 rounded"
                >No</button>
              </div>
            ) : (
              <div className={`text-xs mb-2 ${feedback[activeIdx] === 'yes' ? 'text-green-700' : 'text-red-700'}`}>
                {feedbackMessages[feedback[activeIdx]]}
              </div>
            )}
            <div className="text-xs text-gray-400">
              Section {activeIdx + 1} of {sections.length}
            </div>
          </>
        ) : (
          // Completion summary when all sections visited
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-green-700 font-bold text-lg mb-3 text-center">You’ve completed the User Guide Demo!</div>
            <div className="text-gray-700 text-center mb-4">
              Great documentation is interactive, helpful, and always improving. <br />
              Thanks for exploring! Need a custom guide like this?
            </div>
            <button
              onClick={resetDemo}
              className="mt-1 text-sm text-blue-600 hover:underline block mx-auto"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechWritingDemo;
