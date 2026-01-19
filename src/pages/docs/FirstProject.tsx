import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function FirstProjectPage() {
  return (
    <DocsLayout
      title="Your First Project"
      description="A complete walkthrough of building your first production-ready NestJS backend with jwise."
    >
      <Callout type="info" title="What You'll Build">
        By the end of this guide, you'll have a fully functional backend with user authentication, email verification, and secure API endpoints.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Project Overview</h2>
      
      <p className="text-muted-foreground mb-6">
        We'll build a complete user management system with the following features:
      </p>

      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
        <li>User registration with email verification</li>
        <li>Secure login with JWT tokens</li>
        <li>Password reset functionality</li>
        <li>Multi-device session management</li>
        <li>Protected API endpoints</li>
      </ul>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Step 1: Create the Project</h2>

      <CodeBlock
        code={`jwise new user-management --auth -d postgres -o prisma`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Step 2: Explore the Structure</h2>

      <CodeBlock
        code={`user-management/
├── src/
│   ├── auth/           # Authentication module
│   ├── mail/           # Email service
│   ├── prisma/         # Database service
│   ├── common/         # Shared utilities
│   └── main.ts         # Application entry
├── prisma/
│   └── schema.prisma   # Database schema
├── scripts/
│   └── generate-keys.js
└── .env.example`}
        language="text"
        filename="Project Structure"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Step 3: Understanding the Auth Flow</h2>

      <CodeBlock
        code={`┌─────────────────────────────────────────────────────┐
│                    User Registration                 │
├─────────────────────────────────────────────────────┤
│  1. User submits email, password, name              │
│  2. Password hashed with Argon2id                   │
│  3. User saved to database                          │
│  4. Verification email sent                         │
│  5. JWT tokens returned                             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    Email Verification               │
├─────────────────────────────────────────────────────┤
│  1. User clicks verification link                   │
│  2. Token validated                                 │
│  3. emailVerified set to true                       │
│  4. Welcome email sent                              │
└─────────────────────────────────────────────────────┘`}
        language="text"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Step 4: Test the Endpoints</h2>

      <CodeBlock
        code={`# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com", "password": "SecurePass123!", "name": "Test User"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com", "password": "SecurePass123!"}'

# Access protected route
curl http://localhost:3000/api/v1/auth/me \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}
        language="bash"
        filename="Terminal"
      />

      <Callout type="tip" title="Next Steps">
        Your first project is ready! Continue exploring these topics:
      </Callout>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Authentication Deep Dive"
          description="Learn about JWT tokens and session management."
          href="/docs/authentication/overview"
        />
        <LinkCard
          title="Email Configuration"
          description="Set up SMTP and customize templates."
          href="/docs/email/overview"
        />
      </div>
    </DocsLayout>
  );
}
