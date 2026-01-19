import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function SecurityRateLimitingPage() {
  return (
    <DocsLayout
      title="Rate Limiting"
      description="Protect your API from abuse with rate limiting."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Configuration</h2>
      <CodeBlock
        code={`# .env
THROTTLE_TTL=60      # Time window in seconds
THROTTLE_LIMIT=10    # Max requests per window`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Implementation</h2>
      <CodeBlock
        code={`// app.module.ts
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.THROTTLE_TTL) * 1000,
      limit: parseInt(process.env.THROTTLE_LIMIT),
    }]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}`}
        language="typescript"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Custom Limits per Route</h2>
      <CodeBlock
        code={`import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  
  // Stricter limit for login (5 attempts per minute)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  login() {}
  
  // Skip throttling for this route
  @SkipThrottle()
  @Get('health')
  health() {}
}`}
        language="typescript"
      />

      <Callout type="info" title="Headers">
        Rate limit info is returned in response headers: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>.
      </Callout>
    </DocsLayout>
  );
}
