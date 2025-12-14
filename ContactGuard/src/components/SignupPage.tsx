import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string) => void;
  onBackToHome: () => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSignup, onBackToHome, onSwitchToLogin }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Password strength indicators
  const passwordStrength = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordStrong || !agreedToTerms) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSignup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-12">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-primary/10" />
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBackToHome}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group z-20"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </motion.button>

      {/* Signup Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center glow-primary">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold">AgentBuilder</span>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-400">Start building with AI agents today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-gray-300">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-12 h-12 bg-input-background border-border focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-12 h-12 bg-input-background border-border focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 bg-input-background border-border focus:border-primary transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicators */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 pt-2"
                >
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-1 ${passwordStrength.hasMinLength ? 'text-[var(--status-success)]' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasMinLength ? 'bg-[var(--status-success)]/20' : 'bg-gray-800'}`}>
                        {passwordStrength.hasMinLength && <Check className="w-3 h-3" />}
                      </div>
                      8+ characters
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.hasUpperCase ? 'text-[var(--status-success)]' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasUpperCase ? 'bg-[var(--status-success)]/20' : 'bg-gray-800'}`}>
                        {passwordStrength.hasUpperCase && <Check className="w-3 h-3" />}
                      </div>
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.hasLowerCase ? 'text-[var(--status-success)]' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasLowerCase ? 'bg-[var(--status-success)]/20' : 'bg-gray-800'}`}>
                        {passwordStrength.hasLowerCase && <Check className="w-3 h-3" />}
                      </div>
                      Lowercase
                    </div>
                    <div className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-[var(--status-success)]' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasNumber ? 'bg-[var(--status-success)]/20' : 'bg-gray-800'}`}>
                        {passwordStrength.hasNumber && <Check className="w-3 h-3" />}
                      </div>
                      Number
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                  agreedToTerms 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                {agreedToTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <label className="text-sm text-gray-400 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !isPasswordStrong || !agreedToTerms}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white glow-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-gray-500">OR SIGN UP WITH</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-11 border-border hover:border-primary hover:bg-primary/5 transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 border-border hover:border-primary hover:bg-primary/5 transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </Button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--status-success)]/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-[var(--status-success)]" />
            </div>
            Free Forever
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--status-success)]/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-[var(--status-success)]" />
            </div>
            No Credit Card
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
