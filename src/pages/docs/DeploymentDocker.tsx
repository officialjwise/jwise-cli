import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function DeploymentDockerPage() {
  return (
    <DocsLayout
      title="Docker Deployment"
      description="Deploy your jwise application with Docker."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Dockerfile</h2>
      <CodeBlock
        code={`# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]`}
        language="dockerfile"
        filename="Dockerfile"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Docker Compose</h2>
      <CodeBlock
        code={`version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}
        language="yaml"
        filename="docker-compose.yml"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Build & Run</h2>
      <CodeBlock
        code={`# Build image
docker build -t my-api .

# Run with compose
docker-compose up -d`}
        language="bash"
      />

      <Callout type="tip" title="Production">
        Use multi-stage builds to reduce image size.
      </Callout>
    </DocsLayout>
  );
}
