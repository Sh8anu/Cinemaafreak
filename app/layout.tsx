import type { Metadata, Viewport } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: 'CINEMAFREAKS // TTY_MAINFRAME',
  description: 'Classified terminal-based cinema decryption mainframe.',
  applicationName: 'CinemaFreaks OS',
};

export const viewport: Viewport = {
  themeColor: '#030303',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-oled text-terminal-green font-mono antialiased overflow-x-hidden selection:bg-terminal-green selection:text-black">
        {children}
      </body>
    </html>
  );
}
