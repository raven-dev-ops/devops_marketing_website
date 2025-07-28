// component/QuizModalContext.jsx

import React, { createContext, useContext, useState, useCallback } from "react";

// List your quizzes here
import TestingDemoQuiz from "./TestingDemoQuiz";
// import ITConsultingDemoQuiz from "./ITConsultingDemoQuiz";
// ...import other quizzes

const QUIZ_COMPONENTS = {
  "testing-demo": TestingDemoQuiz,
  // "it-consulting": ITConsultingDemoQuiz,
  // ...add others as needed
};

const QuizModalContext = createContext();

export function QuizModalProvider({ children }) {
  const [quizKey, setQuizKey] = useState(null);

  const openQuiz = useCallback((key) => setQuizKey(key), []);
  const closeQuiz = useCallback(() => setQuizKey(null), []);

  const QuizComponent = quizKey ? QUIZ_COMPONENTS[quizKey] : null;

  return (
    <QuizModalContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      {/* Modal */}
      {QuizComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 relative animate-fadeIn">
            <button
              onClick={closeQuiz}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl"
              aria-label="Close quiz modal"
            >
              &times;
            </button>
            <div className="p-5">
              <QuizComponent />
            </div>
          </div>
        </div>
      )}
    </QuizModalContext.Provider>
  );
}

export function useQuizModal() {
  return useContext(QuizModalContext);
}
