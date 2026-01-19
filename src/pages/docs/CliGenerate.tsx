import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CliGeneratePage() {
  return (
    <DocsLayout
      title="jwise generate"
      description="Generate resources and code with the jwise CLI."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Usage</h2>
      <CodeBlock code="jwise generate <type> <name> [options]" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Generate Types</h2>

      <div className="grid gap-4 mb-8">
        {[
          { name: 'resource', desc: 'Complete CRUD module', alias: 'res' },
          { name: 'controller', desc: 'Controller only', alias: 'co' },
          { name: 'service', desc: 'Service only', alias: 's' },
          { name: 'module', desc: 'Module only', alias: 'mo' },
          { name: 'dto', desc: 'DTO files', alias: 'd' },
        ].map((type) => (
          <div key={type.name} className="p-4 rounded-lg border border-border bg-card flex justify-between items-center">
            <div>
              <code className="text-accent font-semibold">{type.name}</code>
              <p className="text-sm text-muted-foreground mt-1">{type.desc}</p>
            </div>
            <span className="text-xs text-muted-foreground font-mono">alias: {type.alias}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Examples</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Generate CRUD Resource</h3>
      <CodeBlock
        code={`jwise generate resource posts

# Creates:
# src/posts/posts.module.ts
# src/posts/posts.controller.ts
# src/posts/posts.service.ts
# src/posts/dto/create-post.dto.ts
# src/posts/dto/update-post.dto.ts
# src/posts/entities/post.entity.ts`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Generate with Options</h3>
      <CodeBlock code="jwise generate resource comments --no-spec --flat" language="bash" />

      <Callout type="tip" title="Tip">
        Use <code>--dry-run</code> to preview what files will be created.
      </Callout>
    </DocsLayout>
  );
}
