import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, FolderOpen, Code, Mail, Github, Linkedin, Download, MapPin, Wifi, Battery } from 'lucide-react';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import resumePdf from '@/assets/Monithesh_R_resume.pdf';
import monitheshPhoto from '@/assets/somnath-photo.jpg';
import wallpaper from '@/assets/wallpaper.jpg';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const MobileLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const navItems: NavItem[] = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen text-foreground"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* iOS-Style Status Bar */}
      <div className="px-6 py-2 flex items-center justify-between text-white text-sm font-medium">
        <div className="flex items-center gap-1">
          <span>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <div className="w-1 h-1 rounded-full bg-white ml-0.5"></div>
            <div className="w-1 h-1 rounded-full bg-white ml-0.5"></div>
            <div className="w-1 h-1 rounded-full bg-white ml-0.5"></div>
          </div>
          <Wifi className="w-4 h-4" />
          <div className="flex items-center gap-0.5">
            <Battery className="w-5 h-5" />
            <span className="text-xs">100%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 pb-28 space-y-6">{/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl"
        >
          <AboutSection />
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Experience</h2>
          </div>
          <ExperienceSection />
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Projects</h2>
          </div>
          <ProjectsSection />
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Skills</h2>
          </div>
          <SkillsSection />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Contact</h2>
          </div>
          <ContactSection />
        </motion.section>
      </main>

      {/* iPhone-Style Bottom Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4"
      >
        <div 
          className="flex items-center gap-4 px-5 py-3 rounded-[28px] backdrop-blur-2xl border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`p-2.5 rounded-[16px] transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-xl' 
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/90'}`} />
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Footer */}
      <footer className="px-4 py-8 pb-24 text-center text-white/50 text-sm">
        <p>© 2026 Monithesh R. All rights reserved.</p>
        <p className="mt-1 text-xs">Made with ❤️ using React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default MobileLayout;
