import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Award } from 'lucide-react';
import type { GameRoom } from '../../types/game';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface GameOverPhaseProps {
  room: GameRoom;
  onPlayAgain: () => void;
  onReturnToLobby: () => void;
}

export const GameOverPhase: React.FC<GameOverPhaseProps> = ({
  room,
  onPlayAgain,
  onReturnToLobby,
}) => {
  const winner = room.winner || [...room.players].sort((a, b) => b.score - a.score)[0];
  const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);

  useEffect(() => {
    sound.playVictory();

    // Continuous celebration fireworks confetti
    const duration = 4000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#F59E0B', '#3B82F6', '#10B981'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#F59E0B', '#3B82F6', '#10B981'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-2xl mx-auto w-full text-center">
      {/* Crown Banner */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, duration: 0.8 }}
        className="w-full flex flex-col items-center"
      >
        <div className="relative my-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF3C4] to-[#997A15] p-1 shadow-[0_0_60px_rgba(212,175,55,0.7)] flex items-center justify-center">
            <div className="w-full h-full bg-[#0E1522] rounded-full flex items-center justify-center text-5xl">
              {winner?.avatar}
            </div>
          </div>
          <div className="absolute -top-3 -right-2 text-3xl animate-bounce">
            👑
          </div>
        </div>

        <span className="px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-cinzel font-black tracking-widest uppercase mb-2">
          VICTOR OF THE ROYAL REALM
        </span>

        <h1 className="text-3xl md:text-5xl font-cinzel font-black gold-gradient-text tracking-wide mb-1">
          {winner?.name} WINS!
        </h1>

        <p className="text-base md:text-lg font-mono font-bold text-white mb-6">
          {winner?.score.toLocaleString()} TOTAL POINTS
        </p>
      </motion.div>

      {/* Final Podium Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full my-4 p-4 md:p-6 rounded-3xl bg-[#0E1522]/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl"
      >
        <h3 className="font-cinzel text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-[#D4AF37]" /> Final Court Standings
        </h3>

        <div className="space-y-2">
          {sortedPlayers.slice(0, 5).map((player, idx) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-2xl ${
                idx === 0
                  ? 'bg-[#182335] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#111722] border border-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0
                      ? 'bg-[#D4AF37] text-black font-black'
                      : idx === 1
                      ? 'bg-slate-300 text-black'
                      : idx === 2
                      ? 'bg-amber-700 text-white'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  #{idx + 1}
                </div>
                <span className="text-xl">{player.avatar}</span>
                <span className="font-bold text-sm text-white truncate max-w-[140px]">
                  {player.name}
                </span>
              </div>

              <span className="font-mono font-bold text-sm md:text-base text-white">
                {player.score.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Play Again CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onPlayAgain();
          }}
          leftIcon={<Sparkles className="w-5 h-5" />}
        >
          Start New Match
        </Button>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onReturnToLobby();
          }}
          leftIcon={<RotateCcw className="w-5 h-5" />}
        >
          Return to Lobby
        </Button>
      </motion.div>
    </div>
  );
};
