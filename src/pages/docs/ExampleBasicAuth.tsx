import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, Step, LinkCard } from '@/components/DocsComponents';

export default function ExampleBasicAuthPage() {
  return (
    <DocsLayout
      title="Basic Auth App Example"
      description="Build a simple authentication app with jwise CLI in under 10 minutes."
    >
      <Callout type="info">
        This example demonstrates a minimal backend with user registration, login, and protected routes.
      </Callout>

      <Step number={1} title="Create the Project">
        <CodeBlock
          code={`jwise new auth-demo --auth -d postgres -o prisma
cd auth-demo`}
          language="bash"
        />
      </Step>

      <Step number={2} title="Configure Environment">
        <p className="mb-4">Update your <code className="px-1.5 py-0.5 rounded bg-muted text-sm">.env</code> file:</p>
        <CodeBlock
          code={`DATABASE_URL="postgresql://postgres:password@localhost:5432/auth_demo"
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
FRONTEND_URL=http://localhost:3001`}
          language="bash"
          filename=".env"
        />
      </Step>

      <Step number={3} title="Generate JWT Keys">
        <CodeBlock code="node scripts/generate-keys.js" language="bash" />
      </Step>

      <Step number={4} title="Run Migrations">
        <CodeBlock code="npx prisma migrate dev --name init" language="bash" />
      </Step>

      <Step number={5} title="Start the Server">
        <CodeBlock code="npm run start:dev" language="bash" />
        <p className="mt-4 text-sm">Server running at <code className="px-1.5 py-0.5 rounded bg-muted text-sm">http://localhost:3000</code></p>
      </Step>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Testing the API</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">1. Register a User</h3>
      <CodeBlock
        code={`curl -X POST http://localhost:3000/api/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "demo@example.com",
    "password": "Demo123!@#",
    "name": "Demo User"
  }'`}
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">2. Login</h3>
      <CodeBlock
        code={`curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "demo@example.com",
    "password": "Demo123!@#"
  }'`}
        language="bash"
      />

      <p className="text-sm text-muted-foreground mt-4">
        Save the <code className="px-1.5 py-0.5 rounded bg-muted text-sm">accessToken</code> from the response.
      </p>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">3. Access Protected Route</h3>
      <CodeBlock
        code={`curl http://localhost:3000/api/v1/auth/me \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">4. Refresh Token</h3>
      <CodeBlock
        code={`curl -X POST http://localhost:3000/api/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'`}
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">5. Logout</h3>
      <CodeBlock
        code={`curl -X POST http://localhost:3000/api/v1/auth/logout \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Project Structure</h2>

      <CodeBlock
        code={`auth-demo/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts    # 11 endpoints
│   │   ├── auth.service.ts       # Business logic
│   │   ├── auth.module.ts
│   │   ├── dto/                  # Validation DTOs
│   │   ├── guards/               # JWT & Roles guards
│   │   └── strategies/           # Passport strategies
│   ├── mail/
│   │   ├── mail.service.ts       # Email sending
│   │   └── templates/            # 4 HTML templates
│   ├── prisma/
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma             # Database schema
├── scripts/
│   └── generate-keys.js          # RSA key generator
└── test/
    └── auth.e2e-spec.ts          # E2E tests`}
        language="text"
        filename="Project Structure"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Adding Custom Routes</h2>

      <p className="text-muted-foreground mb-4">
        Add a protected route that requires authentication:
      </p>

      <CodeBlock
        code={`// src/app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CurrentUser } from './auth/decorators/current-user.decorator';

@Controller()
export class AppController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user) {
    return {
      message: 'This is a protected route',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}`}
        language="typescript"
        filename="app.controller.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Full-Stack Example"
          description="Add a React frontend to this backend."
          href="/docs/examples/fullstack"
        />
        <LinkCard
          title="Microservices Example"
          description="Scale to a microservices architecture."
          href="/docs/examples/microservices"
        />
      </div>
    </DocsLayout>
  );
}
