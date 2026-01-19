import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function SecurityHashingPage() {
  return (
    <DocsLayout
      title="Password Hashing"
      description="Secure password hashing with bcrypt."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">bcrypt Implementation</h2>
      <p className="text-muted-foreground mb-6">
        jwise uses bcrypt for password hashing, which is the industry standard for secure password storage.
      </p>

      <CodeBlock
        code={`import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

// Hash password
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}`}
        language="typescript"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Salt Rounds</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Rounds</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Time</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Recommendation</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4">10</td>
              <td className="py-3 px-4">~100ms</td>
              <td className="py-3 px-4">Minimum for production</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">12</td>
              <td className="py-3 px-4">~300ms</td>
              <td className="py-3 px-4">Recommended (default)</td>
            </tr>
            <tr>
              <td className="py-3 px-4">14</td>
              <td className="py-3 px-4">~1s</td>
              <td className="py-3 px-4">High security</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Never">
        Never store passwords in plain text. Always hash before storing.
      </Callout>
    </DocsLayout>
  );
}
