import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, MapPin, Github, Coffee, Code2, TrendingUp, Zap, BookOpen, Sparkles, ArrowRight, Download, Briefcase, FolderGit2, ShoppingCart, Bot, Calendar, Building2, Brain, GraduationCap, HeartPulse } from 'lucide-react';
import { SiReact, SiPytorch, SiNextdotjs, SiPython, SiDocker } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import monitheshPhoto from '@/assets/monithesh-photo.jpg.jpeg';
import resume from '@/assets/Monithesh_R_resume.pdf';

// Calendar Widget
export const CalendarWidget: React.FC = () => {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const day = now.getDate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="widget widget-small"
    >
      <div className="text-red-400 text-xs font-semibold mb-1">{dayName}</div>
      <div className="text-4xl font-light text-white">{day}</div>
      <div className="text-white/60 text-sm mt-2">No Events Today</div>
    </motion.div>
  );
};

// Weather Widget
export const WeatherWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="widget widget-small bg-blue-400/80"
    >
      <div className="text-white font-medium text-sm">Bengaluru</div>
      <div className="text-4xl font-light text-white">26°</div>
      <div className="flex items-center gap-1 mt-1">
        <Cloud className="w-4 h-4 text-white/80" />
        <span className="text-white/80 text-xs">Mostly Cloudy</span>
      </div>
      <div className="text-white/60 text-xs mt-1">H:26° L:18°</div>
    </motion.div>
  );
};

// World Clock Widget
export const WorldClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const cities = [
    { name: 'Cupertino', offset: -8, label: 'Yesterday' },
    { name: 'Tokyo', offset: 9, label: 'Today' },
    { name: 'Sydney', offset: 11, label: 'Today' },
    { name: 'Paris', offset: 1, label: 'Today' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="widget widget-wide"
    >
      <div className="grid grid-cols-4 gap-3">
        {cities.map((city) => {
          const localTime = new Date(time.getTime() + (city.offset - 5.5) * 60 * 60 * 1000);
          const hours = localTime.getHours();
          const minutes = localTime.getMinutes();
          const rotation = (hours % 12) * 30 + minutes * 0.5;
          const minuteRotation = minutes * 6;
          
          return (
            <div key={city.name} className="flex flex-col items-center">
              <div className="relative w-12 h-12 rounded-full border-2 border-white/30 mb-2">
                {/* Clock face numbers */}
                <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[8px] text-white/50">12</span>
                <span className="absolute right-0.5 top-1/2 -translate-y-1/2 text-[8px] text-white/50">3</span>
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] text-white/50">6</span>
                <span className="absolute left-0.5 top-1/2 -translate-y-1/2 text-[8px] text-white/50">9</span>
                {/* Hour hand */}
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-white rounded-full origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg)` }}
                />
                {/* Minute hand */}
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white/80 rounded-full origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)` }}
                />
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-orange-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-white text-xs font-medium">{city.name}</div>
              <div className="text-white/50 text-[10px]">{city.label}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Profile Widget (custom for portfolio)
export const ProfileWidget: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const handleResumeDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Monithesh_R_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="widget widget-medium cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/20">
          <img 
            src={monitheshPhoto} 
            alt="Monithesh" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-white font-semibold text-base">Monithesh R</div>
          <div className="text-white/70 text-xs">AI Research Intern</div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-white/50 text-xs mb-2">
        <MapPin className="w-3 h-3" />
        <span>Bangalore, India</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1 text-green-400 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Available for work</span>
        </div>
      </div>
      <div className="pt-2 border-t border-white/10 space-y-2">
        <button
          onClick={handleResumeDownload}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all text-white text-xs font-medium"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Resume</span>
        </button>
        <div className="text-white/60 text-xs text-center">🚀 Click card to view portfolio</div>
      </div>
    </motion.div>
  );
};

