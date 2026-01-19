import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CustomDecoratorsPage() {
  return (
    <DocsLayout
      title="Custom Decorators"
      description="Create reusable decorators for common patterns."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Parameter Decorators</h2>
      <p className="text-muted-foreground mb-6">
        Extract common data from requests with custom parameter decorators:
      </p>

      <CodeBlock
        code={`// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    return data ? user?.[data] : user;
  },
);

// Usage:
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}

@Get('email')
getEmail(@CurrentUser('email') email: string) {
  return { email };
}`}
        language="typescript"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Composite Decorators</h2>
      <CodeBlock
        code={`// src/common/decorators/auth.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: string[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

// Usage:
@Auth('admin')
@Get('admin-only')
adminEndpoint() {
  return { message: 'Admin access' };
}`}
        language="typescript"
      />

      <Callout type="tip" title="Organization">
        Keep decorators in <code>src/common/decorators/</code> for easy reuse.
      </Callout>
    </DocsLayout>
  );
}
