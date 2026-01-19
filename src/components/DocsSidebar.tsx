import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Home,
  Rocket,
  Book,
  Lock,
  Mail,
  Database,
  Terminal,
  FileCode,
  Palette,
  Shield,
  Ship,
  TestTube,
  Bug,
  Package,
  Users,
  FileText,
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavItem[];
}

const sidebarNav: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Getting Started',
    icon: Rocket,
    children: [
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { label: 'Your First Project', href: '/docs/getting-started/first-project' },
      { label: 'CLI Commands', href: '/docs/getting-started/cli-commands' },
    ],
  },
  {
    label: 'Core Concepts',
    icon: Book,
    children: [
      { label: 'Project Structure', href: '/docs/core-concepts/project-structure' },
      { label: 'Template System', href: '/docs/core-concepts/template-system' },
      { label: 'ORM Support', href: '/docs/core-concepts/orm-support' },
      { label: 'Database Config', href: '/docs/core-concepts/database-config' },
      { label: 'Environment Variables', href: '/docs/core-concepts/env-variables' },
    ],
  },
  {
    label: 'Authentication',
    icon: Lock,
    children: [
      { label: 'Overview', href: '/docs/authentication/overview' },
      { label: 'User Registration', href: '/docs/authentication/registration' },
      { label: 'Login & JWT Tokens', href: '/docs/authentication/login' },
      { label: 'Token Refresh', href: '/docs/authentication/token-refresh' },
      { label: 'Email Verification', href: '/docs/authentication/email-verification' },
      { label: 'Password Reset', href: '/docs/authentication/password-reset' },
      { label: 'Multi-Device Sessions', href: '/docs/authentication/sessions' },
      { label: 'Security Best Practices', href: '/docs/authentication/security' },
    ],
  },
  {
    label: 'Email Service',
    icon: Mail,
    children: [
      { label: 'Overview', href: '/docs/email/overview' },
      { label: 'SMTP Configuration', href: '/docs/email/smtp-config' },
      { label: 'Email Templates', href: '/docs/email/templates' },
      { label: 'Customizing Emails', href: '/docs/email/customizing' },
      { label: 'Email Providers', href: '/docs/email/providers' },
    ],
  },
  {
    label: 'Database',
    icon: Database,
    children: [
      { label: 'Prisma Setup', href: '/docs/database/prisma' },
      { label: 'TypeORM Setup', href: '/docs/database/typeorm' },
      { label: 'Migrations', href: '/docs/database/migrations' },
      { label: 'Schema Design', href: '/docs/database/schema' },
    ],
  },
  {
    label: 'CLI Reference',
    icon: Terminal,
    children: [
      { label: 'jwise new', href: '/docs/cli/new' },
      { label: 'jwise add', href: '/docs/cli/add' },
      { label: 'jwise generate', href: '/docs/cli/generate' },
      { label: 'jwise doctor', href: '/docs/cli/doctor' },
      { label: 'Command Options', href: '/docs/cli/options' },
    ],
  },
  {
    label: 'API Reference',
    icon: FileCode,
    children: [
      { label: 'Overview', href: '/docs/api/overview' },
      { label: 'POST /auth/signup', href: '/docs/api/auth-signup' },
      { label: 'POST /auth/login', href: '/docs/api/auth-login' },
      { label: 'POST /auth/refresh', href: '/docs/api/auth-refresh' },
      { label: 'POST /auth/logout', href: '/docs/api/auth-logout' },
      { label: 'GET /auth/me', href: '/docs/api/auth-me' },
      { label: 'GET /auth/sessions', href: '/docs/api/auth-sessions' },
      { label: 'Email Endpoints', href: '/docs/api/email-endpoints' },
      { label: 'Error Codes', href: '/docs/api/error-codes' },
    ],
  },
  {
    label: 'Customization',
    icon: Palette,
    children: [
      { label: 'Custom Modules', href: '/docs/customization/modules' },
      { label: 'Modifying Templates', href: '/docs/customization/templates' },
      { label: 'Custom Decorators', href: '/docs/customization/decorators' },
      { label: 'Custom Guards', href: '/docs/customization/guards' },
    ],
  },
  {
    label: 'Security',
    icon: Shield,
    children: [
      { label: 'OWASP Compliance', href: '/docs/security/owasp' },
      { label: 'Password Hashing', href: '/docs/security/hashing' },
      { label: 'JWT Best Practices', href: '/docs/security/jwt' },
      { label: 'Rate Limiting', href: '/docs/security/rate-limiting' },
    ],
  },
  {
    label: 'Deployment',
    icon: Ship,
    children: [
      { label: 'Production Checklist', href: '/docs/deployment/checklist' },
      { label: 'Docker', href: '/docs/deployment/docker' },
      { label: 'Kubernetes', href: '/docs/deployment/kubernetes' },
      { label: 'AWS', href: '/docs/deployment/aws' },
    ],
  },
  {
    label: 'Testing',
    icon: TestTube,
    children: [
      { label: 'Unit Testing', href: '/docs/testing/unit' },
      { label: 'Integration Testing', href: '/docs/testing/integration' },
      { label: 'E2E Testing', href: '/docs/testing/e2e' },
    ],
  },
  {
    label: 'Troubleshooting',
    icon: Bug,
    children: [
      { label: 'Common Errors', href: '/docs/troubleshooting/errors' },
      { label: 'Database Issues', href: '/docs/troubleshooting/database' },
      { label: 'FAQ', href: '/docs/troubleshooting/faq' },
    ],
  },
  {
    label: 'Examples',
    icon: Package,
    children: [
      { label: 'Basic Auth App', href: '/docs/examples/basic-auth' },
      { label: 'Full-Stack App', href: '/docs/examples/fullstack' },
      { label: 'Microservices', href: '/docs/examples/microservices' },
    ],
  },
  {
    label: 'Contributing',
    icon: Users,
    href: '/docs/contributing',
  },
  {
    label: 'Changelog',
    icon: FileText,
    href: '/docs/changelog',
  },
];

interface SidebarItemProps {
  item: NavItem;
  depth?: number;
}

function SidebarItem({ item, depth = 0 }: SidebarItemProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(() => {
    if (item.children) {
      return item.children.some((child) => location.pathname === child.href);
    }
    return false;
  });

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === location.pathname;
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
            isOpen ? 'text-foreground bg-muted/50' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          }`}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {item.label}
          </span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      ) : (
        <Link
          to={item.href || '/'}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
            isActive
              ? 'text-accent bg-accent/10 font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          }`}
          style={{ paddingLeft: depth > 0 ? `${depth * 12 + 12}px` : undefined }}
        >
          {Icon && <Icon className="w-4 h-4" />}
          {item.label}
        </Link>
      )}

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1 ml-3 pl-3 border-l border-border">
              {item.children!.map((child) => (
                <SidebarItem key={child.label} item={child} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DocsSidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {sidebarNav.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  );
}
