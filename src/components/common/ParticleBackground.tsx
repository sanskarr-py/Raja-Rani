import React, { useMemo } from 'react';

export const ParticleBackground: React.FC = () => {
  // Generate stable random particles
  const particles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.125 + Math.sin(i) * 10 + 5) % 100}%`,
      top: `${(i * 4.7 + Math.cos(i) * 15 + 10) % 100}%`,
      size: (i % 4) * 1.5 + 2,
      duration: (i % 5) * 3 + 6,
      delay: (i % 6) * 1.2,
      opacity: 0.15 + (i % 3) * 0.15,
      isGold: i % 3 === 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Royal Vignette Background Gradients */}
      <div className="absolute inset-0 bg-[#070A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(239,68,68,0.04)_0%,transparent_50%)]" />

      {/* Floating Gold & Cyan Ember Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full animate-float ${
            p.isGold ? 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]' : 'bg-[#93C5FD] shadow-[0_0_8px_#93C5FD]'
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Subtle royal mesh grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
