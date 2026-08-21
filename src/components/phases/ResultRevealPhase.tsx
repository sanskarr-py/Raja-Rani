import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, ArrowRight } from 'lucide-react';
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
      // Fire celebratory royal confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#3B82F6', '#10B981', '#F59E0B'],
        });
      } catch {
        // ignore
      }
    } else {
      sound.playWrongGuess();
    }
  }, [isCorrect]);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-2xl mx-auto w-full text-center">
      {/* Top Banner Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full"
      >
        {isCorrect ? (
          <div className="p-6 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-3xl md:text-4xl font-cinzel font-black text-emerald-400 tracking-wide">
              🎉 CHOR CAUGHT!
            </h2>
            <p className="text-sm text-slate-200 mt-1">
              <strong className="text-white">{policePlayer?.name}</strong> successfully apprehended the thief{' '}
              <strong className="text-emerald-300">{accusedPlayer?.name}</strong>!
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-3xl bg-rose-950/60 border-2 border-rose-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400 text-rose-400 flex items-center justify-center mb-3">
              <XCircle className="w-9 h-9" />
            </div>
            <h2 className="text-3xl md:text-4xl font-cinzel font-black text-rose-400 tracking-wide">
              💀 WRONG SUSPECT!
            </h2>
            <p className="text-sm text-slate-200 mt-1">
              <strong className="text-white">{accusedPlayer?.name}</strong> was innocent! The real Chor was{' '}
              <strong className="text-rose-300">{chorPlayer?.name}</strong> who escapes with the bounty!
            </p>
          </div>
        )}
      </motion.div>

      {/* Round Role Points Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full my-6 p-4 md:p-6 rounded-3xl bg-[#0E1522]/90 border border-white/10 shadow-xl"
      >
        <h3 className="font-cinzel text-base font-bold text-[#D4AF37] mb-3 flex items-center justify-center gap-2">
          <Award className="w-4 h-4" /> Round Points Awarded
        </h3>

        <div className="space-y-2.5">
          {room.players.map((player) => {
            const role = player.role ? ROLES_CONFIG[player.role] : null;
            return (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#141D2C] border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{player.avatar}</span>
                  <div className="text-left">
                    <span className="font-bold text-sm text-white block">{player.name}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span>{role?.emoji}</span>
                      <span>{role?.name}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono font-bold text-sm md:text-base ${
                      player.roundScore > 0 ? 'text-emerald-400' : 'text-slate-500'
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
        transition={{ delay: 0.6 }}
        className="w-full"
      >
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onViewScoreboard();
          }}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          View Royal Scoreboard & Leaderboard
        </Button>
      </motion.div>
    </div>
  );
};
