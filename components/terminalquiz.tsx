'use client';
import { useState, useEffect } from 'react';

interface Question {
  id: string;
  category: string;
  mode: string;
  prompt: string;
  difficulty: string;
}

export default function TerminalQuiz({ username }: { username: string }) {
  const [aditiPoints, setAditiPoints] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Form input states
  const [singleGuess, setSingleGuess] = useState('');
  const [guessX, setGuessX] = useState('');
  const [guessY, setGuessY] = useState('');
  const [guessZ, setGuessZ] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPoints = localStorage.getItem('aditiPoints');
    if (savedPoints) setAditiPoints(parseInt(savedPoints, 10));
  }, []);

  const fetchQuestions = async (cat: string, m: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/questions?category=${cat}&mode=${m}`);
      const data = await res.json();
      setQuestions(data);
      setCurrentIdx(0);
    } catch {
      setFeedback('ERROR LOADING DATABASE.');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questions[currentIdx]) return;

    const payload = {
      id: questions[currentIdx].id,
      mode,
      guessSingle,
      guessX,
      guessY,
      guessZ
    };

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.correct) {
      const updatedPoints = aditiPoints + result.aditiPoints;
      setAditiPoints(updatedPoints);
      localStorage.setItem('aditiPoints', updatedPoints.toString());
      setFeedback(`[SUCCESS]: +${result.aditiPoints} POINTS GRANTED.`);
      setTimeout(() => {
        setFeedback(null);
        setSingleGuess('');
        setGuessX('');
        setGuessY('');
        setGuessZ('');
        setCurrentIdx((prev) => prev + 1);
      }, 1500);
    } else {
      setFeedback(`[FAILED]: ${result.message}`);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-mono text-terminal-green">
      {/* Top Mainframe Bar */}
      <div className="border-b border-terminal-darkgreen pb-2 mb-6 flex justify-between items-center text-xs text-glow">
        <span>CINEMAFREAKS MAINFRAME // USER: {username}</span>
        <span>ADITI_POINTS: {aditiPoints.toString().padStart(5, '0')}</span>
      </div>

      {/* Step 1: Category Selection */}
      {!category && (
        <div className="space-y-3">
          <p className="text-terminal-dim">SELECT CATEGORY REGION:</p>
          <div className="space-y-1">
            <button onClick={() => setCategory('hollywood')} className="block hover:text-white">[1] HOLLYWOOD</button>
            <button onClick={() => setCategory('indian_north')} className="block hover:text-white">[2] INDIAN CINEMA - NORTHERN</button>
            <button onClick={() => setCategory('indian_south')} className="block hover:text-white">[3] INDIAN CINEMA - SOUTHERN</button>
            <button onClick={() => setCategory('god_mode')} className="block text-terminal-gold hover:text-white">[4] GOD MODE (ULTRA-OBSCURE)</button>
          </div>
        </div>
      )}

      {/* Step 2: Mode Selection */}
      {category && !mode && (
        <div className="space-y-3">
          <p className="text-terminal-dim">CATEGORY: {category.toUpperCase()}</p>
          <p className="text-glow">SELECT DECRYPTION PROTOCOL:</p>
          <div className="space-y-1">
            <button onClick={() => { setMode('guess_movie'); fetchQuestions(category, 'guess_movie'); }} className="block hover:text-white">
              [A] "GUESS THE MOVIE" (SYNOPSIS ANALYSIS)
            </button>
            <button onClick={() => { setMode('solve_xyz'); fetchQuestions(category, 'solve_xyz'); }} className="block hover:text-white">
              [B] "SOLVE FOR X, Y, Z" (VARIABLE CORRELATION)
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Interactive Question Terminal */}
      {category && mode && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-terminal-dim">
            <span>MODE: {mode.toUpperCase()}</span>
            <button onClick={() => { setCategory(null); setMode(null); }} className="hover:text-terminal-alert">[CHANGE SELECTION]</button>
          </div>

          {loading ? (
            <p className="animate-pulse">DECRYPTING QUESTION FROM DATABASE...</p>
          ) : questions.length === 0 ? (
            <p className="text-terminal-alert">NO QUESTIONS FOUND IN THIS DIRECTORY. IMPORT CSV VIA SUPABASE.</p>
          ) : currentIdx < questions.length ? (
            <div className="border border-terminal-darkgreen bg-black p-4 space-y-4 shadow-lg">
              <span className="text-xs bg-terminal-darkgreen px-2 py-0.5 text-black font-bold">
                PAYLOAD #{currentIdx + 1}
              </span>
              <p className="text-sm md:text-base leading-relaxed text-glow">{questions[currentIdx].prompt}</p>

              <form onSubmit={submitAnswer} className="space-y-3 mt-4">
                {mode === 'guess_movie' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-dim">INPUT_TITLE:~$</span>
                    <input
                      type="text"
                      autoFocus
                      value={singleGuess}
                      onChange={(e) => setSingleGuess(e.target.value)}
                      className="bg-transparent border-b border-terminal-dim outline-none text-terminal-green w-full"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      placeholder="Identify X"
                      value={guessX}
                      onChange={(e) => setGuessX(e.target.value)}
                      className="bg-transparent border border-terminal-dim p-2 outline-none"
                    />
                    <input
                      placeholder="Identify Y"
                      value={guessY}
                      onChange={(e) => setGuessY(e.target.value)}
                      className="bg-transparent border border-terminal-dim p-2 outline-none"
                    />
                    <input
                      placeholder="Identify Z"
                      value={guessZ}
                      onChange={(e) => setGuessZ(e.target.value)}
                      className="bg-transparent border border-terminal-dim p-2 outline-none"
                    />
                  </div>
                )}
                <button type="submit" className="px-4 py-1 border border-terminal-green hover:bg-terminal-green hover:text-black">
                  TRANSMIT VERIFICATION
                </button>
              </form>

              {feedback && <p className="text-xs mt-2 text-glow">{feedback}</p>}
            </div>
          ) : (
            <div className="text-center p-6 border border-terminal-darkgreen">
              <p className="text-glow">ALL QUESTIONS RESOLVED IN CURRENT NODE.</p>
              <button onClick={() => { setCategory(null); setMode(null); }} className="mt-4 px-4 py-2 border border-terminal-green hover:bg-terminal-green hover:text-black">
                RETURN TO ROOT DIRECTORY
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}