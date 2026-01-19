import { motion } from 'framer-motion';
import { ArrowRight, Github, Zap, Lock, Mail, CheckCircle } from 'lucide-react';
import { AnimatedTerminal } from './AnimatedTerminal';
import { Button } from './ui/button';

const stats = [
  { icon: Zap, label: '30 sec setup' },
  { icon: Lock, label: '11 endpoints' },
  { icon: Mail, label: '4 templates' },
  { icon: CheckCircle, label: 'OWASP compliant' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-float opacity-30">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>✨</span>
              <span>v1.0.0 - Production Ready</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Production-Ready{' '}
              <span className="gradient-text">NestJS</span>
              <br />
              in 30 Seconds
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-white/80 max-w-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Complete authentication, email verification, and security best practices—automatically generated with one command.
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
                variant="hero"
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="heroOutline"
              >
                <Github className="mr-2 w-5 h-5" />
                View on GitHub
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 group cursor-default"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <stat.icon className="w-5 h-5 text-white/70" />
                  <span className="text-sm font-medium text-white/80">{stat.label}</span>
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
