import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, LinkCard } from '@/components/DocsComponents';

export default function EmailProvidersPage() {
  return (
    <DocsLayout
      title="Email Providers"
      description="Recommended email service providers for production use."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Recommended Providers</h2>

      <div className="grid gap-6 mb-8">
        {[
          { name: 'SendGrid', desc: 'Popular choice with generous free tier (100 emails/day)', pricing: 'Free tier available' },
          { name: 'AWS SES', desc: 'Cost-effective for high volume, requires AWS account', pricing: '$0.10 per 1,000 emails' },
          { name: 'Mailgun', desc: 'Developer-friendly with excellent API', pricing: 'Free tier: 5,000 emails/month' },
          { name: 'Postmark', desc: 'Known for high deliverability rates', pricing: '$10/month for 10,000 emails' },
          { name: 'Resend', desc: 'Modern email API, great developer experience', pricing: 'Free tier: 3,000 emails/month' },
        ].map((provider) => (
          <div key={provider.name} className="p-4 rounded-lg border border-border bg-card">
            <h4 className="font-semibold text-foreground">{provider.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{provider.desc}</p>
            <span className="text-xs text-accent mt-2 block">{provider.pricing}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Provider Comparison</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">Provider</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Best For</th>
              <th className="text-left py-3 px-4 text-foreground font-semibold">Deliverability</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-3 px-4">SendGrid</td>
              <td className="py-3 px-4">General use, startups</td>
              <td className="py-3 px-4">Excellent</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">AWS SES</td>
              <td className="py-3 px-4">High volume, AWS users</td>
              <td className="py-3 px-4">Very Good</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4">Postmark</td>
              <td className="py-3 px-4">Transactional emails</td>
              <td className="py-3 px-4">Excellent</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Resend</td>
              <td className="py-3 px-4">Modern apps, developers</td>
              <td className="py-3 px-4">Very Good</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <LinkCard title="SMTP Configuration" description="Configure your provider" href="/docs/email/smtp-config" />
        <LinkCard title="Email Templates" description="Customize email content" href="/docs/email/templates" />
      </div>
    </DocsLayout>
  );
}
