import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Bot, UserPlus, UserMinus, Play, Copy, Check, ShieldCheck } from 'lucide-react';
import type { GameRoom } from '../../types/game';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface LobbyViewProps {
  room: GameRoom;
  currentPlayerId: string;
  onAddBot: () => void;
  onRemoveBot: () => void;
  onToggleReady: () => void;
  onStartGame: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  room,
  currentPlayerId,
  onAddBot,
  onRemoveBot,
  onStartGame,
}) => {
  const [copied, setCopied] = useState(false);
  const isHost = room.hostId === currentPlayerId;
  const canStart = room.players.length >= 4;

  const copyRoomCode = () => {
    navigator.clipboard.writeText(room.code);
    sound.playButtonClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-5xl mx-auto w-full text-[#263238] dark:text-white transition-colors duration-300">
      {/* Top Chamber Header & Room Code Display */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-5 md:p-6 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#D8BD6A] shadow-[0_8px_30px_rgba(23,59,103,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-colors duration-300"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF3DE] dark:bg-[#141D2B] border border-[#D8BD6A] flex items-center justify-center text-2xl shadow-sm">
            👑
          </div>
          <div>
            <h2 className="font-playfair text-lg md:text-xl font-bold text-[#173B67] dark:text-white tracking-wide">
              Royal Waiting Chamber
            </h2>
            <p className="text-xs text-[#5F6872] dark:text-[#94A3B8] font-medium">
              Gathering courtiers for Raja Rani • {room.players.length} Courtiers Assembled
            </p>
          </div>
        </div>

        {/* Room Code Badge */}
        <div className="flex items-center gap-3 bg-[#FAF8F2] dark:bg-[#141D2B] p-2 pr-4 rounded-2xl border border-[#D8BD6A]/70 shadow-sm">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#FAF3DE] dark:bg-[#1A2536] border border-[#D8BD6A] font-mono text-base md:text-lg font-black text-[#173B67] dark:text-[#D8BD6A] tracking-wider">
            {room.code}
          </div>
          <button
            onClick={copyRoomCode}
            className="flex items-center gap-1.5 text-xs font-bold text-[#173B67] dark:text-[#D8BD6A] hover:text-[#C9A227] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#C9A227]" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Center Courtiers Chamber Grid */}
      <div className="w-full my-8">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-playfair font-bold text-[#173B67] dark:text-white">
            <Users className="w-4 h-4 text-[#C9A227]" />
            <span>Courtiers in Chamber ({room.players.length}/8)</span>
          </div>

          {/* Target Score Pill */}
          <div className="text-xs font-playfair font-bold text-[#173B67] dark:text-[#D8BD6A] bg-[#FAF3DE] dark:bg-[#141D2B] px-3.5 py-1 rounded-full border border-[#D8BD6A]">
            Target: {room.targetScore > 0 ? `${room.targetScore.toLocaleString()} pts` : 'Endless'}
          </div>
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {room.players.map((player, idx) => {
            const isMe = player.id === currentPlayerId;
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`relative rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all ${
                  isMe
                    ? 'bg-[#FAF3DE]/80 dark:bg-[#1A2536] border-2 border-[#C9A227] shadow-[0_4px_16px_rgba(201,162,39,0.2)]'
                    : 'bg-white dark:bg-[#0E1522] border border-[#E2D7C3] dark:border-[#233348] hover:border-[#D8BD6A] shadow-sm'
                }`}
              >
                {/* Host Crown or Bot Badge */}
                <div className="absolute top-2.5 left-2.5">
                  {player.isHost ? (
                    <div className="p-1 rounded-lg bg-[#FAF3DE] dark:bg-[#C9A227]/20 border border-[#D8BD6A] text-[#C9A227]">
                      <Crown className="w-3.5 h-3.5 fill-current" />
                    </div>
                  ) : player.isBot ? (
                    <div className="p-1 rounded-lg bg-[#EBF2FA] dark:bg-blue-900/40 border border-[#98B4D4] dark:border-blue-700 text-[#173B67] dark:text-blue-300">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  ) : null}
                </div>

                {/* Ready Status indicator */}
                <div className="absolute top-2.5 right-2.5">
                  {player.isReady ? (
                    <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse mt-1" />
                  )}
                </div>

                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#E2D7C3] dark:border-[#233348] flex items-center justify-center text-3xl my-2 shadow-inner">
                  {player.avatar}
                </div>

                {/* Name */}
                <div className="w-full">
                  <span className="font-playfair font-bold text-sm text-[#173B67] dark:text-white truncate block max-w-full">
                    {player.name}
                  </span>
                  <span className="text-[11px] text-[#5F6872] dark:text-slate-400 block mt-0.5 font-medium">
                    {player.isHost ? 'Host' : player.isBot ? 'AI Courtier' : isMe ? 'You' : 'Courtier'}
                  </span>
                </div>

                {/* Ready / You tag */}
                <div className="mt-3 w-full">
                  {isMe ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#173B67] dark:bg-[#D8BD6A] text-white dark:text-[#070A0F] text-[10px] font-bold tracking-wider">
                      YOU (READY)
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF8F2] dark:bg-[#141D2B] text-[#5F6872] dark:text-slate-400 border border-[#E2D7C3] dark:border-[#233348] text-[10px] font-medium">
                      {player.isReady ? 'Ready' : 'Waiting...'}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Empty Seats Placeholders */}
          {Array.from({ length: Math.max(0, 5 - room.players.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="rounded-2xl p-4 border border-dashed border-[#D8BD6A]/50 bg-[#FAF8F2]/50 dark:bg-[#141D2B]/30 flex flex-col items-center justify-center text-slate-400 min-h-[160px]"
            >
              <div className="w-12 h-12 rounded-full border border-dashed border-[#D8BD6A]/60 flex items-center justify-center text-[#5F6872] dark:text-slate-400 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-playfair font-bold text-[#5F6872] dark:text-slate-400">Empty Seat</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Host / Player Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full p-4 md:p-6 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#D8BD6A] shadow-[0_8px_30px_rgba(23,59,103,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Bot Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {isHost && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAddBot}
                disabled={room.players.length >= 8}
                leftIcon={<UserPlus className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />}
              >
                + Add AI Bot
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveBot}
                disabled={!room.players.some((p) => p.isBot)}
                leftIcon={<UserMinus className="w-4 h-4 text-[#B63A32] dark:text-rose-400" />}
              >
                - Remove Bot
              </Button>
            </>
          )}
        </div>

        {/* Start Game or Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {isHost ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {!canStart && (
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  Need at least 4 players (Add {4 - room.players.length} bots or invite friends)
                </span>
              )}
              <Button
                variant="primary"
                size="lg"
                fullWidth={false}
                disabled={!canStart}
                onClick={onStartGame}
                rightIcon={<Play className="w-5 h-5 fill-current text-[#D8BD6A]" />}
              >
                Start Royal Game
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-[#173B67] dark:text-[#D8BD6A] font-playfair font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C9A227] animate-ping" />
              <span>Waiting for Host to Start the Game...</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
