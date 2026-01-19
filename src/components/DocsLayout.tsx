import { ReactNode } from 'react';
import { Header } from './Header';
import { DocsSidebar } from './DocsSidebar';
import { Footer } from './Footer';

interface DocsLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function DocsLayout({ children, title, description }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8 lg:py-16">
            {(title || description) && (
              <div className="mb-10">
                {title && (
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-lg text-muted-foreground">{description}</p>
                )}
              </div>
            )}
            <div className="prose prose-invert max-w-none">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
