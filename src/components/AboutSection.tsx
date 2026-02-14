import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, Code2, Sparkles, MapPin, Download, Github, Linkedin } from 'lucide-react';
import monitheshPhoto from '@/assets/monithesh-photo.jpg.jpeg';
import resumePdf from '@/assets/Monithesh_R_resume.pdf';

const AboutSection: React.FC = () => {
  const achievements = [
    "1st Place - ThinkUp, AMC Engineering College",
    "2nd Runner-up - Hack Fusion (National Level), MIT Mysore",
    "2nd Runner-up - TerraQuest 2K25 Hackathon, Sri Sairam College of Engineering",
  ];

  const leadership = [
    { role: "President Hackathon Club CSE-AIML", org: "AMC Engineering College" },
    { role: "Team Lead AI Project", org: "IISc Bangalore" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="section-title">About Me</h2>

      {/* Hero Introduction */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white/20 flex-shrink-0">
            <img 
              src={monitheshPhoto} 
              alt="Monithesh R" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-2xl font-bold text-white">Monithesh R</h3>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-blue-400" />
              <p className="text-blue-400 font-medium">AI Research Intern</p>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
  Hey! I'm an AI Research Intern passionate about building intelligent systems that solve real-world problems. 
  I specialize in developing multimodal AI frameworks, agentic systems, and machine learning solutions.
</p>

<p className="text-white/70 leading-relaxed mb-4">
  I love working on cutting-edge AI projects, from computer vision to NLP, and enjoy leading teams to create innovative solutions. 
  Big fan of research-driven development and deploying practical AI applications.
</p>

            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <MapPin className="w-4 h-4" />
              <span>Bangalore, India</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={resumePdf}
                download="Monithesh_R_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all text-white text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
              <a 
                href="https://github.com/mrs1409" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/in/monitheshr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Education */}
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold">Education</h3>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-2 border-blue-500/50 pl-4">
              <h4 className="font-medium text-white">AMC Engineering College</h4>
              <p className="text-white/60 text-sm">BE Computer Science Engineering (AI&ML)</p>
              <p className="text-white/40 text-xs mt-1">Dec 2022 – Present • Bangalore</p>
            </div>
            <div className="border-l-2 border-purple-500/50 pl-4">
              <h4 className="font-medium text-white">SSMRV PU College</h4>
              <p className="text-white/60 text-sm">Pre University College (PCMC)</p>
              <p className="text-white/40 text-xs mt-1">June 2020 – May 2022 • Bangalore</p>
            </div>
            <div className="border-l-2 border-green-500/50 pl-4">
              <h4 className="font-medium text-white">Chinmaya Vidyalaya</h4>
              <p className="text-white/60 text-sm">ICSE</p>
              <p className="text-white/40 text-xs mt-1">2010 – 2020 • Bangalore</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold">Achievements</h3>
          </div>
          
          <ul className="space-y-2.5">
            {achievements.map((achievement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Leadership */}
        <div className="glass-panel p-5 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold">Leadership</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            {leadership.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="font-medium text-white text-sm">{item.role}</span>
                <span className="text-xs text-white/50">{item.org}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