// Skills Stats Widget
export const SkillsWidget: React.FC<{ onClick?: () => void; dataTour?: string }> = ({ onClick, dataTour }) => {
  const skills = [
    { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
    { name: 'React', icon: SiReact, color: 'text-cyan-400' },
    { name: 'PyTorch', icon: SiPytorch, color: 'text-red-400' },
    { name: 'NextJS', icon: SiNextdotjs, color: 'text-white' },
    { name: 'AWS', icon: FaAws, color: 'text-orange-400' },
    { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="widget widget-medium cursor-pointer hover:scale-[1.02] transition-all group"
      onClick={onClick}
      data-tour={dataTour}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <div className="text-white/90 text-sm font-semibold">TECH STACK</div>
        </div>
        <motion.div 
          className="flex items-center gap-1 text-white/50 text-xs group-hover:text-white/80 transition-colors"
          whileHover={{ x: 3 }}
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {skills.slice(0, 6).map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group-hover:border-white/20"
            >
              <IconComponent className={`w-7 h-7 mb-1.5 ${skill.color}`} />
              <div className="text-xs font-medium text-white/80">
                {skill.name}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="pt-2 border-t border-white/10">
        <div className="text-white/60 text-xs flex items-center gap-1">
          <span>+15 more technologies</span>
          <span className="text-purple-400">→</span>
        </div>
      </div>
    </motion.div>
  );
};

// Projects Widget
export const ProjectsWidget: React.FC<{ onClick?: () => void; dataTour?: string }> = ({ onClick, dataTour }) => {
  const featuredProjects = [
    {
      name: 'Agentic DevOps',
      tagline: 'Autonomous DevOps assistant',
      icon: Bot,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      chips: ['Python', 'LLMs', 'FastAPI'],
      github: 'https://github.com/mrs1409'
    },
    {
      name: 'Product Singularity',
      tagline: 'Multimodal AI tool',
      icon: Brain,
      gradient: 'from-blue-500 via-cyan-500 to-indigo-500',
      chips: ['CV', 'NLP', 'PyTorch'],
      github: 'https://github.com/mrs1409'
    },
    {
      name: 'Smart Cart AI',
      tagline: 'Automated retail cart',
      icon: ShoppingCart,
      gradient: 'from-purple-500 via-pink-500 to-fuchsia-500',
      chips: ['React', 'CV', 'Supabase'],
      github: 'https://github.com/mrs1409'
    },
    {
      name: 'BrainScan AI',
      tagline: 'Medical imaging AI',
      icon: HeartPulse,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      chips: ['TypeScript', 'TF.js', 'MRI'],
      github: 'https://github.com/mrs1409/BrainScan-AI'
    },
    {
      name: 'Dropout Prediction',
      tagline: 'Student dropout ML',
      icon: GraduationCap,
      gradient: 'from-orange-500 via-red-500 to-rose-500',
      chips: ['Python', 'ML', 'Pandas'],
      github: 'https://github.com/mrs1409/Student_Drop_Out_Prediction_ML_NationalClg'
    },
    {
      name: 'For More Projects',
      tagline: 'Click on this →',
      icon: FolderGit2,
      gradient: 'from-gray-500 via-gray-600 to-gray-700',
      chips: ['Projects'],
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [featuredProjects.length]);

  const active = featuredProjects[activeIndex];
  const upNext = featuredProjects[(activeIndex + 1) % featuredProjects.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="widget widget-medium cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden"
      onClick={onClick}
      data-tour={dataTour}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white/70 text-[11px] font-semibold tracking-wide">PROJECTS</div>
       
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {featuredProjects.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i === activeIndex ? 'bg-white/90' : 'bg-white/25'}`}
              />
            ))}
          </div>
         
        </div>
      </div>

      <div className="mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`relative rounded-2xl p-4 bg-gradient-to-br ${active.gradient} overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <active.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold leading-none">{active.name}</div>
                    <div className="text-white/80 text-xs mt-1">{active.tagline}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/20 px-2 py-1 text-[10px] text-white/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-white/85 text-xs">Tap to open Projects</div>
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-white/60 text-xs">Up next</div>

        <div className="mt-2">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-2.5 py-2">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${upNext.gradient} flex items-center justify-center`}>
              <upNext.icon className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-medium truncate">{upNext.name}</div>
              <div className="text-white/60 text-[11px] truncate">{upNext.tagline}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Experience Widget (Mission Control-style)
export const ExperienceWidget: React.FC<{ onClick?: () => void; dataTour?: string }> = ({ onClick, dataTour }) => {
  const startDate = new Date(2025, 8, 1); // Sept 2025
  const nowDate = new Date();
  const totalMonths =
    (nowDate.getFullYear() - startDate.getFullYear()) * 12 +
    (nowDate.getMonth() - startDate.getMonth());
  const years = Math.max(0, Math.floor(totalMonths / 12));
  
  // Show months if less than 1 year, otherwise show years
  const experienceLabel = years >= 1 ? `${years}+` : `${totalMonths}`;
  const experienceUnit = years >= 1 ? 'years' : 'months';

  const cards = [
    {
      company: 'Canopi India Pvt. Ltd.',
      role: 'AI Development Intern',
      period: 'Sep 2025 – Dec 2025',
      location: 'Bangalore',
      type: 'Internship',
      accent: 'from-emerald-500/35 to-teal-500/25',
    },
    {
      company: 'Indian Institute of Science',
      role: 'AI Research Intern',
      period: 'Sep 2025 – Present',
      location: 'Bangalore',
      type: 'Research',
      accent: 'from-cyan-500/35 to-indigo-500/30',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="widget widget-2col cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden"
      onClick={onClick}
      data-tour={dataTour}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white/70 text-[11px] font-semibold tracking-wide">EXPERIENCE</div>
          {/* <div className="text-white text-sm font-semibold mt-0.5">Mission Control</div> */}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
      </div>

      <div className="mt-3 flex gap-4 items-stretch">
        <div className="w-[168px] rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col justify-between">
          <div>
            <div className="text-white/60 text-[11px]">Total Experience</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-5xl font-light text-white leading-none">{experienceLabel}</div>
              <div className="text-white/70 text-sm">{experienceUnit}</div>
            </div>
            <div className="mt-2 text-white/55 text-[11px]">AI research • ML engineering • full stack</div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-2.5 py-2">
              <span className="text-white/60 text-[11px]">Companies</span>
              <span className="text-white font-semibold text-sm">2</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-2.5 py-2">
              <span className="text-white/60 text-[11px]">Projects</span>
              <span className="text-white font-semibold text-sm">15+</span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(700px 180px at 20% 40%, rgba(56,189,248,0.10), transparent 55%), radial-gradient(700px 180px at 80% 70%, rgba(168,85,247,0.10), transparent 60%)',
            }}
          />

          <div className="absolute inset-0 p-4">
            <div className="text-white/60 text-[11px]">Open windows</div>
            <div className="mt-2 relative h-[150px]">
              {cards.map((c, idx) => {
                const styles = [
                  { z: 1, t: 'translate-x-5 translate-y-5 rotate-[1deg]', s: 'scale-[0.98]', o: 'opacity-80' },
                  { z: 2, t: 'translate-x-0 translate-y-0 rotate-0', s: 'scale-100', o: 'opacity-100' },
                ][idx] ?? { z: 1, t: 'translate-x-0 translate-y-0 rotate-0', s: 'scale-100', o: 'opacity-100' };

                return (
                  <div
                    key={c.company}
                    className={`absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br ${c.accent} ${styles.t} ${styles.s} ${styles.o}`}
                    style={{ zIndex: styles.z }}
                  >
                    <div className="h-full w-full rounded-2xl bg-black/25 backdrop-blur p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/15 flex items-center justify-center overflow-hidden">
                            <Building2 className="h-5 w-5 text-white/80" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-white text-sm font-semibold truncate">{c.company}</div>
                            <div className="text-white/75 text-[11px] truncate">{c.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] text-white/85 whitespace-nowrap">{c.type}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-white/70 text-[11px]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {c.period}
                        </span>
                        <span className="text-white/35">•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {c.location}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/75 text-xs">
                          <Building2 className="h-4 w-4" />
                          <span>Click to open full timeline</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// GitHub Activity Widget
export const GitHubWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="widget widget-small bg-gradient-to-br from-gray-800/80 to-gray-900/80"
    >
      <div className="flex items-center gap-2 mb-3">
        <Github className="w-4 h-4 text-white" />
        <span className="text-white text-xs font-semibold">GitHub</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-xs">Commits this week</span>
          <span className="text-green-400 font-semibold">24</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-xs">Current Streak</span>
          <span className="text-orange-400 font-semibold">12 days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-xs">Public Repos</span>
          <span className="text-blue-400 font-semibold">25+</span>
        </div>
      </div>
    </motion.div>
  );
};

// Current Activity Widget
export const ActivityWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const activity = hour >= 9 && hour < 18 
    ? { icon: Code2, text: "Deep Work Mode", color: "text-purple-400" }
    : hour >= 18 && hour < 22
    ? { icon: Coffee, text: "Learning Time", color: "text-orange-400" }
    : { icon: Zap, text: "Off Hours", color: "text-blue-400" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="widget widget-small"
    >
      <div className="flex items-center gap-2 mb-2">
        <activity.icon className={`w-5 h-5 ${activity.color}`} />
        <span className="text-white font-medium text-sm">{activity.text}</span>
      </div>
      <div className="text-white/50 text-xs">
        {hour >= 9 && hour < 18 && "Building amazing things"}
        {hour >= 18 && hour < 22 && "Expanding knowledge"}
        {(hour >= 22 || hour < 9) && "Recharging batteries"}
      </div>
      <div className="mt-3 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/60 text-[10px]">Active Now</span>
        </div>
      </div>
    </motion.div>
  );
};

// Quote/Inspiration Widget
export const QuoteWidget: React.FC = () => {
  const quotes = [
    { text: "Code is poetry", author: "Clean Code" },
    { text: "Make it work, make it right, make it fast", author: "Kent Beck" },
    { text: "Simplicity is the ultimate sophistication", author: "Da Vinci" },
    { text: "First, solve the problem. Then, write the code", author: "John Johnson" },
    { text: "The best way to predict the future is to invent it", author: "Alan Kay" },
  ];

  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className="widget widget-medium bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
    >
      <BookOpen className="w-4 h-4 text-purple-300 mb-3" />
      <div className="text-white/90 text-sm italic leading-relaxed mb-2">
        "{currentQuote.text}"
      </div>
      <div className="text-white/50 text-xs">
        — {currentQuote.author}
      </div>
    </motion.div>
  );
};

// Performance Stats Widget
export const PerformanceWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="widget widget-small"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-green-400" />
        <span className="text-white/80 text-xs font-semibold">PRODUCTIVITY</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/70">This Week</span>
            <span className="text-green-400 font-semibold">+23%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "76%" }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="text-center">
            <div className="text-xl font-semibold text-blue-400">32h</div>
            <div className="text-[10px] text-white/50">Coding</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-purple-400">8h</div>
            <div className="text-[10px] text-white/50">Learning</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};