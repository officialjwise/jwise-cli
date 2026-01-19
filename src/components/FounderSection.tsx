import { motion } from 'framer-motion';
import { Github, Linkedin, Quote } from 'lucide-react';
import founderImage from '@/assets/founder-daniel.jpg';

export function FounderSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src={founderImage}
                  alt="Daniel Amoako Kodua - Founder of jwise"
                  className="w-full h-auto object-cover aspect-[3/4]"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Name badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    className="bg-background/80 backdrop-blur-md rounded-xl p-4 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-foreground">Daniel Amoako Kodua</h3>
                    <p className="text-cyan-400 font-medium">Founder & Lead Developer</p>
                    <p className="text-sm text-muted-foreground mt-1">Senior Software Engineer</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-cyan-400">
              <Quote className="w-4 h-4" />
              <span>Meet the Creator</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="text-foreground">Built by a Developer,</span>
              <br />
              <span className="gradient-text-cyan">For Developers</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                "Every new NestJS project I start, I spend 2–3 days just setting up auth, 
                security, migrations, and docs. And every time I think, 'Wait… haven't I 
                written this exact code before?'"
              </p>
              
              <p>
                That frustration led to the creation of jwise—a CLI that eliminates the 
                repetitive setup work and lets developers focus on what matters: building 
                features that make a difference.
              </p>

              <p>
                As a Senior Software Engineer with years of experience building production 
                systems, I've poured everything I've learned about security, architecture, 
                and developer experience into this tool.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://github.com/officialjwise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/danielamoakokodua"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
