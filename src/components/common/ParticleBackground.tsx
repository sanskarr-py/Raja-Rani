import React, { useMemo } from 'react';

export const ParticleBackground: React.FC = () => {
  // Generate soft champagne gold dust particles
  const particles = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.9 + Math.sin(i) * 12 + 8) % 100}%`,
      top: `${(i * 4.1 + Math.cos(i) * 14 + 10) % 100}%`,
      size: (i % 3) * 1.5 + 2,
      duration: (i % 4) * 4 + 7,
      delay: (i % 5) * 1.3,
      opacity: 0.22 + (i % 3) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-300">
      {/* Light Mode: Warm Ivory & Soft Cream Canvas Base */}
      <div className="absolute inset-0 bg-[#FAF8F2] dark:bg-[#070A0F] transition-colors duration-300" />
      
      {/* Light Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,#FFFDF8_0%,#F3EDE1_65%,#E8D9B5_100%)] opacity-85 dark:opacity-0 transition-opacity duration-300" />
      
      {/* Dark Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,39,0.08)_0%,transparent_60%)] opacity-0 dark:opacity-100 transition-opacity duration-300" />

      {/* Subtle Luxury Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(#C9A227 0.75px, transparent 0.75px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Subtle Royal Corner Borders & Filigree Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D8BD6A] to-transparent opacity-40 dark:opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D8BD6A] to-transparent opacity-40 dark:opacity-30" />

      {/* Soft Floating Champagne Gold Specks */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#C9A227] shadow-[0_0_6px_rgba(201,162,39,0.35)] animate-float"
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
    </div>
  );
};
