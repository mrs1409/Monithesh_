import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Building2 } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  tech: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    company: "Indian Institute of Science (IISc) Bangalore",
    role: "AI Research Intern",
    period: "Sept 2025 – Present",
    location: "Bengaluru, KA",
    type: "Internship",
    tech: "Python, PyTorch, FastAPI, LLMs, RAG",
    highlights: [
      "Developed a universal AI framework for multimodal product understanding and evaluation",
      "Built benchmarking workflows and evaluation pipelines for research environments",
      "Developed PyTorch + FastAPI pipelines for model prototyping and deployment",
    ],
  },
  {
    company: "Canopi India Pvt. Ltd.",
    role: "AI Development Intern",
    period: "Sept 2025 – Dec 2025",
    location: "Bengaluru, KA",
    type: "Internship",
    tech: "Python, LLM Agents, Frappe ERP, FastAPI",
    highlights: [
      "Developed agentic conversational systems integrated with Frappe ERP and FastAPI",
      "Automated finance workflows using autonomous agent execution",
      "Built intelligent automation solutions for enterprise resource planning systems",
    ],
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Experience</h2>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="experience-card"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 p-2.5 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-full h-full text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                  <p className="text-blue-400 font-medium text-sm">{exp.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10">
                  <Briefcase className="w-3 h-3" />
                  {exp.type}
                </span>
              </div>
            </div>

            <p className="text-xs text-white/40 mb-3">
              <span className="text-white/60">Tech:</span> {exp.tech}
            </p>

            <ul className="space-y-1.5">
              {exp.highlights.map((highlight, hIndex) => (
                <li key={hIndex} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-1.5 flex-shrink-0" />
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

export default ExperienceSection;
