import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function ProjectStructurePage() {
  return (
    <DocsLayout
      title="Project Structure"
      description="Understanding the directory structure of a jwise-generated project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Directory Overview</h2>

      <CodeBlock
        code={`my-app/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts      # Auth endpoints
│   │   ├── auth.module.ts          # Module definition
│   │   ├── auth.service.ts         # Business logic
│   │   ├── dto/
│   │   │   ├── signup.dto.ts       # Registration DTO
│   │   │   ├── login.dto.ts        # Login DTO
│   │   │   └── ...
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts   # JWT authentication
│   │   │   └── roles.guard.ts      # Role-based access
│   │   └── strategies/
│   │       ├── jwt.strategy.ts     # JWT validation
│   │       └── refresh.strategy.ts # Refresh token
│   │
│   ├── mail/
│   │   ├── mail.module.ts          # Email module
│   │   ├── mail.service.ts         # Email sending logic
│   │   └── templates/
│   │       ├── verification.hbs    # Email verification
│   │       ├── reset-password.hbs  # Password reset
│   │       ├── welcome.hbs         # Welcome email
│   │       └── password-changed.hbs
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts        # Prisma module
│   │   └── prisma.service.ts       # Database service
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts  # @Roles() decorator
│   │   │   └── user.decorator.ts   # @CurrentUser()
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   └── guards/
│   │       └── throttle.guard.ts   # Rate limiting
│   │
│   ├── app.module.ts               # Root module
│   └── main.ts                     # Entry point
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Database migrations
│
├── scripts/
│   └── generate-keys.js            # RSA key generator
│
├── test/
│   ├── app.e2e-spec.ts             # E2E tests
│   └── jest-e2e.json               # Jest config
│
├── .env.example                    # Environment template
├── package.json
├── tsconfig.json
└── nest-cli.json`}
        language="text"
        filename="Project Structure"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Key Directories</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">src/auth/</h3>
      <p className="text-muted-foreground mb-4">
        Contains all authentication-related code including controllers, services, DTOs, guards, and strategies.
      </p>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">src/mail/</h3>
      <p className="text-muted-foreground mb-4">
        Email service with Handlebars templates for verification, password reset, and welcome emails.
      </p>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">src/prisma/</h3>
      <p className="text-muted-foreground mb-4">
        Prisma ORM service providing database connectivity throughout the application.
      </p>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">src/common/</h3>
      <p className="text-muted-foreground mb-4">
        Shared utilities including decorators, filters, and guards used across modules.
      </p>

      <Callout type="tip" title="Best Practice">
        Keep the generated structure intact. Add new modules in separate directories following the same pattern.
      </Callout>
    </DocsLayout>
  );
}
