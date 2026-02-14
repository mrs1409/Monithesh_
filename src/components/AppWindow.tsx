import React, { useEffect, useRef, useState } from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  LayoutGrid, 
  List, 
  Columns3,
  Share,
  Tag,
  MoreHorizontal,
  X
} from 'lucide-react';

interface AppWindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AppWindow: React.FC<AppWindowProps> = ({ 
  title, 
  children, 
  isOpen,
  onClose,
  className = '' 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const savedPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const updateConstraints = () => {
      if (!windowRef.current) return;

      const rect = windowRef.current.getBoundingClientRect();
      const padding = 12;
      const minTop = 28 + 8; // keep below menu bar + a little breathing room

      setDragConstraints({
        left: -(rect.left - padding),
        right: (window.innerWidth - padding) - rect.right,
        top: -(rect.top - minTop),
        bottom: (window.innerHeight - padding) - rect.bottom,
      });
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [isOpen, isMaximized, title]);

  const toggleMaximize = () => {
    setIsMaximized((prev) => {
      const next = !prev;
      if (next) {
        savedPositionRef.current = { x: x.get(), y: y.get() };
        x.set(0);
        y.set(0);
      } else {
        x.set(savedPositionRef.current.x);
        y.set(savedPositionRef.current.y);
      }
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`app-window ${isMaximized ? 'is-maximized' : ''} ${className}`}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      style={{ x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full w-full flex flex-col"
      >
        {/* Title bar with traffic lights */}
        <div
          className="window-titlebar"
          onDoubleClick={() => toggleMaximize()}
          onPointerDown={(event) => {
            if (isMaximized) return;
            const target = event.target as HTMLElement;
            if (target.closest('button')) return;
            dragControls.start(event);
          }}
        >
          <div className="flex items-center gap-2">
            {/* Traffic light buttons */}
            <div className="flex items-center gap-2 group">
              <button 
                onClick={onClose}
                className="traffic-light traffic-light-close"
                aria-label="Close"
              >
                <X className="traffic-light-icon w-2 h-2" />
              </button>
              <button 
                className="traffic-light traffic-light-minimize"
                aria-label="Minimize"
              >
                <span className="traffic-light-icon text-[10px]">−</span>
              </button>
              <button 
                className="traffic-light traffic-light-maximize"
                aria-label="Maximize"
                onClick={toggleMaximize}
              >
                <span className="traffic-light-icon text-[10px]">+</span>
              </button>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex items-center gap-0.5 ml-3">
              <button className="p-1 rounded hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-4 h-4 text-white/40" />
              </button>
              <button className="p-1 rounded hover:bg-white/10 transition-colors">
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            </div>
          </div>
          
          {/* Window title */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-sm font-medium text-white/80">{title}</span>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
              <Search className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </div>
        
        {/* Toolbar */}
        <div className="window-toolbar">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 rounded-md p-0.5">
              <button className="p-1.5 rounded bg-white/10">
                <LayoutGrid className="w-3.5 h-3.5 text-white/70" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/5">
                <List className="w-3.5 h-3.5 text-white/50" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/5">
                <Columns3 className="w-3.5 h-3.5 text-white/50" />
              </button>
            </div>
            
            <div className="flex items-center gap-1 ml-2">
              <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                <Share className="w-3.5 h-3.5 text-white/50" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                <Tag className="w-3.5 h-3.5 text-white/50" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5 text-white/50" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div 
          ref={contentRef}
          className="window-content"
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppWindow;
