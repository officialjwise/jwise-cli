import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function SecurityOwaspPage() {
  return (
    <DocsLayout
      title="OWASP Compliance"
      description="jwise-generated backends are compliant with OWASP Top 10 security standards."
    >
      <Callout type="info" title="What is OWASP?">
        The Open Web Application Security Project (OWASP) is a nonprofit foundation that works to improve software security. The OWASP Top 10 is the standard awareness document for developers about critical security risks.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">✓ A01:2021 - Broken Access Control</h2>
      
      <div className="space-y-2 mb-4">
        {[
          'JWT-based authentication on all protected routes',
          'Role-based access control (RBAC) decorators',
          'Token validation middleware',
          'Session management with multi-device support',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <CodeBlock
        code={`@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get('admin/users')
async getUsers() {
  // Only accessible by admin role
}`}
        language="typescript"
        filename="admin.controller.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">✓ A02:2021 - Cryptographic Failures</h2>
      
      <div className="space-y-2 mb-4">
        {[
          'Argon2id password hashing (OWASP recommended)',
          'RSA-256 for JWT signing',
          'Secure token generation with crypto.randomBytes',
          'TLS/SSL for SMTP connections',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <CodeBlock
        code={`// Password Hashing Configuration
await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 65536,   // 64 MB
  timeCost: 3,         // 3 iterations
  parallelism: 4,      // 4 parallel threads
});`}
        language="typescript"
        filename="auth.service.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">✓ A03:2021 - Injection</h2>
      
      <div className="space-y-2 mb-4">
        {[
          'Parameterized queries via Prisma ORM',
          'Input validation with class-validator',
          'DTO pattern for all inputs',
          'SQL injection protection by design',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">✓ A04:2021 - Insecure Design</h2>
      
      <div className="space-y-2 mb-4">
        {[
          'Threat modeling in authentication flow',
          'Rate limiting on sensitive endpoints',
          'Account lockout after failed attempts',
          'Secure defaults for all configurations',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">✓ A05:2021 - Security Misconfiguration</h2>
      
      <div className="space-y-2 mb-4">
        {[
          'Helmet.js for security headers',
          'CORS properly configured',
          'Environment-specific configurations',
          'No default credentials',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            {item}
          </div>
        ))}
      </div>

      <CodeBlock
        code={`// Helmet Configuration
app.use(helmet({
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  dnsPrefetchControl: true,
  frameguard: true,
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: true,
  referrerPolicy: true,
  xssFilter: true,
}));`}
        language="typescript"
        filename="main.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Security Checklist</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">OWASP Item</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Implementation</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ['A01: Broken Access Control', '✓', 'JWT + RBAC'],
              ['A02: Cryptographic Failures', '✓', 'Argon2id + RS256'],
              ['A03: Injection', '✓', 'Prisma ORM'],
              ['A04: Insecure Design', '✓', 'Rate limiting'],
              ['A05: Security Misconfiguration', '✓', 'Helmet.js'],
              ['A06: Vulnerable Components', '✓', 'Regular updates'],
              ['A07: Auth Failures', '✓', 'Account lockout'],
              ['A08: Software Integrity', '✓', 'Signed JWTs'],
              ['A09: Logging Failures', '✓', 'Audit logging'],
              ['A10: SSRF', '✓', 'Input validation'],
            ].map(([item, status, impl]) => (
              <tr key={item} className="border-b border-border">
                <td className="py-3 px-4">{item}</td>
                <td className="py-3 px-4 text-success">{status}</td>
                <td className="py-3 px-4">{impl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Password Hashing"
          description="Deep dive into Argon2id configuration."
          href="/docs/security/hashing"
        />
        <LinkCard
          title="JWT Best Practices"
          description="Secure your token implementation."
          href="/docs/security/jwt"
        />
      </div>
    </DocsLayout>
  );
}
