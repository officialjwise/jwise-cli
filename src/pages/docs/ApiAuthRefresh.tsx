import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';
import { useState } from 'react';

const codeExamples = {
  curl: `curl -X POST http://localhost:3000/api/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'`,
  javascript: `const refreshTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  const response = await fetch('http://localhost:3000/api/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    
    // Update stored tokens
    localStorage.setItem('accessToken', data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.tokens.refreshToken);
    
    return data.tokens.accessToken;
  } else {
    // Refresh failed - redirect to login
    window.location.href = '/login';
  }
};`,
  python: `import requests

def refresh_tokens(refresh_token: str) -> dict:
    response = requests.post(
        'http://localhost:3000/api/v1/auth/refresh',
        json={'refreshToken': refresh_token}
    )
    
    if response.status_code == 200:
        data = response.json()
        return {
            'access_token': data['tokens']['accessToken'],
            'refresh_token': data['tokens']['refreshToken']
        }
    else:
        raise Exception('Token refresh failed')`,
};

const languages = ['curl', 'javascript', 'python'] as const;
type Language = typeof languages[number];

export default function ApiAuthRefresh() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  return (
    <DocsLayout
      title="POST /auth/refresh"
      description="Refresh access token using a valid refresh token."
    >
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/refresh"
        description="Get new access and refresh tokens"
      />

      <Callout type="info" title="Token Rotation">
        This endpoint implements <strong>refresh token rotation</strong>. Each time you refresh, both the access token AND refresh token are replaced. The old refresh token is invalidated immediately.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Request Body</h2>
      <CodeBlock
        code={`{
  "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Success Response</h2>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-success/20 text-success text-sm font-semibold">200 OK</span>
      </p>
      <CodeBlock
        code={`{
  "message": "Tokens refreshed successfully",
  "tokens": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`}
        language="json"
        filename="Response"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Error Responses</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">401 Unauthorized - Invalid Token</h3>
      <CodeBlock
        code={`{
  "statusCode": 401,
  "message": "Invalid or expired refresh token",
  "error": "Unauthorized"
}`}
        language="json"
      />

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">401 Unauthorized - Token Already Used</h3>
      <CodeBlock
        code={`{
  "statusCode": 401,
  "message": "Refresh token has already been used",
  "error": "Unauthorized"
}`}
        language="json"
      />

      <Callout type="warning" title="Security Alert">
        If you receive "Refresh token has already been used", this may indicate token theft. All sessions for the user are automatically invalidated as a security measure.
      </Callout>

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

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Implementation Tips</h2>

      <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Axios Interceptor Example</h3>
      <CodeBlock
        code={`// axios-config.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await api.post('/auth/refresh', { refreshToken });
        
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
        
        api.defaults.headers['Authorization'] = 'Bearer ' + data.tokens.accessToken;
        processQueue(null, data.tokens.accessToken);
        
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;`}
        language="typescript"
        filename="axios-config.ts"
        showLineNumbers
      />
    </DocsLayout>
  );
}
