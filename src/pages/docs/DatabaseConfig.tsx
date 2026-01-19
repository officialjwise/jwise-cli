import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function DatabaseConfigPage() {
  return (
    <DocsLayout
      title="Database Configuration"
      description="Configure your database connection for different environments."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Supported Databases</h2>

      <div className="grid grid-cols-3 gap-4 my-6">
        {['PostgreSQL', 'MySQL', 'SQLite'].map((db) => (
          <div key={db} className="p-4 rounded-xl border border-border bg-card text-center">
            <p className="font-semibold text-foreground">{db}</p>
            <p className="text-xs text-success mt-1">✓ Supported</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Environment Variables</h2>

      <CodeBlock
        code={`# PostgreSQL (recommended)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# MySQL
DATABASE_URL="mysql://user:password@localhost:3306/mydb"

# SQLite (development only)
DATABASE_URL="file:./dev.db"`}
        language="bash"
        filename=".env"
      />

      <Callout type="warning" title="Production">
        Always use environment variables for database credentials. Never hardcode sensitive information.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Connection Pooling</h2>

      <p className="text-muted-foreground mb-4">
        For production, configure connection pooling to handle multiple concurrent connections:
      </p>

      <CodeBlock
        code={`DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public&connection_limit=10&pool_timeout=30"`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">SSL Configuration</h2>

      <CodeBlock
        code={`# Enable SSL for production databases
DATABASE_URL="postgresql://user:password@host:5432/mydb?sslmode=require"

# With SSL certificate
DATABASE_URL="postgresql://user:password@host:5432/mydb?sslmode=verify-full&sslcert=/path/to/cert.pem"`}
        language="bash"
      />
    </DocsLayout>
  );
}
