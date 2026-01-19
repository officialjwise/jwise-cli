import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Backend Developer',
    company: 'TechFlow',
    avatar: 'AC',
    content: "jwise saved me an entire week of setup time. The auth module is exactly what I would've built myself, but better documented.",
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Full Stack Engineer',
    company: 'StartupXYZ',
    avatar: 'SJ',
    content: "Finally, a CLI that understands what production-ready actually means. The security defaults are chef's kiss.",
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Tech Lead',
    company: 'DevStudio',
    avatar: 'MW',
    content: "We've standardized on jwise for all our NestJS projects. Consistent architecture, less review time, happier team.",
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Backend Architect',
    company: 'CloudScale',
    avatar: 'ER',
    content: "The email verification and password reset flows are exactly what every project needs. No more reinventing the wheel.",
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Solo Founder',
    company: 'IndieHacker',
    avatar: 'DK',
    content: "As a solo developer, jwise is like having a senior engineer set up my project. Incredible time saver.",
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'DevOps Engineer',
    company: 'InfraTeam',
    avatar: 'PP',
    content: "The Docker and deployment configs generated are actually usable in production. Rare for a scaffolding tool.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 0% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse at 100% 50%, rgba(20,184,166,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse at 0% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-3 h-3 text-yellow-500/40" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-400">
            <MessageSquare className="w-4 h-4" />
            <span>Developer Love</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Trusted by</span>{' '}
            <span className="gradient-text-cyan">Developers Worldwide</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Join hundreds of developers who've reclaimed their time with jwise.
          </p>
        </motion.div>

        {/* Testimonials carousel - infinite scroll effect */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[400px]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full hover:border-cyan-500/30 transition-colors">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <p className="text-foreground mb-6">"{testimonial.content}"</p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: '500+', label: 'Projects Generated' },
            { value: '50+', label: 'Beta Testers' },
            { value: '2-3 days', label: 'Saved Per Project' },
            { value: '100%', label: 'Open Source' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-3xl lg:text-4xl font-bold gradient-text-cyan mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
