import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function ContributingPage() {
  return (
    <DocsLayout
      title="Contributing"
      description="Learn how to contribute to jwise."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Getting Started</h2>
      <CodeBlock
        code={`# Fork and clone the repository
git clone https://github.com/yourusername/jwise.git
cd jwise

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Contribution Guidelines</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
        <li>Fork the repository and create your branch from <code>main</code></li>
        <li>Write clear, descriptive commit messages</li>
        <li>Add tests for any new functionality</li>
        <li>Ensure all tests pass before submitting</li>
        <li>Update documentation as needed</li>
        <li>Follow the existing code style</li>
      </ul>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Pull Request Process</h2>
      <div className="grid gap-4 mb-8">
        {[
          { step: '1', title: 'Create branch', desc: 'git checkout -b feature/my-feature' },
          { step: '2', title: 'Make changes', desc: 'Implement your feature or fix' },
          { step: '3', title: 'Test', desc: 'Run npm test and ensure all pass' },
          { step: '4', title: 'Commit', desc: 'Write clear commit messages' },
          { step: '5', title: 'Push & PR', desc: 'Push and open a pull request' },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
              {item.step}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="info" title="Code of Conduct">
        Please be respectful and constructive in all interactions.
      </Callout>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <LinkCard title="GitHub Repository" description="View source code" href="https://github.com/jwise" />
        <LinkCard title="Discord Community" description="Get help from the community" href="https://discord.gg/jwise" />
      </div>
    </DocsLayout>
  );
}
