import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout, Step, LinkCard } from '@/components/DocsComponents';

export default function ExampleFullstackPage() {
  return (
    <DocsLayout
      title="Full-Stack App Example"
      description="Build a complete full-stack application with jwise backend and React frontend."
    >
      <Callout type="info">
        This example demonstrates integrating a jwise-generated NestJS backend with a React + Vite frontend.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Architecture Overview</h2>

      <CodeBlock
        code={`┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │   Login     │ │  Register   │ │     Dashboard       ││
│  │   Page      │ │    Page     │ │  (Protected Route)  ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
│                           │                              │
│                    HTTP Requests                         │
│                           │                              │
└───────────────────────────┼──────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend (NestJS)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Auth Module (jwise)                  │   │
│  │  • POST /auth/signup    • POST /auth/login       │   │
│  │  • POST /auth/refresh   • GET /auth/me           │   │
│  │  • POST /auth/logout    • GET /auth/sessions     │   │
│  └──────────────────────────────────────────────────┘   │
│                           │                              │
│                     PostgreSQL                           │
└─────────────────────────────────────────────────────────┘`}
        language="text"
        filename="Architecture"
      />

      <Step number={1} title="Create the Backend">
        <CodeBlock
          code={`jwise new fullstack-backend --auth -d postgres -o prisma
cd fullstack-backend
cp .env.example .env
node scripts/generate-keys.js
npx prisma migrate dev --name init
npm run start:dev`}
          language="bash"
        />
      </Step>

      <Step number={2} title="Configure CORS">
        <p className="mb-4">Update <code className="px-1.5 py-0.5 rounded bg-muted text-sm">src/main.ts</code> to allow frontend requests:</p>
        <CodeBlock
          code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });
  
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();`}
          language="typescript"
          filename="main.ts"
        />
      </Step>

      <Step number={3} title="Create React Frontend">
        <CodeBlock
          code={`cd ..
npm create vite@latest fullstack-frontend -- --template react-ts
cd fullstack-frontend
npm install axios react-router-dom @tanstack/react-query`}
          language="bash"
        />
      </Step>

      <Step number={4} title="Create Auth Context">
        <CodeBlock
          code={`// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.tokens.refreshToken);
    api.defaults.headers.common['Authorization'] = \`Bearer \${data.tokens.accessToken}\`;
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};`}
          language="typescript"
          filename="AuthContext.tsx"
          showLineNumbers
        />
      </Step>

      <Step number={5} title="Create Login Page">
        <CodeBlock
          code={`// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}`}
          language="typescript"
          filename="Login.tsx"
        />
      </Step>

      <Step number={6} title="Create Protected Route">
        <CodeBlock
          code={`// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}`}
          language="typescript"
          filename="ProtectedRoute.tsx"
        />
      </Step>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Token Refresh Strategy</h2>

      <p className="text-muted-foreground mb-4">
        Add an Axios interceptor to automatically refresh tokens:
      </p>

      <CodeBlock
        code={`// Add to AuthContext.tsx
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await api.post('/auth/refresh', { refreshToken });
        
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
        
        api.defaults.headers.common['Authorization'] = \`Bearer \${data.tokens.accessToken}\`;
        originalRequest.headers['Authorization'] = \`Bearer \${data.tokens.accessToken}\`;
        
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);`}
        language="typescript"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Next Steps</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <LinkCard
          title="Basic Auth Example"
          description="Start with a simpler backend-only example."
          href="/docs/examples/basic-auth"
        />
        <LinkCard
          title="Microservices Example"
          description="Scale to microservices architecture."
          href="/docs/examples/microservices"
        />
      </div>
    </DocsLayout>
  );
}
