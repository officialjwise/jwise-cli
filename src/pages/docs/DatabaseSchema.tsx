import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function DatabaseSchemaPage() {
  return (
    <DocsLayout
      title="Schema Design"
      description="Default database schema and customization options."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Default User Schema</h2>
      <p className="text-muted-foreground mb-6">
        jwise generates a User model with all fields needed for authentication.
      </p>

      <CodeBlock
        code={`// Prisma schema
model User {
  id                String    @id @default(uuid())
  email             String    @unique
  passwordHash      String
  firstName         String?
  lastName          String?
  emailVerified     Boolean   @default(false)
  emailVerifyToken  String?
  passwordResetToken String?
  passwordResetExpires DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  sessions          Session[]
}

model Session {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  deviceInfo  String?
  ipAddress   String?
  lastActive  DateTime @default(now())
  expiresAt   DateTime
  createdAt   DateTime @default(now())
}`}
        language="prisma"
        filename="schema.prisma"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Adding Custom Fields</h2>
      <CodeBlock
        code={`model User {
  // ... existing fields
  
  // Custom fields
  avatar        String?
  role          Role      @default(USER)
  phoneNumber   String?
  preferences   Json?
}

enum Role {
  USER
  ADMIN
  MODERATOR
}`}
        language="prisma"
      />

      <Callout type="info" title="Remember">
        After modifying the schema, run migrations to apply changes to your database.
      </Callout>
    </DocsLayout>
  );
}
