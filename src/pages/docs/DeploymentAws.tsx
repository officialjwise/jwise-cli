import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, LinkCard } from '@/components/DocsComponents';

export default function DeploymentAwsPage() {
  return (
    <DocsLayout
      title="AWS Deployment"
      description="Deploy your jwise application on AWS."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Deployment Options</h2>

      <div className="grid gap-4 mb-8">
        {[
          { name: 'AWS App Runner', desc: 'Fully managed, easiest option', best: 'Small to medium apps' },
          { name: 'ECS Fargate', desc: 'Serverless containers', best: 'Scalable workloads' },
          { name: 'ECS on EC2', desc: 'Container orchestration', best: 'Cost optimization' },
          { name: 'Elastic Beanstalk', desc: 'PaaS solution', best: 'Quick deployments' },
        ].map((option) => (
          <div key={option.name} className="p-4 rounded-lg border border-border bg-card">
            <h4 className="font-semibold text-foreground">{option.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
            <span className="text-xs text-accent mt-2 block">Best for: {option.best}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">App Runner (Recommended)</h2>
      <CodeBlock
        code={`# apprunner.yaml
version: 1.0
runtime: nodejs18
build:
  commands:
    pre-build:
      - npm ci
    build:
      - npm run build
run:
  runtime-version: 18
  command: node dist/main.js
  network:
    port: 3000
  env:
    - name: NODE_ENV
      value: production`}
        language="yaml"
        filename="apprunner.yaml"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">RDS for Database</h2>
      <CodeBlock
        code={`# Connection string format
DATABASE_URL="postgresql://user:password@your-rds.region.rds.amazonaws.com:5432/dbname"`}
        language="bash"
      />

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <LinkCard title="Docker Deployment" description="Container basics" href="/docs/deployment/docker" />
        <LinkCard title="Production Checklist" description="Pre-launch checks" href="/docs/deployment/checklist" />
      </div>
    </DocsLayout>
  );
}
