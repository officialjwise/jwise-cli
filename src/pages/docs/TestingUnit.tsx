import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function TestingUnitPage() {
  return (
    <DocsLayout
      title="Unit Testing"
      description="Write unit tests for your jwise application."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Testing Services</h2>
      <CodeBlock
        code={`import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
  });

  it('should validate user credentials', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      passwordHash: 'hashed',
    });

    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toBeDefined();
  });
});`}
        language="typescript"
        filename="auth.service.spec.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Run Tests</h2>
      <CodeBlock
        code={`npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:cov       # With coverage`}
        language="bash"
      />

      <Callout type="tip" title="Mocking">
        Use Jest mocks for external dependencies like databases and external APIs.
      </Callout>
    </DocsLayout>
  );
}
