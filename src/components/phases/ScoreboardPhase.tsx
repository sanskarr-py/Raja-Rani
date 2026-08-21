import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Play, RotateCcw } from 'lucide-react';
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

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-3xl mx-auto w-full">
      {/* Scoreboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-cinzel font-bold text-xs uppercase tracking-widest mb-1">
          <Trophy className="w-4 h-4" />
          <span>Round {room.round} Concluded</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-cinzel font-black text-white tracking-wide">
          ROYAL SCOREBOARD
        </h2>
        {room.targetScore > 0 && (
          <p className="text-xs text-slate-400 mt-1">
            Target to Win: <strong className="text-[#D4AF37]">{room.targetScore.toLocaleString()} pts</strong> • Leader is at{' '}
            <strong className="text-emerald-400">{leader?.score.toLocaleString()} pts</strong>
          </p>
        )}
      </motion.div>

      {/* Leaderboard Table Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full my-6 p-4 md:p-6 rounded-3xl bg-[#0E1522]/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 text-[11px] font-cinzel font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-white/10 px-2">
          <span className="col-span-1 text-center">Rank</span>
          <span className="col-span-4">Courtier</span>
          <span className="col-span-3 text-center">Round Role</span>
          <span className="col-span-2 text-right">Round</span>
          <span className="col-span-2 text-right">Total</span>
        </div>

        {/* Player Rows */}
        <div className="divide-y divide-white/5 mt-2 space-y-1">
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
                  isMe
                    ? 'bg-[#182335] border border-[#D4AF37]/40 shadow-md'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Rank Badge */}
                <div className="col-span-1 flex items-center justify-center">
                  {isLeader ? (
                    <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-xs font-black shadow-[0_0_10px_rgba(212,175,55,0.6)]">
                      <Crown className="w-3.5 h-3.5 fill-current" />
                    </div>
                  ) : (
                    <span className="font-cinzel font-bold text-sm text-slate-400">
                      #{idx + 1}
                    </span>
                  )}
                </div>

                {/* Courtier Name & Avatar */}
                <div className="col-span-4 flex items-center gap-2.5 truncate pr-2">
                  <span className="text-xl">{player.avatar}</span>
                  <div className="truncate">
                    <span className="font-bold text-sm text-white block truncate">
                      {player.name}
                    </span>
                    {isMe && (
                      <span className="text-[9px] font-cinzel text-[#D4AF37] font-bold block">
                        YOU
                      </span>
                    )}
                  </div>
                </div>

                {/* Round Role Badge */}
                <div className="col-span-3 flex justify-center">
                  {roleConfig && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-cinzel font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: roleConfig.badgeBg,
                        color: roleConfig.color,
                        border: `1px solid ${roleConfig.borderColor}40`,
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
                      player.roundScore > 0 ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    +{player.roundScore}
                  </span>
                </div>

                {/* Total Score */}
                <div className="col-span-2 text-right">
                  <span className="font-mono font-black text-sm md:text-base text-white">
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
        initial={{ opacity: 0, y: 20 }}
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
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Return to Lobby
        </Button>

        {isHost ? (
          <Button
            variant="gold"
            size="lg"
            onClick={() => {
              sound.playCardShuffle();
              onNextRound();
            }}
            rightIcon={<Play className="w-5 h-5 fill-current" />}
          >
            Play Next Round
          </Button>
        ) : (
          <div className="text-xs text-slate-400 font-cinzel flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span>Waiting for host to start next round...</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
