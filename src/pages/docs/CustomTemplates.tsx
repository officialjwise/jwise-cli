import { DocsLayout } from '@/components/DocsLayout';
import { CodeBlock, Callout } from '@/components/DocsComponents';

export default function CustomTemplatesPage() {
  return (
    <DocsLayout
      title="Modifying Templates"
      description="Customize the generated code templates in your jwise project."
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Template Location</h2>
      <p className="text-muted-foreground mb-6">
        jwise templates can be overridden by creating a <code className="text-accent">.jwise</code> directory in your project root.
      </p>

      <CodeBlock
        code={`.jwise/
└── templates/
    ├── controller.hbs
    ├── service.hbs
    ├── module.hbs
    └── dto.hbs`}
        language="bash"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Custom Controller Template</h2>
      <CodeBlock
        code={`// .jwise/templates/controller.hbs
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { {{pascalCase name}}Service } from './{{kebabCase name}}.service';
import { Create{{pascalCase name}}Dto } from './dto/create-{{kebabCase name}}.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('{{kebabCase name}}')
@ApiBearerAuth()
@Controller('{{kebabCase name}}')
export class {{pascalCase name}}Controller {
  constructor(private readonly {{camelCase name}}Service: {{pascalCase name}}Service) {}

  @Post()
  create(@Body() create{{pascalCase name}}Dto: Create{{pascalCase name}}Dto) {
    return this.{{camelCase name}}Service.create(create{{pascalCase name}}Dto);
  }

  // ... more methods
}`}
        language="handlebars"
        filename="controller.hbs"
      />

      <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">Available Variables</h2>
      <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
        <li><code>name</code> - Resource name as provided</li>
        <li><code>pascalCase name</code> - PascalCase version</li>
        <li><code>camelCase name</code> - camelCase version</li>
        <li><code>kebabCase name</code> - kebab-case version</li>
      </ul>

      <Callout type="info" title="Handlebars">
        Templates use Handlebars syntax with additional helpers for case conversion.
      </Callout>
    </DocsLayout>
  );
}
