'use client';
import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number; // Adjust intensity so terminal text remains readable
}

export default function MatrixRain({ opacity = 0.18 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Rain character set: Katakana, Binary, Hex, and Film symbols
    const chars = '0123456789ABCDEF010101XYZアイウエオカキクケコサシスセソタチツテトナニヌネノ🎬🎞️★';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Track the Y position of each column drop
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50); // Stagger initial drop starts
    }

    let lastTime = 0;
    const fps = 30; // 30 FPS gives that retro, stepped terminal feel
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      // Pitch OLED Carbon Black trail fade
      ctx.fillStyle = 'rgba(3, 3, 3, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Roboto Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character is brighter white/green
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, x, y);

        // Trailing phosphor matrix green
        ctx.fillStyle = '#00ff66';
        ctx.fillText(text, x, y - fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}