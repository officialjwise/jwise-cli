import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, Users, Shield, Zap } from 'lucide-react';

const visionPoints = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'Eliminate repetitive backend setup work so developers can focus on building features that matter.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Lightbulb,
    title: 'The Inspiration',
    description: 'Born from the frustration of spending 2-3 days on every new project just setting up auth, security, and docs.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'OWASP-compliant by default with Argon2 hashing, token rotation, and rate limiting built-in.',
    color: 'from-emerald-500 to-teal-500',
  },
];

const roadmap = [
  { phase: 'Phase 1', title: 'Core Auth', status: 'completed', description: 'Authentication, email verification, password reset' },
  { phase: 'Phase 2', title: 'OAuth & 2FA', status: 'in-progress', description: 'Social login, two-factor authentication' },
  { phase: 'Phase 3', title: 'CRUD & More', status: 'upcoming', description: 'Payments, file uploads, CRUD generators' },
  { phase: 'Phase 4', title: 'Community', status: 'upcoming', description: 'Plugin ecosystem, community templates' },
];

export function VisionSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-cyan-400">
            <Rocket className="w-4 h-4" />
            <span>Our Vision</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Stop Repeating,</span>{' '}
            <span className="gradient-text-cyan">Start Building</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            We believe developers should spend their time solving unique problems, 
            not copy-pasting the same auth code for the hundredth time.
          </p>
        </motion.div>

        {/* Vision points */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              />
              
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full hover:border-cyan-500/30 transition-colors">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${point.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <point.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Roadmap */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            <span className="gradient-text-cyan">Roadmap</span>
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500 hidden md:block" />
            
            <div className="space-y-8">
              {roadmap.map((item, index) => (
                <motion.div
                  key={item.phase}
                  className={`relative flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block bg-card border border-border/50 rounded-xl p-6 ${
                      item.status === 'completed' ? 'border-emerald-500/50' : 
                      item.status === 'in-progress' ? 'border-cyan-500/50' : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                          item.status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-400' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {item.phase}
                        </span>
                        {item.status === 'completed' && (
                          <span className="text-emerald-400 text-sm">✓ Complete</span>
                        )}
                        {item.status === 'in-progress' && (
                          <span className="text-cyan-400 text-sm">🔄 In Progress</span>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className={`w-4 h-4 rounded-full border-4 z-10 ${
                    item.status === 'completed' ? 'bg-emerald-500 border-emerald-500/30' :
                    item.status === 'in-progress' ? 'bg-cyan-500 border-cyan-500/30' :
                    'bg-muted border-border'
                  }`} />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
