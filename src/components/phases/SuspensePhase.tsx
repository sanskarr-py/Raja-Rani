import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [step, setStep] = useState<'choice' | 'flipping'>('choice');
  const accusedPlayer = room.players.find((p) => p.id === room.accusedPlayerId);
  const policePlayer = room.players.find((p) => p.id === room.policeId);

  useEffect(() => {
    sound.playSuspenseHeartbeat();

    const t1 = setTimeout(() => {
      sound.playSuspenseHeartbeat();
      setStep('flipping');
    }, 2000);

    const t2 = setTimeout(() => {
      onRevealFinished();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onRevealFinished]);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center p-4 md:p-8 z-10 text-center max-w-lg mx-auto w-full">
      {/* Red Suspense Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.15)_0%,transparent_70%)] pointer-events-none animate-pulse" />

      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="w-full flex flex-col items-center"
      >
        <span className="px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-cinzel font-bold tracking-widest uppercase mb-3 inline-block">
          MOMENT OF TRUTH
        </span>

        {step === 'choice' ? (
          <>
            <h2 className="text-2xl md:text-3xl font-cinzel font-black text-white tracking-wide mb-3">
              POLICE HAS MADE THEIR ACCUSATION...
            </h2>
            <p className="text-sm text-slate-300 mb-8">
              {policePlayer?.name || 'Police'} has pointed the royal finger at{' '}
              <strong className="text-red-400">{accusedPlayer?.name}</strong>!
            </p>

            <div className="w-20 h-20 rounded-3xl bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(239,68,68,0.5)] my-6">
              {accusedPlayer?.avatar}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-cinzel font-black text-[#D4AF37] tracking-wide mb-3">
              UNMASKING THE SUSPECT...
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              Is <strong className="text-white">{accusedPlayer?.name}</strong> really the Chor?
            </p>

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
          </>
        )}
      </motion.div>
    </div>
  );
};
