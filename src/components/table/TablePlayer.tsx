import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Crown, Crosshair } from 'lucide-react';
import { ROLES_CONFIG, type Player } from '../../types/game';
import { sound } from '../../utils/sound';

interface TablePlayerProps {
  player: Player;
  isCurrentPlayer: boolean;
  isPolicePhase?: boolean;
  canBeAccused?: boolean;
  isAccused?: boolean;
  onSelectAccused?: (player: Player) => void;
  showTrueRole?: boolean; // Only true in result/scoreboard phases!
  compact?: boolean;
}

export const TablePlayer: React.FC<TablePlayerProps> = ({
  player,
  isCurrentPlayer,
  canBeAccused = false,
  isAccused = false,
  onSelectAccused,
  showTrueRole = false,
  compact = false,
}) => {
  const trueRoleConfig = player.role ? ROLES_CONFIG[player.role] : null;

  const handleClick = () => {
    if (canBeAccused && onSelectAccused && !player.isPoliceRevealed) {
      sound.playButtonClick();
      onSelectAccused(player);
    }
  };

  return (
    <motion.div
      whileHover={canBeAccused && !player.isPoliceRevealed ? { scale: 1.05, y: -4 } : {}}
      whileTap={canBeAccused && !player.isPoliceRevealed ? { scale: 0.96 } : {}}
      onClick={handleClick}
      className={`relative flex flex-col items-center transition-all duration-300 ${
        canBeAccused && !player.isPoliceRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* Bot Dialogue Bark (if present) */}
      {player.botPersonality?.dialogue && !showTrueRole && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-12 z-20 max-w-[170px] px-2.5 py-1 rounded-xl bg-[#1E293B] border border-white/20 text-[10px] text-slate-200 shadow-xl pointer-events-none text-center font-medium leading-tight"
        >
          {player.botPersonality.dialogue}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1E293B] border-r border-b border-white/20 rotate-45" />
        </motion.div>
      )}

      {/* Main Seat Card */}
      <div
        className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
          compact ? 'w-28 md:w-32' : 'w-32 md:w-40'
        } ${
          isAccused
            ? 'bg-red-950/80 border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.6)] animate-pulse'
            : player.isPoliceRevealed
            ? 'bg-blue-950/70 border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
            : isCurrentPlayer
            ? 'bg-[#182335] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            : 'bg-[#111722]/90 border border-white/10 hover:border-white/30 shadow-lg'
        }`}
      >
        {/* Accuse Target Indicator for Police */}
        {canBeAccused && !player.isPoliceRevealed && (
          <div className="absolute -top-3 right-2 px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-bold flex items-center gap-1 shadow-md animate-bounce">
            <Crosshair className="w-3 h-3" />
            <span>ACCUSE</span>
          </div>
        )}

        {/* Avatar Ring */}
        <div className="relative mb-2">
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl select-none shadow-inner ${
              player.isPoliceRevealed
                ? 'bg-blue-900/60 border-2 border-blue-400'
                : 'bg-[#0B1019] border border-white/15'
            }`}
          >
            {player.avatar}
          </div>

          {/* Host Crown Icon */}
          {player.isHost && (
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-md">
              <Crown className="w-3.5 h-3.5 fill-current" />
            </div>
          )}

          {/* Current Player (YOU) Tag */}
          {isCurrentPlayer && (
            <div className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[9px] font-bold font-cinzel">
              YOU
            </div>
          )}
        </div>

        {/* Player Name */}
        <div className="w-full text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="font-semibold text-xs md:text-sm text-white truncate max-w-[100px]">
              {player.name}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono font-medium block">
            {player.score} pts
          </span>
        </div>

        {/* ROLE STATUS BADGE */}
        <div className="mt-2 w-full">
          {showTrueRole && trueRoleConfig ? (
            /* Round Finished: True Role Revealed */
            <div
              className="py-1 px-2 rounded-xl text-center flex items-center justify-center gap-1.5"
              style={{
                backgroundColor: trueRoleConfig.badgeBg,
                border: `1px solid ${trueRoleConfig.borderColor}60`,
              }}
            >
              <span className="text-xs">{trueRoleConfig.emoji}</span>
              <span
                className="text-[10px] md:text-xs font-cinzel font-bold tracking-wide"
                style={{ color: trueRoleConfig.color }}
              >
                {trueRoleConfig.name}
              </span>
            </div>
          ) : player.isPoliceRevealed ? (
            /* Police Public Announcement */
            <div className="py-1 px-2 rounded-xl bg-blue-600/30 border border-blue-400/80 text-blue-300 text-center flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
              <Shield className="w-3 h-3 text-blue-400 fill-current" />
              <span className="text-[10px] md:text-xs font-cinzel font-bold text-white tracking-wider">
                POLICE
              </span>
            </div>
          ) : isCurrentPlayer && player.role ? (
            /* Current Player's own card indicator */
            <div className="py-1 px-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] font-cinzel font-bold text-[#D4AF37] truncate">
                YOUR SECRET
              </span>
            </div>
          ) : (
            /* Other player: STRICTLY HIDDEN */
            <div className="py-1 px-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-cinzel font-semibold tracking-wider text-slate-300">
                SECRET
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
