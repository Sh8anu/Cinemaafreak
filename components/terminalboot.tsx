'use client';
import { useState, useEffect } from 'react';

interface TerminalBootProps {
  onComplete: (username: string) => void;
}

export default function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [bootReady, setBootReady] = useState(false);

  useEffect(() => {
    const logs = [
      "CINEMAFREAKS BIOS v2.08...",
      "CHECKING SYSTEM BUS... OK",
      "INITIALIZING LOCAL STORAGE HOOKS... OK",
      "SCANNING CINEMATOGRAPHIC REGISTRIES (HOLLYWOOD, IND_NORTH, IND_SOUTH, GOD_MODE)...",
      "ESTABLISHING ENCRYPTED LINK WITH SUPABASE STORAGE...",
      "AUTH REQUIRED: IDENTITY NOT FOUND IN DEVICE PROTOCOL."
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      delay += 350;
      setTimeout(() => {
        setBootLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) setBootReady(true);
      }, delay);
    });
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    localStorage.setItem('cinemafreaks_user', inputVal.trim());
    if (!localStorage.getItem('aditiPoints')) {
      localStorage.setItem('aditiPoints', '0');
    }
    onComplete(inputVal.trim());
  };

  return (
    <div className="flex flex-col justify-start p-6 text-terminal-green font-mono text-sm leading-relaxed max-w-4xl mx-auto min-h-screen">
      {bootLogs.map((log, i) => (
        <div key={i} className="text-glow">{log}</div>
      ))}

      {bootReady && (
        <form onSubmit={handleRegister} className="mt-4 flex items-center gap-2">
          <span className="text-terminal-dim">ENTER USERNAME:~$</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="bg-transparent border-none outline-none text-terminal-green font-mono caret-terminal-green w-64 text-glow"
            placeholder="cinema_nerd"
          />
        </form>
      )}
    </div>
  );
}