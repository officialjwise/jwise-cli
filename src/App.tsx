import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuickStart from "./pages/docs/QuickStart";
import Installation from "./pages/docs/Installation";
import AuthenticationOverview from "./pages/docs/AuthenticationOverview";
import ApiAuthSignup from "./pages/docs/ApiAuthSignup";
import ApiAuthLogin from "./pages/docs/ApiAuthLogin";
import ApiAuthRefresh from "./pages/docs/ApiAuthRefresh";
import ApiAuthLogout from "./pages/docs/ApiAuthLogout";
import ApiAuthSessions from "./pages/docs/ApiAuthSessions";
import ApiEmailVerification from "./pages/docs/ApiEmailVerification";
import ApiPasswordReset from "./pages/docs/ApiPasswordReset";
import EmailOverview from "./pages/docs/EmailOverview";
import SecurityOwasp from "./pages/docs/SecurityOwasp";
import CliNew from "./pages/docs/CliNew";
import DeploymentChecklist from "./pages/docs/DeploymentChecklist";
import DatabasePrisma from "./pages/docs/DatabasePrisma";
import DatabaseTypeorm from "./pages/docs/DatabaseTypeorm";
import ExampleBasicAuth from "./pages/docs/ExampleBasicAuth";
import ExampleFullstack from "./pages/docs/ExampleFullstack";
import ExampleMicroservices from "./pages/docs/ExampleMicroservices";
import NotFound from "./pages/NotFound";

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
          {/* Authentication */}
          <Route path="/docs/authentication/overview" element={<AuthenticationOverview />} />
          {/* Email */}
          <Route path="/docs/email/overview" element={<EmailOverview />} />
          {/* Security */}
          <Route path="/docs/security/owasp" element={<SecurityOwasp />} />
          {/* CLI */}
          <Route path="/docs/cli/new" element={<CliNew />} />
          {/* Deployment */}
          <Route path="/docs/deployment/checklist" element={<DeploymentChecklist />} />
          {/* Database */}
          <Route path="/docs/database/prisma" element={<DatabasePrisma />} />
          <Route path="/docs/database/typeorm" element={<DatabaseTypeorm />} />
          {/* API Reference */}
          <Route path="/docs/api/auth-signup" element={<ApiAuthSignup />} />
          <Route path="/docs/api/auth-login" element={<ApiAuthLogin />} />
          <Route path="/docs/api/auth-refresh" element={<ApiAuthRefresh />} />
          <Route path="/docs/api/auth-logout" element={<ApiAuthLogout />} />
          <Route path="/docs/api/auth-sessions" element={<ApiAuthSessions />} />
          <Route path="/docs/api/email-verification" element={<ApiEmailVerification />} />
          <Route path="/docs/api/password-reset" element={<ApiPasswordReset />} />
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
