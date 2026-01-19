import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Introducing jwise: The CLI That Saves You Days of Setup',
    excerpt: 'Learn how jwise was born from the frustration of repetitive NestJS setup and how it can transform your development workflow.',
    author: 'Daniel Amoako Kodua',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['Announcement', 'NestJS', 'CLI'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Security Best Practices: How jwise Implements OWASP Guidelines',
    excerpt: 'A deep dive into the security features built into every jwise-generated project, from Argon2 hashing to rate limiting.',
    author: 'Daniel Amoako Kodua',
    date: '2024-01-10',
    readTime: '8 min read',
    tags: ['Security', 'OWASP', 'Best Practices'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Building Production-Ready Auth in 30 Seconds',
    excerpt: 'Step-by-step guide on using jwise to scaffold complete authentication with email verification and password reset.',
    author: 'Daniel Amoako Kodua',
    date: '2024-01-05',
    readTime: '6 min read',
    tags: ['Tutorial', 'Authentication', 'Quick Start'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Why We Chose Prisma, TypeORM, and Sequelize Support',
    excerpt: 'Understanding the decision to support multiple ORMs and how jwise adapts to your preferred database toolkit.',
    author: 'Daniel Amoako Kodua',
    date: '2023-12-28',
    readTime: '4 min read',
    tags: ['Architecture', 'Database', 'ORM'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'The Roadmap: OAuth, 2FA, and Beyond',
    excerpt: 'A look at what\'s coming next for jwise, including social login, two-factor authentication, and community plugins.',
    author: 'Daniel Amoako Kodua',
    date: '2023-12-20',
    readTime: '5 min read',
    tags: ['Roadmap', 'Features', 'Community'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'From Copy-Paste to CLI: My Journey Building jwise',
    excerpt: 'The personal story behind jwise and the lessons learned from years of setting up the same code over and over.',
    author: 'Daniel Amoako Kodua',
    date: '2023-12-15',
    readTime: '7 min read',
    tags: ['Story', 'Developer Experience', 'Open Source'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
  },
];

export default function Blog() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 hero-gradient-radial" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <div className="container relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">The jwise</span>{' '}
                <span className="gradient-text-cyan">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Insights, tutorials, and updates from the jwise team
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="container">
              <motion.article
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid lg:grid-cols-2 gap-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-colors">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500 text-white">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-cyan-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    
                    <Button className="w-fit bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white group/btn">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12 pb-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
