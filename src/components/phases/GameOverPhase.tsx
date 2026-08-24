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
    let animationFrameId: number;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#C9A227', '#173B67', '#D8BD6A', '#234F7D'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#C9A227', '#173B67', '#D8BD6A', '#234F7D'],
      });

      if (Date.now() < animationEnd) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };
    frame();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-2xl mx-auto w-full text-center text-[#263238] dark:text-white transition-colors duration-300">
      {/* Crown Banner */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, duration: 0.8 }}
        className="w-full flex flex-col items-center"
      >
        <div className="relative my-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#C9A227] via-[#FAF3DE] dark:via-[#1A2536] to-[#D8BD6A] p-1.5 shadow-[0_8px_35px_rgba(201,162,39,0.35)] flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-[#0E1522] rounded-full flex items-center justify-center text-5xl shadow-inner transition-colors">
              {winner?.avatar}
            </div>
          </div>
          <div className="absolute -top-3 -right-2 text-3xl animate-bounce">
            👑
          </div>
        </div>

        <span className="px-4 py-1 rounded-full bg-[#FAF3DE] dark:bg-[#141D2B] border border-[#D8BD6A] text-[#173B67] dark:text-[#D8BD6A] text-xs font-playfair font-black tracking-widest uppercase mb-2 shadow-sm">
          VICTOR OF THE ROYAL REALM
        </span>

        <h1 className="text-3xl md:text-5xl font-playfair font-black text-[#173B67] dark:text-white tracking-wide mb-1 transition-colors">
          {winner?.name} WINS!
        </h1>

        <p className="text-base md:text-lg font-mono font-bold text-[#5F6872] dark:text-slate-300 mb-6">
          {winner?.score.toLocaleString()} TOTAL POINTS
        </p>
      </motion.div>

      {/* Final Podium Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full my-4 p-5 md:p-6 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#D8BD6A] shadow-[0_12px_36px_rgba(23,59,103,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-colors duration-300"
      >
        <h3 className="font-playfair text-sm font-black text-[#173B67] dark:text-white uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-[#C9A227]" /> Final Court Standings
        </h3>

        <div className="space-y-2">
          {sortedPlayers.slice(0, 5).map((player, idx) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-2xl ${
                idx === 0
                  ? 'bg-[#FAF3DE] dark:bg-[#1A2536] border-2 border-[#C9A227] shadow-sm font-bold'
                  : 'bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#E2D7C3] dark:border-[#233348]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0
                      ? 'bg-[#C9A227] text-white font-black'
                      : idx === 1
                      ? 'bg-slate-300 text-[#173B67]'
                      : idx === 2
                      ? 'bg-amber-600 text-white'
                      : 'bg-white dark:bg-[#0E1522] text-[#5F6872] dark:text-slate-400 border border-[#E2D7C3] dark:border-[#233348]'
                  }`}
                >
                  #{idx + 1}
                </div>
                <span className="text-xl">{player.avatar}</span>
                <span className="font-playfair font-black text-sm text-[#173B67] dark:text-white truncate max-w-[140px]">
                  {player.name}
                </span>
              </div>

              <span className="font-mono font-bold text-sm md:text-base text-[#173B67] dark:text-white">
                {player.score.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Play Again CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            sound.playButtonClick();
            onPlayAgain();
          }}
          leftIcon={<Sparkles className="w-5 h-5 text-[#D8BD6A]" />}
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
          leftIcon={<RotateCcw className="w-4 h-4 text-[#173B67] dark:text-[#D8BD6A]" />}
        >
          Return to Lobby
        </Button>
      </motion.div>
    </div>
  );
};
