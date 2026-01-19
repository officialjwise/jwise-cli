import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthLoginPage() {
  return (
    <DocsLayout
      title="Login & JWT Tokens"
      description="Understand JWT-based authentication and token management."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">JWT Token System</h2>
      <p className="text-muted-foreground mb-6">
        jwise uses a dual-token system with short-lived access tokens and long-lived refresh tokens.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-foreground">Access Token</h4>
          <p className="text-sm text-muted-foreground mt-1">Short-lived (15 min default)</p>
          <p className="text-sm text-muted-foreground">Used for API requests</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-foreground">Refresh Token</h4>
          <p className="text-sm text-muted-foreground mt-1">Long-lived (7 days default)</p>
          <p className="text-sm text-muted-foreground">Used to get new access tokens</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Login Request</h2>
      <CodeBlock
        code={`POST /api/v1/auth/login

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Response</h2>
      <CodeBlock
        code={`{
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJSUzI1NiIs...",
  "expiresIn": 900,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Using Access Token</h2>
      <CodeBlock
        code={`curl -X GET http://localhost:3000/api/v1/auth/me \\
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."`}
        language="bash"
      />

      <Callout type="warning" title="Security">
        Store tokens securely. Use httpOnly cookies for refresh tokens in production.
      </Callout>
    </DocsLayout>
  );
}
