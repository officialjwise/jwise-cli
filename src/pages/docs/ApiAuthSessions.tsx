import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';

export default function ApiAuthSessions() {
  return (
    <DocsLayout
      title="Session Management"
      description="Manage user sessions across multiple devices."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">GET /auth/sessions</h2>
      
      <ApiEndpoint
        method="GET"
        path="http://localhost:3000/api/v1/auth/sessions"
        description="List all active sessions for the current user"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Headers</h3>
      <CodeBlock
        code={`{
  "Authorization": "Bearer <access_token>"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Success Response</h3>
      <CodeBlock
        code={`{
  "sessions": [
    {
      "id": "session-uuid-1",
      "deviceInfo": "Chrome on Windows",
      "ipAddress": "192.168.1.1",
      "location": "New York, US",
      "createdAt": "2026-01-19T10:00:00.000Z",
      "lastActivityAt": "2026-01-19T14:30:00.000Z",
      "isCurrent": true
    },
    {
      "id": "session-uuid-2",
      "deviceInfo": "Safari on iPhone",
      "ipAddress": "192.168.1.50",
      "location": "New York, US",
      "createdAt": "2026-01-18T08:00:00.000Z",
      "lastActivityAt": "2026-01-19T09:00:00.000Z",
      "isCurrent": false
    }
  ],
  "total": 2
}`}
        language="json"
        filename="Response"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">DELETE /auth/sessions/:id</h2>
      
      <ApiEndpoint
        method="DELETE"
        path="http://localhost:3000/api/v1/auth/sessions/:id"
        description="Revoke a specific session"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Path Parameters</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Parameter</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Type</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="py-3 px-4 font-mono text-sm">id</td>
              <td className="py-3 px-4">string (UUID)</td>
              <td className="py-3 px-4">Session ID to revoke</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Success Response</h3>
      <CodeBlock
        code={`{
  "message": "Session revoked successfully"
}`}
        language="json"
        filename="Response"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Error Responses</h3>

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">404 Not Found</h4>
      <CodeBlock
        code={`{
  "statusCode": 404,
  "message": "Session not found",
  "error": "Not Found"
}`}
        language="json"
      />

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">403 Forbidden - Cannot revoke current session</h4>
      <CodeBlock
        code={`{
  "statusCode": 403,
  "message": "Cannot revoke current session. Use /auth/logout instead.",
  "error": "Forbidden"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Code Example</h2>

      <CodeBlock
        code={`// React component for session management
import { useState, useEffect } from 'react';

interface Session {
  id: string;
  deviceInfo: string;
  ipAddress: string;
  location: string;
  createdAt: string;
  lastActivityAt: string;
  isCurrent: boolean;
}

export function SessionManager() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('/api/v1/auth/sessions', {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    const data = await response.json();
    setSessions(data.sessions);
  };

  const revokeSession = async (sessionId: string) => {
    const token = localStorage.getItem('accessToken');
    await fetch(\`/api/v1/auth/sessions/\${sessionId}\`, {
      method: 'DELETE',
      headers: { Authorization: \`Bearer \${token}\` }
    });
    fetchSessions(); // Refresh list
  };

  return (
    <div>
      <h2>Active Sessions</h2>
      {sessions.map(session => (
        <div key={session.id}>
          <p>{session.deviceInfo}</p>
          <p>{session.location} • {session.ipAddress}</p>
          {!session.isCurrent && (
            <button onClick={() => revokeSession(session.id)}>
              Revoke
            </button>
          )}
          {session.isCurrent && <span>Current session</span>}
        </div>
      ))}
    </div>
  );
}`}
        language="typescript"
        filename="SessionManager.tsx"
        showLineNumbers
      />

      <Callout type="info" title="Security Feature">
        Session management allows users to see all devices where they're logged in and revoke access to suspicious sessions. This is a key security feature for protecting user accounts.
      </Callout>
    </DocsLayout>
  );
}
