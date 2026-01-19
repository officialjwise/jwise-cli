import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthTokenRefreshPage() {
  return (
    <DocsLayout
      title="Token Refresh"
      description="Learn how to refresh expired access tokens."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Token Refresh Flow</h2>
      <p className="text-muted-foreground mb-6">
        When an access token expires, use the refresh token to obtain a new pair of tokens.
      </p>

      <CodeBlock
        code={`POST /api/v1/auth/refresh

{
  "refreshToken": "eyJhbGciOiJSUzI1NiIs..."
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Response</h2>
      <CodeBlock
        code={`{
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJSUzI1NiIs...",
  "expiresIn": 900
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Client Implementation</h2>
      <CodeBlock
        code={`// Axios interceptor example
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const { data } = await axios.post('/api/v1/auth/refresh', {
          refreshToken: getStoredRefreshToken(),
        });
        
        setTokens(data.accessToken, data.refreshToken);
        originalRequest.headers.Authorization = \`Bearer \${data.accessToken}\`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        // Redirect to login
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);`}
        language="typescript"
      />

      <Callout type="info" title="Token Rotation">
        Each refresh generates a new refresh token, invalidating the old one for security.
      </Callout>
    </DocsLayout>
  );
}
