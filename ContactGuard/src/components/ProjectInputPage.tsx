import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Sparkles, Link as LinkIcon, Plus, X } from 'lucide-react';

interface ProjectInputPageProps {
  onSubmit: (data: { description: string; links: string[] }) => void;
}

export function ProjectInputPage({ onSubmit }: ProjectInputPageProps) {
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addLinkField = () => {
    setLinks([...links, '']);
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks.length === 0 ? [''] : newLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const validLinks = links.filter(link => link.trim() !== '');
    onSubmit({ description, links: validLinks });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#141414] to-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 glow-primary"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Describe Your Vision
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Tell us what you want to build. Our AI agents will research, plan, build, and deploy your application automatically.
          </motion.p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors hover:shadow-2xl hover:shadow-primary/10"
          >
            <label htmlFor="description" className="block text-lg mb-4 text-foreground">
              What do you want to build? <span className="text-primary">*</span>
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: A real-time collaborative todo app with user authentication, drag-and-drop functionality, and a mobile-responsive design..."
              className="min-h-[200px] bg-input-background border-border text-foreground placeholder:text-muted-foreground resize-none text-base"
              required
            />
            <p className="text-sm text-muted-foreground mt-3">
              Be as detailed as possible. Include features, design preferences, and any specific requirements.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors hover:shadow-2xl hover:shadow-primary/10"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg text-foreground flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Reference Links (Optional)
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLinkField}
                className="border-border hover:border-primary"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Link
              </Button>
            </div>
            
            <div className="space-y-3">
              {links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    placeholder="https://example.com/syllabus or API documentation..."
                    className="bg-input-background border-border text-foreground flex-1"
                  />
                  {links.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLink(index)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground mt-3">
              Add links to syllabus, API docs, design inspirations, or any reference material.
            </p>
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg h-auto glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Starting Pipeline...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Building
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
        >
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-card/50 border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-all"
          >
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-sm mb-1">Research & Planning</h3>
            <p className="text-xs text-muted-foreground">AI analyzes requirements and creates a detailed spec</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-card/50 border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-all"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-sm mb-1">Automated Build</h3>
            <p className="text-xs text-muted-foreground">Agents write code, run tests, and iterate</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-card/50 border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-all"
          >
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-sm mb-1">One-Click Deploy</h3>
            <p className="text-xs text-muted-foreground">Live app with GitHub repo and full documentation</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}