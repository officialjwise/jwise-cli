import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Code2, Terminal, Shield, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from './ui/button';

const testimonials = [
  {
    name: 'Francis Amponsah',
    role: 'Full Stack Developer',
    company: 'Tech Innovators',
    avatar: 'FA',
    content: "jwise-cli saved me an entire week of setup time. The auth module is exactly what I would've built myself, but better documented and more secure.",
    rating: 5,
  },
  {
    name: 'Jeff Konadu Sarpong',
    role: 'Backend Developer',
    company: 'CloudTech Solutions',
    avatar: 'JK',
    content: "Finally, a CLI that understands what production-ready actually means. The security defaults are chef's kiss. No more security audits failing!",
    rating: 5,
  },
  {
    name: 'Stephen Selorm Bedzrah',
    role: 'Backend Developer',
    company: 'DevFlow',
    avatar: 'SS',
    content: "We've standardized on jwise-cli for all our NestJS projects. Consistent architecture, less review time, happier team. Absolute game changer.",
    rating: 5,
  },
  {
    name: 'Asher Tetteh Yram',
    role: 'DevOps Engineer',
    company: 'AmaliTech',
    avatar: 'AT',
    content: "The Docker and deployment configs generated are actually usable in production. Rare for a scaffolding tool. This is how CLI tools should be built.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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

      {/* Floating code symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Code2, Terminal, Shield, Rocket, Star].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Icon className="w-6 h-6 text-cyan-500/30" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400">
            <MessageSquare className="w-4 h-4" />
            <span>Developer Love</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Trusted by</span>{' '}
            <span className="gradient-text-cyan">Top Developers</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Join the growing community of developers who've reclaimed their time with jwise-cli.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-cyan-500/50 shadow-lg hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-cyan-500/50 shadow-lg hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] px-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 group">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-semibold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-gradient-to-r from-cyan-500 to-teal-500'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
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
            { value: '50+', label: 'Projects Generated' },
            { value: '15+', label: 'Beta Testers' },
            { value: '2-3 days', label: 'Saved Per Project' },
            { value: '100%', label: 'Open Source' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-card/30 dark:bg-card/20 border border-border/30"
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--card) / 0.5)' }}
            >
              <p className="text-3xl lg:text-4xl font-bold gradient-text-cyan mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
