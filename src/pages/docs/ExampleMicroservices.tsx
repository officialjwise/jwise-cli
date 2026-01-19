import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, LinkCard } from '@/components/DocsComponents';

export default function ExampleMicroservicesPage() {
  return (
    <DocsLayout
      title="Microservices Example"
      description="Scale your jwise application to a microservices architecture."
    >
      <Callout type="info">
        This example shows how to evolve a jwise monolith into a microservices architecture using NestJS microservices.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Architecture Overview</h2>

      <CodeBlock
        code={`┌──────────────────────────────────────────────────────────────┐
│                        API Gateway                            │
│                    (NestJS + JWT Validation)                  │
└─────────────────────────────┬────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Auth Service   │ │  User Service   │ │  Email Service  │
│   (jwise gen)   │ │                 │ │                 │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ • Registration  │ │ • User CRUD     │ │ • Send emails   │
│ • Login/Logout  │ │ • Profile mgmt  │ │ • Templates     │
│ • Token mgmt    │ │ • Preferences   │ │ • Queue jobs    │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         ▼                   ▼                   ▼
    ┌─────────┐         ┌─────────┐         ┌─────────┐
    │ Auth DB │         │ User DB │         │  Redis  │
    └─────────┘         └─────────┘         └─────────┘`}
        language="text"
        filename="Architecture"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Project Structure</h2>

      <CodeBlock
        code={`microservices-app/
├── apps/
│   ├── api-gateway/           # HTTP entry point
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── app.module.ts
│   │   └── Dockerfile
│   ├── auth-service/          # jwise-generated auth
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── main.ts
│   │   │   └── app.module.ts
│   │   └── Dockerfile
│   ├── user-service/
│   │   └── ...
│   └── email-service/
│       └── ...
├── libs/
│   └── common/
│       ├── dto/               # Shared DTOs
│       ├── interfaces/        # Shared interfaces
│       └── constants/         # Shared constants
├── docker-compose.yml
└── package.json`}
        language="text"
        filename="Project Structure"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Setting Up the Monorepo</h2>

      <CodeBlock
        code={`# Create NestJS monorepo
nest new microservices-app
cd microservices-app

# Generate applications
nest g app api-gateway
nest g app auth-service
nest g app user-service
nest g app email-service

# Generate shared library
nest g lib common`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Auth Service (TCP Transport)</h2>

      <CodeBlock
        code={`// apps/auth-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    },
  );
  await app.listen();
  console.log('Auth microservice is listening on port 3001');
}
bootstrap();`}
        language="typescript"
        filename="auth-service/main.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Auth Service Controller</h2>

      <CodeBlock
        code={`// apps/auth-service/src/auth/auth.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'signup' })
  async signup(@Payload() data: SignupDto) {
    return this.authService.signup(data);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data: LoginDto) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(@Payload() data: { token: string }) {
    return this.authService.validateToken(data.token);
  }

  @MessagePattern({ cmd: 'refresh' })
  async refresh(@Payload() data: { refreshToken: string }) {
    return this.authService.refresh(data.refreshToken);
  }
}`}
        language="typescript"
        filename="auth.controller.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">API Gateway</h2>

      <CodeBlock
        code={`// apps/api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || 'localhost',
          port: 3001,
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AppModule {}`}
        language="typescript"
        filename="api-gateway/app.module.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Gateway Auth Controller</h2>

      <CodeBlock
        code={`// apps/api-gateway/src/auth/auth.controller.ts
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return firstValueFrom(
      this.authClient.send({ cmd: 'signup' }, dto)
    );
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return firstValueFrom(
      this.authClient.send({ cmd: 'login' }, dto)
    );
  }
}`}
        language="typescript"
        filename="gateway/auth.controller.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Docker Compose</h2>

      <CodeBlock
        code={`# docker-compose.yml
version: '3.8'

services:
  api-gateway:
    build:
      context: .
      dockerfile: apps/api-gateway/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - AUTH_SERVICE_HOST=auth-service
      - USER_SERVICE_HOST=user-service
    depends_on:
      - auth-service
      - user-service

  auth-service:
    build:
      context: .
      dockerfile: apps/auth-service/Dockerfile
    environment:
      - DATABASE_URL=postgresql://postgres:password@auth-db:5432/auth
    depends_on:
      - auth-db

  user-service:
    build:
      context: .
      dockerfile: apps/user-service/Dockerfile
    environment:
      - DATABASE_URL=postgresql://postgres:password@user-db:5432/users
    depends_on:
      - user-db

  email-service:
    build:
      context: .
      dockerfile: apps/email-service/Dockerfile
    environment:
      - REDIS_URL=redis://redis:6379

  auth-db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=auth
    volumes:
      - auth-data:/var/lib/postgresql/data

  user-db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=users
    volumes:
      - user-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  auth-data:
  user-data:`}
        language="yaml"
        filename="docker-compose.yml"
        showLineNumbers
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Running the Stack</h2>

      <CodeBlock
        code={`# Build and start all services
docker-compose up --build

# Scale a specific service
docker-compose up --scale auth-service=3`}
        language="bash"
      />

      <Callout type="tip" title="Production Considerations">
        For production, consider using Kubernetes, adding service mesh (Istio), implementing circuit breakers, and using a message broker (RabbitMQ/Kafka) for async communication.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Kubernetes Deployment"
          description="Deploy microservices to Kubernetes."
          href="/docs/deployment/kubernetes"
        />
        <LinkCard
          title="Basic Auth Example"
          description="Start with a simpler monolith."
          href="/docs/examples/basic-auth"
        />
      </div>
    </DocsLayout>
  );
}
