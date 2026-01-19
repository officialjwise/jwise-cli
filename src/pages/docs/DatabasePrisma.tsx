import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function DatabasePrismaPage() {
  return (
    <DocsLayout
      title="Prisma Setup"
      description="Configure Prisma ORM for your jwise-generated NestJS backend."
    >
      <Callout type="tip" title="Recommended">
        Prisma is the default and recommended ORM for jwise projects. It provides excellent TypeScript support, migrations, and developer experience.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Generated Schema</h2>
      
      <p className="text-muted-foreground mb-4">
        When you create a project with <code className="px-1.5 py-0.5 rounded bg-muted text-sm">jwise new --auth -o prisma</code>, the following schema is generated:
      </p>

      <CodeBlock
        code={`// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String
  name          String
  role          Role      @default(USER)
  emailVerified Boolean   @default(false)
  isActive      Boolean   @default(true)
  failedLogins  Int       @default(0)
  lockedUntil   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  sessions      Session[]
  tokens        Token[]
  authEvents    AuthEvent[]
}

enum Role {
  USER
  ADMIN
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  deviceInfo   String?
  ipAddress    String?
  lastActivity DateTime @default(now())
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  @@index([userId])
}

model Token {
  id        String    @id @default(uuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      TokenType
  token     String    @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())

  @@index([userId])
  @@index([token])
}

enum TokenType {
  EMAIL_VERIFICATION
  PASSWORD_RESET
  REFRESH
}

model AuthEvent {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      String
  ipAddress String?
  userAgent String?
  metadata  Json?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([type])
}`}
        language="prisma"
        filename="prisma/schema.prisma"
        showLineNumbers
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Database Connection</h2>

      <p className="text-muted-foreground mb-4">
        Configure your database connection in the <code className="px-1.5 py-0.5 rounded bg-muted text-sm">.env</code> file:
      </p>

      <CodeBlock
        code={`# PostgreSQL (Recommended)
DATABASE_URL="postgresql://username:password@localhost:5432/myapp?schema=public"

# MySQL
DATABASE_URL="mysql://username:password@localhost:3306/myapp"

# SQLite (Development only)
DATABASE_URL="file:./dev.db"`}
        language="bash"
        filename=".env"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Running Migrations</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Create Initial Migration</h3>
      <CodeBlock
        code="npx prisma migrate dev --name init"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Apply Migrations in Production</h3>
      <CodeBlock
        code="npx prisma migrate deploy"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Generate Prisma Client</h3>
      <CodeBlock
        code="npx prisma generate"
        language="bash"
      />

      <Callout type="info">
        Prisma Client is automatically regenerated when you run migrations. You only need to run <code className="px-1 py-0.5 rounded bg-muted text-xs">prisma generate</code> manually after cloning a project or updating the schema.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Prisma Service</h2>

      <p className="text-muted-foreground mb-4">
        jwise generates a Prisma service that handles connection lifecycle:
      </p>

      <CodeBlock
        code={`// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService 
  extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {
  
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}`}
        language="typescript"
        filename="prisma.service.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Using Prisma in Services</h2>

      <CodeBlock
        code={`// Example: Finding a user
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { sessions: true },
    });
  }

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
      },
    });
  }
}`}
        language="typescript"
        filename="user.service.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Prisma Studio</h2>

      <p className="text-muted-foreground mb-4">
        Use Prisma Studio to browse and edit your data visually:
      </p>

      <CodeBlock code="npx prisma studio" language="bash" />

      <p className="text-sm text-muted-foreground mt-4">
        Opens a visual database browser at <code className="px-1.5 py-0.5 rounded bg-muted text-sm">http://localhost:5555</code>
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Database Migrations"
          description="Learn advanced migration strategies."
          href="/docs/database/migrations"
        />
        <LinkCard
          title="Schema Design"
          description="Best practices for schema design."
          href="/docs/database/schema"
        />
      </div>
    </DocsLayout>
  );
}
