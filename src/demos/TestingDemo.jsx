// demos/TestingDemo.jsx

import React, { useState, useEffect } from 'react';

const tests = [
    { id: 1, name: 'Login Flow Test', status: 'pending' },
    { id: 2, name: 'User Profile Update', status: 'pending' },
    { id: 3, name: 'Payment Gateway Integration', status: 'pending' },
    { id: 4, name: 'Admin Dashboard Access', status: 'pending' },
    { id: 5, name: 'Logout Functionality', status: 'pending' },
];

const walkthroughSteps = [
    {
        title: "Automated Testing Simulation",
        text: "Automated tests quickly check your software for errors, saving you hours of manual work. Click 'Next' to see how a test suite runs!"
    },
    {
        title: "What You'll See",
        text: "Click 'Run Tests' to simulate an automated test suite. You'll see which tests pass or fail, and get real-world tips about quality assurance."
    }
];

const quiz = [
    {
        question: "Why are automated tests important?",
        options: [
            "They help catch bugs early and save developer time.",
            "They make software slower.",
            "They only help with website color choices."
        ],
        correct: 0
    },
    {
        question: "If a test fails, what should you do?",
        options: [
            "Ignore it.",
            "Investigate the failure and fix the bug or test.",
            "Delete all your code."
        ],
        correct: 1
    }
];

const TestingDemo = () => {
    const [testResults, setTestResults] = useState(tests.map(t => ({ ...t, status: 'pending' })));
    const [isRunning, setIsRunning] = useState(false);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [walkthrough, setWalkthrough] = useState(0);
    const [quizStep, setQuizStep] = useState(-1);
    const [quizAnswers, setQuizAnswers] = useState([]);

    useEffect(() => {
        let interval;
        if (isRunning && currentTestIndex < tests.length) {
            interval = setInterval(() => {
                setTestResults(prevResults =>
                    prevResults.map((test, index) => {
                        if (index === currentTestIndex) {
                            // Simulate pass/fail (80% pass rate)
                            return { ...test, status: Math.random() > 0.2 ? 'passed' : 'failed' };
                        }
                        return test;
                    })
                );
                setCurrentTestIndex(prevIndex => prevIndex + 1);
            }, 900); // Slightly slower for more engagement
        } else if (currentTestIndex >= tests.length && isRunning) {
            setIsRunning(false);
            setIsComplete(true);
        }

        return () => clearInterval(interval);
    }, [isRunning, currentTestIndex]);

    const startTests = () => {
        setTestResults(tests.map(t => ({ ...t, status: 'pending' })));
        setCurrentTestIndex(0);
        setIsComplete(false);
        setIsRunning(true);
        setQuizStep(-1);
        setQuizAnswers([]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'passed': return 'text-green-600';
            case 'failed': return 'text-red-600';
            default: return 'text-gray-500';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'passed': return '✓';
            case 'failed': return '✕';
            default: return '…';
        }
    };

    const progress = isComplete ? 100 : (isRunning ? Math.round((currentTestIndex / tests.length) * 100) : 0);
    const buttonText = isComplete ? 'Run Again' : (isRunning ? `Running Tests... (${progress}%)` : 'Run Tests');

    const passed = testResults.filter(t => t.status === 'passed').length;
    const failed = testResults.filter(t => t.status === 'failed').length;

    // Walkthrough
    const handleNextWalkthrough = () => setWalkthrough(w => w + 1);

    // Quiz logic
    const handleQuizAnswer = (idx) => {
        setQuizAnswers([...quizAnswers, idx]);
        setTimeout(() => setQuizStep(q => q + 1), 700);
    };
    const quizComplete = quizStep >= quiz.length;

    const resetDemo = () => {
        setTestResults(tests.map(t => ({ ...t, status: 'pending' })));
        setCurrentTestIndex(0);
        setIsComplete(false);
        setIsRunning(false);
        setWalkthrough(0);
        setQuizStep(-1);
        setQuizAnswers([]);
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col min-h-[340px]">
            <h4 className="text-lg font-semibold mb-4 text-center">Automated Test Suite Simulation</h4>

            {/* Walkthrough steps */}
            {walkthrough < walkthroughSteps.length ? (
                <div className="flex flex-col flex-grow justify-center items-center">
                    <div className="mb-3 text-blue-800 text-base font-bold">{walkthroughSteps[walkthrough].title}</div>
                    <div className="mb-6 text-gray-700 text-center max-w-md">{walkthroughSteps[walkthrough].text}</div>
                    <button
                        onClick={handleNextWalkthrough}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
                    >
                        {walkthrough === walkthroughSteps.length - 1 ? 'Start Demo' : 'Next'}
                    </button>
                </div>
            ) : (
                <>
                    {/* Test Runner */}
                    <button
                        onClick={startTests}
                        disabled={isRunning}
                        className={`w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {buttonText}
                    </button>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                    </div>
                    <ul className="space-y-1 text-sm max-h-[150px] overflow-y-auto pr-2">
                        {testResults.map(test => (
                            <li key={test.id} className={`flex justify-between items-center p-1 border-b border-gray-100 ${getStatusColor(test.status)}`}>
                                <span>{test.name}</span>
                                <span className="font-mono font-bold text-lg">{getStatusIcon(test.status)}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Test Results Summary */}
                    {isComplete && (
                        <div className="mt-6 text-center">
                            <div className="text-base text-green-700 font-semibold mb-2">
                                {passed} passed / {failed} failed
                            </div>
                            <div className="text-xs text-gray-600 mb-3">
                                {failed === 0
                                    ? "All tests passed! This means the code is working as expected."
                                    : "Some tests failed. This helps developers find and fix issues early."}
                            </div>
                            {quizStep === -1 && (
                                <button
                                    onClick={() => setQuizStep(0)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow"
                                >
                                    Take Quick QA Quiz →
                                </button>
                            )}
                        </div>
                    )}

                    {/* Quiz */}
                    {quizStep > -1 && !quizComplete && (
                        <div className="mt-8 flex flex-col items-center">
                            <div className="text-blue-800 font-semibold mb-2">{quiz[quizStep].question}</div>
                            <div className="space-y-2 w-full max-w-xs">
                                {quiz[quizStep].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuizAnswer(idx)}
                                        className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded text-left transition"
                                        disabled={quizAnswers.length > quizStep}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quiz Complete */}
                    {quizComplete && (
                        <div className="mt-8 flex flex-col items-center">
                            <div className="text-green-700 font-bold text-xl mb-3">Quiz Complete!</div>
                            <div className="text-gray-700 mb-2">
                                {quizAnswers.filter((ans, idx) => ans === quiz[idx].correct).length === quiz.length
                                    ? "Excellent! You understand the basics of software testing."
                                    : <>You answered <b>{quizAnswers.filter((ans, idx) => ans === quiz[idx].correct).length}</b> out of <b>{quiz.length}</b> correctly.<br />Keep learning!</>
                                }
                            </div>
                            <ul className="mb-4 text-xs text-gray-600 text-left list-disc pl-5">
                                <li>Run automated tests often to catch bugs before your users do.</li>
                                <li>Fixing failing tests improves reliability and user trust.</li>
                            </ul>
                            <button
                                onClick={resetDemo}
                                className="mt-1 text-sm text-blue-600 hover:underline block mx-auto"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TestingDemo;
