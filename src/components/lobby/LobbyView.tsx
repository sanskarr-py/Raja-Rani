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
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-8 z-10 max-w-5xl mx-auto w-full">
      {/* Top Chamber Header & Room Code Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-3xl bg-[#0E1522]/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-2xl">
            👑
          </div>
          <div>
            <h2 className="font-cinzel text-lg md:text-xl font-bold text-white tracking-wide">
              Royal Waiting Hall
            </h2>
            <p className="text-xs text-slate-400">
              Gathering courtiers for Raja Rani • {room.players.length} Courtiers Assembled
            </p>
          </div>
        </div>

        {/* Room Code Badge */}
        <div className="flex items-center gap-3 bg-[#141C2B] p-2 pr-4 rounded-2xl border border-white/10">
          <div className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 font-mono text-base md:text-lg font-bold text-[#D4AF37] tracking-wider">
            {room.code}
          </div>
          <button
            onClick={copyRoomCode}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Center Courtiers Chamber Grid */}
      <div className="w-full my-8">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-cinzel font-bold text-slate-300">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>Courtiers in Chamber ({room.players.length}/8)</span>
          </div>

          {/* Target Score Pill */}
          <div className="text-xs font-cinzel font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
            Target: {room.targetScore > 0 ? `${room.targetScore.toLocaleString()} pts` : 'Endless'}
          </div>
        </div>

        {/* Floating Player Cards Grid */}
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
                    ? 'bg-[#182335] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#111722] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Host Crown or Bot Badge */}
                <div className="absolute top-2.5 left-2.5">
                  {player.isHost ? (
                    <div className="p-1 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                      <Crown className="w-3.5 h-3.5 fill-current" />
                    </div>
                  ) : player.isBot ? (
                    <div className="p-1 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  ) : null}
                </div>

                {/* Ready Status indicator */}
                <div className="absolute top-2.5 right-2.5">
                  {player.isReady ? (
                    <div className="p-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse mt-1" />
                  )}
                </div>

                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-[#0B1019] border border-white/10 flex items-center justify-center text-3xl my-2 shadow-inner">
                  {player.avatar}
                </div>

                {/* Name */}
                <div className="w-full">
                  <span className="font-semibold text-sm text-white truncate block max-w-full">
                    {player.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {player.isHost ? 'Host' : player.isBot ? 'AI Courtier' : isMe ? 'You' : 'Courtier'}
                  </span>
                </div>

                {/* Ready / You tag */}
                <div className="mt-3 w-full">
                  {isMe ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold font-cinzel">
                      YOU (READY)
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 text-[10px] font-medium">
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
              className="rounded-2xl p-4 border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-slate-600 min-h-[160px]"
            >
              <div className="w-12 h-12 rounded-full border border-dashed border-white/15 flex items-center justify-center text-slate-600 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-cinzel text-slate-500">Empty Seat</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Host / Player Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full p-4 md:p-6 rounded-3xl bg-[#0E1522]/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Bot Controls (Available for Host or any single player) */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {isHost && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAddBot}
                disabled={room.players.length >= 8}
                leftIcon={<UserPlus className="w-4 h-4 text-emerald-400" />}
              >
                + Add AI Bot
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveBot}
                disabled={!room.players.some((p) => p.isBot)}
                leftIcon={<UserMinus className="w-4 h-4 text-rose-400" />}
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
                <span className="text-xs text-amber-400 font-medium">
                  Need at least 4 players (Add {4 - room.players.length} bots or invite friends)
                </span>
              )}
              <Button
                variant="gold"
                size="lg"
                fullWidth={false}
                disabled={!canStart}
                onClick={onStartGame}
                rightIcon={<Play className="w-5 h-5 fill-current" />}
              >
                Start Royal Game
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-300 font-cinzel">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>Waiting for Host to Start the Game...</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
