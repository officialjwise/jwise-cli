import { motion } from 'framer-motion';
import { Lock, Mail, Shield, ChevronRight } from 'lucide-react';

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
    link: '/docs/authentication',
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
    link: '/docs/email',
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
    link: '/docs/security',
  },
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
    <section className="py-24 lg:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need, Out of the Box
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production-ready features that would take weeks to implement manually
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-accent/30 transition-all duration-300 feature-card-gradient overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
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
                {feature.list.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <span className="text-success">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a
                href={feature.link}
                className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn more
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
