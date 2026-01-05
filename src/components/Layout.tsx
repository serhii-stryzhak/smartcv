import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-background">
    <main className="container py-8 md:py-12 lg:py-16">{children}</main>
  </div>
);
