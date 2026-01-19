import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function DatabaseMigrationsPage() {
  return (
    <DocsLayout
      title="Database Migrations"
      description="Manage database schema changes with migrations."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Prisma Migrations</h2>
      
      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Create Migration</h3>
      <CodeBlock
        code={`npx prisma migrate dev --name add_user_avatar`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Apply in Production</h3>
      <CodeBlock
        code={`npx prisma migrate deploy`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">TypeORM Migrations</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Generate Migration</h3>
      <CodeBlock
        code={`npm run typeorm migration:generate -- -n AddUserAvatar`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Run Migrations</h3>
      <CodeBlock
        code={`npm run typeorm migration:run`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Revert Migration</h3>
      <CodeBlock
        code={`npm run typeorm migration:revert`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Migration Best Practices</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
        <li>Always test migrations on a copy of production data</li>
        <li>Keep migrations small and focused</li>
        <li>Never modify already-applied migrations</li>
        <li>Include both up and down migrations</li>
        <li>Back up your database before running migrations</li>
      </ul>

      <Callout type="warning" title="Production">
        Always run migrations in a maintenance window and have a rollback plan.
      </Callout>
    </DocsLayout>
  );
}
