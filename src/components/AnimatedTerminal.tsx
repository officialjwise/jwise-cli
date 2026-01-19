import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'success' | 'error' | 'info' | 'folder' | 'file' | 'highlight';
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { text: '$ ', type: 'command', delay: 500 },
  { text: 'npm install -g jwise-cli', type: 'command', delay: 100 },
  { text: '\n', type: 'output', delay: 500 },
  { text: '⠋ Installing jwise-cli...', type: 'info', delay: 800 },
  { text: '\n✓ jwise-cli@1.0.0 installed successfully\n', type: 'success', delay: 1000 },
  { text: '\n$ ', type: 'command', delay: 600 },
  { text: 'jwise new my-awesome-app --auth --prisma', type: 'command', delay: 100 },
  { text: '\n\n', type: 'output', delay: 300 },
  { text: '🚀 Creating your NestJS project...\n\n', type: 'highlight', delay: 500 },
  { text: '  ✓ Project directory created\n', type: 'success', delay: 300 },
  { text: '  ✓ Package.json generated\n', type: 'success', delay: 250 },
  { text: '  ✓ TypeScript configured\n', type: 'success', delay: 250 },
  { text: '  ✓ Database module created (Prisma)\n', type: 'success', delay: 300 },
  { text: '  ✓ Authentication module generated\n', type: 'success', delay: 300 },
  { text: '  ✓ Email service configured\n', type: 'success', delay: 300 },
  { text: '  ✓ Security features enabled\n', type: 'success', delay: 300 },
  { text: '  ✓ Git repository initialized\n', type: 'success', delay: 250 },
  { text: '\n📦 Installing dependencies...\n', type: 'info', delay: 600 },
  { text: '⠸ npm install', type: 'info', delay: 1500 },
  { text: '\n\n✨ Project created successfully!\n\n', type: 'highlight', delay: 600 },
  { text: '📂 Project Structure:\n', type: 'info', delay: 400 },
  { text: '\n  my-awesome-app/\n', type: 'folder', delay: 150 },
  { text: '  ├── ', type: 'output', delay: 80 },
  { text: 'src/', type: 'folder', delay: 80 },
  { text: '\n  │   ├── ', type: 'output', delay: 60 },
  { text: 'auth/', type: 'folder', delay: 60 },
  { text: '\n  │   │   ├── ', type: 'output', delay: 50 },
  { text: 'auth.controller.ts', type: 'file', delay: 50 },
  { text: '\n  │   │   ├── ', type: 'output', delay: 50 },
  { text: 'auth.service.ts', type: 'file', delay: 50 },
  { text: '\n  │   │   ├── ', type: 'output', delay: 50 },
  { text: 'auth.module.ts', type: 'file', delay: 50 },
  { text: '\n  │   │   └── ', type: 'output', delay: 50 },
  { text: 'strategies/', type: 'folder', delay: 50 },
  { text: '\n  │   ├── ', type: 'output', delay: 60 },
  { text: 'users/', type: 'folder', delay: 60 },
  { text: '\n  │   ├── ', type: 'output', delay: 60 },
  { text: 'email/', type: 'folder', delay: 60 },
  { text: '\n  │   ├── ', type: 'output', delay: 60 },
  { text: 'common/', type: 'folder', delay: 60 },
  { text: '\n  │   ├── ', type: 'output', delay: 60 },
  { text: 'config/', type: 'folder', delay: 60 },
  { text: '\n  │   ├── ', type: 'output', delay: 50 },
  { text: 'app.module.ts', type: 'file', delay: 50 },
  { text: '\n  │   └── ', type: 'output', delay: 50 },
  { text: 'main.ts', type: 'file', delay: 50 },
  { text: '\n  ├── ', type: 'output', delay: 80 },
  { text: 'prisma/', type: 'folder', delay: 80 },
  { text: '\n  │   └── ', type: 'output', delay: 50 },
  { text: 'schema.prisma', type: 'file', delay: 50 },
  { text: '\n  ├── ', type: 'output', delay: 80 },
  { text: 'test/', type: 'folder', delay: 80 },
  { text: '\n  ├── ', type: 'output', delay: 50 },
  { text: 'docker-compose.yml', type: 'file', delay: 50 },
  { text: '\n  ├── ', type: 'output', delay: 50 },
  { text: '.env.example', type: 'file', delay: 50 },
  { text: '\n  └── ', type: 'output', delay: 50 },
  { text: 'package.json', type: 'file', delay: 50 },
  { text: '\n\n📊 ', type: 'info', delay: 400 },
  { text: 'Generated:', type: 'info', delay: 100 },
  { text: ' 30+ files', type: 'highlight', delay: 100 },
  { text: ' • ', type: 'output', delay: 100 },
  { text: '11 API endpoints', type: 'highlight', delay: 100 },
  { text: ' • ', type: 'output', delay: 100 },
  { text: '4 email templates', type: 'highlight', delay: 100 },
  { text: '\n\n🎯 Next steps:\n\n', type: 'info', delay: 400 },
  { text: '   cd my-awesome-app\n', type: 'command', delay: 150 },
  { text: '   npm run start:dev\n', type: 'command', delay: 150 },
  { text: '\n', type: 'output', delay: 2000 },
  { text: '$ ', type: 'command', delay: 0 },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'command':
      return 'text-emerald-400';
    case 'success':
      return 'text-green-400';
    case 'error':
      return 'text-red-400';
    case 'info':
      return 'text-cyan-400';
    case 'folder':
      return 'text-yellow-400 font-semibold';
    case 'file':
      return 'text-blue-300';
    case 'highlight':
      return 'text-amber-300 font-medium';
    default:
      return 'text-slate-300';
  }
};

