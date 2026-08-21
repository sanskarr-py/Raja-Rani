import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Eye, Shield } from 'lucide-react';
import { ROLES_CONFIG, type RoleId } from '../../types/game';
import { sound } from '../../utils/sound';

interface RoleCardProps {
  role: RoleId | null;
  isFlipped: boolean;
  onFlip?: () => void;
  canFlip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  hideSecretInstructions?: boolean;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  isFlipped,
  onFlip,
  canFlip = true,
  size = 'md',
  hideSecretInstructions = false,
}) => {
  const roleConfig = role ? ROLES_CONFIG[role] : null;

  const handleCardClick = () => {
    if (!canFlip) return;
    sound.playCardFlip();
    onFlip?.();
  };

  const dimensions = {
    sm: 'w-40 h-56 text-xs',
    md: 'w-56 h-80 text-sm',
    lg: 'w-64 h-92 md:w-72 md:h-[420px] text-base',
  }[size];

  return (
    <div className={`perspective-1000 select-none ${dimensions}`}>
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={handleCardClick}
      >
        {/* FRONT OF CARD (LOCKED / HIDDEN) */}
        <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#101726] border-2 border-[#D4AF37]/50 shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden">
          {/* Background filigree ornament */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#D4AF37]/20 rounded-2xl pointer-events-none" />

          {/* Top header */}
          <div className="w-full flex items-center justify-between text-[#D4AF37] z-10">
            <Sparkles className="w-4 h-4" />
            <span className="font-cinzel text-xs font-bold tracking-widest uppercase">
              Raja Rani
            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Center Vault Lock Icon */}
          <div className="flex flex-col items-center my-auto z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-[#1A2333] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center text-[#D4AF37] mb-4"
            >
              <Lock className="w-9 h-9" />
            </motion.div>
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wider">
              SECRET ROLE
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Keep Strictly Private</p>
          </div>

          {/* Bottom Flip Action CTA */}
          <div className="w-full z-10">
            <div className="py-2.5 px-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center gap-2 text-xs font-bold font-cinzel">
              <Eye className="w-4 h-4" />
              <span>TAP TO REVEAL</span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD (REVEALED ROLE) */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#101726] shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden"
          style={{
            border: `2px solid ${roleConfig?.borderColor || '#D4AF37'}`,
            boxShadow: `0 0 35px ${roleConfig?.glowColor || 'rgba(212,175,55,0.35)'}`,
          }}
        >
          {/* Card background glowing ambience */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${roleConfig?.color || '#D4AF37'} 0%, transparent 75%)`,
            }}
          />
          <div
            className="absolute top-2 left-2 right-2 bottom-2 border rounded-2xl pointer-events-none"
            style={{ borderColor: `${roleConfig?.borderColor || '#D4AF37'}30` }}
          />

          {/* Top role header banner */}
          <div className="w-full flex items-center justify-between z-10">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold font-cinzel tracking-wider"
              style={{
                backgroundColor: roleConfig?.badgeBg,
                color: roleConfig?.color,
                border: `1px solid ${roleConfig?.borderColor}50`,
              }}
            >
              RANK #{roleConfig?.rank}
            </span>
            <div className="flex items-center gap-1 font-cinzel font-bold text-white text-sm">
              <Sparkles className="w-3.5 h-3.5" style={{ color: roleConfig?.color }} />
              <span>{roleConfig?.points} PTS</span>
            </div>
          </div>

          {/* Center Role Artwork & Names */}
          <div className="flex flex-col items-center my-auto z-10 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-3 shadow-inner"
              style={{
                backgroundColor: roleConfig?.badgeBg,
                border: `2px solid ${roleConfig?.borderColor}`,
                boxShadow: `0 0 20px ${roleConfig?.glowColor}`,
              }}
            >
              {roleConfig?.emoji}
            </motion.div>

            <h2 className="font-cinzel text-2xl font-black tracking-wide text-white">
              {roleConfig?.name.toUpperCase()}
            </h2>
            <p className="text-xs text-slate-300 font-medium">{roleConfig?.nepaliName}</p>

            <p className="text-xs text-slate-400 mt-2 px-2 line-clamp-2 leading-tight">
              {roleConfig?.description}
            </p>
          </div>

          {/* Secret Objective Box */}
          {!hideSecretInstructions && roleConfig && (
            <div
              className="w-full z-10 p-3 rounded-2xl border text-left"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                borderColor: `${roleConfig.borderColor}40`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-300">
                <Shield className="w-3.5 h-3.5" style={{ color: roleConfig.color }} />
                <span>Secret Mission</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {roleConfig.secretObjective}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
