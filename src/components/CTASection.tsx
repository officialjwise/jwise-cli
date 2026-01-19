import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 hero-gradient">
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Backend?
          </h2>
          <p className="text-lg lg:text-xl text-white/80 mb-10">
            Join hundreds of developers who ship production-ready NestJS backends faster with jwise CLI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="group">
              Get Started for Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="heroOutline">
              Read Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
