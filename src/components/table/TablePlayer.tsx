import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Crown, Crosshair, Check } from 'lucide-react';
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && canBeAccused && onSelectAccused && !player.isPoliceRevealed) {
      e.preventDefault();
      sound.playButtonClick();
      onSelectAccused(player);
    }
  };

  const isInteractive = canBeAccused && !player.isPoliceRevealed;

  return (
    <motion.div
      whileHover={isInteractive ? { scale: 1.05, y: -6 } : {}}
      whileTap={isInteractive ? { scale: 0.96 } : {}}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Accuse ${player.name} of being Chor` : undefined}
      className={`relative flex flex-col items-center transition-all duration-300 ${
        isInteractive ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-2xl' : ''
      }`}
    >
      {/* Bot Dialogue Bark (if present) */}
      {player.botPersonality?.dialogue && !showTrueRole && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-12 z-20 max-w-[170px] px-3 py-1 rounded-xl bg-white dark:bg-[#1E293B] border border-[#D8BD6A] text-[11px] text-[#173B67] dark:text-slate-200 shadow-[0_4px_16px_rgba(23,59,103,0.12)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)] pointer-events-none text-center font-bold leading-tight"
        >
          {player.botPersonality.dialogue}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1E293B] border-r border-b border-[#D8BD6A] rotate-45" />
        </motion.div>
      )}

      {/* Main Seat Card */}
      <div
        className={`relative flex flex-col items-center p-3.5 rounded-2xl transition-all duration-300 ${
          compact ? 'w-28 md:w-32' : 'w-32 md:w-40'
        } ${
          isAccused
            ? 'bg-[#FAF3DE] dark:bg-[#1A2536] border-2 border-[#173B67] dark:border-[#D8BD6A] shadow-[0_0_24px_rgba(23,59,103,0.3)] dark:shadow-[0_0_24px_rgba(201,162,39,0.4)] -translate-y-2'
            : player.isPoliceRevealed
            ? 'bg-[#EBF2FA] dark:bg-blue-950/70 border-2 border-[#173B67] dark:border-blue-400 shadow-[0_0_20px_rgba(23,59,103,0.22)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
            : isCurrentPlayer
            ? 'bg-white dark:bg-[#141D2B] border-2 border-[#C9A227] shadow-[0_4px_16px_rgba(201,162,39,0.22)]'
            : 'bg-white dark:bg-[#0E1522] border border-[#E2D7C3] dark:border-[#233348] hover:border-[#D8BD6A] shadow-[0_4px_12px_rgba(23,59,103,0.06)] dark:shadow-none'
        }`}
      >
        {/* Accuse Target Indicator for Police */}
        {canBeAccused && !player.isPoliceRevealed && (
          <div className="absolute -top-3 right-2 px-2 py-0.5 rounded-md bg-[#173B67] dark:bg-[#B63A32] text-[#FAF8F2] text-[9px] font-bold flex items-center gap-1 shadow-md border border-[#D8BD6A]">
            {isAccused ? <Check className="w-3 h-3 text-[#D8BD6A]" /> : <Crosshair className="w-3 h-3 text-[#D8BD6A]" />}
            <span>{isAccused ? 'SELECTED' : 'ACCUSE'}</span>
          </div>
        )}

        {/* Circular Avatar */}
        <div className="relative mb-2">
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl select-none shadow-sm ${
              player.isPoliceRevealed
                ? 'bg-[#EBF2FA] dark:bg-blue-900/40 border-2 border-[#173B67] dark:border-blue-400'
                : 'bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#D8BD6A]/60'
            }`}
          >
            {player.avatar}
          </div>

          {/* Host Crown Icon */}
          {player.isHost && (
            <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-[#C9A227] text-white flex items-center justify-center shadow-sm">
              <Crown className="w-3.5 h-3.5 fill-current" />
            </div>
          )}

          {/* Current Player (YOU) Tag */}
          {isCurrentPlayer && (
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#173B67] dark:bg-[#D8BD6A] text-white dark:text-[#070A0F] text-[9px] font-bold font-playfair shadow-sm">
              YOU
            </div>
          )}
        </div>

        {/* Player Name */}
        <div className="w-full text-center">
          <span className="font-playfair font-black text-xs md:text-sm text-[#173B67] dark:text-white truncate block max-w-[110px] mx-auto">
            {player.name}
          </span>
          <span className="text-[10px] text-[#5F6872] dark:text-slate-400 font-mono font-bold block mt-0.5">
            {player.score} pts
          </span>
        </div>

        {/* ROLE STATUS BADGE */}
        <div className="mt-2 w-full">
          {showTrueRole && trueRoleConfig ? (
            /* Round Finished: True Role Revealed */
            <div
              className="py-1 px-2 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
              style={{
                backgroundColor: trueRoleConfig.badgeBg,
                border: `1px solid ${trueRoleConfig.borderColor}`,
              }}
            >
              <span className="text-xs">{trueRoleConfig.emoji}</span>
              <span
                className="text-[10px] md:text-xs font-playfair font-bold tracking-wide"
                style={{ color: trueRoleConfig.color }}
              >
                {trueRoleConfig.name}
              </span>
            </div>
          ) : player.isPoliceRevealed ? (
            /* Police Public Announcement */
            <div className="py-1 px-2 rounded-xl bg-[#173B67] dark:bg-blue-600 text-white text-center flex items-center justify-center gap-1 shadow-sm border border-[#D8BD6A]">
              <Shield className="w-3 h-3 text-[#D8BD6A] fill-[#D8BD6A]" />
              <span className="text-[10px] md:text-xs font-playfair font-black tracking-wider">
                POLICE
              </span>
            </div>
          ) : isCurrentPlayer && player.role ? (
            /* Current Player's own card indicator */
            <div className="py-1 px-2 rounded-xl bg-[#FAF3DE] dark:bg-[#1A2536] border border-[#C9A227] text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#C9A227]" />
              <span className="text-[10px] font-playfair font-bold text-[#173B67] dark:text-[#D8BD6A] truncate">
                YOUR SECRET
              </span>
            </div>
          ) : (
            /* Other player: STRICTLY HIDDEN */
            <div className="py-1 px-2 rounded-xl bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#E2D7C3] dark:border-[#233348] text-[#5F6872] dark:text-slate-400 text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#5F6872] dark:text-slate-400" />
              <span className="text-[10px] font-playfair font-bold tracking-wider text-[#5F6872] dark:text-slate-400">
                SECRET
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
