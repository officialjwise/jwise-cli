import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function CliNewPage() {
  return (
    <DocsLayout
      title="jwise new"
      description="Create a new NestJS project with authentication, email, and security pre-configured."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Usage</h2>
      
      <CodeBlock
        code="jwise new <project-name> [options]"
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Arguments</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Argument</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Required</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">project-name</td>
              <td className="py-3 px-4">Yes</td>
              <td className="py-3 px-4">Name of your project (used for directory and package name)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Options</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Option</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Alias</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Default</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--auth</td>
              <td className="py-3 px-4">-a</td>
              <td className="py-3 px-4">false</td>
              <td className="py-3 px-4">Include authentication module</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--database</td>
              <td className="py-3 px-4">-d</td>
              <td className="py-3 px-4">postgres</td>
              <td className="py-3 px-4">Database type (postgres, mysql, sqlite)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--orm</td>
              <td className="py-3 px-4">-o</td>
              <td className="py-3 px-4">prisma</td>
              <td className="py-3 px-4">ORM to use (prisma, typeorm)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--skip-install</td>
              <td className="py-3 px-4">-s</td>
              <td className="py-3 px-4">false</td>
              <td className="py-3 px-4">Skip npm install</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">--skip-git</td>
              <td className="py-3 px-4">-g</td>
              <td className="py-3 px-4">false</td>
              <td className="py-3 px-4">Skip git initialization</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">--package-manager</td>
              <td className="py-3 px-4">-p</td>
              <td className="py-3 px-4">npm</td>
              <td className="py-3 px-4">Package manager (npm, yarn, pnpm)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Examples</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Basic project with authentication</h3>
      <CodeBlock
        code="jwise new my-app --auth"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">PostgreSQL with Prisma (recommended)</h3>
      <CodeBlock
        code="jwise new my-app --auth -d postgres -o prisma"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">MySQL with TypeORM</h3>
      <CodeBlock
        code="jwise new my-app --auth -d mysql -o typeorm"
        language="bash"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Using Yarn, skip npm install</h3>
      <CodeBlock
        code="jwise new my-app --auth -p yarn --skip-install"
        language="bash"
      />

      <Callout type="tip" title="Quick Tip">
        For production projects, we recommend using PostgreSQL with Prisma ORM for the best developer experience.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Generated Project Structure</h2>

      <CodeBlock
        code={`my-app/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   ├── guards/
│   │   └── strategies/
│   ├── mail/
│   │   ├── mail.module.ts
│   │   ├── mail.service.ts
│   │   └── templates/
│   ├── prisma/
│   │   └── prisma.service.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── guards/
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── scripts/
│   └── generate-keys.js
├── test/
├── .env.example
├── package.json
└── tsconfig.json`}
        language="text"
        filename="Project Structure"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">What's Included</h2>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { title: 'Authentication', desc: '11 secure API endpoints' },
          { title: 'Email Service', desc: '4 professional templates' },
          { title: 'Security', desc: 'OWASP compliant setup' },
          { title: 'Database', desc: 'Prisma or TypeORM configured' },
          { title: 'Testing', desc: 'Jest + E2E test setup' },
          { title: 'DevOps', desc: 'Docker & CI/CD ready' },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Quick Start Guide"
          description="Complete setup walkthrough."
          href="/docs/getting-started/quick-start"
        />
        <LinkCard
          title="jwise add"
          description="Add modules to existing projects."
          href="/docs/cli/add"
        />
      </div>
    </DocsLayout>
  );
}
