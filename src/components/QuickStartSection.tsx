import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

const packageManagers = ['npm', 'yarn', 'pnpm'] as const;
type PackageManager = typeof packageManagers[number];

const commands: Record<PackageManager, string[]> = {
  npm: [
    'npm install -g jwise',
    'jwise new my-app --auth -d postgres -o prisma',
    'cd my-app',
    'cp .env.example .env',
    'node scripts/generate-keys.js',
    'npx prisma migrate dev --name init',
    'npm run start:dev',
  ],
  yarn: [
    'yarn global add jwise',
    'jwise new my-app --auth -d postgres -o prisma',
    'cd my-app',
    'cp .env.example .env',
    'node scripts/generate-keys.js',
    'npx prisma migrate dev --name init',
    'yarn start:dev',
  ],
  pnpm: [
    'pnpm add -g jwise',
    'jwise new my-app --auth -d postgres -o prisma',
    'cd my-app',
    'cp .env.example .env',
    'node scripts/generate-keys.js',
    'npx prisma migrate dev --name init',
    'pnpm run start:dev',
  ],
};

export function QuickStartSection() {
  const [selectedPM, setSelectedPM] = useState<PackageManager>('npm');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const allCommands = commands[selectedPM].join('\n');
    navigator.clipboard.writeText(allCommands);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From zero to production-ready in 7 simple steps
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Package Manager Tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
              {packageManagers.map((pm) => (
                <button
                  key={pm}
                  onClick={() => setSelectedPM(pm)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    selectedPM === pm
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedIndex === -1 ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              Copy all
            </button>
          </div>

          {/* Code Block */}
          <div className="rounded-xl overflow-hidden border border-border">
            <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-border">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Terminal</span>
            </div>
            <div className="bg-terminal-bg p-4 space-y-1">
              {commands[selectedPM].map((cmd, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between gap-4 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className="text-terminal-green select-none">$</span>
                    <span className="text-terminal-text">{cmd}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(cmd, index)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted/50 transition-all"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Test curl command */}
          <div className="mt-6 p-4 rounded-xl bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Test your API with this curl command:
            </p>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-terminal-bg font-mono text-sm">
              <span className="text-terminal-green shrink-0">$</span>
              <code className="text-terminal-text break-all">
                curl -X POST http://localhost:3000/api/v1/auth/signup -H "Content-Type: application/json" -d '{`'{"email":"test@example.com","password":"SecurePass123!","name":"Test User"}'`}'
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
