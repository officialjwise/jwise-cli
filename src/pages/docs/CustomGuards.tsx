import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CustomGuardsPage() {
  return (
    <DocsLayout
      title="Custom Guards"
      description="Create authorization guards for route protection."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Roles Guard</h2>
      <CodeBlock
        code={`// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}`}
        language="typescript"
        filename="roles.guard.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Roles Decorator</h2>
      <CodeBlock
        code={`// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);`}
        language="typescript"
        filename="roles.decorator.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Usage</h2>
      <CodeBlock
        code={`@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  
  @Get('dashboard')
  @Roles('admin')
  getDashboard() {
    return { message: 'Admin dashboard' };
  }
  
  @Get('reports')
  @Roles('admin', 'manager')
  getReports() {
    return { message: 'Reports' };
  }
}`}
        language="typescript"
      />

      <Callout type="warning" title="Order Matters">
        Always apply JwtAuthGuard before RolesGuard to ensure user is authenticated first.
      </Callout>
    </DocsLayout>
  );
}
