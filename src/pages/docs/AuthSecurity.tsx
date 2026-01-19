import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthSecurityPage() {
  return (
    <DocsLayout
      title="Security Best Practices"
      description="Security features and best practices in jwise authentication."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Built-in Security</h2>
      
      <div className="grid gap-4 mb-8">
        {[
          { title: 'Password Hashing', desc: 'bcrypt with configurable salt rounds' },
          { title: 'JWT with RS256', desc: 'Asymmetric signing for secure tokens' },
          { title: 'Token Rotation', desc: 'Refresh tokens rotated on each use' },
          { title: 'Rate Limiting', desc: 'Protect against brute force attacks' },
          { title: 'CORS Configuration', desc: 'Restrict allowed origins' },
          { title: 'Input Validation', desc: 'All inputs validated with class-validator' },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-lg border border-border bg-card">
            <h4 className="font-semibold text-foreground">{item.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Rate Limiting Configuration</h2>
      <CodeBlock
        code={`# .env
THROTTLE_TTL=60      # Time window in seconds
THROTTLE_LIMIT=10    # Max requests per window`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">CORS Configuration</h2>
      <CodeBlock
        code={`# .env
CORS_ORIGINS=https://myapp.com,https://admin.myapp.com`}
        language="bash"
      />

      <Callout type="warning" title="Production">
        Always use HTTPS in production and set restrictive CORS origins.
      </Callout>
    </DocsLayout>
  );
}
