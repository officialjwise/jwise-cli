import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthSessionsPage() {
  return (
    <DocsLayout
      title="Multi-Device Sessions"
      description="Manage user sessions across multiple devices."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Session Management</h2>
      <p className="text-muted-foreground mb-6">
        jwise tracks user sessions, allowing users to view and revoke access on different devices.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">List Sessions</h2>
      <CodeBlock
        code={`GET /api/v1/auth/sessions
Authorization: Bearer <access_token>`}
        language="bash"
      />

      <CodeBlock
        code={`{
  "sessions": [
    {
      "id": "session-uuid",
      "deviceInfo": "Chrome on macOS",
      "ipAddress": "192.168.1.1",
      "lastActive": "2024-01-15T10:30:00Z",
      "current": true
    },
    {
      "id": "session-uuid-2",
      "deviceInfo": "Safari on iPhone",
      "ipAddress": "192.168.1.2",
      "lastActive": "2024-01-14T08:00:00Z",
      "current": false
    }
  ]
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Revoke Session</h2>
      <CodeBlock
        code={`DELETE /api/v1/auth/sessions/:sessionId
Authorization: Bearer <access_token>`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Revoke All Sessions</h2>
      <CodeBlock
        code={`DELETE /api/v1/auth/sessions
Authorization: Bearer <access_token>`}
        language="bash"
      />

      <Callout type="info" title="Security">
        When a user changes their password, all sessions are automatically revoked.
      </Callout>
    </DocsLayout>
  );
}
