import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Epoch Time Converter',
  description: 'Convert epoch time to UTC, local or specified timezone and vice versa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
