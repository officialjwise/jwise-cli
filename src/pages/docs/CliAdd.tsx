import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CliAddPage() {
  return (
    <DocsLayout
      title="jwise add"
      description="Add modules to an existing jwise project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Usage</h2>
      <CodeBlock code="jwise add <module> [options]" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Available Modules</h2>

      <div className="grid gap-4 mb-8">
        {[
          { name: 'auth', desc: 'Complete authentication system' },
          { name: 'email', desc: 'Email service with templates' },
          { name: 'prisma', desc: 'Prisma ORM setup' },
          { name: 'typeorm', desc: 'TypeORM setup' },
          { name: 'docker', desc: 'Docker configuration' },
        ].map((mod) => (
          <div key={mod.name} className="p-4 rounded-lg border border-border bg-card">
            <code className="text-accent font-semibold">{mod.name}</code>
            <p className="text-sm text-muted-foreground mt-1">{mod.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Examples</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Add Auth to Existing Project</h3>
      <CodeBlock code="jwise add auth" language="bash" />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Add Email Service</h3>
      <CodeBlock code="jwise add email" language="bash" />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Add Prisma</h3>
      <CodeBlock code="jwise add prisma --database postgres" language="bash" />

      <Callout type="info" title="Dependencies">
        Modules automatically install required dependencies.
      </Callout>
    </DocsLayout>
  );
}
