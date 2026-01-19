import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function OrmSupportPage() {
  return (
    <DocsLayout
      title="ORM Support"
      description="jwise supports both Prisma and TypeORM for database operations."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Supported ORMs</h2>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xl font-bold text-foreground mb-2">Prisma</h3>
          <p className="text-sm text-success mb-3">✓ Recommended</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Type-safe database queries</li>
            <li>• Auto-generated client</li>
            <li>• Intuitive schema language</li>
            <li>• Excellent DX</li>
          </ul>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-xl font-bold text-foreground mb-2">TypeORM</h3>
          <p className="text-sm text-muted-foreground mb-3">Supported</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Decorator-based entities</li>
            <li>• Active Record & Data Mapper</li>
            <li>• Mature ecosystem</li>
            <li>• Familiar to many devs</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Choosing an ORM</h2>

      <CodeBlock
        code={`# Use Prisma (recommended)
jwise new my-app --auth -o prisma

# Use TypeORM
jwise new my-app --auth -o typeorm`}
        language="bash"
      />

      <Callout type="tip" title="Our Recommendation">
        We recommend Prisma for new projects due to its superior TypeScript support and developer experience.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Feature Comparison</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Feature</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Prisma</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">TypeORM</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4">Type Safety</td>
              <td className="py-3 px-4 text-success">Excellent</td>
              <td className="py-3 px-4">Good</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Schema Definition</td>
              <td className="py-3 px-4">Prisma Schema</td>
              <td className="py-3 px-4">Decorators</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Migrations</td>
              <td className="py-3 px-4 text-success">Auto-generated</td>
              <td className="py-3 px-4">Manual/Auto</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Learning Curve</td>
              <td className="py-3 px-4 text-success">Easy</td>
              <td className="py-3 px-4">Moderate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard title="Prisma Setup" description="Detailed Prisma configuration" href="/docs/database/prisma" />
        <LinkCard title="TypeORM Setup" description="Detailed TypeORM configuration" href="/docs/database/typeorm" />
      </div>
    </DocsLayout>
  );
}
