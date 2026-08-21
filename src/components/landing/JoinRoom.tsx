import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

const AVATARS = ['👸', '🦁', '🐯', '🦅', '🐺', '🦊', '👑', '🥷', '👮', '🐲', '🦄', '🐼'];

interface JoinRoomProps {
  onBack: () => void;
  onJoinRoom: (roomCode: string, playerName: string, avatar: string) => void;
}

export const JoinRoom: React.FC<JoinRoomProps> = ({ onBack, onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👸');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim() || !name.trim()) return;
    sound.playButtonClick();
    onJoinRoom(roomCode.trim().toUpperCase(), name.trim(), selectedAvatar);
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex items-center justify-center p-4 z-10 text-[#263238] dark:text-white transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0E1522] border-2 border-[#D8BD6A] shadow-[0_16px_40px_rgba(23,59,103,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-colors duration-300"
      >
        {/* Top Back & Title */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sound.playButtonClick();
              onBack();
            }}
            className="p-2 rounded-xl text-[#5F6872] dark:text-slate-400 hover:text-[#173B67] dark:hover:text-white hover:bg-[#F3EDE1] dark:hover:bg-[#141D2B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-playfair text-xl font-bold text-[#173B67] dark:text-white tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-[#173B67] dark:text-[#D8BD6A]" /> Join Royal Court
          </h2>
          <div className="w-9" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Code Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6872] dark:text-slate-300 mb-2 font-sans">
              Enter 6-Digit Room Code
            </label>
            <input
              type="text"
              required
              maxLength={8}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. R7K9XP"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF8F2] dark:bg-[#141D2B] border-2 border-[#D8BD6A]/70 dark:border-[#D8BD6A]/40 focus:border-[#173B67] dark:focus:border-[#D8BD6A] focus:ring-2 focus:ring-[#173B67]/20 text-center text-[#173B67] dark:text-white placeholder-slate-400 font-mono font-black tracking-widest text-lg uppercase outline-none transition-all"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6872] dark:text-slate-300 mb-2 font-sans">
              Choose Your Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => {
                    sound.playButtonClick();
                    setSelectedAvatar(av);
                  }}
                  className={`h-11 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                    selectedAvatar === av
                      ? 'bg-[#FAF3DE] dark:bg-[#C9A227]/20 border-2 border-[#C9A227] scale-110 shadow-md'
                      : 'bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#E2D7C3] dark:border-[#233348] hover:border-[#D8BD6A] hover:bg-[#F3EDE1] dark:hover:bg-[#1A2536]'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Player Nickname */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6872] dark:text-slate-300 mb-2 font-sans">
              Your Court Nickname
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aayush"
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#D8BD6A]/60 dark:border-[#D8BD6A]/30 focus:border-[#173B67] dark:focus:border-[#D8BD6A] focus:ring-2 focus:ring-[#173B67]/20 text-[#173B67] dark:text-white placeholder-slate-400 font-semibold text-sm outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<LogIn className="w-4 h-4 text-[#D8BD6A]" />}
          >
            Enter Royal Chamber
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
