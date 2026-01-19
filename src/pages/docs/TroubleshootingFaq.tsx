import { DocsLayout } from '@/components/DocsLayout';
import { Callout } from '@/components/DocsComponents';

const faqs = [
  {
    q: "How do I add custom fields to the User model?",
    a: "Edit the User model in your schema file (schema.prisma or user.entity.ts) and run a migration."
  },
  {
    q: "Can I use MongoDB instead of PostgreSQL?",
    a: "Yes! Use Prisma with MongoDB or switch to Mongoose. Update DATABASE_URL accordingly."
  },
  {
    q: "How do I change the JWT expiration time?",
    a: "Set JWT_ACCESS_EXPIRES and JWT_REFRESH_EXPIRES in your .env file. Example: JWT_ACCESS_EXPIRES=30m"
  },
  {
    q: "Why are emails not being sent?",
    a: "Check SMTP credentials, ensure your email provider allows SMTP access, and check firewall/port settings."
  },
  {
    q: "How do I add OAuth (Google, GitHub)?",
    a: "Use Passport.js strategies. Install passport-google-oauth20 or passport-github2 and add the corresponding strategy."
  },
  {
    q: "Can I deploy without Docker?",
    a: "Yes! Build with 'npm run build' and run 'node dist/main.js'. Ensure environment variables are set."
  },
  {
    q: "How do I handle file uploads?",
    a: "Use @nestjs/platform-express with Multer. Consider S3 or other cloud storage for production."
  },
  {
    q: "Is jwise suitable for production?",
    a: "Absolutely! jwise generates production-ready code with security best practices built-in."
  },
];

export default function TroubleshootingFaqPage() {
  return (
    <DocsLayout
      title="Frequently Asked Questions"
      description="Common questions about jwise and their answers."
    >
      <div className="space-y-6 mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
            <p className="text-muted-foreground text-sm">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Callout type="info" title="Need More Help?">
          Join our Discord community or open an issue on GitHub.
        </Callout>
      </div>
    </DocsLayout>
  );
}
