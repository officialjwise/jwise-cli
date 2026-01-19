import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function TroubleshootingDatabasePage() {
  return (
    <DocsLayout
      title="Database Issues"
      description="Troubleshoot common database problems."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Connection Issues</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Check Connection</h3>
      <CodeBlock
        code={`# Test connection with psql
psql $DATABASE_URL

# Or with Prisma
npx prisma db pull`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Common Connection Errors</h3>
      <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
        <li><strong>ECONNREFUSED:</strong> Database server not running</li>
        <li><strong>ENOTFOUND:</strong> Invalid hostname</li>
        <li><strong>28P01:</strong> Invalid password</li>
        <li><strong>3D000:</strong> Database doesn't exist</li>
      </ul>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Migration Issues</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Reset Database (Development Only)</h3>
      <CodeBlock
        code={`# Prisma
npx prisma migrate reset

# TypeORM
npm run schema:drop
npm run migration:run`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Fix Drift</h3>
      <CodeBlock
        code={`# Create migration from current state
npx prisma migrate dev --name fix_drift`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Performance Issues</h2>
      <CodeBlock
        code={`# Add indexes for frequently queried columns
model User {
  email String @unique
  
  @@index([createdAt])
}`}
        language="prisma"
      />

      <Callout type="warning" title="Production">
        Never use <code>migrate reset</code> in production. Always use <code>migrate deploy</code>.
      </Callout>
    </DocsLayout>
  );
}
