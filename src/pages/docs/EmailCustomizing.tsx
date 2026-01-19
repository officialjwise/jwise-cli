import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function EmailCustomizingPage() {
  return (
    <DocsLayout
      title="Customizing Emails"
      description="Learn how to customize email templates and styling in your jwise project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Template Customization</h2>
      <p className="text-muted-foreground mb-6">
        Email templates are located in <code className="text-accent">src/mail/templates/</code> and use Handlebars for dynamic content.
      </p>

      <CodeBlock
        code={`<!DOCTYPE html>
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
    .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #f8f9fa; }
    .button { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{appName}}</h1>
    </div>
    <div class="content">
      <h2>Hello {{name}},</h2>
      <p>{{message}}</p>
      {{#if actionUrl}}
        <p><a href="{{actionUrl}}" class="button">{{actionText}}</a></p>
      {{/if}}
    </div>
    <div class="footer">
      <p>© {{year}} {{appName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`}
        language="html"
        filename="base-template.hbs"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Adding Custom Variables</h2>
      <CodeBlock
        code={`// src/mail/mail.service.ts
async sendVerificationEmail(user: User, token: string) {
  const verificationUrl = \`\${this.configService.get('FRONTEND_URL')}/verify?token=\${token}\`;
  
  await this.mailerService.sendMail({
    to: user.email,
    subject: 'Verify your email',
    template: 'verify-email',
    context: {
      name: user.firstName || 'there',
      verificationUrl,
      expiresIn: '24 hours',
      appName: 'My App',
      year: new Date().getFullYear(),
    },
  });
}`}
        language="typescript"
      />

      <Callout type="tip" title="Testing">
        Use tools like Mailtrap or Mailhog for testing emails in development.
      </Callout>
    </DocsLayout>
  );
}
