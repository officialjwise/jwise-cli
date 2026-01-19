import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'success' | 'error' | 'info';
  delay?: number;
}

const terminalSequence: TerminalLine[] = [
  { text: '$ ', type: 'command', delay: 500 },
  { text: 'npm install -g jwise', type: 'command', delay: 100 },
  { text: '\n', type: 'output', delay: 500 },
  { text: '⠋ Installing jwise CLI...', type: 'info', delay: 800 },
  { text: '\n✓ jwise@1.0.0 installed successfully\n', type: 'success', delay: 1000 },
  { text: '\n$ ', type: 'command', delay: 600 },
  { text: 'jwise new my-awesome-app --auth', type: 'command', delay: 100 },
  { text: '\n\n', type: 'output', delay: 300 },
  { text: '🚀 Creating your NestJS project...\n\n', type: 'info', delay: 500 },
  { text: '  ✓ Project directory created\n', type: 'success', delay: 400 },
  { text: '  ✓ Package.json generated\n', type: 'success', delay: 300 },
  { text: '  ✓ TypeScript configured\n', type: 'success', delay: 300 },
  { text: '  ✓ Database module created (Prisma)\n', type: 'success', delay: 400 },
  { text: '  ✓ Authentication module generated\n', type: 'success', delay: 400 },
  { text: '  ✓ Email service configured\n', type: 'success', delay: 400 },
  { text: '  ✓ Security features enabled\n', type: 'success', delay: 400 },
  { text: '  ✓ Git repository initialized\n', type: 'success', delay: 300 },
  { text: '\n📦 Installing dependencies...\n', type: 'info', delay: 600 },
  { text: '⠸ npm install', type: 'info', delay: 2000 },
  { text: '\n\n✨ Project created successfully!\n\n', type: 'success', delay: 800 },
  { text: '📂 Files generated:\n', type: 'info', delay: 300 },
  { text: '   • 30+ production-ready files\n', type: 'output', delay: 200 },
  { text: '   • 11 secure API endpoints\n', type: 'output', delay: 200 },
  { text: '   • 4 email templates\n', type: 'output', delay: 200 },
  { text: '   • Complete test suite\n\n', type: 'output', delay: 200 },
  { text: '🎯 Next steps:\n\n', type: 'info', delay: 400 },
  { text: '   cd my-awesome-app\n', type: 'command', delay: 200 },
  { text: '   npm run start:dev\n', type: 'command', delay: 200 },
  { text: '\n', type: 'output', delay: 1000 },
  { text: '$ ', type: 'command', delay: 0 },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'command':
      return 'text-terminal-green';
    case 'success':
      return 'text-terminal-green';
    case 'error':
      return 'text-destructive';
    case 'info':
      return 'text-terminal-blue';
    default:
      return 'text-terminal-text';
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
        return 40 + Math.random() * 20;
      case 'output':
      case 'info':
        return 8 + Math.random() * 12;
      case 'success':
      case 'error':
        return 15 + Math.random() * 15;
      default:
        return 25;
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
        timeoutId = setTimeout(resolve, 4000);
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
    const commands = `npm install -g jwise
jwise new my-awesome-app --auth
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
      <div className="flex items-center justify-between px-4 py-3 bg-terminal-header border-b border-border/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-muted-foreground text-sm font-medium">zsh — jwise</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
          title="Copy commands"
        >
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Terminal Body */}
      <div
        ref={outputRef}
        className="bg-terminal-bg p-6 font-mono text-sm leading-relaxed h-[400px] overflow-y-auto terminal-scrollbar"
      >
        {displayedLines.map((line, index) => (
          <span key={index} className={`${getTypeColor(line.type)} whitespace-pre-wrap`}>
            {line.text}
          </span>
        ))}
        {!isComplete && (
          <span className="inline-block w-2 h-5 bg-terminal-cursor cursor-blink ml-0.5 align-text-bottom" />
        )}
      </div>
    </motion.div>
  );
}
