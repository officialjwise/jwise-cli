import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthPasswordResetPage() {
  return (
    <DocsLayout
      title="Password Reset"
      description="Implement secure password reset functionality."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Password Reset Flow</h2>
      
      <div className="grid gap-4 mb-8">
        {[
          { step: '1', title: 'Request reset', desc: 'User enters email address' },
          { step: '2', title: 'Email sent', desc: 'Reset link sent if email exists' },
          { step: '3', title: 'Reset password', desc: 'User sets new password' },
          { step: '4', title: 'Confirmation', desc: 'All sessions invalidated' },
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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Request Password Reset</h2>
      <CodeBlock
        code={`POST /api/v1/auth/forgot-password

{
  "email": "user@example.com"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Reset Password</h2>
      <CodeBlock
        code={`POST /api/v1/auth/reset-password

{
  "token": "reset-token-from-email",
  "password": "NewSecurePassword123!"
}`}
        language="json"
      />

      <Callout type="info" title="Security">
        The response is always 200 OK to prevent email enumeration attacks.
      </Callout>
    </DocsLayout>
  );
}
