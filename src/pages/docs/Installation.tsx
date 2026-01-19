import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function InstallationPage() {
  return (
    <DocsLayout
      title="Installation"
      description="Install jwise CLI on your system and start building production-ready NestJS backends."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">System Requirements</h2>
      
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
        <li>Node.js version 18.0 or higher</li>
        <li>npm, yarn, or pnpm package manager</li>
        <li>PostgreSQL 13+ (recommended) or MySQL 8+</li>
        <li>Git (optional, for version control)</li>
      </ul>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Install with npm</h2>
      <CodeBlock code="npm install -g jwise" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Install with Yarn</h2>
      <CodeBlock code="yarn global add jwise" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Install with pnpm</h2>
      <CodeBlock code="pnpm add -g jwise" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Verify Installation</h2>
      <p className="text-muted-foreground mb-4">
        After installation, verify that jwise is installed correctly by checking the version:
      </p>
      <CodeBlock
        code={`jwise --version
# Output: jwise v1.0.0`}
        language="bash"
      />

      <Callout type="tip" title="Quick Tip">
        If you get a "command not found" error, ensure your global npm/yarn/pnpm bin directory is in your PATH.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Upgrade jwise</h2>
      <p className="text-muted-foreground mb-4">
        To upgrade to the latest version:
      </p>
      <CodeBlock code="npm update -g jwise" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Quick Start"
          description="Create your first project in under 5 minutes."
          href="/docs/getting-started/quick-start"
        />
        <LinkCard
          title="CLI Commands"
          description="Learn all available jwise commands."
          href="/docs/getting-started/cli-commands"
        />
      </div>
    </DocsLayout>
  );
}
