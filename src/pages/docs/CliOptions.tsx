import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock } from '@/components/DocsComponents';

export default function CliOptionsPage() {
  return (
    <DocsLayout
      title="Command Options"
      description="Complete reference for jwise CLI options and flags."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Global Options</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Option</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--help, -h</td>
              <td className="py-3 px-4">Show help information</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--version, -v</td>
              <td className="py-3 px-4">Show version number</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--verbose</td>
              <td className="py-3 px-4">Enable verbose output</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">--no-color</td>
              <td className="py-3 px-4">Disable colored output</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">jwise new Options</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Option</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--auth</td>
              <td className="py-3 px-4">Include authentication module</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--orm &lt;type&gt;</td>
              <td className="py-3 px-4">ORM to use (prisma | typeorm)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--database &lt;type&gt;</td>
              <td className="py-3 px-4">Database type (postgres | mysql | sqlite)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--docker</td>
              <td className="py-3 px-4">Include Docker configuration</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">--skip-install</td>
              <td className="py-3 px-4">Skip npm install</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">jwise generate Options</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Option</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--dry-run</td>
              <td className="py-3 px-4">Preview without creating files</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--no-spec</td>
              <td className="py-3 px-4">Skip test file generation</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">--flat</td>
              <td className="py-3 px-4">Generate without subdirectory</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Example</h2>
      <CodeBlock
        code={`# Create project with all options
jwise new my-api --auth --orm prisma --database postgres --docker`}
        language="bash"
      />
    </DocsLayout>
  );
}
