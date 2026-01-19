import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CustomModulesPage() {
  return (
    <DocsLayout
      title="Custom Modules"
      description="Learn how to create and integrate custom modules in your jwise project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Creating a Module</h2>
      <p className="text-muted-foreground mb-6">
        NestJS modules encapsulate related functionality. Here's how to create a custom module:
      </p>

      <CodeBlock
        code={`// src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}`}
        language="typescript"
        filename="notifications.module.ts"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Module Structure</h2>
      <CodeBlock
        code={`src/notifications/
├── notifications.module.ts
├── notifications.controller.ts
├── notifications.service.ts
├── dto/
│   ├── create-notification.dto.ts
│   └── update-notification.dto.ts
└── entities/
    └── notification.entity.ts`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Register in App Module</h2>
      <CodeBlock
        code={`// src/app.module.ts
import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    // ... other modules
    NotificationsModule,
  ],
})
export class AppModule {}`}
        language="typescript"
      />

      <Callout type="tip" title="CLI">
        Use <code>jwise generate resource notifications</code> to scaffold a complete module.
      </Callout>
    </DocsLayout>
  );
}
