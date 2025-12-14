import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { X, Upload, Shield, AlertTriangle, Code, CheckCircle2, GitPullRequest, Github, FileCode, Bug, Sparkles, Zap, Terminal } from 'lucide-react';

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
      
      // Scene timings for contract auditing workflow
      const sceneTimings = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5];
      const timers: NodeJS.Timeout[] = [];
      
      sceneTimings.forEach((timing, index) => {
        timers.push(setTimeout(() => setScene(index), timing * 1000));
      });
      
      // Loop
      timers.push(setTimeout(() => setScene(0), 20000));
      const loopInterval = setInterval(() => {
        setScene(0);
        sceneTimings.forEach((timing, index) => {
          setTimeout(() => setScene(index), timing * 1000);
        });
      }, 20000);
      
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
                  
                  {/* Scene 1: Web App Interface - Upload Contract */}
                  <AnimatePresence mode="wait">
                    {scene === 0 && (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 1.3, z: -800 }}
                        animate={{ opacity: 1, scale: 1, z: 0 }}
                        exit={{ opacity: 0, scale: 0.8, z: 800, rotateY: -30 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="relative w-full max-w-5xl" style={{ transformStyle: 'preserve-3d' }}> 
                          <motion.div
                            animate={{ 
                              y: [0, -10, 0],
                              rotateX: [0, 2, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative"
                          >
                            {/* Shadow */}
                            <div className="absolute inset-0 bg-primary/20 blur-3xl translate-y-8" />
                            
                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/90 rounded-3xl p-12 border border-primary/30 backdrop-blur-xl shadow-2xl">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-3xl" />
                              
                              <motion.h2 
                                className="relative text-6xl font-bold mb-8 text-center bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                              >
                                Upload Smart Contract
                              </motion.h2>
                              
                              <div className="relative space-y-6">
                                {/* Upload Area */}
                                <motion.div 
                                  className="bg-black/40 rounded-2xl p-16 border-2 border-dashed border-primary/40 backdrop-blur-sm text-center cursor-pointer hover:border-primary transition-colors"
                                  initial={{ scale: 0.9, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <motion.div
                                    animate={{ 
                                      y: [0, -10, 0],
                                      rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                  >
                                    <Upload className="w-20 h-20 text-primary mx-auto mb-6" />
                                  </motion.div>
                                  <p className="text-3xl mb-4">Drop your contract here</p>
                                  <p className="text-xl text-gray-400">Solidity, Vyper, or GitHub URL</p>
                                </motion.div>
                                
                                {/* Or Paste */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                  className="text-center text-gray-500 text-xl"
                                >
                                  — or paste code below —
                                </motion.div>

                                <motion.button
                                  initial={{ scale: 0, rotateZ: -20 }}
                                  animate={{ scale: 1, rotateZ: 0 }}
                                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                                  whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: '0 20px 60px rgba(229, 9, 20, 0.4)'
                                  }}
                                  className="relative w-full py-6 bg-gradient-to-r from-primary to-orange-500 rounded-2xl text-3xl font-bold overflow-hidden group"
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                  />
                                  <span className="relative flex items-center justify-center gap-3">
                                    <Shield className="w-8 h-8" />
                                    Start Audit
                                  </span>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 2: Pipeline Starting - Audit Stage */}
                    {scene === 1 && (
                      <motion.div
                        key="pipeline-start"
                        initial={{ opacity: 0, y: 100, rotateX: 45 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -100, rotateX: -45 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 p-10"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 rounded-3xl p-10 border border-primary/30 backdrop-blur-xl overflow-hidden">
                          <motion.h2 
                            className="text-6xl font-bold mb-10 text-center"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                          >
                            Audit Pipeline
                          </motion.h2>
                          
                          {/* Pipeline Stages */}
                          <div className="flex gap-3 mb-12">
                            {['Audit', 'Explain', 'Patch', 'Test', 'PR'].map((stage, i) => (
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
                                className={`flex-1 px-5 py-5 rounded-xl text-center font-bold text-xl cursor-pointer ${
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

                          {/* Progress Message */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center mb-12"
                          >
                            <motion.div
                              className="text-8xl mb-6"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              🔍
                            </motion.div>
                            <h3 className="text-4xl font-bold mb-4">Scanning for Vulnerabilities...</h3>
                            <p className="text-2xl text-gray-400">Slither + Mythril + AI analyzing your contract</p>
                          </motion.div>

                          {/* Animated Scanline */}
                          <motion.div
                            className="relative h-2 bg-white/10 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            <motion.div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-orange-500 rounded-full"
                              animate={{ 
                                width: ['0%', '30%'],
                              }}
                              transition={{ duration: 2, ease: "easeInOut" }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 3: Vulnerabilities Found */}
                    {scene === 2 && (
                      <motion.div
                        key="vulns"
                        initial={{ opacity: 0, scale: 2, z: -1000 }}
                        animate={{ opacity: 1, scale: 1, z: 0 }}
                        exit={{ opacity: 0, scale: 0.5, z: 1000 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                      >
                        <div className="w-full max-w-6xl">
                          <motion.h2 
                            className="text-6xl font-bold mb-12 text-center"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                          >
                            Vulnerabilities Detected
                          </motion.h2>

                          <div className="grid grid-cols-3 gap-6">
                            {[
                              { severity: 'Critical', count: 2, color: '#ef4444', icon: '🔴' },
                              { severity: 'High', count: 5, color: '#f59e0b', icon: '🟠' },
                              { severity: 'Medium', count: 8, color: '#eab308', icon: '🟡' },
                            ].map((item, i) => (
                              <motion.div
                                key={item.severity}
                                initial={{ opacity: 0, y: 100, rotateX: -90, z: -300 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                                transition={{ 
                                  delay: 0.3 + i * 0.15,
                                  type: "spring",
                                  stiffness: 200
                                }}
                                whileHover={{ 
                                  scale: 1.05,
                                  z: 50,
                                  boxShadow: `0 30px 60px ${item.color}40`
                                }}
                                className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border-2 text-center cursor-pointer group"
                                style={{ 
                                  borderColor: item.color,
                                  transformStyle: 'preserve-3d'
                                }}
                              >
                                <div 
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl blur-2xl transition-opacity duration-300"
                                  style={{ backgroundColor: item.color + '30' }}
                                />
                                <motion.div
                                  className="relative text-7xl mb-6"
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                >
                                  {item.icon}
                                </motion.div>
                                <motion.div
                                  className="relative text-8xl font-bold mb-4"
                                  style={{ color: item.color }}
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                >
                                  {item.count}
                                </motion.div>
                                <div className="relative text-2xl font-semibold" style={{ color: item.color }}>
                                  {item.severity}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 4: Explanation Agent Working */}
                    {scene === 3 && (
                      <motion.div
                        key="explain"
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
                          <div className="relative bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/90 rounded-3xl p-10 border border-yellow-500/30 backdrop-blur-xl shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-3xl" />
                            
                            <motion.h2 
                              className="relative text-5xl font-bold mb-8 flex items-center gap-4"
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                            >
                              <AlertTriangle className="w-12 h-12 text-yellow-500" />
                              Reentrancy Vulnerability
                            </motion.h2>
                            
                            <div className="relative space-y-6">
                              <motion.div 
                                className="bg-black/40 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <h3 className="text-2xl font-bold mb-4 text-yellow-400">🧠 AI Explanation:</h3>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 2 }}
                                >
                                  <p className="text-xl text-gray-300 leading-relaxed">
                                    "The <code className="text-primary">withdraw()</code> function sends ETH before updating the user's balance. 
                                    An attacker can recursively call withdraw() to drain the contract..."
                                  </p>
                                </motion.div>
                              </motion.div>

                              <motion.div 
                                className="bg-black/40 rounded-2xl p-8 border border-red-500/20"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                <h3 className="text-2xl font-bold mb-4 text-red-400">⚠️ Impact: Critical</h3>
                                <p className="text-xl text-gray-300">Could lead to complete loss of contract funds</p>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Scene 5: Patcher Agent Generating Fix */}
                    {scene === 4 && (
                      <motion.div
                        key="patch"
                        initial={{ opacity: 0, scale: 0.8, rotateY: -60, z: -800 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: 60, z: 800 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 p-10"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 rounded-3xl p-10 border border-green-500/30 backdrop-blur-xl overflow-hidden">
                          <motion.h2 
                            className="text-6xl font-bold mb-10 flex items-center gap-4"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                          >
                            <Code className="w-16 h-16 text-green-400" />
                            Generating Secure Patch
                          </motion.h2>

                          {/* Code Diff View */}
                          <div className="space-y-6">
                            <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="bg-black/60 rounded-2xl p-6 border border-red-500/30 font-mono text-lg"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="text-red-400">- Before (Vulnerable)</div>
                              </div>
                              <motion.pre className="text-red-300/80">
{`function withdraw() public {
  <span className="bg-red-500/20">msg.sender.call{value: balance}("");</span>
  balance[msg.sender] = 0;
}`}
                              </motion.pre>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="bg-black/60 rounded-2xl p-6 border border-green-500/30 font-mono text-lg"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="text-green-400">+ After (Secure)</div>
                              </div>
                              <motion.pre className="text-green-300/80">
{`function withdraw() public {
  <span className="bg-green-500/20">uint amount = balance[msg.sender];</span>
  <span className="bg-green-500/20">balance[msg.sender] = 0;</span>
  <span className="bg-green-500/20">msg.sender.call{value: amount}("");</span>
}`}
                              </motion.pre>
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 flex items-center justify-center gap-3 text-2xl text-green-400"
                          >
                            <CheckCircle2 className="w-8 h-8" />
                            Checks-Effects-Interactions pattern applied
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 6: Test Agent Running Tests */}
                    {scene === 5 && (
                      <motion.div
                        key="test"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5, rotateZ: 180 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 p-10"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 rounded-3xl p-10 border border-blue-500/30 backdrop-blur-xl overflow-hidden">
                          <motion.h2 
                            className="text-6xl font-bold mb-10 flex items-center gap-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <Terminal className="w-16 h-16 text-blue-400" />
                            Running Test Suite
                          </motion.h2>

                          <div className="space-y-4">
                            {[
                              { name: 'testWithdraw', status: 'pass', time: '0.12s' },
                              { name: 'testReentrancyProtection', status: 'pass', time: '0.24s' },
                              { name: 'testBalanceUpdate', status: 'pass', time: '0.08s' },
                              { name: 'testAccessControl', status: 'pass', time: '0.15s' },
                              { name: 'testEdgeCases', status: 'pass', time: '0.31s' },
                            ].map((test, i) => (
                              <motion.div
                                key={test.name}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-black/60 rounded-xl p-6 border border-green-500/20 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-4">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 + 0.2, type: "spring" }}
                                  >
                                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                                  </motion.div>
                                  <span className="text-2xl font-mono">{test.name}</span>
                                </div>
                                <span className="text-xl text-gray-400">{test.time}</span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-10 text-center"
                          >
                            <div className="text-8xl mb-6">✅</div>
                            <h3 className="text-5xl font-bold text-green-400 mb-4">All Tests Passed!</h3>
                            <p className="text-3xl text-gray-400">5/5 tests • 100% coverage</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 7: GitHub PR Created */}
                    {scene === 6 && (
                      <motion.div
                        key="pr"
                        initial={{ opacity: 0, scale: 0.3, rotateY: 90, z: -1000 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                        exit={{ opacity: 0, scale: 0.3, rotateY: -90, z: 1000 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 p-10"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="h-full bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-xl">
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
                            <h2 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                              Pull Request Created!
                            </h2>
                          </motion.div>

                          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {[
                              { icon: Github, label: 'GitHub PR #42', color: '#8b5cf6', desc: 'security/fix-reentrancy' },
                              { icon: FileCode, label: '15 Vulnerabilities Fixed', color: '#10b981', desc: '2 Critical • 5 High • 8 Medium' },
                              { icon: Bug, label: 'CodeRabbit Review', color: '#f59e0b', desc: '✓ Approved with suggestions' },
                            ].map((item, i) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 100, rotateX: -90, z: -300 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                                transition={{ 
                                  delay: 0.8 + i * 0.2, 
                                  type: "spring",
                                  stiffness: 200
                                }}
                                whileHover={{ 
                                  scale: 1.05, 
                                  z: 50,
                                  boxShadow: `0 30px 60px ${item.color}40`
                                }}
                                className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 flex items-center gap-6 cursor-pointer group"
                                style={{ transformStyle: 'preserve-3d' }}
                              >
                                <div 
                                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl blur-2xl transition-opacity duration-300"
                                  style={{ backgroundColor: item.color + '30' }}
                                />
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: item.color + '20', boxShadow: `0 0 40px ${item.color}40` }}
                                >
                                  <item.icon className="w-10 h-10" style={{ color: item.color }} />
                                </motion.div>
                                <div className="relative flex-1">
                                  <h3 className="font-bold text-3xl mb-2">{item.label}</h3>
                                  <p className="text-xl text-gray-400">{item.desc}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 8: Final CTA */}
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
                            Ready to Secure Your Contracts?
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
                            <span className="relative z-10">Start Auditing Now</span>
                            <Shield className="w-8 h-8 relative z-10 group-hover:scale-110 transition-transform" />
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

                {/* Progress Dots */}
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
