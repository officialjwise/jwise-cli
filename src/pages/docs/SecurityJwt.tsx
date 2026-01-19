import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function SecurityJwtPage() {
  return (
    <DocsLayout
      title="JWT Best Practices"
      description="Secure JWT implementation guidelines."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">RS256 Algorithm</h2>
      <p className="text-muted-foreground mb-6">
        jwise uses RS256 (RSA Signature with SHA-256) instead of HS256 for better security.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-foreground">RS256 (Asymmetric)</h4>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>✓ Private key signs</li>
            <li>✓ Public key verifies</li>
            <li>✓ Key can be rotated</li>
            <li>✓ Microservices friendly</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-foreground">HS256 (Symmetric)</h4>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>✗ Same key for both</li>
            <li>✗ Secret must be shared</li>
            <li>✗ Harder to rotate</li>
            <li>✗ Single point of failure</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Generate RSA Keys</h2>
      <CodeBlock
        code={`# Generate private key
openssl genrsa -out private.pem 2048

# Generate public key
openssl rsa -in private.pem -pubout -out public.pem`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Token Payload</h2>
      <CodeBlock
        code={`{
  "sub": "user-uuid",           // Subject (user ID)
  "email": "user@example.com",
  "iat": 1704067200,            // Issued at
  "exp": 1704068100,            // Expires at
  "jti": "unique-token-id"      // JWT ID (for revocation)
}`}
        language="json"
      />

      <Callout type="warning" title="Security">
        Keep access tokens short-lived (15 min) and refresh tokens longer (7 days).
      </Callout>
    </DocsLayout>
  );
}
