import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function EmailOverviewPage() {
  return (
    <DocsLayout
      title="Email Service Overview"
      description="Professional email service with pre-built templates for verification, password reset, and more."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Features</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
        {[
          'SMTP Integration',
          'HTML Templates',
          'Verification Emails',
          'Password Reset',
          'Welcome Emails',
          'Custom Templates',
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 text-success text-sm"
          >
            <span>✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Included Templates</h2>
      
      <p className="text-muted-foreground mb-6">
        jwise generates 4 professional email templates out of the box:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Template</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Trigger</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Variables</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-medium text-foreground">Email Verification</td>
              <td className="py-3 px-4">User signup</td>
              <td className="py-3 px-4"><code className="text-xs">{'{{name}}, {{verifyUrl}}'}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-medium text-foreground">Password Reset</td>
              <td className="py-3 px-4">Forgot password request</td>
              <td className="py-3 px-4"><code className="text-xs">{'{{name}}, {{resetUrl}}'}</code></td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-medium text-foreground">Welcome</td>
              <td className="py-3 px-4">Email verified</td>
              <td className="py-3 px-4"><code className="text-xs">{'{{name}}'}</code></td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-foreground">Password Changed</td>
              <td className="py-3 px-4">Password update</td>
              <td className="py-3 px-4"><code className="text-xs">{'{{name}}, {{date}}'}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Configuration</h2>

      <p className="text-muted-foreground mb-4">
        Configure your SMTP settings in the <code className="px-1.5 py-0.5 rounded bg-muted text-sm">.env</code> file:
      </p>

      <CodeBlock
        code={`# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="My App <noreply@myapp.com>"`}
        language="bash"
        filename=".env"
      />

      <Callout type="warning" title="Gmail Users">
        If using Gmail, you need to create an App Password. Regular passwords won't work with 2FA enabled.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Supported Providers</h2>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {[
          { name: 'Gmail', status: '✓ Tested' },
          { name: 'SendGrid', status: '✓ Tested' },
          { name: 'AWS SES', status: '✓ Tested' },
          { name: 'Mailgun', status: '✓ Tested' },
          { name: 'Mailtrap', status: '✓ Tested' },
          { name: 'Custom SMTP', status: '✓ Supported' },
        ].map((provider) => (
          <div
            key={provider.name}
            className="p-4 rounded-xl border border-border bg-card text-center"
          >
            <p className="font-semibold text-foreground">{provider.name}</p>
            <p className="text-xs text-success mt-1">{provider.status}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="SMTP Configuration"
          description="Detailed setup for each email provider."
          href="/docs/email/smtp-config"
        />
        <LinkCard
          title="Custom Templates"
          description="Create and customize your own email templates."
          href="/docs/email/customizing"
        />
      </div>
    </DocsLayout>
  );
}
