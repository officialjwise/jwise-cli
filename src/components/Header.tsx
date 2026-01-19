import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, Menu, X, Command } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'API', href: '/api' },
  { label: 'Examples', href: '/examples' },
  { label: 'CLI', href: '/cli' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
              jwise
            </span>
            <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
              v1.0.0
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button className="hidden md:flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground bg-muted/50 rounded-lg border border-border hover:border-accent/50 hover:bg-muted transition-all">
              <Search className="w-4 h-4" />
              <span>Search docs...</span>
              <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-xs bg-background rounded border border-border">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/jwise/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* CTA */}
            <Button variant="default" size="sm" className="hidden sm:flex">
              Get Started
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-background"
          >
            <nav className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
