import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Play, RotateCcw } from 'lucide-react';
import { ROLES_CONFIG, type GameRoom } from '../../types/game';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface ScoreboardPhaseProps {
  room: GameRoom;
  currentPlayerId: string;
  onNextRound: () => void;
  onReturnToLobby: () => void;
}

export const ScoreboardPhase: React.FC<ScoreboardPhaseProps> = ({
  room,
  currentPlayerId,
  onNextRound,
  onReturnToLobby,
}) => {
  const isHost = room.hostId === currentPlayerId;

  // Sort players by total score descending
  const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);
  const leader = sortedPlayers[0];

  useEffect(() => {
    sound.playScoreTally();
  }, []);

  const getMedal = (idx: number) => {
    if (idx === 0) return '🥇';
    if (idx === 1) return '🥈';
    if (idx === 2) return '🥉';
    return `#${idx + 1}`;
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-3xl mx-auto w-full text-[#263238] dark:text-white transition-colors duration-300">
      {/* Scoreboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        <div className="flex items-center justify-center gap-2 text-[#C9A227] font-playfair font-bold text-xs uppercase tracking-widest mb-1">
          <Trophy className="w-4 h-4" />
          <span>Round {room.round} Concluded</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#173B67] dark:text-white tracking-wide">
          👑 ROUND RESULTS
        </h2>
        {room.targetScore > 0 && (
          <p className="text-xs text-[#5F6872] dark:text-slate-400 mt-1 font-medium">
            Target to Win: <strong className="text-[#173B67] dark:text-[#D8BD6A]">{room.targetScore.toLocaleString()} pts</strong> • Leader is at{' '}
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{leader?.score.toLocaleString()} pts</strong>
          </p>
        )}
      </motion.div>

      {/* Leaderboard Table Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full my-6 p-4 md:p-6 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#D8BD6A] shadow-[0_12px_36px_rgba(23,59,103,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-colors duration-300"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 text-[11px] font-playfair font-black text-[#173B67] dark:text-[#D8BD6A] uppercase tracking-wider pb-3 border-b-2 border-[#D8BD6A]/40 px-2">
          <span className="col-span-2 text-center">Rank</span>
          <span className="col-span-4">Courtier</span>
          <span className="col-span-2 text-center">Role</span>
          <span className="col-span-2 text-right">Round</span>
          <span className="col-span-2 text-right">Total</span>
        </div>

        {/* Player Rows */}
        <div className="divide-y divide-[#E2D7C3] dark:divide-[#233348] mt-2 space-y-1">
          {sortedPlayers.map((player, idx) => {
            const roleConfig = player.role ? ROLES_CONFIG[player.role] : null;
            const isMe = player.id === currentPlayerId;
            const isLeader = idx === 0;

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`grid grid-cols-12 items-center p-3 rounded-2xl transition-colors ${
                  isLeader
                    ? 'bg-[#FAF3DE] dark:bg-[#1A2536] border-2 border-[#C9A227] shadow-sm font-bold'
                    : isMe
                    ? 'bg-[#EBF2FA] dark:bg-[#141D2B] border border-[#98B4D4] dark:border-[#233348]'
                    : 'hover:bg-[#FAF8F2] dark:hover:bg-[#141D2B]/50'
                }`}
              >
                {/* Rank Badge */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="font-playfair font-black text-base text-[#173B67] dark:text-white">
                    {getMedal(idx)}
                  </span>
                </div>

                {/* Courtier Name & Avatar */}
                <div className="col-span-4 flex items-center gap-2.5 truncate pr-2">
                  <span className="text-xl">{player.avatar}</span>
                  <div className="truncate">
                    <span className="font-playfair font-bold text-sm text-[#173B67] dark:text-white block truncate">
                      {player.name}
                    </span>
                    {isMe && (
                      <span className="text-[9px] font-bold text-[#C9A227] block">
                        YOU
                      </span>
                    )}
                  </div>
                </div>

                {/* Round Role Badge */}
                <div className="col-span-2 flex justify-center">
                  {roleConfig && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-playfair font-bold flex items-center gap-1 shadow-sm"
                      style={{
                        backgroundColor: roleConfig.badgeBg,
                        color: roleConfig.color,
                        border: `1px solid ${roleConfig.borderColor}`,
                      }}
                    >
                      <span>{roleConfig.emoji}</span>
                      <span className="hidden sm:inline">{roleConfig.name}</span>
                    </span>
                  )}
                </div>

                {/* Round Points */}
                <div className="col-span-2 text-right">
                  <span
                    className={`font-mono font-bold text-xs md:text-sm ${
                      player.roundScore > 0 ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : 'text-slate-400'
                    }`}
                  >
                    +{player.roundScore}
                  </span>
                </div>

                {/* Total Score */}
                <div className="col-span-2 text-right">
                  <span className="font-mono font-black text-sm md:text-base text-[#173B67] dark:text-white">
                    {player.score.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            sound.playButtonClick();
            onReturnToLobby();
          }}
          leftIcon={<RotateCcw className="w-4 h-4 text-[#173B67] dark:text-[#D8BD6A]" />}
        >
          Return to Lobby
        </Button>

        {isHost ? (
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              sound.playCardShuffle();
              onNextRound();
            }}
            rightIcon={<Play className="w-5 h-5 fill-current text-[#D8BD6A]" />}
          >
            Play Next Round
          </Button>
        ) : (
          <div className="text-xs text-[#5F6872] dark:text-slate-400 font-playfair font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C9A227] animate-ping" />
            <span>Waiting for host to start next round...</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
