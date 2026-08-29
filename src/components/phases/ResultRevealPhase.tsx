import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Award, ArrowRight } from 'lucide-react';
import { ROLES_CONFIG, type GameRoom } from '../../types/game';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface ResultRevealPhaseProps {
  room: GameRoom;
  onViewScoreboard: () => void;
}

export const ResultRevealPhase: React.FC<ResultRevealPhaseProps> = ({
  room,
  onViewScoreboard,
}) => {
  const isCorrect = room.isCorrectGuess;
  const policePlayer = room.players.find((p) => p.id === room.policeId);
  const accusedPlayer = room.players.find((p) => p.id === room.accusedPlayerId);
  const chorPlayer = room.players.find((p) => p.id === room.actualChorId);

  useEffect(() => {
    if (isCorrect) {
      sound.playCorrectGuess();
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#C9A227', '#173B67', '#D8BD6A', '#234F7D'],
        });
      } catch {
        // ignore
      }
    } else {
      sound.playWrongGuess();
    }
  }, [isCorrect]);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-2xl mx-auto w-full text-center text-[#263238] dark:text-slate-200">
      {/* Top Banner Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full"
      >
        {isCorrect ? (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-emerald-600 dark:border-emerald-500 shadow-[0_12px_40px_rgba(16,185,129,0.15)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-black text-emerald-700 dark:text-emerald-400 tracking-wide">
              CHOR CAUGHT! 🎉
            </h2>
            <p className="text-sm text-[#5F6872] dark:text-slate-400 mt-1.5 font-medium">
              <strong className="text-[#173B67] dark:text-[#D8BD6A]">{policePlayer?.name}</strong> correctly identified the Chor <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{accusedPlayer?.name}</strong>.
            </p>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#E2D7C3] dark:border-[#D8BD6A]/20 text-sm font-playfair font-bold">
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">👮 Police +500</span>
              <span className="text-slate-400">🥷 Chor +0</span>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#B63A32] dark:border-red-500 shadow-[0_12px_40px_rgba(182,58,50,0.15)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#FDF2F1] dark:bg-red-950/40 border-2 border-[#B63A32] dark:border-red-500 text-[#B63A32] dark:text-red-400 flex items-center justify-center mb-3">
              <AlertCircle className="w-9 h-9" />
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#B63A32] dark:text-red-400 tracking-wide">
              WRONG SUSPECT
            </h2>
            <p className="text-sm text-[#5F6872] dark:text-slate-400 mt-1.5 font-medium">
              <strong className="text-[#173B67] dark:text-[#D8BD6A]">{accusedPlayer?.name}</strong> was innocent! The real Chor was <strong className="text-[#173B67] dark:text-[#D8BD6A]">{chorPlayer?.name}</strong> who escaped.
            </p>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#E2D7C3] dark:border-[#D8BD6A]/20 text-sm font-playfair font-bold">
              <span className="text-slate-400">👮 Police +0</span>
              <span className="text-[#B63A32] dark:text-red-400 font-extrabold">🥷 Chor +500</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Round Role Points Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full my-6 p-5 md:p-6 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#D8BD6A] dark:border-[#D8BD6A]/40 shadow-[0_8px_24px_rgba(23,59,103,0.06)]"
      >
        <h3 className="font-playfair text-base font-bold text-[#173B67] dark:text-[#D8BD6A] mb-3.5 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-[#C9A227]" /> Round Points Awarded
        </h3>

        <div className="space-y-2">
          {room.players.map((player) => {
            const role = player.role ? ROLES_CONFIG[player.role] : null;
            return (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#E2D7C3] dark:border-[#D8BD6A]/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{player.avatar}</span>
                  <div className="text-left">
                    <span className="font-playfair font-black text-sm text-[#173B67] dark:text-slate-100 block">{player.name}</span>
                    <span className="text-xs text-[#5F6872] dark:text-slate-400 flex items-center gap-1 font-semibold">
                      <span>{role?.emoji}</span>
                      <span>{role?.name}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono font-bold text-sm md:text-base ${
                      player.roundScore > 0 ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : 'text-slate-400'
                    }`}
                  >
                    +{player.roundScore} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Proceed CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onViewScoreboard();
          }}
          rightIcon={<ArrowRight className="w-5 h-5 text-[#D8BD6A]" />}
        >
          View Royal Scoreboard
        </Button>
      </motion.div>
    </div>
  );
};
