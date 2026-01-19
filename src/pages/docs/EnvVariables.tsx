import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function EnvVariablesPage() {
  return (
    <DocsLayout
      title="Environment Variables"
      description="Complete reference for all environment variables used in jwise projects."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Required Variables</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Variable</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Example</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">DATABASE_URL</td>
              <td className="py-3 px-4">Database connection string</td>
              <td className="py-3 px-4 font-mono text-xs">postgresql://...</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">JWT_PRIVATE_KEY</td>
              <td className="py-3 px-4">RSA private key for signing</td>
              <td className="py-3 px-4 font-mono text-xs">-----BEGIN PRIVATE KEY-----</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">JWT_PUBLIC_KEY</td>
              <td className="py-3 px-4">RSA public key for verification</td>
              <td className="py-3 px-4 font-mono text-xs">-----BEGIN PUBLIC KEY-----</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">FRONTEND_URL</td>
              <td className="py-3 px-4">Frontend URL for email links</td>
              <td className="py-3 px-4 font-mono text-xs">https://myapp.com</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Complete .env Template</h2>

      <CodeBlock
        code={`# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# JWT Configuration
JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----..."
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="My App <noreply@myapp.com>"

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000

# Security
CORS_ORIGINS=http://localhost:3000
THROTTLE_TTL=60
THROTTLE_LIMIT=10`}
        language="bash"
        filename=".env.example"
      />

      <Callout type="warning" title="Security">
        Never commit your .env file to version control. Use .env.example as a template.
      </Callout>
    </DocsLayout>
  );
}
