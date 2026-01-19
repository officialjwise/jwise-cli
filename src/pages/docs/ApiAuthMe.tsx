import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';

export default function ApiAuthMePage() {
  return (
    <DocsLayout
      title="GET /auth/me"
      description="Retrieve the current authenticated user's profile."
    >
      <ApiEndpoint method="GET" path="/api/v1/auth/me" description="Get current user profile" />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Headers</h2>
      <CodeBlock
        code={`{
  "Authorization": "Bearer <access_token>"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Success Response</h2>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-success/20 text-success text-sm font-semibold">200 OK</span>
      </p>
      <CodeBlock
        code={`{
  "id": "uuid-here",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "emailVerified": true,
  "createdAt": "2026-01-19T10:00:00.000Z",
  "updatedAt": "2026-01-19T10:00:00.000Z"
}`}
        language="json"
        filename="Response"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Error Response</h2>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-destructive/20 text-destructive text-sm font-semibold">401 Unauthorized</span>
      </p>
      <CodeBlock
        code={`{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Code Example</h2>
      <CodeBlock
        code={`const response = await fetch('http://localhost:3000/api/v1/auth/me', {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`
  }
});

const user = await response.json();
console.log(user.email);`}
        language="javascript"
      />

      <Callout type="info">
        This endpoint requires a valid access token. The token is validated and the user ID is extracted from it.
      </Callout>
    </DocsLayout>
  );
}
