import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, Search, Volume2, Bluetooth, HelpCircle } from 'lucide-react';
import { FaApple } from 'react-icons/fa'

type MenuBarProps = {
  onStartWalkthrough?: () => void;
};

const MenuBar: React.FC<MenuBarProps> = ({ onStartWalkthrough }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const menuItems = [
    { label: 'Finder', bold: true },
    { label: 'File' },
    { label: 'Edit' },
    { label: 'View' },
    { label: 'Go' },
    { label: 'Window' },
    { label: 'Help' },
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] h-7 flex items-center justify-between px-4"
      data-tour="menubar"
      style={{
        background: 'rgba(30, 30, 30, 0.6)',
        backdropFilter: 'blur(50px) saturate(180%)',
        WebkitBackdropFilter: 'blur(50px) saturate(180%)',
      }}
    >
      {/* Left side - Apple logo and menus */}
      <div className="flex items-center gap-5">
        <button className="hover:bg-white/10 rounded px-1.5 py-0.5 transition-colors">
          <FaApple className="w-4 h-4 text-white/90" />
        </button>
        
        {menuItems.map((menu) => (
          <button 
            key={menu.label}
            className={`text-[13px] text-white/90 hover:bg-white/10 rounded px-1.5 py-0.5 transition-colors ${menu.bold ? 'font-semibold' : ''}`}
          >
            {menu.label}
          </button>
        ))}
      </div>
      
      {/* Right side - Status icons */}
      <div className="flex items-center gap-3">
        {onStartWalkthrough && (
          <button
            onClick={onStartWalkthrough}
            className="hover:bg-white/10 rounded px-1.5 py-0.5 transition-colors"
            aria-label="Start walkthrough"
            title="Walkthrough"
          >
            <HelpCircle className="w-4 h-4 text-white/80" />
          </button>
        )}
        <Bluetooth className="w-4 h-4 text-white/80" />
        <Volume2 className="w-4 h-4 text-white/80" />
        <Wifi className="w-4 h-4 text-white/80" />
        <div className="flex items-center gap-1">
          <Battery className="w-5 h-5 text-white/80" />
        </div>
        <Search className="w-4 h-4 text-white/80" />
        <div className="text-[13px] text-white/90">
          {dateString} <span className="ml-2">{timeString}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;
