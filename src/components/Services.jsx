import React from 'react';
import { motion } from 'framer-motion';
import { useQuizModal } from '../components/QuizModalContext';
import veteranBadge from '../assets/american_veteran_badge.png';

const servicesList = [
  { name: "Project Management: Code Overhaul", desc: "Step-by-step simulation of a code overhaul project—from initial audit through deployment. See how a professional project is executed.", demoLink: "code-overhaul" },
  { name: "Code Auditing & Testing", desc: "Automated auditing, test generation, and coverage reporting to boost code quality. Watch the audit and test coverage process in action.", demoLink: "code-audit" },
  { name: "Application Development", desc: "Custom mobile and web apps to digitize workflows and engage customers.", demoLink: "ai-chatbot" },
  { name: "Custom Software Development", desc: "Tailor-made software built from scratch to solve unique business challenges.", demoLink: "workflow-automation" },
  { name: "SaaS Development", desc: "Scalable, cloud-based software-as-a-service platforms for your business idea.", demoLink: "saas-dashboard" },
  { name: "Software Testing", desc: "Comprehensive QA and automated testing to ensure your software is bug-free and reliable.", demoLink: "test-dashboard" },
  { name: "Technical Writing", desc: "Clear, user-friendly documentation and technical content to support users.", demoLink: "user-guide" },
  { name: "Leadership Development", desc: "Workshops and e-learning tools that cultivate leadership and teamwork skills.", demoLink: "leadership-training" },
  { name: "IT Consulting", desc: "Expert IT advisory to plan, implement, and optimize your technology strategy.", demoLink: "it-assessment" },
  { name: "Project Management", desc: "Professional planning and management to deliver tech projects on time and budget.", demoLink: "project-timeline" },
  { name: "Training Tools", desc: "Interactive training and onboarding tools to educate your team effectively.", demoLink: "onboarding-app" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } }
};
const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } }
};

const Services = ({ id }) => {
  const { openQuiz } = useQuizModal();

  const scrollToDemo = (demoId) => {
    const element = document.getElementById(`demo-${demoId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
      <div className="max-w-6xl mx-auto">
        {/* Responsive Header with badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-10 gap-4 sm:gap-6">
          <img
            src={veteranBadge}
            alt="American Veteran-Owned Business"
            className="h-16 w-auto drop-shadow-lg"
            style={{ minWidth: 60, maxWidth: 90 }}
            loading="lazy"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-raven-dark mb-1">Our Services</h2>
            <p className="text-gray-600 max-w-2xl">
              End-to-end solutions designed to meet your specific business needs. Explore our capabilities and see live demos.
            </p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.name}
              className="flex flex-col bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 focus-within:ring-2 focus-within:ring-raven-blue min-h-[340px]"
              variants={itemVariants}
              tabIndex={0}
              aria-label={service.name}
            >
              <h3 className="text-xl font-semibold text-raven-dark mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
              <div className="flex justify-center gap-2 mt-auto w-full">
                <button
                  onClick={() => scrollToDemo(service.demoLink)}
                  className="px-4 py-2 bg-raven-blue hover:bg-raven-red text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raven-blue transition"
                  aria-label={`See Demo for ${service.name}`}
                  type="button"
                >
                  See Demo
                </button>
                <button
                  onClick={() => openQuiz(service.demoLink)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition"
                  aria-label={`Take Service Questionnaire for ${service.name}`}
                  type="button"
                >
                  Take Quiz
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
