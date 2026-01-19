import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-600" />
      
      {/* Animated orbs */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container relative">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/10 border border-white/20 text-white/90"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Source & Free Forever</span>
          </motion.div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Backend?
          </h2>
          <p className="text-lg lg:text-xl text-white/80 mb-10">
            Join hundreds of developers who ship production-ready NestJS backends faster with jwise CLI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-white/90 font-semibold shadow-xl group"
              onClick={() => navigate('/docs/getting-started/quick-start')}
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-medium"
              onClick={() => navigate('/docs/getting-started/quick-start')}
            >
              Read Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
