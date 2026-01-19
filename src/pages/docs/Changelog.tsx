import { DocsLayout } from '@/components/DocsLayout';

const releases = [
  {
    version: '1.0.0',
    date: '2024-01-15',
    changes: [
      { type: 'feature', text: 'Initial release with full authentication system' },
      { type: 'feature', text: 'Email verification and password reset' },
      { type: 'feature', text: 'Multi-device session management' },
      { type: 'feature', text: 'Prisma and TypeORM support' },
      { type: 'feature', text: 'Docker configuration' },
    ],
  },
  {
    version: '0.9.0',
    date: '2024-01-01',
    changes: [
      { type: 'feature', text: 'Beta release' },
      { type: 'feature', text: 'CLI scaffolding tool' },
      { type: 'improvement', text: 'Improved error handling' },
    ],
  },
  {
    version: '0.8.0',
    date: '2023-12-15',
    changes: [
      { type: 'feature', text: 'Added jwise doctor command' },
      { type: 'fix', text: 'Fixed JWT refresh token rotation' },
      { type: 'improvement', text: 'Better TypeScript types' },
    ],
  },
];

const typeColors = {
  feature: 'bg-green-500/20 text-green-400',
  fix: 'bg-red-500/20 text-red-400',
  improvement: 'bg-blue-500/20 text-blue-400',
};

export default function ChangelogPage() {
  return (
    <DocsLayout
      title="Changelog"
      description="All notable changes to jwise."
    >
      <div className="space-y-12 mt-8">
        {releases.map((release) => (
          <div key={release.version}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground">v{release.version}</h2>
              <span className="text-sm text-muted-foreground">{release.date}</span>
            </div>
            <ul className="space-y-2">
              {release.changes.map((change, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${typeColors[change.type as keyof typeof typeColors]}`}>
                    {change.type}
                  </span>
                  <span className="text-muted-foreground">{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
}
