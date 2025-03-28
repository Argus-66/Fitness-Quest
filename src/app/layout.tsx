import type { Metadata } from 'next';
import './globals.css';
import ClientThemeProvider from '@/components/providers/ClientThemeProvider';

export const metadata: Metadata = {
  title: 'Fitness Quest',
  description: 'Track your fitness journey with an anime-inspired fitness app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
