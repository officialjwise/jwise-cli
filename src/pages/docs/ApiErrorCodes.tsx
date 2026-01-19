import { DocsLayout } from '@/components/DocsLayout';
import { Callout } from '@/components/DocsComponents';

export default function ApiErrorCodesPage() {
  return (
    <DocsLayout
      title="Error Codes"
      description="Reference for all API error codes and their meanings."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">HTTP Status Codes</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Code</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-success">200</td>
              <td className="py-3 px-4">OK</td>
              <td className="py-3 px-4">Request successful</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-success">201</td>
              <td className="py-3 px-4">Created</td>
              <td className="py-3 px-4">Resource created successfully</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-warning">400</td>
              <td className="py-3 px-4">Bad Request</td>
              <td className="py-3 px-4">Invalid request body or parameters</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-destructive">401</td>
              <td className="py-3 px-4">Unauthorized</td>
              <td className="py-3 px-4">Missing or invalid authentication</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-destructive">403</td>
              <td className="py-3 px-4">Forbidden</td>
              <td className="py-3 px-4">Insufficient permissions</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-destructive">404</td>
              <td className="py-3 px-4">Not Found</td>
              <td className="py-3 px-4">Resource not found</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-warning">409</td>
              <td className="py-3 px-4">Conflict</td>
              <td className="py-3 px-4">Resource already exists</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-warning">429</td>
              <td className="py-3 px-4">Too Many Requests</td>
              <td className="py-3 px-4">Rate limit exceeded</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-destructive">500</td>
              <td className="py-3 px-4">Internal Server Error</td>
              <td className="py-3 px-4">Unexpected server error</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Authentication Errors</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Error</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Code</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Resolution</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4">Invalid credentials</td>
              <td className="py-3 px-4 font-mono">401</td>
              <td className="py-3 px-4">Check email/password</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Token expired</td>
              <td className="py-3 px-4 font-mono">401</td>
              <td className="py-3 px-4">Refresh the access token</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Account locked</td>
              <td className="py-3 px-4 font-mono">403</td>
              <td className="py-3 px-4">Wait for lockout period</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Email not verified</td>
              <td className="py-3 px-4 font-mono">403</td>
              <td className="py-3 px-4">Verify email first</td>
            </tr>
            <tr>
              <td className="py-3 px-4">User already exists</td>
              <td className="py-3 px-4 font-mono">409</td>
              <td className="py-3 px-4">Use different email</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Error Handling">
        Always check the response status code and handle errors gracefully in your frontend application.
      </Callout>
    </DocsLayout>
  );
}
