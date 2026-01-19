import { DocsLayout } from '@/components/DocsLayout';
import { ApiEndpoint, Callout, LinkCard } from '@/components/DocsComponents';

export default function ApiOverviewPage() {
  return (
    <DocsLayout
      title="API Reference"
      description="Complete reference for all 11 authentication API endpoints."
    >
      <Callout type="info" title="Base URL">
        All endpoints are prefixed with <code className="px-1.5 py-0.5 rounded bg-muted text-sm">/api/v1</code>
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Authentication Endpoints</h2>

      <ApiEndpoint method="POST" path="/auth/signup" description="Register a new user account" />
      <ApiEndpoint method="POST" path="/auth/login" description="Authenticate and receive tokens" />
      <ApiEndpoint method="POST" path="/auth/refresh" description="Refresh access token using refresh token" />
      <ApiEndpoint method="POST" path="/auth/logout" description="Invalidate current session" />
      <ApiEndpoint method="GET" path="/auth/me" description="Get current user profile" />
      <ApiEndpoint method="GET" path="/auth/sessions" description="List all active sessions" />
      <ApiEndpoint method="DELETE" path="/auth/sessions/:id" description="Revoke specific session" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Email Verification Endpoints</h2>

      <ApiEndpoint method="POST" path="/auth/verify-email" description="Verify email with token" />
      <ApiEndpoint method="POST" path="/auth/resend-verification" description="Resend verification email" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Password Reset Endpoints</h2>

      <ApiEndpoint method="POST" path="/auth/forgot-password" description="Request password reset email" />
      <ApiEndpoint method="POST" path="/auth/reset-password" description="Reset password with token" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Endpoint Details</h2>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard title="POST /auth/signup" description="User registration endpoint" href="/docs/api/auth-signup" />
        <LinkCard title="POST /auth/login" description="Login and get tokens" href="/docs/api/auth-login" />
        <LinkCard title="POST /auth/refresh" description="Refresh access token" href="/docs/api/auth-refresh" />
        <LinkCard title="POST /auth/logout" description="End session" href="/docs/api/auth-logout" />
        <LinkCard title="GET /auth/sessions" description="Session management" href="/docs/api/auth-sessions" />
        <LinkCard title="Email Verification" description="Verify user email" href="/docs/api/email-verification" />
        <LinkCard title="Password Reset" description="Reset password flow" href="/docs/api/password-reset" />
        <LinkCard title="Error Codes" description="API error reference" href="/docs/api/error-codes" />
      </div>
    </DocsLayout>
  );
}
