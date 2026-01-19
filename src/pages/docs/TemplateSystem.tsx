import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function TemplateSystemPage() {
  return (
    <DocsLayout
      title="Template System"
      description="How jwise generates code using customizable templates."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">How It Works</h2>
      
      <p className="text-muted-foreground mb-6">
        jwise uses Handlebars templates to generate production-ready code. Each template is designed following NestJS best practices and can be customized for your needs.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Template Categories</h2>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { name: 'Authentication', count: '15+ files' },
          { name: 'Email Service', count: '8+ files' },
          { name: 'Database', count: '5+ files' },
          { name: 'Common Utilities', count: '10+ files' },
        ].map((cat) => (
          <div key={cat.name} className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-foreground">{cat.name}</p>
            <p className="text-sm text-muted-foreground">{cat.count}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Example: Controller Template</h2>

      <CodeBlock
        code={`import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { {{ServiceName}}Service } from './{{fileName}}.service';
import { Create{{ModelName}}Dto } from './dto/create-{{fileName}}.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('{{route}}')
export class {{ControllerName}}Controller {
  constructor(private readonly service: {{ServiceName}}Service) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: Create{{ModelName}}Dto) {
    return this.service.create(dto);
  }
}`}
        language="typescript"
        filename="controller.hbs"
      />

      <Callout type="info" title="Template Variables">
        Templates use Handlebars syntax with variables like {`{{ServiceName}}`}, {`{{fileName}}`}, etc. that are replaced during generation.
      </Callout>

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Customizing Templates</h2>

      <p className="text-muted-foreground mb-4">
        You can override default templates by creating a <code className="px-1.5 py-0.5 rounded bg-muted text-sm">.jwise/templates</code> directory in your project root.
      </p>

      <CodeBlock
        code={`my-project/
└── .jwise/
    └── templates/
        └── controller.hbs   # Your custom template`}
        language="text"
      />
    </DocsLayout>
  );
}
