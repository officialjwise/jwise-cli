import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock } from '@/components/DocsComponents';

export default function DeploymentKubernetesPage() {
  return (
    <DocsLayout
      title="Kubernetes Deployment"
      description="Deploy your jwise application on Kubernetes."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Deployment</h2>
      <CodeBlock
        code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: jwise-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: jwise-api
  template:
    metadata:
      labels:
        app: jwise-api
    spec:
      containers:
      - name: api
        image: my-registry/jwise-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: database-url
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
          requests:
            memory: "128Mi"
            cpu: "250m"`}
        language="yaml"
        filename="deployment.yaml"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Service</h2>
      <CodeBlock
        code={`apiVersion: v1
kind: Service
metadata:
  name: jwise-api
spec:
  selector:
    app: jwise-api
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP`}
        language="yaml"
        filename="service.yaml"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Ingress</h2>
      <CodeBlock
        code={`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: jwise-api
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: jwise-api
            port:
              number: 80`}
        language="yaml"
        filename="ingress.yaml"
      />
    </DocsLayout>
  );
}
