// App.js

import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Site Sections (in homepage order)
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ToolsSection from './components/ToolsSection';
import WhyWorkSection from './components/WhyWorkSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import ContactSection from './components/ContactSection';
import SiteFooter from './components/SiteFooter';
import ChatBot from './components/ChatBot';

// Error fallback component for ErrorBoundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center my-16 px-4">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Something went wrong.</h2>
      <p className="mb-2 text-gray-700">{error.message}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        onClick={resetErrorBoundary}
      >
        Reload Page
      </button>
    </div>
  );
}

function App() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll for internal links/buttons
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="App bg-gray-50 min-h-screen flex flex-col">
          <Helmet>
            <title>Raven Development Operations | Software & Automation</title>
            <meta
              name="description"
              content="Veteran-led Raven Development Operations builds custom software, automation, DevOps, and cloud systems that cut manual work and keep teams reliable."
            />
            <meta property="og:title" content="Raven Development Operations" />
            <meta
              property="og:description"
              content="Custom software, workflow automation, DevOps, and cloud infrastructure for small businesses and government-ready teams."
            />
            <meta property="og:type" content="website" />
          </Helmet>
          <Navbar onNavigate={scrollToSection} />
          <main role="main" className="flex-grow w-full">
            <HeroSection scrollToSection={scrollToSection} />
            <ServicesSection />
            <AboutSection />
            <ToolsSection />
            <WhyWorkSection />
            <CaseStudiesSection />
            <ContactSection />
          </main>
          <SiteFooter scrollToSection={scrollToSection} />
          <ChatBot
            calendlyUrl="https://calendly.com/gptfleet/consult"
            onOpenContact={() => scrollToSection('contact')}
          />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

