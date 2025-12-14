import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Zap, Brain, Rocket, ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import { DemoVideoModal } from './DemoVideoModal';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => setIsVideoLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Research Agent",
      description: "Oumi + Together AI analyzes your requirements and creates comprehensive specifications"
    },
    {
      icon: Zap,
      title: "Smart Engineering",
      description: "Cline agent writes production-ready code with automated testing and quality checks"
    },
    {
      icon: Sparkles,
      title: "Code Review AI",
      description: "CodeRabbit ensures best practices and maintains high code quality standards"
    },
    {
      icon: Rocket,
      title: "Auto Deployment",
      description: "Kestra orchestrates the entire pipeline and deploys to production instantly"
    }
  ];

  const stats = [
    { value: "10x", label: "Faster Development" },
    { value: "99%", label: "Code Quality" },
    { value: "24/7", label: "AI Agents Working" },
    { value: "0", label: "Manual Setup" }
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <DemoVideoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Modern Minimal Logo - Inspired by Linear/Notion/Figma */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Two overlapping rounded squares representing multiple agents */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glow effect */}
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E50914" />
                    <stop offset="50%" stopColor="#DC2626" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* First shape (A) - slightly rotated */}
                <rect
                  x="6"
                  y="8"
                  width="20"
                  height="20"
                  rx="5"
                  fill="url(#logo-gradient)"
                  opacity="0.9"
                  transform="rotate(-8, 16, 18)"
                  filter="url(#glow)"
                />
                
                {/* Second shape (B) - overlapping */}
                <rect
                  x="14"
                  y="12"
                  width="20"
                  height="20"
                  rx="5"
                  fill="url(#logo-gradient)"
                  opacity="0.9"
                  transform="rotate(8, 24, 22)"
                  filter="url(#glow)"
                />
                
                {/* "AB" text in center with negative space effect */}
                <text
                  x="20"
                  y="26"
                  fontSize="14"
                  fontWeight="800"
                  fill="white"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{ letterSpacing: '-1px' }}
                >
                  AB
                </text>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AgentBuilder
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onLogin}
              className="text-white hover:text-primary hover:bg-white/5"
            >
              Sign In
            </Button>
            <Button
              onClick={onGetStarted}
              className="bg-primary hover:bg-primary/90 text-white glow-primary"
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Video Banner */}
      <motion.div
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
          
          {/* Simulated Video Banner - Using animated gradient as placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-red-900/30 to-blue-900/30">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(229, 9, 20, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(229, 9, 20, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(229, 9, 20, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: Math.random() * 0.5,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [null, 0, Math.random() * 0.5],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            Build Apps with
            <br />
            <span className="bg-gradient-to-r from-primary via-red-600 to-orange-500 bg-clip-text text-transparent">
              AI Agents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Describe your vision. Watch AI agents research, plan, code, review, and deploy your application automatically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg glow-primary group"
            >
              Start Building
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowDemo(true)}
              className="border-white/30 hover:border-white hover:bg-white/10 text-white px-10 py-7 text-lg backdrop-blur-sm group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black to-[#141414] relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">Powered by Multiple AI Agents</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Each agent specializes in a different aspect of development, working together to deliver production-ready applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-card to-card/50 border border-border rounded-xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-[#141414] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">From Idea to Production in Minutes</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simple, automated workflow that takes you from concept to deployed application
            </p>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Describe Your Vision",
                description: "Tell us what you want to build. Add reference links, documentation, or design inspirations.",
                icon: "💭"
              },
              {
                step: "02",
                title: "AI Agents Take Over",
                description: "Watch as multiple specialized AI agents research, plan, code, and test your application in real-time.",
                icon: "🤖"
              },
              {
                step: "03",
                title: "Review & Deploy",
                description: "Get a production-ready app with GitHub repo, documentation, and one-click deployment to Vercel.",
                icon: "🚀"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="text-6xl mb-6">{item.icon}</div>
                  <div className="text-sm text-primary font-semibold mb-3">STEP {item.step}</div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{item.description}</p>
                </div>
                <div className="flex-1">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-transparent rounded-2xl border border-primary/30 flex items-center justify-center">
                    <div className="text-8xl opacity-20">{item.step}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-[#141414] to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.1)_0%,transparent_70%)]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join developers who are building 10x faster with AI agents
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl glow-primary"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Start Building for Free
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2025 AgentBuilder. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}