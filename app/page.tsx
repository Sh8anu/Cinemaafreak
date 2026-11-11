'use client';
import { useState, useEffect } from 'react';
import MatrixRain from '../components/matrixrain';
import CRTOverlay from '../components/crtoverlay';
import TerminalBoot from '../components/terminalboot';
import TerminalQuiz from '../components/terminalquiz';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cinemafreaks_user');
    if (saved) setUsername(saved);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-oled overflow-hidden selection:bg-terminal-green selection:text-black">
      {/* Background Matrix Rain */}
      <MatrixRain opacity={0.16} />

      {/* Foreground Interactive Terminal App */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
        {!username ? (
          <TerminalBoot onComplete={(name) => setUsername(name)} />
        ) : (
          <TerminalQuiz username={username} />
        )}
      </div>

      {/* Topmost CRT Screen Glass & Scanlines */}
      <CRTOverlay />
    </main>
  );
}
