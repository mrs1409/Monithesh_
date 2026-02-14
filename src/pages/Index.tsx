import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wallpaper from '@/assets/wallpaper.jpg';
import MenuBar from '@/components/MenuBar';
import Dock from '@/components/Dock';
import AppWindow from '@/components/AppWindow';
import MobileLayout from '@/components/MobileLayout';
import WalkthroughTour, { type WalkthroughStep } from '@/components/WalkthroughTour';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  CalendarWidget,
  WeatherWidget,
  WorldClockWidget,
  // AchievementsWidget,
  SkillsWidget,
  ProjectsWidget,
  ExperienceWidget,
  GitHubWidget,
  ActivityWidget,
  QuoteWidget,
  PerformanceWidget,
  ProfileWidget,
} from '@/components/widgets/DesktopWidgets';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

type WindowId = 'about' | 'experience' | 'projects' | 'skills' | 'contact' | null;

const Index = () => {
  const isMobile = useIsMobile();
  const [activeWindow, setActiveWindow] = useState<WindowId>(null);
  const [showIntroHint, setShowIntroHint] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  useEffect(() => {
    // Important: don't show/record onboarding on mobile screens.
    if (window.innerWidth < 768) return;

    const key = 'glassmorphic_intro_seen_v2';
    try {
      // const seen = window.localStorage.getItem(key);
      const seen = false;
      if (!seen) {
        setShowIntroHint(true);
        window.localStorage.setItem(key, '1');
      }
    } catch {
      setShowIntroHint(true);
    }
  }, []);

  const openWindow = (id: string) => {
    setActiveWindow(id as WindowId);
  };

  const closeWindow = () => {
    setActiveWindow(null);
  };

  const walkthroughSteps: WalkthroughStep[] = [
    {
      target: 'about-panel',
      title: 'About me (right side)',
      description: 'This panel is always visible on desktop—scroll here for a quick overview and links.',
    },
    {
      target: 'widget-experience',
      title: 'Start here: Experience widget',
      description: 'Click the highlighted widget to open the full timeline in a window.',
      advanceOnTargetClick: true,
    },
    {
      target: 'widget-skills',
      title: 'Tech stack widget',
      description: 'Click to open Skills and see the full stack + tools.',
      advanceOnTargetClick: true,
    },
    {
      target: 'widget-projects',
      title: 'Projects widget',
      description: 'Click to open Projects and explore case studies.',
      advanceOnTargetClick: true,
    },
    {
      target: 'dock',
      title: 'Use the Dock to navigate',
      description: 'Click any Dock icon to open its section—just like macOS.',
      advanceOnTargetClick: true,
    },
    {
      target: 'menubar',
      title: 'Menu bar + help',
      description: 'The menu bar is mostly aesthetic. Use the ? button anytime to replay this walkthrough.',
    },
  ];

  const startWalkthrough = () => {
    setShowIntroHint(false);
    setWalkthroughStep(0);
    setWalkthroughOpen(true);
  };

  const windowTitles: Record<string, string> = {
    about: 'About Me - Finder',
    experience: 'Experience - Finder',
    projects: 'Projects - Finder',
    skills: 'Skills - Finder',
    contact: 'Contact - Mail',
  };

  // Show mobile layout on smaller screens
  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* macOS Menu Bar */}
      <MenuBar onStartWalkthrough={startWalkthrough} />

      <WalkthroughTour
        open={walkthroughOpen}
        steps={walkthroughSteps}
        stepIndex={walkthroughStep}
        onStepIndexChange={setWalkthroughStep}
        onClose={() => setWalkthroughOpen(false)}
      />

      {/* One-time interaction hint */}
      <AnimatePresence>
        {showIntroHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[60]"
          >
            <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] px-4 py-3 w-[560px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-white font-semibold text-sm">Quick tip</div>
                  <div className="text-white/70 text-xs mt-1 leading-relaxed">
                    Click widgets to open sections. Use the Dock to navigate. The menu bar is decorative—your content opens in windows.
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={startWalkthrough}
                    className="rounded-full bg-white/15 hover:bg-white/20 border border-white/10 px-3 py-1 text-white text-xs"
                  >
                    Walkthrough
                  </button>
                  <button
                    onClick={() => setShowIntroHint(false)}
                    className="rounded-full bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-1 text-white/80 text-xs"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Widgets */}
      <div className="fixed top-10 left-4 z-20 flex flex-col gap-4 pt-4">
        <ExperienceWidget dataTour="widget-experience" onClick={() => openWindow('experience')} />
        <div className="flex gap-4 items-start">
          <SkillsWidget dataTour="widget-skills" onClick={() => openWindow('skills')} />
          <ProjectsWidget dataTour="widget-projects" onClick={() => openWindow('projects')} />
        </div>
        {/* <div className="flex gap-4">
          <GitHubWidget />
          <ActivityWidget />
        </div>
        <PerformanceWidget />
        <QuoteWidget /> */}
      </div>

      {/* About Section - Right Side */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-10 right-4 z-20 pt-4 w-[600px] max-h-[calc(100vh-120px)] overflow-y-auto"
        data-tour="about-panel"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.3) transparent'
        }}
      >
        <div className="glass-panel p-6">
          <AboutSection />
        </div>
      </motion.div>

      {/* App Windows */}
      <AnimatePresence>
        {activeWindow && (
          <AppWindow
            title={windowTitles[activeWindow] || 'Finder'}
            isOpen={!!activeWindow}
            onClose={closeWindow}
          >
            {activeWindow === 'about' && <AboutSection />}
            {activeWindow === 'experience' && <ExperienceSection />}
            {activeWindow === 'projects' && <ProjectsSection />}
            {activeWindow === 'skills' && <SkillsSection />}
            {activeWindow === 'contact' && <ContactSection />}
          </AppWindow>
        )}
      </AnimatePresence>

      {/* macOS Dock */}
      <Dock onOpenWindow={openWindow} />
    </div>
  );
};

export default Index;
