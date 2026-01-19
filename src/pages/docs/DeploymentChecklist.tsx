import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function DeploymentChecklistPage() {
  return (
    <DocsLayout
      title="Production Checklist"
      description="Essential checklist before deploying your jwise backend to production."
    >
      <Callout type="warning" title="Important">
        Review every item before deploying to production. Security vulnerabilities in production can lead to data breaches.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Environment Configuration</h2>
      
      <div className="space-y-3 my-6">
        {[
          { checked: false, label: 'NODE_ENV=production set' },
          { checked: false, label: 'Database connection string updated' },
          { checked: false, label: 'SMTP credentials configured' },
          { checked: false, label: 'FRONTEND_URL points to production domain' },
          { checked: false, label: 'JWT keys generated (not using dev keys)' },
          { checked: false, label: 'All secrets stored in environment variables' },
        ].map((item, index) => (
          <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded border-border accent-accent" />
            <span className="text-foreground">{item.label}</span>
          </label>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Database</h2>
      
      <div className="space-y-3 my-6">
        {[
          { checked: false, label: 'Migrations applied to production database' },
          { checked: false, label: 'Database backups configured' },
          { checked: false, label: 'Connection pooling configured' },
          { checked: false, label: 'Database indexes created for performance' },
        ].map((item, index) => (
          <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded border-border accent-accent" />
            <span className="text-foreground">{item.label}</span>
          </label>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Security</h2>
      
      <div className="space-y-3 my-6">
        {[
          { checked: false, label: 'HTTPS/TLS enabled' },
          { checked: false, label: 'CORS configured for production domains' },
          { checked: false, label: 'Helmet middleware enabled' },
          { checked: false, label: 'Rate limiting configured' },
          { checked: false, label: 'Security headers verified' },
        ].map((item, index) => (
          <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded border-border accent-accent" />
            <span className="text-foreground">{item.label}</span>
          </label>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Monitoring</h2>
      
      <div className="space-y-3 my-6">
        {[
          { checked: false, label: 'Error tracking (Sentry, Rollbar)' },
          { checked: false, label: 'Performance monitoring (New Relic, Datadog)' },
          { checked: false, label: 'Uptime monitoring (UptimeRobot, Pingdom)' },
          { checked: false, label: 'Log aggregation (Loggly, Papertrail)' },
        ].map((item, index) => (
          <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded border-border accent-accent" />
            <span className="text-foreground">{item.label}</span>
          </label>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Testing</h2>
      
      <div className="space-y-3 my-6">
        {[
          { checked: false, label: 'All tests passing' },
          { checked: false, label: 'Load testing completed' },
          { checked: false, label: 'Security audit completed' },
          { checked: false, label: 'Penetration testing done' },
        ].map((item, index) => (
          <label key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded border-border accent-accent" />
            <span className="text-foreground">{item.label}</span>
          </label>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Environment Variables</h2>

      <CodeBlock
        code={`# Required Production Variables
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# JWT Keys (generate with scripts/generate-keys.js)
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----..."
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# SMTP
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM="App Name <noreply@yourapp.com>"

# App
FRONTEND_URL=https://yourapp.com
API_PREFIX=api/v1

# Security
CORS_ORIGINS=https://yourapp.com,https://admin.yourapp.com
THROTTLE_TTL=60
THROTTLE_LIMIT=10`}
        language="bash"
        filename=".env.production"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Docker Deployment"
          description="Deploy with Docker containers."
          href="/docs/deployment/docker"
        />
        <LinkCard
          title="Kubernetes Deployment"
          description="Scale with Kubernetes."
          href="/docs/deployment/kubernetes"
        />
      </div>
    </DocsLayout>
  );
}
