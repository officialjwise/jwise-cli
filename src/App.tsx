import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
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
import AuthRegistration from "./pages/docs/AuthRegistration";
import AuthLogin from "./pages/docs/AuthLogin";
import AuthTokenRefresh from "./pages/docs/AuthTokenRefresh";
import AuthEmailVerification from "./pages/docs/AuthEmailVerification";
import AuthPasswordReset from "./pages/docs/AuthPasswordReset";
import AuthSessions from "./pages/docs/AuthSessions";
import AuthSecurity from "./pages/docs/AuthSecurity";

// Email
import EmailOverview from "./pages/docs/EmailOverview";
import SmtpConfig from "./pages/docs/SmtpConfig";
import EmailTemplates from "./pages/docs/EmailTemplates";
import EmailCustomizing from "./pages/docs/EmailCustomizing";
import EmailProviders from "./pages/docs/EmailProviders";

// Database
import DatabasePrisma from "./pages/docs/DatabasePrisma";
import DatabaseTypeorm from "./pages/docs/DatabaseTypeorm";
import DatabaseMigrations from "./pages/docs/DatabaseMigrations";
import DatabaseSchema from "./pages/docs/DatabaseSchema";

// CLI
import CliNew from "./pages/docs/CliNew";
import CliAdd from "./pages/docs/CliAdd";
import CliGenerate from "./pages/docs/CliGenerate";
import CliDoctor from "./pages/docs/CliDoctor";
import CliOptions from "./pages/docs/CliOptions";

// API Reference
import ApiOverview from "./pages/docs/ApiOverview";
import ApiAuthSignup from "./pages/docs/ApiAuthSignup";
import ApiAuthLogin from "./pages/docs/ApiAuthLogin";
import ApiAuthRefresh from "./pages/docs/ApiAuthRefresh";
import ApiAuthLogout from "./pages/docs/ApiAuthLogout";
import ApiAuthMe from "./pages/docs/ApiAuthMe";
import ApiAuthSessions from "./pages/docs/ApiAuthSessions";
import ApiEmailEndpoints from "./pages/docs/ApiEmailEndpoints";
import ApiEmailVerification from "./pages/docs/ApiEmailVerification";
import ApiPasswordReset from "./pages/docs/ApiPasswordReset";
import ApiErrorCodes from "./pages/docs/ApiErrorCodes";

// Customization
import CustomModules from "./pages/docs/CustomModules";
import CustomTemplates from "./pages/docs/CustomTemplates";
import CustomDecorators from "./pages/docs/CustomDecorators";
import CustomGuards from "./pages/docs/CustomGuards";

// Security
import SecurityOwasp from "./pages/docs/SecurityOwasp";
import SecurityHashing from "./pages/docs/SecurityHashing";
import SecurityJwt from "./pages/docs/SecurityJwt";
import SecurityRateLimiting from "./pages/docs/SecurityRateLimiting";

// Deployment
import DeploymentChecklist from "./pages/docs/DeploymentChecklist";
import DeploymentDocker from "./pages/docs/DeploymentDocker";
import DeploymentKubernetes from "./pages/docs/DeploymentKubernetes";
import DeploymentAws from "./pages/docs/DeploymentAws";

// Testing
import TestingUnit from "./pages/docs/TestingUnit";
import TestingIntegration from "./pages/docs/TestingIntegration";
import TestingE2e from "./pages/docs/TestingE2e";

// Troubleshooting
import TroubleshootingErrors from "./pages/docs/TroubleshootingErrors";
import TroubleshootingDatabase from "./pages/docs/TroubleshootingDatabase";
import TroubleshootingFaq from "./pages/docs/TroubleshootingFaq";

// Examples
import ExampleBasicAuth from "./pages/docs/ExampleBasicAuth";
import ExampleFullstack from "./pages/docs/ExampleFullstack";
import ExampleMicroservices from "./pages/docs/ExampleMicroservices";

