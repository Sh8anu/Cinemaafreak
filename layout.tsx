import type { Metadata, Viewport } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';

// Load Roboto Mono directly through Next.js font optimization
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'CINEMAFREAKS // TTY_MAINFRAME',
  description: 'Classified terminal-based cinema decryption mainframe.',
  applicationName: 'CinemaFreaks OS',
  keywords: ['cinema', 'trivia', 'movies', 'terminal', 'hollywood', 'indian cinema'],
  authors: [{ name: 'CinemaFreaks Terminal' }],
  robots: 'index, follow',
};

// Ensures mobile address bars and browser frames render in pitch OLED black
export const viewport: Viewport = {
  themeColor: '#030303',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents unintended pinch-zooming on mobile terminals
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${robotoMono.variable}`}>
      <head>
        {/* Fallback CRT Terminal scanline meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-oled text-terminal-green font-mono antialiased overflow-x-hidden selection:bg-terminal-green selection:text-black">
        {children}
      </body>
    </html>
  );
}