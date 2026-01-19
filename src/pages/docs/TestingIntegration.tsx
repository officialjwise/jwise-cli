import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function TestingIntegrationPage() {
  return (
    <DocsLayout
      title="Integration Testing"
      description="Test API endpoints with integration tests."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Controller Integration Test</h2>
      <CodeBlock
        code={`import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'SecurePass123!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.user.email).toBe('test@example.com');
        });
    });

    it('should reject weak password', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test2@example.com',
          password: '123',
        })
        .expect(400);
    });
  });
});`}
        language="typescript"
        filename="auth.e2e-spec.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Database Setup</h2>
      <CodeBlock
        code={`// test/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  // Clean up before each test
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});`}
        language="typescript"
      />

      <Callout type="warning" title="Test Database">
        Use a separate test database to avoid affecting development data.
      </Callout>
    </DocsLayout>
  );
}
