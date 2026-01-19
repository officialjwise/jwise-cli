import { Github, Twitter } from 'lucide-react';

const footerLinks = {
  docs: [
    { label: 'Getting Started', href: '/docs/getting-started' },
    { label: 'Installation', href: '/docs/installation' },
    { label: 'Quick Start', href: '/docs/quick-start' },
    { label: 'Configuration', href: '/docs/configuration' },
  ],
  api: [
    { label: 'Authentication', href: '/api/authentication' },
    { label: 'Endpoints', href: '/api/endpoints' },
    { label: 'Examples', href: '/api/examples' },
    { label: 'Error Codes', href: '/api/errors' },
  ],
  resources: [
    { label: 'Examples', href: '/examples' },
    { label: 'Blog', href: '/blog' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Contributing', href: '/contributing' },
  ],
  community: [
    { label: 'GitHub', href: 'https://github.com/jwise/cli' },
    { label: 'Discord', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Support', href: '/support' },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="font-bold text-lg text-foreground">jwise</span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              Production-ready NestJS backends in 30 seconds.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/jwise/cli"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Docs */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Documentation</h4>
            <ul className="space-y-3">
              {footerLinks.docs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* API */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">API Reference</h4>
            <ul className="space-y-3">
              {footerLinks.api.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} jwise. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
