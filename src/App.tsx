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
import EmailOverview from "./pages/docs/EmailOverview";
import SecurityOwasp from "./pages/docs/SecurityOwasp";
import CliNew from "./pages/docs/CliNew";
import DeploymentChecklist from "./pages/docs/DeploymentChecklist";
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
          {/* API Reference */}
          <Route path="/docs/api/auth-signup" element={<ApiAuthSignup />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
