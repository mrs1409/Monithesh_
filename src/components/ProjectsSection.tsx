import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Bot, Brain, ShoppingCart, GraduationCap, HeartPulse, Activity, Cloud, Briefcase, MapPin } from 'lucide-react';

interface Project {
  name: string;
  tech: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  gradient: string;
  github?: string;
}

const projects: Project[] = [
  {
    name: "Agentic System for DevOps (Major Project)",
    tech: "Python, FastAPI, LLM Agents, Docker, CI/CD",
    description: "Built autonomous DevOps assistant for system deviation detection and workflow automation with multi-agent orchestration",
    highlights: [
      "Multi-agent orchestration for automated DevOps tasks",
      "System deviation detection using LLM agents",
      "CI/CD diagnostics and workflow automation",
    ],
    icon: Bot,
    gradient: "from-indigo-500 to-purple-600",
    github: 'https://github.com/mrs1409'
  },
  {
    name: "The Product Singularity",
    tech: "Python, FastAPI, Computer Vision, NLP, PyTorch",
    description: "Universal AI Tool for Multimodal Product Understanding with CV and NLP modules",
    highlights: [
      "Developed multimodal CV + NLP modules for product analysis",
      "Built benchmarking pipelines for model evaluation",
      "Deployed production APIs using FastAPI",
    ],
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    github: 'https://github.com/mrs1409'
  },
  {
    name: "Smart Cart AI",
    tech: "Python, React, Supabase, Raspberry Pi, Computer Vision",
    description: "Automated retail cart prototype with real-time product detection and billing",
    highlights: [
      "Computer vision-based product recognition on Raspberry Pi",
      "Flask backend with real-time cart management",
      "Supabase database integration for inventory tracking",
    ],
    icon: ShoppingCart,
    gradient: "from-violet-500 to-purple-500",
    github: 'https://github.com/mrs1409'
  },
  {
    name: "Student Drop Out Prediction ML",
    tech: "Python, Machine Learning, Scikit-learn, Pandas",
    description: "ML model to predict student dropout risk using academic and demographic data",
    highlights: [
      "Built classification models with 85%+ accuracy",
      "Feature engineering for student performance metrics",
      "Data visualization and insights dashboard",
    ],
    icon: GraduationCap,
    gradient: "from-emerald-500 to-teal-500",
    github: 'https://github.com/mrs1409/Student_Drop_Out_Prediction_ML_NationalClg'
  },
  {
    name: "MED Assist ML",
    tech: "Python, TensorFlow, NLP, Flask",
    description: "Medical assistance system using ML for diagnosis support and patient management",
    highlights: [
      "NLP-based symptom analysis and diagnosis suggestions",
      "Patient data management with Flask backend",
      "Machine learning models for disease prediction",
    ],
    icon: HeartPulse,
    gradient: "from-slate-700 to-sky-500",
    github: 'https://github.com/mrs1409/MED_Asist_ML'
  },
  {
    name: "BrainScan AI",
    tech: "TypeScript, React, TensorFlow.js, Medical Imaging",
    description: "AI-powered brain scan analysis tool for medical imaging diagnostics",
    highlights: [
      "Deep learning model for brain MRI analysis",
      "Interactive visualization of scan results",
      "Real-time diagnostic insights using TensorFlow.js",
    ],
    icon: Brain,
    gradient: "from-orange-500 to-rose-500",
    github: 'https://github.com/mrs1409/BrainScan-AI'
  },
  {
    name: "Review Sentiment Analysis ML",
    tech: "Python, NLP, NLTK, Scikit-learn, Jupyter",
    description: "Sentiment analysis system for product reviews using NLP techniques",
    highlights: [
      "Text preprocessing and feature extraction pipeline",
      "Multi-class sentiment classification model",
      "Comprehensive analysis in Jupyter notebooks",
    ],
    icon: Activity,
    gradient: "from-rose-500 to-pink-500",
    github: 'https://github.com/mrs1409/Review_Sentimental_Analysis_ML'
  },
  {
    name: "Earthquake Prediction ML",
    tech: "TypeScript, Python, Machine Learning, Data Science",
    description: "ML-based earthquake prediction system using seismic data analysis",
    highlights: [
      "Time-series analysis of seismic patterns",
      "Predictive models for earthquake forecasting",
      "Interactive TypeScript-based visualization dashboard",
    ],
    icon: Activity,
    gradient: "from-yellow-500 to-amber-500",
    github: 'https://github.com/mrs1409/Earthquack_with_ML'
  },
  {
    name: "AI Travel Weather",
    tech: "Python, FastAPI, Weather APIs, Machine Learning",
    description: "AI-powered travel planner with weather forecasting and recommendations",
    highlights: [
      "Weather prediction using ML models",
      "Travel recommendations based on weather patterns",
      "RESTful API built with FastAPI",
    ],
    icon: MapPin,
    gradient: "from-cyan-500 to-blue-500",
    github: 'https://github.com/mrs1409/AI_Travel_weather'
  },
  {
    name: "JobVerify",
    tech: "Python, Web Scraping, ML, Fraud Detection",
    description: "Job posting verification system to detect fraudulent job listings",
    highlights: [
      "Web scraping for job posting data collection",
      "ML-based fraud detection algorithms",
      "Automated verification and flagging system",
    ],
    icon: Briefcase,
    gradient: "from-purple-500 to-indigo-500",
    github: 'https://github.com/mrs1409/JobVerify'
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Featured Projects</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="project-card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient}`}>
                <project.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
            <p className="text-sm text-blue-400 font-medium mb-2">{project.tech}</p>
            <p className="text-white/60 text-sm mb-4">{project.description}</p>

            <ul className="space-y-1.5">
              {project.highlights.map((highlight, hIndex) => (
                <li key={hIndex} className="flex items-start gap-2 text-xs text-white/50">
                  <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
