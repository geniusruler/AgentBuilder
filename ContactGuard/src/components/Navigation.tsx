import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: 'input' | 'pipeline' | 'results';
}

export function Navigation({ currentPage }: NavigationProps) {
  const steps = [
    { id: 'input', label: 'Describe', number: 1 },
    { id: 'pipeline', label: 'Build', number: 2 },
    { id: 'results', label: 'Deploy', number: 3 }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentPage);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 rounded bg-primary flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold">AgentBuilder</span>
          </motion.div>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center gap-4">
            {steps.map((step, index) => {
              const isActive = step.id === currentPage;
              const isCompleted = index < getCurrentStepIndex();
              
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                        isActive
                          ? 'bg-primary text-white'
                          : isCompleted
                          ? 'bg-[var(--status-success)] text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? '✓' : step.number}
                    </div>
                    <span
                      className={`text-sm ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="w-12 h-[2px] bg-muted">
                      {isCompleted && (
                        <motion.div
                          className="h-full bg-[var(--status-success)]"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Progress Indicator */}
          <div className="md:hidden text-sm text-muted-foreground">
            Step {getCurrentStepIndex() + 1} of {steps.length}
          </div>
        </div>
      </div>
    </nav>
  );
}