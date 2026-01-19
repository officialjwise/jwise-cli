import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';
import { useState } from 'react';

const codeExamples = {
  curl: `curl -X POST http://localhost:3000/api/v1/auth/logout \\
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."`,
  javascript: `const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  await fetch('http://localhost:3000/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
    },
  });

  // Clear stored tokens
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  
  // Redirect to login
  window.location.href = '/login';
};`,
  python: `import requests

def logout(access_token: str) -> bool:
    response = requests.post(
        'http://localhost:3000/api/v1/auth/logout',
        headers={'Authorization': f'Bearer {access_token}'}
    )
    
    return response.status_code == 200`,
};

const languages = ['curl', 'javascript', 'python'] as const;
type Language = typeof languages[number];

export default function ApiAuthLogout() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  return (
    <DocsLayout
      title="POST /auth/logout"
      description="Invalidate the current session and refresh token."
    >
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/logout"
        description="End current session and invalidate tokens"
      />

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
  "message": "Logged out successfully"
}`}
        language="json"
        filename="Response"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Error Responses</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">401 Unauthorized</h3>
      <CodeBlock
        code={`{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">What Happens on Logout</h2>
      
      <div className="space-y-2 my-6">
        {[
          'Current session is marked as ended in the database',
          'Refresh token is invalidated and cannot be reused',
          'Access token remains valid until expiry (15 min) - use short-lived tokens',
          'Logout event is logged in auth_events table',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <Callout type="tip" title="Logout All Devices">
        To logout from all devices, use the <code className="px-1 py-0.5 rounded bg-muted text-xs">DELETE /auth/sessions</code> endpoint instead.
      </Callout>
    </DocsLayout>
  );
}
