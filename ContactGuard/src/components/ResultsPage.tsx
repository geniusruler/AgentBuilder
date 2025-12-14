import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  FileText, 
  RefreshCw, 
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ResultsPageProps {
  onIterate: () => void;
}

export function ResultsPage({ onIterate }: ResultsPageProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const mockData = {
    appUrl: 'https://your-awesome-app.vercel.app',
    githubUrl: 'https://github.com/your-username/awesome-app',
    pdfUrl: 'https://example.com/research-brief.pdf',
    buildTime: '4m 32s',
    summary: {
      title: 'Application Successfully Built and Deployed',
      description: 'Your application has been built with modern best practices and deployed to production.',
      features: [
        'Responsive design optimized for all devices',
        'User authentication with secure session management',
        'Real-time data synchronization',
        'Comprehensive test coverage (94%)',
        'Production-ready deployment on Vercel'
      ],
      tradeoffs: [
        'Used mock data for external APIs - you\'ll need to add real API keys',
        'Basic error handling implemented - consider adding more robust logging',
        'Optimized for MVP scope - some advanced features deferred to v2'
      ],
      nextSteps: [
        'Review the deployed application and test all features',
        'Add your API keys to the environment variables',
        'Customize the branding and color scheme',
        'Set up analytics and monitoring',
        'Plan iteration cycles for additional features'
      ]
    },
    techStack: [
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'Vercel'
    ]
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#141414] to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--status-success)]/20 mb-6 glow-success">
            <CheckCircle2 className="w-12 h-12 text-[var(--status-success)]" />
          </div>
          <h1 className="text-5xl font-bold mb-4">{mockData.summary.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {mockData.summary.description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <div className="w-2 h-2 rounded-full bg-[var(--status-success)] animate-pulse" />
            <span className="text-sm">Completed in {mockData.buildTime}</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {/* Live App Card */}
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/50 hover:border-primary transition-all glow-primary cursor-pointer group">
            <a href={mockData.appUrl} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-6 h-6 text-primary" />
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg mb-2">Live Application</h3>
              <p className="text-sm text-muted-foreground mb-3">View your deployed app</p>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-black/50 px-2 py-1 rounded flex-1 truncate">
                  {mockData.appUrl}
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(mockData.appUrl);
                  }}
                >
                  {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </a>
          </Card>

          {/* GitHub Card */}
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <a href={mockData.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6" />
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-lg mb-2">GitHub Repository</h3>
              <p className="text-sm text-muted-foreground">Access the source code</p>
            </a>
          </Card>

          {/* Research PDF Card */}
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <a href={mockData.pdfUrl} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-lg mb-2">Research Brief</h3>
              <p className="text-sm text-muted-foreground">Download the PDF report</p>
            </a>
          </Card>
        </motion.div>

        {/* Summary Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Features Built */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Features Built
              </h2>
              <ul className="space-y-3">
                {mockData.summary.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--status-success)] shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-xl mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {mockData.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-muted rounded-lg text-sm hover:bg-muted/70 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="text-sm mb-2 text-muted-foreground">Build Configuration</h3>
                <div className="space-y-1 text-xs font-mono">
                  <div>Framework: React + Vite</div>
                  <div>Styling: Tailwind CSS</div>
                  <div>Deployment: Vercel</div>
                  <div>Status: ✅ Production Ready</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tradeoffs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl mb-4">Tradeoffs & Considerations</h2>
            <ul className="space-y-3">
              {mockData.summary.tradeoffs.map((tradeoff, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--status-warning)]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--status-warning)]" />
                  </div>
                  <span className="text-sm text-muted-foreground">{tradeoff}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-xl mb-4">Recommended Next Steps</h2>
            <ol className="space-y-3">
              {mockData.summary.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-sm">
                    {index + 1}
                  </span>
                  <span className="text-sm pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onIterate}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 glow-primary"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Iterate & Improve
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:border-primary"
            onClick={() => window.open(mockData.appUrl, '_blank')}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Open Live App
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
