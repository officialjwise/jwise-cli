import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function TroubleshootingErrorsPage() {
  return (
    <DocsLayout
      title="Common Errors"
      description="Solutions to common errors in jwise projects."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">JWT Errors</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Invalid Signature</h3>
      <CodeBlock code="JsonWebTokenError: invalid signature" language="bash" />
      <p className="text-muted-foreground mb-4">
        <strong>Solution:</strong> Ensure JWT_PUBLIC_KEY matches the JWT_PRIVATE_KEY. Regenerate keys if needed.
      </p>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Token Expired</h3>
      <CodeBlock code="TokenExpiredError: jwt expired" language="bash" />
      <p className="text-muted-foreground mb-4">
        <strong>Solution:</strong> Use the refresh token endpoint to get a new access token.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Database Errors</h2>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Connection Refused</h3>
      <CodeBlock code="Error: connect ECONNREFUSED 127.0.0.1:5432" language="bash" />
      <p className="text-muted-foreground mb-4">
        <strong>Solution:</strong> Ensure PostgreSQL is running and DATABASE_URL is correct.
      </p>

      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Migration Failed</h3>
      <CodeBlock code="Error: P3009 migrate found failed migrations" language="bash" />
      <p className="text-muted-foreground mb-6">
        <strong>Solution:</strong> Run <code>npx prisma migrate resolve</code> to mark migrations as applied or rolled back.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Email Errors</h2>
      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Authentication Failed</h3>
      <CodeBlock code="Error: Invalid login: 535-5.7.8 Username and Password not accepted" language="bash" />
      <p className="text-muted-foreground mb-4">
        <strong>Solution:</strong> For Gmail, use an App Password instead of your regular password.
      </p>

      <Callout type="tip" title="Debug Mode">
        Set <code>DEBUG=*</code> to enable verbose logging for troubleshooting.
      </Callout>
    </DocsLayout>
  );
}
