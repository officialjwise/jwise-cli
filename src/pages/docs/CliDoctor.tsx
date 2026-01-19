import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CliDoctorPage() {
  return (
    <DocsLayout
      title="jwise doctor"
      description="Diagnose and fix common issues in your jwise project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Usage</h2>
      <CodeBlock code="jwise doctor [options]" language="bash" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">What it Checks</h2>

      <div className="grid gap-4 mb-8">
        {[
          { check: 'Dependencies', desc: 'Verifies all required packages are installed' },
          { check: 'Environment', desc: 'Validates .env configuration' },
          { check: 'Database', desc: 'Tests database connection' },
          { check: 'JWT Keys', desc: 'Validates RSA key pair' },
          { check: 'SMTP', desc: 'Tests email configuration' },
          { check: 'TypeScript', desc: 'Checks for compilation errors' },
        ].map((item) => (
          <div key={item.check} className="p-4 rounded-lg border border-border bg-card">
            <h4 className="font-semibold text-foreground">{item.check}</h4>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Example Output</h2>
      <CodeBlock
        code={`$ jwise doctor

🔍 Running diagnostics...

✅ Dependencies: All packages installed
✅ Environment: .env file found
✅ Database: Connection successful
⚠️  JWT Keys: Using default development keys
✅ SMTP: Configuration valid
✅ TypeScript: No errors

📋 Summary: 5 passed, 1 warning, 0 errors

⚠️  Warnings:
   - Generate production JWT keys before deployment`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Options</h2>
      <CodeBlock
        code={`jwise doctor --fix        # Attempt to fix issues automatically
jwise doctor --verbose    # Show detailed output
jwise doctor --json       # Output as JSON`}
        language="bash"
      />

      <Callout type="tip" title="CI/CD">
        Run <code>jwise doctor --json</code> in CI pipelines for automated checks.
      </Callout>
    </DocsLayout>
  );
}
