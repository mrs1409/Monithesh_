import React from 'react';
import { motion } from 'framer-motion';
import {
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPython,
  SiPytorch,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiTensorflow,
  SiOpencv,
  SiGit,
  SiJupyter,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Frameworks / Tools",
    skills: ["FastAPI", "Flask", "React", "Node.js", "PyTorch", "TensorFlow", "Supabase", "Docker", "Git"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Developer Tools",
    skills: ["VS Code", "GitHub", "Jupyter"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Databases & Cloud",
    skills: ["MongoDB", "AWS", "Firebase", "Supabase"],
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Domains",
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "RAG", "Agent Architectures", "Model Deployment"],
    color: "from-green-500 to-teal-500",
  },
];

const skillIcons: Record<string, { Icon: React.ElementType; color: string }> = {
  Python: { Icon: SiPython, color: 'text-yellow-300' },
  JavaScript: { Icon: SiJavascript, color: 'text-yellow-400' },
  TypeScript: { Icon: SiTypescript, color: 'text-blue-400' },
  HTML: { Icon: SiHtml5, color: 'text-orange-500' },
  CSS: { Icon: SiCss3, color: 'text-blue-500' },

  FastAPI: { Icon: SiFastapi, color: 'text-emerald-300' },
  Flask: { Icon: SiFlask, color: 'text-white/80' },
  React: { Icon: SiReact, color: 'text-cyan-400' },
  'Node.js': { Icon: SiNodedotjs, color: 'text-green-500' },
  PyTorch: { Icon: SiPytorch, color: 'text-red-400' },
  TensorFlow: { Icon: SiTensorflow, color: 'text-orange-400' },
  Supabase: { Icon: SiSupabase, color: 'text-emerald-400' },
  Docker: { Icon: SiDocker, color: 'text-blue-400' },
  Git: { Icon: SiGit, color: 'text-orange-500' },

  'VS Code': { Icon: VscCode, color: 'text-blue-400' },
  GitHub: { Icon: SiGithub, color: 'text-white/80' },
  Jupyter: { Icon: SiJupyter, color: 'text-orange-400' },

  MongoDB: { Icon: SiMongodb, color: 'text-green-400' },
  AWS: { Icon: FaAws, color: 'text-orange-400' },
  Firebase: { Icon: SiFirebase, color: 'text-amber-400' },
  OpenCV: { Icon: SiOpencv, color: 'text-green-500' },
};

const SkillsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Technical Skills</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="glass-panel p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${category.color}`} />
              <h3 className="text-white font-semibold">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                (() => {
                  const icon = skillIcons[skill];
                  const Icon = icon?.Icon;

                  return (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: catIndex * 0.1 + skillIndex * 0.03 }}
                  className="skill-tag inline-flex items-center gap-2"
                >
                  {Icon ? <Icon className={`h-4 w-4 ${icon.color}`} aria-hidden="true" /> : null}
                  {skill}
                </motion.span>
                  );
                })()
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
