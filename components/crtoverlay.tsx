'use client';

export default function CRTOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* 1. Horizontal TV Scanlines */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* 2. Curved CRT Glass Vignette (Darker Edges/Corners) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at center, transparent 65%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      />

      {/* 3. Subtle Phosphor Flicker Layer */}
      <div className="absolute inset-0 w-full h-full bg-terminal-green/5 opacity-10 animate-pulse pointer-events-none" />
    </div>
  );
}