export function AnimatedTerminal() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const getTypingSpeed = useCallback((type: string) => {
    switch (type) {
      case 'command':
        return 35 + Math.random() * 15;
      case 'output':
        return 5 + Math.random() * 8;
      case 'folder':
      case 'file':
        return 8 + Math.random() * 10;
      case 'info':
      case 'highlight':
        return 6 + Math.random() * 10;
      case 'success':
      case 'error':
        return 12 + Math.random() * 12;
      default:
        return 20;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const typeSequence = async () => {
      setDisplayedLines([]);
      setIsComplete(false);

      for (let lineIndex = 0; lineIndex < terminalSequence.length; lineIndex++) {
        if (!isMounted) return;

        const line = terminalSequence[lineIndex];
        const chars = line.text.split('');

        for (let charIndex = 0; charIndex < chars.length; charIndex++) {
          if (!isMounted) return;

          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(() => {
              setDisplayedLines((prev) => {
                const newLines = [...prev];
                const lastLine = newLines[newLines.length - 1];

                if (lastLine && lastLine.type === line.type && !chars[charIndex - 1]?.includes('\n')) {
                  newLines[newLines.length - 1] = {
                    ...lastLine,
                    text: lastLine.text + chars[charIndex],
                  };
                } else {
                  newLines.push({ text: chars[charIndex], type: line.type });
                }
                return newLines;
              });
              resolve();
            }, getTypingSpeed(line.type));
          });
        }

        if (line.delay && isMounted) {
          await new Promise<void>((resolve) => {
            timeoutId = setTimeout(resolve, line.delay);
          });
        }
      }

      setIsComplete(true);

      // Loop after delay
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, 5000);
      });

      if (isMounted) {
        typeSequence();
      }
    };

    typeSequence();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [getTypingSpeed]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const handleCopy = () => {
    const commands = `npm install -g jwise-cli
jwise new my-awesome-app --auth --prisma
cd my-awesome-app
npm run start:dev`;
    navigator.clipboard.writeText(commands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl terminal-glow rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm shadow-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm shadow-yellow-500/30" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm shadow-green-500/30" />
        </div>
        <span className="text-slate-400 text-sm font-medium font-mono">zsh — jwise-cli</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-slate-200"
          title="Copy commands"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Terminal Body */}
      <div
        ref={outputRef}
        className="bg-slate-900 p-6 font-mono text-sm leading-relaxed h-[420px] overflow-y-auto terminal-scrollbar"
      >
        {displayedLines.map((line, index) => (
          <span key={index} className={`${getTypeColor(line.type)} whitespace-pre-wrap`}>
            {line.text}
          </span>
        ))}
        {!isComplete && (
          <span className="inline-block w-2 h-5 bg-cyan-400 cursor-blink ml-0.5 align-text-bottom" />
        )}
      </div>
    </motion.div>
  );
}
