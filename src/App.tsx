import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Getting Started
import Installation from "./pages/docs/Installation";
import QuickStart from "./pages/docs/QuickStart";
import FirstProject from "./pages/docs/FirstProject";
import CliCommands from "./pages/docs/CliCommands";

// Core Concepts
import ProjectStructure from "./pages/docs/ProjectStructure";
import TemplateSystem from "./pages/docs/TemplateSystem";
import OrmSupport from "./pages/docs/OrmSupport";
import DatabaseConfig from "./pages/docs/DatabaseConfig";
import EnvVariables from "./pages/docs/EnvVariables";

// Authentication
import AuthenticationOverview from "./pages/docs/AuthenticationOverview";

// Email
import EmailOverview from "./pages/docs/EmailOverview";

// Database
import DatabasePrisma from "./pages/docs/DatabasePrisma";
import DatabaseTypeorm from "./pages/docs/DatabaseTypeorm";

// CLI
import CliNew from "./pages/docs/CliNew";

// Security
import SecurityOwasp from "./pages/docs/SecurityOwasp";

// Deployment
import DeploymentChecklist from "./pages/docs/DeploymentChecklist";

// API Reference
import ApiOverview from "./pages/docs/ApiOverview";
import ApiAuthSignup from "./pages/docs/ApiAuthSignup";
import ApiAuthLogin from "./pages/docs/ApiAuthLogin";
import ApiAuthRefresh from "./pages/docs/ApiAuthRefresh";
import ApiAuthLogout from "./pages/docs/ApiAuthLogout";
import ApiAuthMe from "./pages/docs/ApiAuthMe";
import ApiAuthSessions from "./pages/docs/ApiAuthSessions";
import ApiEmailVerification from "./pages/docs/ApiEmailVerification";
import ApiPasswordReset from "./pages/docs/ApiPasswordReset";
import ApiErrorCodes from "./pages/docs/ApiErrorCodes";

// Examples
import ExampleBasicAuth from "./pages/docs/ExampleBasicAuth";
import ExampleFullstack from "./pages/docs/ExampleFullstack";
import ExampleMicroservices from "./pages/docs/ExampleMicroservices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Getting Started */}
          <Route path="/docs/getting-started/installation" element={<Installation />} />
          <Route path="/docs/getting-started/quick-start" element={<QuickStart />} />
          <Route path="/docs/getting-started/first-project" element={<FirstProject />} />
          <Route path="/docs/getting-started/cli-commands" element={<CliCommands />} />
          
          {/* Core Concepts */}
          <Route path="/docs/core-concepts/project-structure" element={<ProjectStructure />} />
          <Route path="/docs/core-concepts/template-system" element={<TemplateSystem />} />
          <Route path="/docs/core-concepts/orm-support" element={<OrmSupport />} />
          <Route path="/docs/core-concepts/database-config" element={<DatabaseConfig />} />
          <Route path="/docs/core-concepts/env-variables" element={<EnvVariables />} />
          
          {/* Authentication */}
          <Route path="/docs/authentication/overview" element={<AuthenticationOverview />} />
          
          {/* Email */}
          <Route path="/docs/email/overview" element={<EmailOverview />} />
          
          {/* Database */}
          <Route path="/docs/database/prisma" element={<DatabasePrisma />} />
          <Route path="/docs/database/typeorm" element={<DatabaseTypeorm />} />
          
          {/* CLI */}
          <Route path="/docs/cli/new" element={<CliNew />} />
          
          {/* Security */}
          <Route path="/docs/security/owasp" element={<SecurityOwasp />} />
          
          {/* Deployment */}
          <Route path="/docs/deployment/checklist" element={<DeploymentChecklist />} />
          
          {/* API Reference */}
          <Route path="/docs/api/overview" element={<ApiOverview />} />
          <Route path="/docs/api/auth-signup" element={<ApiAuthSignup />} />
          <Route path="/docs/api/auth-login" element={<ApiAuthLogin />} />
          <Route path="/docs/api/auth-refresh" element={<ApiAuthRefresh />} />
          <Route path="/docs/api/auth-logout" element={<ApiAuthLogout />} />
          <Route path="/docs/api/auth-me" element={<ApiAuthMe />} />
          <Route path="/docs/api/auth-sessions" element={<ApiAuthSessions />} />
          <Route path="/docs/api/email-verification" element={<ApiEmailVerification />} />
          <Route path="/docs/api/password-reset" element={<ApiPasswordReset />} />
          <Route path="/docs/api/error-codes" element={<ApiErrorCodes />} />
          
          {/* Examples */}
          <Route path="/docs/examples/basic-auth" element={<ExampleBasicAuth />} />
          <Route path="/docs/examples/fullstack" element={<ExampleFullstack />} />
          <Route path="/docs/examples/microservices" element={<ExampleMicroservices />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
