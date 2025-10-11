import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import Sidebar from './components/Sidebar';
import { OverviewSection } from './components/OverviewSection';
import { ApiSection } from './components/ApiSection';
import { InteractiveSection } from './components/InteractiveSection';
import { githubApiData } from './data/github-api';
import { spotifyApiData } from './data/spotify-api';
import type { TSearchResult } from './types';

// Consistent easing curve for snappy animations
const EASE_CURVE = [0.4, 0, 0.2, 1];

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  function handleResultClick(result: TSearchResult) {
    const element = document.getElementById(result.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Update active section based on result
      if (result.href.includes('github') || githubApiData.some(section => section.id === result.id)) {
        setActiveSection('github');
      } else if (result.href.includes('spotify') || spotifyApiData.some(section => section.id === result.id)) {
        setActiveSection('spotify');
      }
    }
  }

  function handleSectionChange(section: string) {
    setActiveSection(section);
    
    // Scroll to section if it exists
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function renderContent() {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'interactive':
        return <InteractiveSection />;
      case 'github':
        return (
          <div className="space-y-12">
            {githubApiData.map((section) => (
              <ApiSection key={section.id} section={section} />
            ))}
          </div>
        );
      case 'spotify':
        return (
          <div className="space-y-12">
            {spotifyApiData.map((section) => (
              <ApiSection key={section.id} section={section} />
            ))}
          </div>
        );
      default:
        // Handle specific sections
        const githubSection = githubApiData.find(s => s.id === activeSection);
        const spotifySection = spotifyApiData.find(s => s.id === activeSection);
        
        if (githubSection) {
          return <ApiSection section={githubSection} />;
        }
        if (spotifySection) {
          return <ApiSection section={spotifySection} />;
        }
        return <OverviewSection />;
    }
  }

  return (
    <motion.div layout className="min-h-screen bg-background dark">
      <Header onResultClick={handleResultClick} />
      <motion.div layout className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        <motion.main 
          layout
          className="flex-1 lg:ml-64 pt-4"
        >
          <motion.div 
            layout
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.2,
                  ease: EASE_CURVE
                }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.main>
      </motion.div>
    </motion.div>
  );
}

export default App;