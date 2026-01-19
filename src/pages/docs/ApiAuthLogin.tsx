import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';
import { useState } from 'react';

const codeExamples = {
  curl: `curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'`,
  javascript: `const response = await fetch('http://localhost:3000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'SecurePass123!',
  }),
});

const data = await response.json();

// Store tokens securely
localStorage.setItem('accessToken', data.tokens.accessToken);
localStorage.setItem('refreshToken', data.tokens.refreshToken);`,
  python: `import requests

response = requests.post(
    'http://localhost:3000/api/v1/auth/login',
    json={
        'email': 'john.doe@example.com',
        'password': 'SecurePass123!'
    }
)

data = response.json()
access_token = data['tokens']['accessToken']
refresh_token = data['tokens']['refreshToken']`,
};

const languages = ['curl', 'javascript', 'python'] as const;
type Language = typeof languages[number];

export default function ApiAuthLogin() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  return (
    <DocsLayout
      title="POST /auth/login"
      description="Authenticate a user and receive access and refresh tokens."
    >
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/login"
        description="Authenticate user credentials and receive JWT tokens"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Request Body</h2>
      <CodeBlock
        code={`{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Fields</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Field</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Type</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Required</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">email</td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">Yes</td>
              <td className="py-3 px-4">Registered email address</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">password</td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">Yes</td>
              <td className="py-3 px-4">User's password</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Success Response</h2>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-success/20 text-success text-sm font-semibold">200 OK</span>
      </p>
      <CodeBlock
        code={`{
  "message": "Login successful",
  "user": {
    "id": "uuid-here",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "user",
    "emailVerified": true,
    "lastLoginAt": "2026-01-19T10:00:00.000Z"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "session": {
    "id": "session-uuid",
    "deviceInfo": "Chrome on Windows",
    "ipAddress": "192.168.1.1",
    "createdAt": "2026-01-19T10:00:00.000Z"
  }
}`}
        language="json"
        filename="Response"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Error Responses</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">401 Unauthorized - Invalid Credentials</h3>
      <CodeBlock
        code={`{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}`}
        language="json"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">403 Forbidden - Account Locked</h3>
      <CodeBlock
        code={`{
  "statusCode": 403,
  "message": "Account locked due to too many failed login attempts. Try again in 15 minutes.",
  "error": "Forbidden",
  "unlockAt": "2026-01-19T10:15:00.000Z"
}`}
        language="json"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">403 Forbidden - Email Not Verified</h3>
      <CodeBlock
        code={`{
  "statusCode": 403,
  "message": "Please verify your email before logging in",
  "error": "Forbidden"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Code Examples</h2>

      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mb-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
              selectedLang === lang
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <CodeBlock code={codeExamples[selectedLang]} language={selectedLang} />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Security Notes</h2>
      
      <Callout type="warning" title="Token Storage">
        <ul className="list-disc list-inside space-y-1">
          <li>Store access tokens in memory for SPAs (not localStorage)</li>
          <li>Use httpOnly cookies for refresh tokens in production</li>
          <li>Never expose tokens in URLs or logs</li>
        </ul>
      </Callout>

      <Callout type="info">
        <ul className="list-disc list-inside space-y-2">
          <li>Failed login attempts are tracked per IP and user</li>
          <li>Account locks after 5 failed attempts (15 min lockout)</li>
          <li>Login event is logged in <code className="px-1 py-0.5 rounded bg-muted text-xs">auth_events</code> table</li>
          <li>New session created for each login (multi-device support)</li>
        </ul>
      </Callout>
    </DocsLayout>
  );
}
