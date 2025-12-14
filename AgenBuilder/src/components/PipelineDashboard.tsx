import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  FileText, 
  Code, 
  CheckCircle2, 
  Rocket, 
  Clock,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

type StageStatus = 'pending' | 'running' | 'success' | 'error';

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: StageStatus;
  logs: LogEntry[];
  agent?: string;
  startTime?: Date;
  endTime?: Date;
}

interface LogEntry {
  timestamp: Date;
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
}

interface PipelineDashboardProps {
  projectDescription: string;
  onComplete: () => void;
}

export function PipelineDashboard({ projectDescription, onComplete }: PipelineDashboardProps) {
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'research',
      name: 'Research',
      description: 'Analyzing requirements and gathering context',
      icon: Search,
      status: 'running',
      agent: 'Research Planner Agent (Oumi + Together AI)',
      logs: [],
      startTime: new Date()
    },
    {
      id: 'spec',
      name: 'Specification',
      description: 'Creating technical specification',
      icon: FileText,
      status: 'pending',
      agent: 'Research Planner Agent (Oumi + Together AI)',
      logs: []
    },
    {
      id: 'build',
      name: 'Build',
      description: 'Implementing and testing code',
      icon: Code,
      status: 'pending',
      agent: 'Engineering Agent (Cline)',
      logs: []
    },
    {
      id: 'review',
      name: 'Review',
      description: 'Quality assurance and PR review',
      icon: CheckCircle2,
      status: 'pending',
      agent: 'Reviewer Agent (CodeRabbit)',
      logs: []
    },
    {
      id: 'deploy',
      name: 'Deploy',
      description: 'Deploying to production',
      icon: Rocket,
      status: 'pending',
      agent: 'Orchestrator Agent (Kestra)',
      logs: []
    }
  ]);

  const [expandedStage, setExpandedStage] = useState<string>('research');
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    // Simulate pipeline progress
    const simulatePipeline = async () => {
      const stageSequence = ['research', 'spec', 'build', 'review', 'deploy'];
      
      for (let i = 0; i < stageSequence.length; i++) {
        const stageId = stageSequence[i];
        
        // Start stage
        setStages(prev => prev.map(stage => 
          stage.id === stageId 
            ? { ...stage, status: 'running', startTime: new Date() }
            : stage
        ));
        setExpandedStage(stageId);
        setCurrentStageIndex(i);

        // Simulate logs
        await simulateLogs(stageId);

        // Complete stage
        setStages(prev => prev.map(stage => 
          stage.id === stageId 
            ? { ...stage, status: 'success', endTime: new Date() }
            : stage
        ));

        // Wait before next stage
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Wait a bit before completing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
    };

    simulatePipeline();
  }, [onComplete]);

  const simulateLogs = async (stageId: string) => {
    const logMessages: Record<string, Array<{ message: string; delay: number; level: LogEntry['level'] }>> = {
      research: [
        { message: '🔍 Initializing research agent...', delay: 300, level: 'info' },
        { message: '📊 Analyzing project requirements', delay: 600, level: 'info' },
        { message: '🌐 Gathering reference materials', delay: 800, level: 'info' },
        { message: '✅ Research phase completed', delay: 1000, level: 'success' }
      ],
      spec: [
        { message: '📝 Generating technical specification...', delay: 400, level: 'info' },
        { message: '🏗️ Defining architecture and components', delay: 700, level: 'info' },
        { message: '📋 Creating task breakdown', delay: 900, level: 'info' },
        { message: '✅ Specification saved to spec.json', delay: 1100, level: 'success' }
      ],
      build: [
        { message: '⚙️ Starting Cline engineering agent...', delay: 300, level: 'info' },
        { message: '🔨 Scaffolding project structure', delay: 700, level: 'info' },
        { message: '💻 Implementing core features', delay: 1200, level: 'info' },
        { message: '🧪 Running test suite', delay: 1600, level: 'info' },
        { message: '✅ All tests passing', delay: 2000, level: 'success' }
      ],
      review: [
        { message: '👀 CodeRabbit analyzing changes...', delay: 400, level: 'info' },
        { message: '🔍 Checking code quality and standards', delay: 800, level: 'info' },
        { message: '⚠️ Minor suggestion: Add error handling', delay: 1200, level: 'warning' },
        { message: '✅ PR approved - ready to merge', delay: 1600, level: 'success' }
      ],
      deploy: [
        { message: '🚀 Initiating deployment sequence...', delay: 400, level: 'info' },
        { message: '📦 Building production bundle', delay: 800, level: 'info' },
        { message: '☁️ Deploying to Vercel', delay: 1300, level: 'info' },
        { message: '🌍 Application live at https://your-app.vercel.app', delay: 1800, level: 'success' }
      ]
    };

    const messages = logMessages[stageId] || [];
    
    for (const { message, delay, level } of messages) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setStages(prev => prev.map(stage => 
        stage.id === stageId 
          ? { 
              ...stage, 
              logs: [...stage.logs, { timestamp: new Date(), message, level }] 
            }
          : stage
      ));
    }
  };

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case 'pending': return 'text-[var(--status-pending)]';
      case 'running': return 'text-[var(--status-running)]';
      case 'success': return 'text-[var(--status-success)]';
      case 'error': return 'text-[var(--status-error)]';
    }
  };

  const getStatusIcon = (status: StageStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'running': return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'success': return <CheckCircle2 className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return 'text-muted-foreground';
      case 'success': return 'text-[var(--status-success)]';
      case 'warning': return 'text-[var(--status-warning)]';
      case 'error': return 'text-[var(--status-error)]';
    }
  };

  const formatTime = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#141414] to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm">Pipeline Running</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Building Your Application</h1>
          <p className="text-muted-foreground max-w-3xl">{projectDescription}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-sm">{Math.round(((currentStageIndex + 1) / stages.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Pipeline Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card border rounded-lg overflow-hidden ${
                stage.status === 'running' ? 'border-primary glow-primary' : 'border-border'
              }`}
            >
              {/* Stage Header */}
              <button
                onClick={() => setExpandedStage(expandedStage === stage.id ? '' : stage.id)}
                className="w-full p-6 flex items-center gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                  stage.status === 'success' ? 'bg-[var(--status-success)]/20' :
                  stage.status === 'running' ? 'bg-[var(--status-running)]/20' :
                  stage.status === 'error' ? 'bg-[var(--status-error)]/20' :
                  'bg-muted'
                }`}>
                  <stage.icon className={`w-6 h-6 ${getStatusColor(stage.status)}`} />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg">{stage.name}</h3>
                    {stage.agent && (
                      <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                        {stage.agent}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  {stage.startTime && (
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {formatTime(stage.startTime)}
                        {stage.endTime && ` - ${formatTime(stage.endTime)}`}
                      </div>
                    </div>
                  )}
                  <div className={getStatusColor(stage.status)}>
                    {getStatusIcon(stage.status)}
                  </div>
                  {expandedStage === stage.id ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Stage Logs */}
              {expandedStage === stage.id && stage.logs.length > 0 && (
                <div className="border-t border-border bg-black/30 p-6">
                  <h4 className="text-sm mb-3 text-muted-foreground">Live Logs</h4>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2 font-mono text-sm">
                      {stage.logs.map((log, logIndex) => (
                        <motion.div
                          key={logIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-3"
                        >
                          <span className="text-muted-foreground shrink-0">
                            [{formatTime(log.timestamp)}]
                          </span>
                          <span className={getLogColor(log.level)}>{log.message}</span>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
