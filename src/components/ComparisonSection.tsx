import { motion } from 'framer-motion';
import { X, Check, Clock, Zap } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="py-24 lg:py-32 bg-card border-y border-border">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose jwise?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skip the boilerplate. Focus on what makes your app unique.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manual Setup */}
          <motion.div
            className="relative p-8 rounded-2xl bg-background border border-destructive/20"
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

          {/* jwise CLI */}
          <motion.div
            className="relative p-8 rounded-2xl bg-background border border-success/30 shadow-lg shadow-success/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-bold">
              RECOMMENDED
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">jwise CLI</h3>
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
      </div>
    </section>
  );
}
