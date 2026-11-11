'use client';
import { useState, useEffect } from 'react';
import TerminalBoot from '@/components/TerminalBoot';
import TerminalQuiz from '@/components/TerminalQuiz';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cinemafreaks_user');
    if (saved) setUsername(saved);
  }, []);

  return (
    <main className="min-h-screen bg-oled crt relative selection:bg-terminal-green selection:text-black">
      {!username ? (
        <TerminalBoot onComplete={(name) => setUsername(name)} />
      ) : (
        <TerminalQuiz username={username} />
      )}
    </main>
  );
}