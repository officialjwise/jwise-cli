import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ChevronRight, Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-border my-6">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-terminal-header border-b border-border">
          <span className="text-sm text-muted-foreground font-mono">{filename}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
      <div className="relative bg-terminal-bg">
        {!filename && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground z-10"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
        <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-terminal-text">
          {showLineNumbers ? (
            <code>
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`flex ${
                    highlightLines.includes(index + 1) ? 'bg-accent/10 -mx-4 px-4' : ''
                  }`}
                >
                  <span className="w-8 text-right pr-4 text-muted-foreground select-none shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">{line}</span>
                </div>
              ))}
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}

interface CalloutProps {
  type: 'info' | 'warning' | 'tip';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    info: {
      icon: Info,
      bg: 'bg-info/10',
      border: 'border-info/30',
      iconColor: 'text-info',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      iconColor: 'text-warning',
    },
    tip: {
      icon: Lightbulb,
      bg: 'bg-success/10',
      border: 'border-success/30',
      iconColor: 'text-success',
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`my-6 p-4 rounded-xl border ${style.bg} ${style.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${style.iconColor}`} />
        <div>
          {title && <p className="font-semibold text-foreground mb-1">{title}</p>}
          <div className="text-sm text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description?: string;
}

export function ApiEndpoint({ method, path, description }: ApiEndpointProps) {
  const methodColors = {
    GET: 'bg-http-get/20 text-http-get',
    POST: 'bg-http-post/20 text-http-post',
    PUT: 'bg-http-put/20 text-http-put',
    PATCH: 'bg-http-patch/20 text-http-patch',
    DELETE: 'bg-http-delete/20 text-http-delete',
  };

  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 mb-2">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-sm font-mono text-foreground">{path}</code>
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 my-8">
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-full hero-gradient flex items-center justify-center text-white text-sm font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1 -mt-1">
        <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
}

export function LinkCard({ title, description, href }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      className="group block p-5 rounded-xl border border-border bg-card hover:border-accent/30 hover:bg-card/80 transition-all"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
          {title}
        </h4>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.a>
  );
}
