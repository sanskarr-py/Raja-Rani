import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import type { RoleId } from '../../types/game';
import { RoleCard } from '../table/RoleCard';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface RoleRevealPhaseProps {
  role: RoleId | null;
  onProceed: () => void;
}

export const RoleRevealPhase: React.FC<RoleRevealPhaseProps> = ({ role, onProceed }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-lg mx-auto w-full">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-cinzel font-bold tracking-widest uppercase inline-block mb-2">
          CONFIDENTIAL ASSIGNMENT
        </span>
        <h2 className="text-2xl md:text-3xl font-cinzel font-black text-white tracking-wide">
          Your Secret Role
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xs mx-auto">
          Tap the card to privately view your identity. Never show this to anyone else!
        </p>
      </motion.div>

      {/* 3D Role Card Flip Center */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="my-auto py-6"
      >
        <RoleCard
          role={role}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          size="lg"
        />
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playCardFlip();
              setIsFlipped(!isFlipped);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141D2C] hover:bg-[#1c273c] border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            {isFlipped ? (
              <>
                <EyeOff className="w-4 h-4 text-amber-400" />
                <span>Hide Role Card</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>Flip to Reveal</span>
              </>
            )}
          </button>
        </div>

        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onProceed();
          }}
          leftIcon={<ShieldCheck className="w-5 h-5" />}
        >
          I Know My Role • Proceed to Court
        </Button>
      </motion.div>
    </div>
  );
};
