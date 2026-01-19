import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';
import { useState } from 'react';

const codeExamples = {
  curl: `curl -X POST http://localhost:3000/api/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "name": "John Doe"
  }'`,
  javascript: `const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'SecurePass123!',
    name: 'John Doe',
  }),
});

const data = await response.json();
console.log(data.tokens.accessToken);`,
  python: `import requests

response = requests.post(
    'http://localhost:3000/api/v1/auth/signup',
    json={
        'email': 'john.doe@example.com',
        'password': 'SecurePass123!',
        'name': 'John Doe'
    }
)

data = response.json()
print(data['tokens']['accessToken'])`,
};

const languages = ['curl', 'javascript', 'python'] as const;
type Language = typeof languages[number];

export default function ApiAuthSignup() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  return (
    <DocsLayout
      title="POST /auth/signup"
      description="Register a new user account with email and password."
    >
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/signup"
        description="Register a new user account"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Headers</h2>
      <CodeBlock
        code={`{
  "Content-Type": "application/json"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Request Body</h2>
      <CodeBlock
        code={`{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
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
              <td className="py-3 px-4">Valid email address (unique)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-sm">password</td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">Yes</td>
              <td className="py-3 px-4">Min 8 chars, must include: uppercase, lowercase, number, special char</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-sm">name</td>
              <td className="py-3 px-4">string</td>
              <td className="py-3 px-4">Yes</td>
              <td className="py-3 px-4">User's full name</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Success Response</h2>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-success/20 text-success text-sm font-semibold">201 Created</span>
      </p>
      <CodeBlock
        code={`{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-here",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "user",
    "emailVerified": false,
    "createdAt": "2026-01-19T10:00:00.000Z"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`}
        language="json"
        filename="Response"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Error Responses</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">400 Bad Request - Invalid Email</h3>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}`}
        language="json"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">400 Bad Request - Weak Password</h3>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": ["password must contain uppercase, lowercase, number, and special character"],
  "error": "Bad Request"
}`}
        language="json"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">409 Conflict - Email Already Exists</h3>
      <CodeBlock
        code={`{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Notes</h2>
      
      <Callout type="info">
        <ul className="list-disc list-inside space-y-2">
          <li>Email verification email is sent automatically after signup</li>
          <li>Password is hashed with Argon2id before storage</li>
          <li>Signup event is logged in <code className="px-1 py-0.5 rounded bg-muted text-xs">auth_events</code> table</li>
          <li>Access token expires in 15 minutes, refresh token in 7 days</li>
        </ul>
      </Callout>
    </DocsLayout>
  );
}
