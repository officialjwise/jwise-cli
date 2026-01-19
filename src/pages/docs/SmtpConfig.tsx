import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function SmtpConfigPage() {
  return (
    <DocsLayout
      title="SMTP Configuration"
      description="Configure SMTP settings for sending emails in your jwise project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Basic Configuration</h2>
      <p className="text-muted-foreground mb-6">
        Configure your SMTP settings in the <code className="text-accent">.env</code> file to enable email functionality.
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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Popular SMTP Providers</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Gmail</h3>
      <CodeBlock
        code={`SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password`}
        language="bash"
      />

      <Callout type="info" title="Gmail App Passwords">
        For Gmail, you need to enable 2FA and create an App Password. Go to Google Account → Security → App passwords.
      </Callout>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">SendGrid</h3>
      <CodeBlock
        code={`SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Mailgun</h3>
      <CodeBlock
        code={`SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">AWS SES</h3>
      <CodeBlock
        code={`SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Testing Email</h2>
      <p className="text-muted-foreground mb-4">
        Test your email configuration by triggering the email verification flow:
      </p>

      <CodeBlock
        code={`curl -X POST http://localhost:3000/api/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com", "password": "SecurePass123!"}'`}
        language="bash"
      />

      <Callout type="warning" title="Production">
        Never use personal email credentials in production. Use a dedicated transactional email service.
      </Callout>
    </DocsLayout>
  );
}
