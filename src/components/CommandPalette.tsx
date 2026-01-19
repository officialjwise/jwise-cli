import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Code, Terminal, ArrowRight, Command } from 'lucide-react';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: 'page' | 'api' | 'cli';
}

const searchData: SearchResult[] = [
  // Getting Started
  { title: 'Installation', description: 'Install jwise CLI on your system', href: '/docs/getting-started/installation', category: 'page' },
  { title: 'Quick Start', description: 'Get started in under 5 minutes', href: '/docs/getting-started/quick-start', category: 'page' },
  // Authentication
  { title: 'Authentication Overview', description: 'Complete auth system with JWT tokens', href: '/docs/authentication/overview', category: 'page' },
  // Email
  { title: 'Email Service Overview', description: 'Professional email templates and SMTP', href: '/docs/email/overview', category: 'page' },
  // Security
  { title: 'OWASP Compliance', description: 'Security standards and best practices', href: '/docs/security/owasp', category: 'page' },
  // Deployment
  { title: 'Production Checklist', description: 'Pre-deployment checklist', href: '/docs/deployment/checklist', category: 'page' },
  // CLI
  { title: 'jwise new', description: 'Create a new NestJS project', href: '/docs/cli/new', category: 'cli' },
  // API
  { title: 'POST /auth/signup', description: 'Register a new user account', href: '/docs/api/auth-signup', category: 'api' },
  { title: 'POST /auth/login', description: 'Authenticate and receive tokens', href: '/docs/api/auth-login', category: 'api' },
  { title: 'POST /auth/refresh', description: 'Refresh access token', href: '/docs/api/auth-refresh', category: 'api' },
  { title: 'POST /auth/logout', description: 'End current session', href: '/docs/api/auth-logout', category: 'api' },
  { title: 'Session Management', description: 'GET/DELETE /auth/sessions', href: '/docs/api/auth-sessions', category: 'api' },
  { title: 'Email Verification', description: 'Verify and resend emails', href: '/docs/api/email-verification', category: 'api' },
  { title: 'Password Reset', description: 'Forgot and reset password', href: '/docs/api/password-reset', category: 'api' },
  // Database
  { title: 'Prisma Setup', description: 'Configure Prisma ORM', href: '/docs/database/prisma', category: 'page' },
  { title: 'TypeORM Setup', description: 'Configure TypeORM', href: '/docs/database/typeorm', category: 'page' },
];

const categoryIcons = {
  page: FileText,
  api: Code,
  cli: Terminal,
};

const categoryLabels = {
  page: 'Page',
  api: 'API',
  cli: 'CLI',
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filteredResults = query.length > 0
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchData.slice(0, 8);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        navigate(filteredResults[selectedIndex].href);
        setIsOpen(false);
        setQuery('');
      }
    },
    [isOpen, filteredResults, selectedIndex, navigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleSelect = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground bg-muted/50 rounded-lg border border-border hover:border-accent/50 hover:bg-muted transition-all"
      >
        <Search className="w-4 h-4" />
        <span>Search docs...</span>
        <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-xs bg-background rounded border border-border">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2"
            >
              <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 border-b border-border">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="flex-1 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <kbd className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded border border-border">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {filteredResults.length > 0 ? (
                    <div className="space-y-1">
                      {filteredResults.map((result, index) => {
                        const Icon = categoryIcons[result.category];
                        return (
                          <button
                            key={result.href}
                            onClick={() => handleSelect(result.href)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                              selectedIndex === index
                                ? 'bg-accent/10 text-foreground'
                                : 'text-muted-foreground hover:bg-muted/50'
                            }`}
                          >
                            <div className="shrink-0">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{result.title}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                {result.description}
                              </p>
                            </div>
                            <span className="shrink-0 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                              {categoryLabels[result.category]}
                            </span>
                            {selectedIndex === index && (
                              <ArrowRight className="w-4 h-4 shrink-0 text-accent" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>No results found for "{query}"</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↑</kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↓</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">↵</kbd>
                      to select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">esc</kbd>
                    to close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
