import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function AuthRegistrationPage() {
  return (
    <DocsLayout
      title="User Registration"
      description="Implement secure user registration with email verification."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Registration Flow</h2>
      <p className="text-muted-foreground mb-6">
        The registration process includes email validation, password hashing, and email verification.
      </p>

      <div className="grid gap-4 mb-8">
        {[
          { step: '1', title: 'User submits registration', desc: 'Email and password validated' },
          { step: '2', title: 'Account created', desc: 'Password hashed with bcrypt' },
          { step: '3', title: 'Verification email sent', desc: 'Secure token generated' },
          { step: '4', title: 'User verifies email', desc: 'Account activated' },
        ].map((item) => (
          <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
              {item.step}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">API Endpoint</h2>
      <CodeBlock
        code={`POST /api/v1/auth/signup

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}`}
        language="json"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Password Requirements</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
        <li>Minimum 8 characters</li>
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
        <li>At least one special character</li>
      </ul>

      <Callout type="info" title="Customization">
        Password requirements can be customized in the validation schema.
      </Callout>
    </DocsLayout>
  );
}
