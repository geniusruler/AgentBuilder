import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ProjectInputPage } from './components/ProjectInputPage';
import { PipelineDashboard } from './components/PipelineDashboard';
import { ResultsPage } from './components/ResultsPage';
import { Navigation } from './components/Navigation';

type AuthPage = 'landing' | 'login' | 'signup';
type AppPage = 'input' | 'pipeline' | 'results';

interface User {
  name: string;
  email: string;
}

interface ProjectData {
  description: string;
  links: string[];
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authPage, setAuthPage] = useState<AuthPage>('landing');
  const [currentPage, setCurrentPage] = useState<AppPage>('input');
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    // Simulate checking auth
    setTimeout(checkAuth, 800);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    const mockUser = {
      name: email.split('@')[0],
      email: email
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Simulate registration
    const newUser = {
      name: name,
      email: email
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('input');
    setProjectData(null);
    setAuthPage('landing');
    localStorage.removeItem('user');
  };

  const handleProjectSubmit = (data: ProjectData) => {
    setProjectData(data);
    setCurrentPage('pipeline');
  };

  const handlePipelineComplete = () => {
    setCurrentPage('results');
  };

  const handleIterate = () => {
    setCurrentPage('input');
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
          <p className="text-gray-400">Loading AgentBuilder...</p>
        </motion.div>
      </div>
    );
  }

  // Auth flow (Landing, Login, Signup)
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        {authPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage
              onGetStarted={() => setAuthPage('signup')}
              onLogin={() => setAuthPage('login')}
            />
          </motion.div>
        )}

        {authPage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage
              onLogin={handleLogin}
              onBackToHome={() => setAuthPage('landing')}
              onSwitchToSignup={() => setAuthPage('signup')}
            />
          </motion.div>
        )}

        {authPage === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <SignupPage
              onSignup={handleSignup}
              onBackToHome={() => setAuthPage('landing')}
              onSwitchToLogin={() => setAuthPage('login')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Main app (authenticated)
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage={currentPage} />
      
      <div className="pt-20">
        <AnimatePresence mode="wait">
          {currentPage === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectInputPage onSubmit={handleProjectSubmit} />
            </motion.div>
          )}
          
          {currentPage === 'pipeline' && projectData && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PipelineDashboard 
                projectDescription={projectData.description}
                onComplete={handlePipelineComplete}
              />
            </motion.div>
          )}
          
          {currentPage === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsPage onIterate={handleIterate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Menu - Floating in top right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-24 right-6 z-40"
      >
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-gray-400">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 text-xs px-3 py-1 rounded bg-muted hover:bg-muted/70 transition-colors"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
