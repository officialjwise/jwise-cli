import { motion } from 'framer-motion';
import { Lock, Mail, Shield, ChevronRight, Database, Code, Zap } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Complete Authentication',
    description: 'JWT with RS256, refresh token rotation, account lockout, and multi-device session management',
    list: [
      'User registration & login',
      'Email verification',
      'Password reset',
      'Session management',
    ],
    link: '/docs/authentication/overview',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Mail,
    title: 'Email Service',
    description: 'Professional email templates with Nodemailer and support for all major SMTP providers',
    list: [
      'Verification emails',
      'Password reset',
      'Welcome messages',
      'Custom templates',
    ],
    link: '/docs/email/overview',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'OWASP compliant with Argon2 hashing, CORS, Helmet, rate limiting, and comprehensive audit logs',
    list: [
      'Argon2id hashing',
      'Account lockout',
      'Rate limiting',
      'Audit logging',
    ],
    link: '/docs/security/hashing',
    gradient: 'from-violet-500 to-purple-500',
  },
];

const additionalFeatures = [
  { icon: Database, title: 'Database Ready', description: 'Prisma & TypeORM support with auto-migrations' },
  { icon: Code, title: 'TypeScript Native', description: 'Full type safety from day one' },
  { icon: Zap, title: 'CLI Powered', description: 'Generate, scaffold, and deploy with ease' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
      
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need, Out of the Box
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production-ready features that would take weeks to implement manually
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Gradient top border on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-5 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-2.5 mb-6">
                {feature.list.map((listItem) => (
                  <li key={listItem} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <span className="text-success">✓</span>
                    {listItem}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a
                href={feature.link}
                className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn more
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-cyan-500/5 to-transparent" />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {additionalFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-6 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-cyan-500/10">
                <feature.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
