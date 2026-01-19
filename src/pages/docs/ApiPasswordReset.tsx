import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';

export default function ApiPasswordReset() {
  return (
    <DocsLayout
      title="Password Reset Flow"
      description="Request and complete password reset for users who forgot their password."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Step 1: Request Password Reset</h2>
      
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/forgot-password"
        description="Send password reset email to user"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Request Body</h3>
      <CodeBlock
        code={`{
  "email": "john.doe@example.com"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Success Response</h3>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-success/20 text-success text-sm font-semibold">200 OK</span>
      </p>
      <CodeBlock
        code={`{
  "message": "If an account with that email exists, a password reset link has been sent."
}`}
        language="json"
        filename="Response"
      />

      <Callout type="info" title="Security Note">
        The response is intentionally vague to prevent email enumeration attacks. The same response is returned whether or not the email exists in the system.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Step 2: Reset Password</h2>
      
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/reset-password"
        description="Set new password using reset token"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Request Body</h3>
      <CodeBlock
        code={`{
  "token": "reset-token-from-email",
  "password": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Success Response</h3>
      <CodeBlock
        code={`{
  "message": "Password reset successfully. You can now login with your new password."
}`}
        language="json"
        filename="Response"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Error Responses</h3>

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">400 Bad Request - Invalid Token</h4>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": "Invalid or expired reset token",
  "error": "Bad Request"
}`}
        language="json"
      />

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">400 Bad Request - Passwords Don't Match</h4>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": "Passwords do not match",
  "error": "Bad Request"
}`}
        language="json"
      />

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">400 Bad Request - Weak Password</h4>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": ["password must contain uppercase, lowercase, number, and special character"],
  "error": "Bad Request"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Complete Flow Example</h2>

      <CodeBlock
        code={`// 1. User requests password reset
const requestReset = async (email: string) => {
  await fetch('/api/v1/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  // Always show success message (security)
  showMessage('If the email exists, you will receive a reset link.');
};

// 2. User clicks link in email and lands on reset page
// URL: /reset-password?token=abc123...

// 3. User submits new password
const resetPassword = async (token: string, password: string) => {
  const response = await fetch('/api/v1/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      password,
      confirmPassword: password,
    }),
  });

  if (response.ok) {
    showMessage('Password reset! Redirecting to login...');
    window.location.href = '/login';
  } else {
    const error = await response.json();
    showError(error.message);
  }
};`}
        language="typescript"
        filename="password-reset.ts"
        showLineNumbers
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Security Measures</h2>
      
      <div className="space-y-2 my-6">
        {[
          'Reset tokens expire after 1 hour',
          'Tokens are single-use and invalidated after use',
          'All active sessions are invalidated on password reset',
          'Password reset event is logged in auth_events',
          'Email notification sent after successful reset',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <Callout type="warning" title="Important">
        After a successful password reset, all existing sessions are terminated. Users will need to log in again on all devices.
      </Callout>
    </DocsLayout>
  );
}
