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
    sm: 'w-44 h-64 text-xs',
    md: 'w-56 h-84 text-sm',
    lg: 'w-64 h-96 md:w-72 md:h-[430px] text-base',
  }[size];

  return (
    <div className={`perspective-1000 select-none ${dimensions}`}>
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.75, type: 'spring', stiffness: 240, damping: 22 }}
        onClick={handleCardClick}
      >
        {/* FRONT OF CARD (FACE-DOWN / SECRET) */}
        <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#FAF8F2] dark:bg-[#101726] border-2 border-[#D8BD6A] shadow-[0_16px_35px_rgba(23,59,103,0.12)] dark:shadow-[0_16px_35px_rgba(0,0,0,0.6)] p-6 flex flex-col items-center justify-between overflow-hidden transition-colors duration-300">
          {/* Inner Ornate Filigree Border */}
          <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-[#D8BD6A]/60 dark:border-[#D8BD6A]/40 rounded-2xl pointer-events-none" />
          <div className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-dashed border-[#D8BD6A]/40 dark:border-[#D8BD6A]/20 rounded-xl pointer-events-none" />

          {/* Top header */}
          <div className="w-full flex items-center justify-between text-[#173B67] dark:text-[#D8BD6A] z-10">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="font-playfair text-xs font-bold tracking-widest uppercase">
              Raja Rani
            </span>
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
          </div>

          {/* Center Vault Lock Icon */}
          <div className="flex flex-col items-center my-auto z-10 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-2xl bg-[#FAF3DE] dark:bg-[#1A2333] border-2 border-[#C9A227] shadow-[0_4px_16px_rgba(201,162,39,0.25)] flex items-center justify-center text-[#173B67] mb-3"
            >
              <Lock className="w-9 h-9 text-[#C9A227]" />
            </motion.div>
            <h3 className="font-playfair text-lg font-black text-[#173B67] dark:text-white tracking-wider uppercase">
              SECRET ROLE
            </h3>
            <p className="text-xs text-[#5F6872] dark:text-slate-400 mt-0.5 font-medium">Confidential Assignment</p>
          </div>

          {/* Bottom Flip Action CTA */}
          <div className="w-full z-10">
            <div className="py-2.5 px-4 rounded-xl bg-[#173B67] dark:bg-[#D8BD6A] text-white dark:text-[#070A0F] flex items-center justify-center gap-2 text-xs font-bold font-playfair tracking-wider shadow-sm">
              <Eye className="w-4 h-4 text-[#D8BD6A] dark:text-[#070A0F]" />
              <span>TAP TO REVEAL</span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD (REVEALED PLAYING CARD) */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-white dark:bg-[#101726] shadow-[0_16px_40px_rgba(23,59,103,0.15)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-6 flex flex-col items-center justify-between overflow-hidden transition-colors duration-300"
          style={{
            border: `2px solid ${roleConfig?.borderColor || '#D8BD6A'}`,
          }}
        >
          {/* Card luxury inner frame */}
          <div
            className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border rounded-2xl pointer-events-none"
            style={{ borderColor: `${roleConfig?.borderColor || '#D8BD6A'}60` }}
          />
          <div
            className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-dashed rounded-xl pointer-events-none"
            style={{ borderColor: `${roleConfig?.borderColor || '#D8BD6A'}40` }}
          />

          {/* Top role header banner */}
          <div className="w-full flex items-center justify-between z-10">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold font-playfair tracking-wider uppercase"
              style={{
                backgroundColor: roleConfig?.badgeBg,
                color: roleConfig?.color,
                border: `1px solid ${roleConfig?.borderColor}`,
              }}
            >
              RANK #{roleConfig?.rank}
            </span>
            <div
              className="flex items-center gap-1 font-playfair font-black text-sm"
              style={{ color: roleConfig?.color }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{roleConfig?.points} PTS</span>
            </div>
          </div>

          {/* Center Role Artwork & Names */}
          <div className="flex flex-col items-center my-auto z-10 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mb-2 shadow-inner"
              style={{
                backgroundColor: roleConfig?.badgeBg,
                border: `2px solid ${roleConfig?.borderColor}`,
              }}
            >
              {roleConfig?.emoji}
            </motion.div>

            <h2
              className="font-playfair text-2xl font-black tracking-wide"
              style={{ color: roleConfig?.color }}
            >
              {roleConfig?.name.toUpperCase()}
            </h2>
            <p className="text-xs text-[#5F6872] dark:text-slate-300 font-semibold">{roleConfig?.nepaliName}</p>

            <p className="text-xs text-[#5F6872] dark:text-slate-400 mt-1.5 px-2 line-clamp-2 leading-tight font-medium">
              {roleConfig?.description}
            </p>
          </div>

          {/* Secret Objective Box */}
          {!hideSecretInstructions && roleConfig && (
            <div
              className="w-full z-10 p-3 rounded-2xl border text-left shadow-sm"
              style={{
                backgroundColor: roleConfig.badgeBg,
                borderColor: `${roleConfig.borderColor}`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-0.5 text-[11px] font-bold uppercase tracking-wider text-[#173B67] dark:text-white">
                <Shield className="w-3.5 h-3.5" style={{ color: roleConfig.color }} />
                <span>Mission</span>
              </div>
              <p className="text-[11px] text-[#263238] dark:text-slate-200 leading-snug font-medium">
                {roleConfig.secretObjective}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
