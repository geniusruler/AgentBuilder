import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { X, Search, Chrome, Zap, Brain, Code, CheckCircle2, Rocket, Github, Globe, Sparkles, Terminal, FileCode, GitBranch, ArrowRight } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [scene, setScene] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScene(0);
      
      // Scene timings - faster paced
      const sceneTimings = [0, 2.5, 4.5, 6.5, 9, 11.5, 14, 16.5];
      const timers: NodeJS.Timeout[] = [];
      
      sceneTimings.forEach((timing, index) => {
        timers.push(setTimeout(() => setScene(index), timing * 1000));
      });
      
      // Loop
      timers.push(setTimeout(() => setScene(0), 19000));
      const loopInterval = setInterval(() => {
        setScene(0);
        sceneTimings.forEach((timing, index) => {
          setTimeout(() => setScene(index), timing * 1000);
        });
      }, 19000);
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
        clearInterval(loopInterval);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const agents = [
    { name: 'Research', icon: Brain, color: '#3b82f6', desc: 'Analyzing' },
    { name: 'Engineer', icon: Code, color: '#8b5cf6', desc: 'Coding' },
    { name: 'Reviewer', icon: CheckCircle2, color: '#10b981', desc: 'Testing' },
    { name: 'Orchestrator', icon: Zap, color: '#f59e0b', desc: 'Managing' },
    { name: 'Reporter', icon: Rocket, color: '#ef4444', desc: 'Deploying' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={onClose}
            className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl flex items-center justify-center z-50 border border-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Main 3D Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            style={{ 
              perspective: '2000px',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-7xl aspect-video"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Glass Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-black border border-white/10 backdrop-blur-3xl rounded-3xl overflow-hidden">
                
                {/* Ambient Background Effects */}
                <div className="absolute inset-0 opacity-40">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'radial-gradient(circle at 30% 30%, #E50914 0%, transparent 60%)',
                        'radial-gradient(circle at 70% 70%, #F97316 0%, transparent 60%)',
                        'radial-gradient(circle at 50% 50%, #DC2626 0%, transparent 60%)',
                        'radial-gradient(circle at 30% 30%, #E50914 0%, transparent 60%)',
                      ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* 3D Grid Floor */}
                <div className="absolute inset-0 overflow-hidden opacity-20" style={{ perspective: '800px' }}>
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(229, 9, 20, 0.4) 1.5px, transparent 1.5px),
                        linear-gradient(90deg, rgba(229, 9, 20, 0.4) 1.5px, transparent 1.5px)
                      `,
                      backgroundSize: '60px 60px',
                      transform: 'perspective(800px) rotateX(60deg)',
                      transformOrigin: 'center bottom',
                    }}
                    animate={{
                      y: [0, 60, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>

                {/* Scene Container */}
                <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Scene 1: Google Search - Enhanced */}
                  <AnimatePresence mode="wait">
                    {scene === 0 && (
                      <motion.div
                        key="search"
                        initial={{ opacity: 0, scale: 1.3, z: -800 }}
                        animate={{ opacity: 1, scale: 1, z: 0 }}
                        exit={{ opacity: 0, scale: 0.8, z: 800, rotateY: -30 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="relative w-full max-w-4xl" style={{ transformStyle: 'preserve-3d' }}>
                          {/* Floating Browser Window */}
                          <motion.div
                            animate={{ 
                              y: [0, -10, 0],
                              rotateX: [0, 2, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative"
                          >
                            {/* Browser Shadow */}
                            <div className="absolute inset-0 bg-primary/20 blur-3xl translate-y-8" />
                            
                            {/* Browser Chrome */}
                            <div className="relative bg-[#202124] rounded-t-2xl p-4 flex items-center gap-3 border-b border-white/10">
                              <div className="flex gap-2">
                                <motion.div 
                                  whileHover={{ scale: 1.2 }}
                                  className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" 
                                />
                                <motion.div 
                                  whileHover={{ scale: 1.2 }}
                                  className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" 
                                />
                                <motion.div 
                                  whileHover={{ scale: 1.2 }}
                                  className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" 
                                />
                              </div>
                              <div className="flex-1 bg-[#303134] rounded-full px-5 py-3 flex items-center gap-3">
                                <Chrome className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-400">google.com</span>
                              </div>
                            </div>
                            
                            {/* Google Search Content */}
                            <div className="relative bg-gradient-to-br from-[#303134] to-[#202124] p-16 rounded-b-2xl backdrop-blur-xl">
                              <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-center mb-10"
                              >
                                <motion.div
                                  animate={{ 
                                    filter: ['drop-shadow(0 0 20px rgba(66, 133, 244, 0.5))', 'drop-shadow(0 0 40px rgba(66, 133, 244, 0.8))', 'drop-shadow(0 0 20px rgba(66, 133, 244, 0.5))']
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="text-7xl font-bold mb-10"
                                >
                                  <span className="text-[#4285F4]">G</span>
                                  <span className="text-[#EA4335]">o</span>
                                  <span className="text-[#FBBC05]">o</span>
                                  <span className="text-[#4285F4]">g</span>
                                  <span className="text-[#34A853]">l</span>
                                  <span className="text-[#EA4335]">e</span>
                                </motion.div>
                              </motion.div>
                              
                              <motion.div 
                                className="bg-[#202124] rounded-full px-8 py-5 flex items-center gap-4 shadow-2xl border border-white/5"
                                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                              >
                                <Search className="w-6 h-6 text-gray-400" />
                                <motion.span
                                  className="text-white text-xl flex-1"
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: 'auto', opacity: 1 }}
                                  transition={{ duration: 1.5 }}
                                >
                                  agent builder ai development
                                </motion.span>
                                <motion.div
                                  className="w-0.5 h-6 bg-primary"
                                  animate={{ opacity: [1, 0] }}
                                  transition={{ duration: 0.7, repeat: Infinity }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 2: Search Results - 3D Cards */}
                    {scene === 1 && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 100, rotateX: 45 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -100, rotateX: -45 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="w-full max-w-4xl space-y-6">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -100, rotateY: -20, z: -200 }}
                              animate={{ 
                                opacity: i === 0 ? 1 : 0.4, 
                                x: 0, 
                                rotateY: 0,
                                z: i === 0 ? 50 : 0,
                                scale: i === 0 ? 1.05 : 1
                              }}
                              transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                              whileHover={{ scale: 1.02, z: 100 }}
                              className={`relative bg-gradient-to-br from-[#303134] to-[#202124] p-8 rounded-2xl cursor-pointer border ${
                                i === 0 ? 'border-primary shadow-2xl shadow-primary/20' : 'border-white/5'
                              }`}
                              style={{ transformStyle: 'preserve-3d' }}
                            >
                              {i === 0 && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl blur-xl"
                                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              )}
                              <div className="relative flex items-start gap-5">
                                <motion.div 
                                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center flex-shrink-0"
                                  animate={{ rotate: i === 0 ? [0, 5, -5, 0] : 0 }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Zap className="w-8 h-8 text-white" />
                                </motion.div>
                                <div className="flex-1">
                                  <h3 className="text-2xl font-bold text-white mb-2">
                                    AgentBuilder - AI Development Platform
                                  </h3>
                                  <p className="text-sm text-green-400 mb-3">agentbuilder.ai</p>
                                  <p className="text-gray-400 leading-relaxed">
                                    Build apps with AI agents. Research, spec, code, review, and deploy automatically...
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 3: Landing Page Load - Zoom In */}
                    {scene === 2 && (
                      <motion.div
                        key="landing"
                        initial={{ opacity: 0, scale: 2, z: -1000 }}
                        animate={{ opacity: 1, scale: 1, z: 0 }}
                        exit={{ opacity: 0, scale: 0.5, z: 1000 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-[#141414] to-black"
                      >
                        <div className="text-center px-8">
                          <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <motion.h1
                              className="text-8xl font-bold mb-8 leading-tight"
                              animate={{ 
                                scale: [1, 1.02, 1],
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              Build Apps with
                              <br />
                              <motion.span 
                                className="bg-gradient-to-r from-primary via-red-600 to-orange-500 bg-clip-text text-transparent inline-block"
                                animate={{
                                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                style={{ backgroundSize: '200% 200%' }}
                                transition={{ duration: 5, repeat: Infinity }}
                              >
                                AI Agents
                              </motion.span>
                            </motion.h1>
                            
                            <motion.div
                              initial={{ scale: 0, rotateZ: -180 }}
                              animate={{ scale: 1, rotateZ: 0 }}
                              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(229, 9, 20, 0.6)' }}
                              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-orange-500 rounded-full text-white text-2xl font-bold cursor-pointer shadow-2xl"
                            >
                              <Sparkles className="w-6 h-6" />
                              Start Building →
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Particles */}
                        {[...Array(30)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary rounded-full"
                            initial={{ 
                              x: '50%', 
                              y: '50%',
                              scale: 0
                            }}
                            animate={{
                              x: Math.random() * window.innerWidth,
                              y: Math.random() * window.innerHeight,
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              delay: Math.random() * 0.5,
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {/* Scene 4: Project Input - Interactive Form */}
                    {scene === 3 && (
                      <motion.div
                        key="input"
                        initial={{ opacity: 0, rotateX: 90, z: -1000 }}
                        animate={{ opacity: 1, rotateX: 0, z: 0 }}
                        exit={{ opacity: 0, rotateX: -90, z: 1000 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <motion.div 
                          className="w-full max-w-5xl"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <div className="relative bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/90 rounded-3xl p-10 border border-primary/30 backdrop-blur-xl shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-3xl" />
                            
                            <motion.h2 
                              className="relative text-5xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent"
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                            >
                              Describe Your Project
                            </motion.h2>
                            
                            <div className="relative space-y-6">
                              <motion.div 
                                className="bg-black/40 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 2 }}
                                >
                                  <p className="text-xl text-gray-300 leading-relaxed">
                                    "Build a task management app with real-time collaboration, 
                                    drag-and-drop interface, and dark mode support..."
                                  </p>
                                </motion.div>
                                <motion.div
                                  className="w-1 h-8 bg-primary mt-3"
                                  animate={{ opacity: [1, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity }}
                                />
                              </motion.div>
                              
                              <motion.button
                                initial={{ scale: 0, rotateZ: -20 }}
                                animate={{ scale: 1, rotateZ: 0 }}
                                transition={{ delay: 2, type: "spring", stiffness: 200 }}
                                whileHover={{ 
                                  scale: 1.05,
                                  boxShadow: '0 20px 60px rgba(229, 9, 20, 0.4)'
                                }}
                                className="relative w-full py-6 bg-gradient-to-r from-primary to-orange-500 rounded-2xl text-2xl font-bold overflow-hidden group"
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                  animate={{ x: ['-100%', '200%'] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                />
                                <span className="relative flex items-center justify-center gap-3">
                                  Launch AI Agents <Rocket className="w-6 h-6" />
                                </span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Scene 5: Pipeline Dashboard - 3D Cards */}
                    {scene === 4 && (
                      <motion.div
                        key="pipeline"
                        initial={{ opacity: 0, scale: 0.8, rotateY: -60, z: -800 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: 60, z: 800 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 p-10"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 rounded-3xl p-10 border border-primary/30 backdrop-blur-xl overflow-hidden">
                          <motion.h2 
                            className="text-5xl font-bold mb-10"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                          >
                            Pipeline Dashboard
                          </motion.h2>
                          
                          {/* Stages with 3D effect */}
                          <div className="flex gap-3 mb-10">
                            {['Research', 'Spec', 'Build', 'Review', 'Deploy'].map((stage, i) => (
                              <motion.div
                                key={stage}
                                initial={{ opacity: 0, y: -50, rotateX: -90, z: -200 }}
                                animate={{ 
                                  opacity: 1, 
                                  y: 0,
                                  rotateX: 0,
                                  z: i === 0 ? 30 : 0,
                                  scale: i === 0 ? [1, 1.05, 1] : 1,
                                }}
                                transition={{ 
                                  delay: i * 0.1,
                                  scale: { duration: 1.5, repeat: Infinity }
                                }}
                                whileHover={{ z: 50, scale: 1.05 }}
                                className={`flex-1 px-4 py-4 rounded-xl text-center font-semibold cursor-pointer ${
                                  i === 0 
                                    ? 'bg-gradient-to-br from-primary to-orange-500 text-white shadow-lg shadow-primary/30' 
                                    : 'bg-white/5 text-gray-400 border border-white/10'
                                }`}
                                style={{ transformStyle: 'preserve-3d' }}
                              >
                                {stage}
                              </motion.div>
                            ))}
                          </div>

                          {/* 3D Agent Cards */}
                          <div className="grid grid-cols-5 gap-4 mb-8">
                            {agents.map((agent, i) => (
                              <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, rotateY: -90, z: -300 }}
                                animate={{ 
                                  opacity: 1, 
                                  rotateY: 0, 
                                  z: i === 0 ? 50 : 0,
                                }}
                                transition={{ 
                                  delay: 0.5 + i * 0.1,
                                  type: "spring",
                                  stiffness: 200
                                }}
                                whileHover={{ z: 100, rotateY: 10, scale: 1.1 }}
                                className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 border border-white/20 cursor-pointer"
                                style={{ transformStyle: 'preserve-3d' }}
                              >
                                {i === 0 && (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl blur-xl"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                )}
                                <motion.div
                                  animate={{ 
                                    rotate: i === 0 ? 360 : 0,
                                    scale: i === 0 ? [1, 1.2, 1] : 1
                                  }}
                                  transition={{ 
                                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 1.5, repeat: Infinity }
                                  }}
                                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                                  style={{ backgroundColor: agent.color + '20', boxShadow: `0 0 30px ${agent.color}40` }}
                                >
                                  <agent.icon className="w-7 h-7" style={{ color: agent.color }} />
                                </motion.div>
                                <div className="relative text-xs font-bold text-center mb-1">{agent.name}</div>
                                {i === 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-xs text-center font-semibold"
                                    style={{ color: agent.color }}
                                  >
                                    {agent.desc}
                                  </motion.div>
                                )}
                              </motion.div>
                            ))}
                          </div>

                          {/* Live Logs with Code Animation */}
                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-black/60 rounded-2xl p-6 border border-primary/20 h-40 overflow-hidden font-mono text-sm backdrop-blur-sm"
                          >
                            <motion.div
                              animate={{ y: [0, -150] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                              <div className="flex items-center gap-2 mb-2"><Terminal className="w-4 h-4 text-green-400" /><span className="text-green-400">✓ Research Agent initialized</span></div>
                              <div className="flex items-center gap-2 mb-2"><Code className="w-4 h-4 text-blue-400" /><span className="text-blue-400">→ Analyzing project requirements...</span></div>
                              <div className="flex items-center gap-2 mb-2"><FileCode className="w-4 h-4 text-yellow-400" /><span className="text-yellow-400">→ Fetching documentation & APIs</span></div>
                              <div className="flex items-center gap-2 mb-2"><GitBranch className="w-4 h-4 text-purple-400" /><span className="text-purple-400">→ Creating technical specifications</span></div>
                              <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4 text-green-400" /><span className="text-green-400">✓ Research phase complete</span></div>
                              <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-orange-400" /><span className="text-orange-400">→ Engineering Agent starting...</span></div>
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 6: 3D Agent Network - Premium Effect */}
                    {scene === 5 && (
                      <motion.div
                        key="network"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5, rotateZ: 180 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full relative flex items-center justify-center">
                          {/* 3D Orbital System */}
                          {agents.map((agent, i) => {
                            const angle = (i * 2 * Math.PI) / agents.length;
                            const radius = 280;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            
                            return (
                              <motion.div
                                key={agent.name}
                                className="absolute"
                                initial={{ scale: 0, x: 0, y: 0, z: -500 }}
                                animate={{ 
                                  scale: 1, 
                                  x, 
                                  y,
                                  z: 0,
                                  rotateZ: [0, 360]
                                }}
                                transition={{ 
                                  delay: i * 0.15,
                                  rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                              >
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.15, 1],
                                    rotateY: [0, 360]
                                  }}
                                  transition={{ 
                                    scale: { duration: 2.5, repeat: Infinity },
                                    rotateY: { duration: 4, repeat: Infinity, ease: "linear" }
                                  }}
                                  whileHover={{ scale: 1.3, z: 100 }}
                                  className="relative w-32 h-32 rounded-3xl flex flex-col items-center justify-center gap-3 border-2 cursor-pointer backdrop-blur-xl"
                                  style={{ 
                                    backgroundColor: agent.color + '15',
                                    borderColor: agent.color,
                                    boxShadow: `0 0 60px ${agent.color}60, inset 0 0 30px ${agent.color}20`,
                                    transformStyle: 'preserve-3d'
                                  }}
                                >
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  >
                                    <agent.icon className="w-10 h-10" style={{ color: agent.color }} />
                                  </motion.div>
                                  <div className="text-sm font-bold text-center px-2">{agent.name}</div>
                                  <div className="text-xs text-center opacity-70">{agent.desc}</div>
                                </motion.div>

                                {/* Connection Particle Trail */}
                                <motion.div
                                  className="absolute w-2 h-2 rounded-full"
                                  style={{ backgroundColor: agent.color }}
                                  animate={{
                                    x: [-x/2, x/2],
                                    y: [-y/2, y/2],
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.4
                                  }}
                                />
                              </motion.div>
                            );
                          })}

                          {/* Center Hub - Rotating Core */}
                          <motion.div
                            initial={{ scale: 0, rotateZ: -180 }}
                            animate={{ 
                              scale: 1,
                              rotateZ: 360
                            }}
                            transition={{ 
                              scale: { type: "spring", stiffness: 200 },
                              rotateZ: { duration: 30, repeat: Infinity, ease: "linear" }
                            }}
                            className="relative"
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            <motion.div
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotateY: [0, 360]
                              }}
                              transition={{ 
                                scale: { duration: 3, repeat: Infinity },
                                rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
                              }}
                              className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary via-red-600 to-orange-500 flex items-center justify-center relative overflow-hidden"
                              style={{ 
                                boxShadow: '0 0 100px rgba(229, 9, 20, 0.8), inset 0 0 60px rgba(255, 255, 255, 0.2)',
                                transformStyle: 'preserve-3d'
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                              />
                              <Zap className="w-20 h-20 text-white relative z-10" />
                            </motion.div>
                            
                            {/* Energy Rings */}
                            {[0, 1, 2].map((ring) => (
                              <motion.div
                                key={ring}
                                className="absolute inset-0 border-2 border-primary/30 rounded-3xl"
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{ 
                                  scale: [1, 2, 2],
                                  opacity: [0.8, 0, 0]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: ring * 1
                                }}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 7: Results Page - 3D Success Cards */}
                    {scene === 6 && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.3, rotateY: 90, z: -1000 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                        exit={{ opacity: 0, scale: 0.3, rotateY: -90, z: 1000 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 p-10"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 rounded-3xl p-12 border border-green-500/30 backdrop-blur-xl">
                          <motion.div
                            initial={{ scale: 0, rotateZ: -180 }}
                            animate={{ scale: 1, rotateZ: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-center mb-12"
                          >
                            <motion.div 
                              className="text-9xl mb-6"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotateZ: [0, 10, -10, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              🎉
                            </motion.div>
                            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                              Project Complete!
                            </h2>
                            <p className="text-3xl text-gray-400">Your app is live and ready to use</p>
                          </motion.div>

                          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                              { icon: Globe, label: 'Live App', color: '#10b981', url: 'yourapp.vercel.app' },
                              { icon: Github, label: 'GitHub Repo', color: '#8b5cf6', url: 'github.com/user/project' },
                              { icon: Rocket, label: 'Deployment', color: '#f59e0b', url: 'Vercel + CI/CD' },
                            ].map((item, i) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 100, rotateX: -90, z: -300 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                                transition={{ 
                                  delay: 1 + i * 0.2, 
                                  type: "spring",
                                  stiffness: 200
                                }}
                                whileHover={{ 
                                  scale: 1.1, 
                                  z: 100, 
                                  rotateY: 10,
                                  boxShadow: `0 30px 60px ${item.color}40`
                                }}
                                className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 text-center cursor-pointer group"
                                style={{ transformStyle: 'preserve-3d' }}
                              >
                                <div 
                                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl blur-2xl transition-opacity duration-300"
                                  style={{ backgroundColor: item.color + '30' }}
                                />
                                <motion.div
                                  animate={{ y: [0, -15, 0] }}
                                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                                  className="relative w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                                  style={{ backgroundColor: item.color + '20', boxShadow: `0 0 40px ${item.color}40` }}
                                >
                                  <item.icon className="w-10 h-10" style={{ color: item.color }} />
                                </motion.div>
                                <h3 className="relative font-bold text-xl mb-3">{item.label}</h3>
                                <p className="relative text-sm text-gray-400">{item.url}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 8: Final CTA - Explosive */}
                    {scene === 7 && (
                      <motion.div
                        key="cta"
                        initial={{ opacity: 0, scale: 3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {/* Explosion Effect */}
                        {[...Array(50)].map((_, i) => {
                          const angle = (i * 360) / 50;
                          const distance = 500;
                          return (
                            <motion.div
                              key={i}
                              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary to-orange-500"
                              initial={{ x: 0, y: 0, scale: 0 }}
                              animate={{
                                x: Math.cos((angle * Math.PI) / 180) * distance,
                                y: Math.sin((angle * Math.PI) / 180) * distance,
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.02
                              }}
                            />
                          );
                        })}

                        <motion.div
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-center z-10"
                        >
                          <h2 className="text-8xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                            Ready to Build?
                          </h2>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: '0 0 100px rgba(229, 9, 20, 0.8)'
                            }}
                            className="inline-flex items-center gap-4 px-16 py-8 bg-gradient-to-r from-primary via-red-600 to-orange-500 rounded-full text-white text-3xl font-bold cursor-pointer relative overflow-hidden group"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <Sparkles className="w-8 h-8 relative z-10" />
                            <span className="relative z-10">Start Building Now</span>
                            <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Premium Particle System */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(80)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        background: `radial-gradient(circle, ${i % 2 === 0 ? '#E50914' : '#F97316'}, transparent)`,
                      }}
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                      }}
                      animate={{
                        y: [null, Math.random() * window.innerHeight],
                        x: [null, Math.random() * window.innerWidth],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Progress Dots - Enhanced */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-50">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={i}
                      className="relative cursor-pointer"
                      whileHover={{ scale: 1.5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setScene(i);
                      }}
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        animate={{
                          backgroundColor: scene === i ? '#E50914' : '#ffffff30',
                          scale: scene === i ? 1.3 : 1,
                          boxShadow: scene === i ? '0 0 20px #E50914' : 'none'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cinematic Letterbox */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-90 pointer-events-none" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}