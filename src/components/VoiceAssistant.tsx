import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';

// Replace with your actual Vapi keys
const VAPI_PUBLIC_KEY = 'd2a0d6a0-8826-4616-83a2-ccd0d4045b2c';
const ASSISTANT_ID = '959c3aff-17c8-44df-b4ad-1195e95285b1';

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [vapiReady, setVapiReady] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const vapiRef = useRef<any>(null);

  // Initialize Vapi
  useEffect(() => {
    let mounted = true;
    
    const initVapi = async () => {
      try {
        const vapiModule: any = await import('@vapi-ai/web');
        
        let VapiClass = vapiModule.default;
        if (VapiClass && typeof VapiClass !== 'function' && VapiClass.default) {
          VapiClass = VapiClass.default;
        }
        
        if (!mounted || typeof VapiClass !== 'function') return;
        
        const vapi = new VapiClass(VAPI_PUBLIC_KEY);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
          setIsConnecting(false);
          setIsCallActive(true);
        });
        
        vapi.on('call-end', () => {
          setIsCallActive(false);
          setIsConnecting(false);
          setAudioLevel(0);
        });

        // Audio level visualization
        vapi.on('volume-level', (level: number) => {
          setAudioLevel(level);
        });
        
        setVapiReady(true);
      } catch (error) {
        console.error('Failed to initialize Vapi:', error);
      }
    };
    
    initVapi();

    return () => {
      mounted = false;
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const toggleCall = async () => {
    if (!vapiRef.current) return;
    
    if (isCallActive) {
      vapiRef.current.stop();
    } else {
      setIsConnecting(true);
      try {
        await vapiRef.current.start(ASSISTANT_ID);
      } catch (error) {
        console.error('Failed to start call:', error);
        setIsConnecting(false);
      }
    }
  };

  // Audio visualization wave effect
  const waveScale = 1 + (audioLevel * 0.5);

  return (
    <>
      {/* Floating Button with Label */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-2"
      >
        {/* "Talk to me" Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
        >
          <span className="text-white text-sm font-medium whitespace-nowrap">Talk to me</span>
        </motion.div>

        {/* Voice Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
        </motion.button>
      </motion.div>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4"
            onClick={() => !isCallActive && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[450px] mx-auto rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  if (isCallActive) {
                    vapiRef.current?.stop();
                  }
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>

              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">Voice Assistant</h2>
                <p className="text-white/60 text-sm">
                  {isCallActive ? 'Listening...' : 'Ask me anything about Monithesh'}
                </p>
              </div>

              {/* Audio Visualization Orb */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-48 h-48">
                  {/* Outer glow rings */}
                  {isCallActive && (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-2xl"
                        style={{ transform: `scale(${waveScale})` }}
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.05, 0.2],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.3,
                        }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 blur-3xl"
                      />
                    </>
                  )}

                  {/* Main orb */}
                  <motion.div
                    animate={
                      isCallActive
                        ? {
                            scale: [1, waveScale, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className={`${
                        isCallActive
                          ? 'w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
                          : 'w-28 h-28 bg-gradient-to-br from-blue-400/50 to-purple-400/50'
                      } rounded-full backdrop-blur-xl border-2 border-white/30 shadow-2xl flex items-center justify-center transition-all duration-300`}
                    >
                      {isCallActive ? (
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Mic className="w-12 h-12 text-white" />
                        </motion.div>
                      ) : (
                        <MicOff className="w-10 h-10 text-white/70" />
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Control Button */}
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  onClick={toggleCall}
                  disabled={isConnecting || !vapiReady}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-8 py-4 rounded-2xl font-semibold text-white transition-all
                    ${
                      isCallActive
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
                    }
                    ${isConnecting || !vapiReady ? 'opacity-50 cursor-wait' : 'shadow-lg'}
                  `}
                >
                  {isCallActive ? (
                    'End Conversation'
                  ) : isConnecting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </div>
                  ) : !vapiReady ? (
                    'Loading...'
                  ) : (
                    'Start Conversation'
                  )}
                </motion.button>

                {/* Status indicator */}
                {isCallActive && (
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Connected</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              {!isCallActive && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/60 text-xs text-center">
                    Click "Start Conversation" and ask me about my experience, projects, skills, or anything else!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;
