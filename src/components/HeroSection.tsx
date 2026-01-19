import { motion } from 'framer-motion';
import { ArrowRight, Github, Zap, Lock, Mail, CheckCircle, Sparkles, Code2, Terminal } from 'lucide-react';
import { AnimatedTerminal } from './AnimatedTerminal';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const stats = [
  { icon: Zap, label: '30 sec setup', color: 'text-yellow-500' },
  { icon: Lock, label: '11 endpoints', color: 'text-cyan-500' },
  { icon: Mail, label: '4 templates', color: 'text-emerald-500' },
  { icon: CheckCircle, label: 'OWASP compliant', color: 'text-blue-500' },
];

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Light mode gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-transparent dark:via-transparent dark:to-transparent" />
      
      {/* Dark mode gradient */}
      <div className="absolute inset-0 hero-gradient-radial opacity-0 dark:opacity-100" />
      
      {/* Animated orbs - visible in both modes with different opacities */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-400/10 dark:from-cyan-500/10 dark:to-blue-500/10 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-teal-400/10 to-emerald-400/10 dark:from-teal-500/10 dark:to-emerald-500/10 blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Extra floating elements for light mode */}
        <motion.div 
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 dark:from-purple-500/5 dark:to-pink-500/5 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating code symbols for developers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Code2, Terminal, Zap, Lock].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:block"
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            <Icon className="w-8 h-8 text-cyan-500/20 dark:text-cyan-400/20" />
          </motion.div>
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="container relative z-10 py-20 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>v1.0.0 - Production Ready</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-foreground">Production-Ready</span>{' '}
              <span className="gradient-text-cyan">NestJS</span>
              <br />
              <span className="text-foreground">in 30 Seconds</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Complete authentication, email verification, and security best practices—automatically generated with one command using <span className="font-semibold text-cyan-600 dark:text-cyan-400">jwise-cli</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold shadow-lg shadow-cyan-500/25 group"
                onClick={() => navigate('/docs/getting-started/quick-start')}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border bg-background/80 dark:bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:border-cyan-500/50"
                asChild
              >
                <a href="https://github.com/officialjwise" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-5 h-5" />
                  View on GitHub
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 group cursor-default px-3 py-2 rounded-lg bg-white/50 dark:bg-muted/30 border border-border/50 shadow-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm font-medium text-foreground/80">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Terminal */}
          <div className="lg:order-last order-first flex justify-center lg:justify-end">
            <AnimatedTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
