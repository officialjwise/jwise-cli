import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthEmailVerificationPage() {
  return (
    <DocsLayout
      title="Email Verification"
      description="Implement email verification for new user accounts."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Verification Flow</h2>
      <div className="grid gap-4 mb-8">
        {[
          { step: '1', title: 'User registers', desc: 'Verification email sent automatically' },
          { step: '2', title: 'User clicks link', desc: 'Token validated on backend' },
          { step: '3', title: 'Account verified', desc: 'User can now log in' },
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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Verify Email Endpoint</h2>
      <CodeBlock
        code={`GET /api/v1/auth/verify-email?token=abc123...`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Resend Verification</h2>
      <CodeBlock
        code={`POST /api/v1/auth/resend-verification

{
  "email": "user@example.com"
}`}
        language="json"
      />

      <Callout type="warning" title="Token Expiry">
        Verification tokens expire after 24 hours by default. Users can request a new one.
      </Callout>
    </DocsLayout>
  );
}