// Other
import Contributing from "./pages/docs/Contributing";
import Changelog from "./pages/docs/Changelog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          
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
          <Route path="/docs/authentication/registration" element={<AuthRegistration />} />
          <Route path="/docs/authentication/login" element={<AuthLogin />} />
          <Route path="/docs/authentication/token-refresh" element={<AuthTokenRefresh />} />
          <Route path="/docs/authentication/email-verification" element={<AuthEmailVerification />} />
          <Route path="/docs/authentication/password-reset" element={<AuthPasswordReset />} />
          <Route path="/docs/authentication/sessions" element={<AuthSessions />} />
          <Route path="/docs/authentication/security" element={<AuthSecurity />} />
          
          {/* Email */}
          <Route path="/docs/email/overview" element={<EmailOverview />} />
          <Route path="/docs/email/smtp-config" element={<SmtpConfig />} />
          <Route path="/docs/email/templates" element={<EmailTemplates />} />
          <Route path="/docs/email/customizing" element={<EmailCustomizing />} />
          <Route path="/docs/email/providers" element={<EmailProviders />} />
          
          {/* Database */}
          <Route path="/docs/database/prisma" element={<DatabasePrisma />} />
          <Route path="/docs/database/typeorm" element={<DatabaseTypeorm />} />
          <Route path="/docs/database/migrations" element={<DatabaseMigrations />} />
          <Route path="/docs/database/schema" element={<DatabaseSchema />} />
          
          {/* CLI */}
          <Route path="/docs/cli/new" element={<CliNew />} />
          <Route path="/docs/cli/add" element={<CliAdd />} />
          <Route path="/docs/cli/generate" element={<CliGenerate />} />
          <Route path="/docs/cli/doctor" element={<CliDoctor />} />
          <Route path="/docs/cli/options" element={<CliOptions />} />
          
          {/* Customization */}
          <Route path="/docs/customization/modules" element={<CustomModules />} />
          <Route path="/docs/customization/templates" element={<CustomTemplates />} />
          <Route path="/docs/customization/decorators" element={<CustomDecorators />} />
          <Route path="/docs/customization/guards" element={<CustomGuards />} />
          
          {/* Security */}
          <Route path="/docs/security/owasp" element={<SecurityOwasp />} />
          <Route path="/docs/security/hashing" element={<SecurityHashing />} />
          <Route path="/docs/security/jwt" element={<SecurityJwt />} />
          <Route path="/docs/security/rate-limiting" element={<SecurityRateLimiting />} />
          
          {/* Deployment */}
          <Route path="/docs/deployment/checklist" element={<DeploymentChecklist />} />
          <Route path="/docs/deployment/docker" element={<DeploymentDocker />} />
          <Route path="/docs/deployment/kubernetes" element={<DeploymentKubernetes />} />
          <Route path="/docs/deployment/aws" element={<DeploymentAws />} />
          
          {/* Testing */}
          <Route path="/docs/testing/unit" element={<TestingUnit />} />
          <Route path="/docs/testing/integration" element={<TestingIntegration />} />
          <Route path="/docs/testing/e2e" element={<TestingE2e />} />
          
          {/* Troubleshooting */}
          <Route path="/docs/troubleshooting/errors" element={<TroubleshootingErrors />} />
          <Route path="/docs/troubleshooting/database" element={<TroubleshootingDatabase />} />
          <Route path="/docs/troubleshooting/faq" element={<TroubleshootingFaq />} />
          
          {/* API Reference */}
          <Route path="/docs/api/overview" element={<ApiOverview />} />
          <Route path="/docs/api/auth-signup" element={<ApiAuthSignup />} />
          <Route path="/docs/api/auth-login" element={<ApiAuthLogin />} />
          <Route path="/docs/api/auth-refresh" element={<ApiAuthRefresh />} />
          <Route path="/docs/api/auth-logout" element={<ApiAuthLogout />} />
          <Route path="/docs/api/auth-me" element={<ApiAuthMe />} />
          <Route path="/docs/api/auth-sessions" element={<ApiAuthSessions />} />
          <Route path="/docs/api/email-endpoints" element={<ApiEmailEndpoints />} />
          <Route path="/docs/api/email-verification" element={<ApiEmailVerification />} />
          <Route path="/docs/api/password-reset" element={<ApiPasswordReset />} />
          <Route path="/docs/api/error-codes" element={<ApiErrorCodes />} />
          
          {/* Examples */}
          <Route path="/docs/examples/basic-auth" element={<ExampleBasicAuth />} />
          <Route path="/docs/examples/fullstack" element={<ExampleFullstack />} />
          <Route path="/docs/examples/microservices" element={<ExampleMicroservices />} />
          
          {/* Other */}
          <Route path="/docs/contributing" element={<Contributing />} />
          <Route path="/docs/changelog" element={<Changelog />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
