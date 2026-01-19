import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function EmailTemplatesPage() {
  return (
    <DocsLayout
      title="Email Templates"
      description="Pre-built email templates included with jwise authentication."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Included Templates</h2>
      <p className="text-muted-foreground mb-6">
        jwise includes 4 professionally designed email templates out of the box:
      </p>

      <div className="grid gap-4 mb-8">
        {[
          { name: 'Email Verification', file: 'verify-email.hbs', desc: 'Sent when a user signs up' },
          { name: 'Password Reset', file: 'reset-password.hbs', desc: 'Sent when user requests password reset' },
          { name: 'Password Changed', file: 'password-changed.hbs', desc: 'Confirmation after password change' },
          { name: 'Welcome Email', file: 'welcome.hbs', desc: 'Sent after email verification' },
        ].map((template) => (
          <div key={template.name} className="p-4 rounded-lg border border-border bg-card">
            <h4 className="font-semibold text-foreground">{template.name}</h4>
            <p className="text-sm text-muted-foreground">{template.desc}</p>
            <code className="text-xs text-accent mt-2 block">{template.file}</code>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Template Structure</h2>
      <CodeBlock
        code={`src/
└── mail/
    └── templates/
        ├── verify-email.hbs
        ├── reset-password.hbs
        ├── password-changed.hbs
        └── welcome.hbs`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Template Variables</h2>
      <p className="text-muted-foreground mb-4">
        Each template has access to specific variables:
      </p>

      <CodeBlock
        code={`<!-- verify-email.hbs -->
<h1>Welcome, {{name}}!</h1>
<p>Please verify your email by clicking the link below:</p>
<a href="{{verificationUrl}}">Verify Email</a>
<p>This link expires in {{expiresIn}}.</p>`}
        language="html"
        filename="verify-email.hbs"
      />

      <Callout type="info" title="Handlebars">
        Templates use Handlebars syntax. See the customization guide for more details.
      </Callout>
    </DocsLayout>
  );
}
