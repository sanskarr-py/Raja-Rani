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
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-lg mx-auto w-full text-[#263238]">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="px-3.5 py-1 rounded-full bg-[#FAF3DE] border border-[#D8BD6A] text-[#173B67] text-xs font-playfair font-bold tracking-widest uppercase inline-block mb-2 shadow-sm">
          CONFIDENTIAL ASSIGNMENT
        </span>
        <h2 className="text-2xl md:text-3xl font-playfair font-black text-[#173B67] tracking-wide">
          Your Secret Role
        </h2>
        <p className="text-xs md:text-sm text-[#5F6872] mt-1 max-w-xs mx-auto font-medium">
          Tap the playing card to privately view your identity. Keep this strictly hidden!
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playCardFlip();
              setIsFlipped(!isFlipped);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF3DE] border border-[#D8BD6A] text-xs font-bold text-[#173B67] transition-all cursor-pointer shadow-sm"
          >
            {isFlipped ? (
              <>
                <EyeOff className="w-4 h-4 text-[#B63A32]" />
                <span>Hide Role Card</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-[#C9A227]" />
                <span>Flip to Reveal</span>
              </>
            )}
          </button>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onProceed();
          }}
          leftIcon={<ShieldCheck className="w-5 h-5 text-[#D8BD6A]" />}
        >
          I Know My Role • Proceed to Court
        </Button>
      </motion.div>
    </div>
  );
};
