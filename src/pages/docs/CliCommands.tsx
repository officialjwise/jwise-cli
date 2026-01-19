import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, LinkCard } from '@/components/DocsComponents';

export default function CliCommandsPage() {
  return (
    <DocsLayout
      title="CLI Commands"
      description="Complete reference for all jwise CLI commands and options."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Available Commands</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Command</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">jwise new</td>
              <td className="py-3 px-4">Create a new NestJS project</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">jwise add</td>
              <td className="py-3 px-4">Add a module to existing project</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">jwise generate</td>
              <td className="py-3 px-4">Generate resources (CRUD)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">jwise doctor</td>
              <td className="py-3 px-4">Check project health</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">jwise --help</td>
              <td className="py-3 px-4">Show help information</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">jwise new</h2>
      <CodeBlock code="jwise new <project-name> [options]" language="bash" />
      <p className="text-muted-foreground mb-4">Creates a new NestJS project with optional authentication.</p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">jwise add</h2>
      <CodeBlock code="jwise add <module> [options]" language="bash" />
      <p className="text-muted-foreground mb-4">Adds a module to an existing project.</p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">jwise generate</h2>
      <CodeBlock code="jwise generate resource <name>" language="bash" />
      <p className="text-muted-foreground mb-4">Generates CRUD resources with controller, service, and DTOs.</p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">jwise doctor</h2>
      <CodeBlock code="jwise doctor" language="bash" />
      <p className="text-muted-foreground mb-4">Checks your project for common issues and suggests fixes.</p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Command Details</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard title="jwise new" description="Create new projects" href="/docs/cli/new" />
        <LinkCard title="jwise add" description="Add modules" href="/docs/cli/add" />
        <LinkCard title="jwise generate" description="Generate resources" href="/docs/cli/generate" />
        <LinkCard title="jwise doctor" description="Project health check" href="/docs/cli/doctor" />
      </div>
    </DocsLayout>
  );
}
