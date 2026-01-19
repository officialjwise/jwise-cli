import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, ApiEndpoint } from '@/components/DocsComponents';

export default function ApiEmailVerification() {
  return (
    <DocsLayout
      title="Email Verification"
      description="Verify user email addresses and resend verification emails."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">POST /auth/verify-email</h2>
      
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/verify-email"
        description="Verify email address using token from email"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Request Body</h3>
      <CodeBlock
        code={`{
  "token": "verification-token-from-email"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Success Response</h3>
      <p className="text-muted-foreground mb-4">
        <span className="px-2 py-1 rounded bg-success/20 text-success text-sm font-semibold">200 OK</span>
      </p>
      <CodeBlock
        code={`{
  "message": "Email verified successfully",
  "user": {
    "id": "uuid-here",
    "email": "john.doe@example.com",
    "emailVerified": true,
    "emailVerifiedAt": "2026-01-19T10:00:00.000Z"
  }
}`}
        language="json"
        filename="Response"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Error Responses</h3>

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">400 Bad Request - Invalid Token</h4>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": "Invalid or expired verification token",
  "error": "Bad Request"
}`}
        language="json"
      />

      <h4 className="text-lg font-medium text-foreground mb-3 mt-6">400 Bad Request - Already Verified</h4>
      <CodeBlock
        code={`{
  "statusCode": 400,
  "message": "Email is already verified",
  "error": "Bad Request"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">POST /auth/resend-verification</h2>
      
      <ApiEndpoint
        method="POST"
        path="http://localhost:3000/api/v1/auth/resend-verification"
        description="Resend verification email to user"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Request Body</h3>
      <CodeBlock
        code={`{
  "email": "john.doe@example.com"
}`}
        language="json"
      />

      <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Success Response</h3>
      <CodeBlock
        code={`{
  "message": "Verification email sent"
}`}
        language="json"
        filename="Response"
      />

      <Callout type="info" title="Rate Limiting">
        Resend verification is rate-limited to prevent abuse. Users can only request a new verification email once every 60 seconds.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Frontend Implementation</h2>

      <CodeBlock
        code={`// Verification page component
// URL: /verify-email?token=abc123...

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/v1/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Email verified! You can now log in.');
      } else {
        const error = await response.json();
        setStatus('error');
        setMessage(error.message);
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {status === 'loading' && <p>Verifying your email...</p>}
      {status === 'success' && (
        <div>
          <h1>✓ Email Verified!</h1>
          <p>{message}</p>
          <a href="/login">Go to Login</a>
        </div>
      )}
      {status === 'error' && (
        <div>
          <h1>Verification Failed</h1>
          <p>{message}</p>
          <button onClick={() => /* resend logic */}>
            Resend Verification Email
          </button>
        </div>
      )}
    </div>
  );
}`}
        language="typescript"
        filename="VerifyEmailPage.tsx"
        showLineNumbers
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Email Template</h2>
      
      <p className="text-muted-foreground mb-4">
        jwise generates a professional verification email template:
      </p>

      <div className="p-6 rounded-xl border border-border bg-card my-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">From: My App &lt;noreply@myapp.com&gt;</p>
          <p className="text-sm text-muted-foreground">Subject: Verify your email address</p>
          <hr className="border-border" />
          <div className="space-y-3">
            <p className="text-foreground">Hi John,</p>
            <p className="text-muted-foreground">Thanks for signing up! Please verify your email address by clicking the button below:</p>
            <button className="px-4 py-2 rounded-lg hero-gradient text-white font-medium">
              Verify Email
            </button>
            <p className="text-sm text-muted-foreground">This link expires in 24 hours.</p>
            <p className="text-sm text-muted-foreground">If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </div>
      </div>

      <Callout type="tip" title="Customization">
        Email templates can be customized in the <code className="px-1 py-0.5 rounded bg-muted text-xs">src/mail/templates/</code> directory. See the Email Service docs for more details.
      </Callout>
    </DocsLayout>
  );
}
