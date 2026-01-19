import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, LinkCard } from '@/components/DocsComponents';

export default function ApiEmailEndpointsPage() {
  return (
    <DocsLayout
      title="Email Endpoints"
      description="API endpoints for email verification and password reset."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Email Verification</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Verify Email</h3>
      <CodeBlock
        code={`GET /api/v1/auth/verify-email?token=<verification_token>

Response (200):
{
  "message": "Email verified successfully"
}`}
        language="bash"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Resend Verification</h3>
      <CodeBlock
        code={`POST /api/v1/auth/resend-verification

{
  "email": "user@example.com"
}

Response (200):
{
  "message": "Verification email sent"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Password Reset</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Request Reset</h3>
      <CodeBlock
        code={`POST /api/v1/auth/forgot-password

{
  "email": "user@example.com"
}

Response (200):
{
  "message": "If the email exists, a reset link has been sent"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Reset Password</h3>
      <CodeBlock
        code={`POST /api/v1/auth/reset-password

{
  "token": "reset-token",
  "password": "NewSecurePass123!"
}

Response (200):
{
  "message": "Password reset successfully"
}`}
        language="json"
      />

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <LinkCard title="Email Verification Flow" description="Detailed verification guide" href="/docs/authentication/email-verification" />
        <LinkCard title="Password Reset Flow" description="Detailed reset guide" href="/docs/authentication/password-reset" />
      </div>
    </DocsLayout>
  );
}
