import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameRoom } from '../../types/game';
import { RoleCard } from '../table/RoleCard';
import { sound } from '../../utils/sound';

interface SuspensePhaseProps {
  room: GameRoom;
  onRevealFinished: () => void;
}

export const SuspensePhase: React.FC<SuspensePhaseProps> = ({
  room,
  onRevealFinished,
}) => {
  const [countdown, setCountdown] = useState<number | 'REVEAL'>(3);
  const [showCard, setShowCard] = useState(false);

  const accusedPlayer = room.players.find((p) => p.id === room.accusedPlayerId);
  const policePlayer = room.players.find((p) => p.id === room.policeId);

  useEffect(() => {
    sound.playSuspenseHeartbeat();

    const t3 = setTimeout(() => {
      sound.playCountdownTick(true);
      setCountdown(2);
    }, 1200);

    const t2 = setTimeout(() => {
      sound.playCountdownTick(true);
      setCountdown(1);
    }, 2400);

    const t1 = setTimeout(() => {
      sound.playSuspenseHeartbeat();
      setCountdown('REVEAL');
      setShowCard(true);
    }, 3600);

    const tFinal = setTimeout(() => {
      onRevealFinished();
    }, 5600);

    return () => {
      clearTimeout(t3);
      clearTimeout(t2);
      clearTimeout(t1);
      clearTimeout(tFinal);
    };
  }, [onRevealFinished]);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center p-4 md:p-8 z-10 text-center max-w-lg mx-auto w-full text-[#263238]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full flex flex-col items-center"
      >
        <span className="px-4 py-1 rounded-full bg-[#FAF3DE] border border-[#D8BD6A] text-[#173B67] text-xs font-playfair font-black tracking-widest uppercase mb-3 inline-block shadow-sm">
          MOMENT OF TRUTH
        </span>

        <h2 className="text-2xl md:text-3xl font-playfair font-black text-[#173B67] tracking-wide mb-2">
          THE ACCUSATION HAS BEEN MADE...
        </h2>
        <p className="text-sm text-[#5F6872] mb-6 font-medium">
          {policePlayer?.name || 'Police'} has officially accused{' '}
          <strong className="text-[#B63A32] font-black">{accusedPlayer?.name}</strong>!
        </p>

        {!showCard ? (
          <div className="my-8 flex flex-col items-center">
            {/* Suspense Countdown Numbers */}
            <AnimatePresence mode="wait">
              <motion.div
                key={String(countdown)}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-28 h-28 rounded-3xl bg-white border-2 border-[#173B67] shadow-[0_12px_36px_rgba(23,59,103,0.18)] flex items-center justify-center text-4xl font-playfair font-black text-[#173B67]"
              >
                {countdown}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="my-4"
          >
            <RoleCard
              role={accusedPlayer?.role || null}
              isFlipped={true}
              canFlip={false}
              size="md"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
