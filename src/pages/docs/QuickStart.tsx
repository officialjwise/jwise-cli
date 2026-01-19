import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, Step, LinkCard } from '@/components/DocsComponents';

export default function QuickStartPage() {
  return (
    <DocsLayout
      title="Quick Start"
      description="Get your production-ready NestJS backend running in under 5 minutes."
    >
      <Callout type="info" title="Prerequisites">
        Before you begin, make sure you have Node.js v18+ and PostgreSQL installed on your machine.
      </Callout>

      <Step number={1} title="Install jwise CLI">
        <p className="mb-4">Install jwise CLI globally using your preferred package manager:</p>
        <CodeBlock
          code={`# npm
npm install -g jwise

# yarn
yarn global add jwise

# pnpm
pnpm add -g jwise`}
          language="bash"
        />
      </Step>

      <Step number={2} title="Create Your First Project">
        <p className="mb-4">
          Generate a new NestJS project with authentication pre-configured:
        </p>
        <CodeBlock
          code={`jwise new my-awesome-app --auth -d postgres -o prisma`}
          language="bash"
        />
        <p className="mt-4 text-sm">
          This command creates a new project with:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
          <li>Complete authentication module (JWT + refresh tokens)</li>
          <li>PostgreSQL database with Prisma ORM</li>
          <li>Email service with templates</li>
          <li>Security middleware (Helmet, CORS, rate limiting)</li>
        </ul>
      </Step>

      <Step number={3} title="Configure Environment">
        <p className="mb-4">Navigate to your project and set up environment variables:</p>
        <CodeBlock
          code={`cd my-awesome-app
cp .env.example .env`}
          language="bash"
        />
        <p className="mt-4 text-sm">
          Edit the <code className="px-1.5 py-0.5 rounded bg-muted text-sm">.env</code> file with your database credentials and SMTP settings.
        </p>
      </Step>

      <Step number={4} title="Generate RSA Keys">
        <p className="mb-4">Generate secure RSA keys for JWT signing:</p>
        <CodeBlock
          code={`node scripts/generate-keys.js`}
          language="bash"
        />
        <Callout type="warning">
          Never commit your private keys to version control. The <code>.env</code> file should be in your <code>.gitignore</code>.
        </Callout>
      </Step>

      <Step number={5} title="Run Database Migrations">
        <p className="mb-4">Initialize your database schema:</p>
        <CodeBlock
          code={`npx prisma migrate dev --name init`}
          language="bash"
        />
      </Step>

      <Step number={6} title="Start Development Server">
        <p className="mb-4">Launch your backend server:</p>
        <CodeBlock code={`npm run start:dev`} language="bash" />
        <p className="mt-4 text-sm">
          Your API is now running at{' '}
          <code className="px-1.5 py-0.5 rounded bg-muted text-sm">http://localhost:3000</code>
        </p>
      </Step>

      <Step number={7} title="Test Your API">
        <p className="mb-4">Register your first user:</p>
        <CodeBlock
          code={`curl -X POST http://localhost:3000/api/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "name": "Test User"
  }'`}
          language="bash"
          filename="Terminal"
        />
      </Step>

      <Callout type="tip" title="What's Next?">
        Congratulations! You've set up your production-ready backend. Explore these guides to learn more:
      </Callout>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Authentication Guide"
          description="Learn about JWT tokens, refresh rotation, and session management."
          href="/docs/authentication/overview"
        />
        <LinkCard
          title="Email Configuration"
          description="Set up SMTP providers and customize email templates."
          href="/docs/email/overview"
        />
        <LinkCard
          title="API Reference"
          description="Explore all 11 authentication endpoints in detail."
          href="/docs/api/overview"
        />
        <LinkCard
          title="Deployment Guide"
          description="Deploy your backend to production with Docker or Kubernetes."
          href="/docs/deployment/checklist"
        />
      </div>
    </DocsLayout>
  );
}
