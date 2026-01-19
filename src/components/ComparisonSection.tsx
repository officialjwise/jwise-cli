import { motion } from 'framer-motion';
import { X, Check, Clock, Zap, Code2, Shield, Database, FileCode } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/50 dark:bg-card border-y border-border">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <Code2 className="w-4 h-4" />
            <span>The Smart Choice</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose jwise-cli?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skip the boilerplate. Focus on what makes your app unique.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manual Setup */}
          <motion.div
            className="relative p-8 rounded-2xl bg-background border border-destructive/20 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Manual Setup</h3>
                <p className="text-sm text-destructive">~3 days of work</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                'Configure authentication from scratch',
                'Write email templates manually',
                'Implement password hashing',
                'Setup JWT with refresh tokens',
                'Add rate limiting & security',
                'Create database schemas',
                'Write tests for everything',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* jwise-cli */}
          <motion.div
            className="relative p-8 rounded-2xl bg-background border-2 border-success/30 shadow-xl shadow-success/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-bold">
              RECOMMENDED
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">jwise-cli</h3>
                <p className="text-sm text-success">~30 seconds</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                'Complete auth with one command',
                '4 email templates included',
                'Argon2id hashing pre-configured',
                'JWT with RS256 + refresh rotation',
                'OWASP security best practices',
                'Prisma or TypeORM ready',
                'Full test suite included',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Shield, label: 'Security First', desc: 'OWASP compliant' },
            { icon: Database, label: 'Multi-ORM', desc: 'Prisma, TypeORM, Sequelize' },
            { icon: FileCode, label: 'Type Safe', desc: 'Full TypeScript support' },
            { icon: Zap, label: 'Fast Setup', desc: '30 seconds flat' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              className="text-center p-4 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/50 hover:border-cyan-500/30 transition-colors"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <feature.icon className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground text-sm">{feature.label}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
