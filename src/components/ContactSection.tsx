import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const contacts = [
    { icon: Mail, label: "Email", value: "rs1409monithesh@gmail.com", href: "mailto:rs1409monithesh@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9019265595", href: "tel:+919019265595" },
    { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/monitheshr" },
    { icon: Github, label: "GitHub", value: "View GitHub", href: "https://github.com/mrs1409" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="section-title">Get in Touch</h2>

      <p className="text-white/60 text-sm max-w-xl">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 space-y-3">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                <contact.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/50">{contact.label}</p>
                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="glass-panel p-5">
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white text-sm placeholder:text-white/30"
            />
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white text-sm placeholder:text-white/30"
            />
            <textarea
              rows={3}
              placeholder="Your message..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white text-sm placeholder:text-white/30 resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
