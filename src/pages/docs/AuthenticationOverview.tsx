import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint, LinkCard } from '@/components/DocsComponents';

export default function AuthenticationOverview() {
  return (
    <DocsLayout
      title="Authentication Overview"
      description="Complete authentication system with JWT tokens, email verification, and multi-device session management."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Features at a Glance</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
        {[
          'User Registration & Login',
          'JWT Access & Refresh Tokens',
          'Token Rotation (Security)',
          'Email Verification',
          'Password Reset Flow',
          'Account Lockout',
          'Multi-Device Sessions',
          'Argon2 Password Hashing',
          'Audit Logging',
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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">How It Works</h2>
      
      <p className="text-muted-foreground mb-6">
        jwise generates a complete authentication system following security best practices. 
        The system uses RS256 (RSA + SHA256) for signing JWTs, providing cryptographic separation 
        between token creation and verification.
      </p>

      <h3 className="text-xl font-semibold text-foreground mb-4">Token Strategy</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Token Type</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Lifetime</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4">Access Token</td>
              <td className="py-3 px-4">15 minutes</td>
              <td className="py-3 px-4">API authentication</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Refresh Token</td>
              <td className="py-3 px-4">7 days</td>
              <td className="py-3 px-4">Obtain new access tokens</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Email Verification</td>
              <td className="py-3 px-4">24 hours</td>
              <td className="py-3 px-4">Verify email ownership</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Password Reset</td>
              <td className="py-3 px-4">1 hour</td>
              <td className="py-3 px-4">Reset forgotten password</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">API Endpoints</h2>
      
      <p className="text-muted-foreground mb-6">
        The authentication module provides 11 secure endpoints:
      </p>

      <ApiEndpoint method="POST" path="/api/v1/auth/signup" description="Register a new user account" />
      <ApiEndpoint method="POST" path="/api/v1/auth/login" description="Authenticate and receive tokens" />
      <ApiEndpoint method="POST" path="/api/v1/auth/refresh" description="Refresh access token" />
      <ApiEndpoint method="POST" path="/api/v1/auth/logout" description="Invalidate current session" />
      <ApiEndpoint method="GET" path="/api/v1/auth/me" description="Get current user profile" />
      <ApiEndpoint method="GET" path="/api/v1/auth/sessions" description="List all active sessions" />
      <ApiEndpoint method="DELETE" path="/api/v1/auth/sessions/:id" description="Revoke specific session" />
      <ApiEndpoint method="POST" path="/api/v1/auth/verify-email" description="Verify email with token" />
      <ApiEndpoint method="POST" path="/api/v1/auth/resend-verification" description="Resend verification email" />
      <ApiEndpoint method="POST" path="/api/v1/auth/forgot-password" description="Request password reset" />
      <ApiEndpoint method="POST" path="/api/v1/auth/reset-password" description="Reset password with token" />

      <Callout type="tip" title="Security Note">
        All endpoints except signup, login, and password reset require a valid access token in the Authorization header.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Architecture</h2>

      <CodeBlock
        code={`┌─────────────┐
│   Client    │
└──────┬──────┘
       │ POST /auth/signup
       ▼
┌─────────────────┐      ┌──────────────┐
│ AuthController  │─────▶│ AuthService  │
└─────────────────┘      └──────┬───────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
        ┌──────────────┐  ┌─────────┐  ┌──────────┐
        │ MailService  │  │ Prisma  │  │ Argon2   │
        └──────────────┘  └─────────┘  └──────────┘`}
        language="text"
        filename="Architecture Diagram"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="User Registration"
          description="Implement secure user signup with email verification."
          href="/docs/authentication/registration"
        />
        <LinkCard
          title="Login & JWT Tokens"
          description="Authenticate users and manage JWT tokens."
          href="/docs/authentication/login"
        />
        <LinkCard
          title="Token Refresh"
          description="Implement secure token rotation strategy."
          href="/docs/authentication/token-refresh"
        />
        <LinkCard
          title="Security Best Practices"
          description="Harden your authentication implementation."
          href="/docs/authentication/security"
        />
      </div>
    </DocsLayout>
  );
}
