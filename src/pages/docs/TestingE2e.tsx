import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function TestingE2ePage() {
  return (
    <DocsLayout
      title="E2E Testing"
      description="End-to-end testing for complete user flows."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Complete Auth Flow Test</h2>
      <CodeBlock
        code={`describe('Authentication Flow', () => {
  let accessToken: string;
  let refreshToken: string;

  it('should complete full auth flow', async () => {
    // 1. Sign up
    const signupRes = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'e2e@test.com',
        password: 'SecurePass123!',
      })
      .expect(201);

    // 2. Verify email (simulate)
    await prisma.user.update({
      where: { email: 'e2e@test.com' },
      data: { emailVerified: true },
    });

    // 3. Login
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'e2e@test.com',
        password: 'SecurePass123!',
      })
      .expect(200);

    accessToken = loginRes.body.accessToken;
    refreshToken = loginRes.body.refreshToken;

    // 4. Access protected route
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', \`Bearer \${accessToken}\`)
      .expect(200);

    // 5. Refresh token
    const refreshRes = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken })
      .expect(200);

    expect(refreshRes.body.accessToken).toBeDefined();

    // 6. Logout
    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', \`Bearer \${accessToken}\`)
      .expect(200);
  });
});`}
        language="typescript"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Run E2E Tests</h2>
      <CodeBlock
        code={`npm run test:e2e`}
        language="bash"
      />

      <Callout type="info" title="CI/CD">
        Run E2E tests in your CI/CD pipeline before deploying to production.
      </Callout>
    </DocsLayout>
  );
}
