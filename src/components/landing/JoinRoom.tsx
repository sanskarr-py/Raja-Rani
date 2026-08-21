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
    <div className="relative min-h-[calc(100vh-68px)] flex items-center justify-center p-4 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-[#0E1522] border border-[#3B82F6]/30 shadow-2xl backdrop-blur-xl text-slate-100"
      >
        {/* Top Back & Title */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sound.playButtonClick();
              onBack();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-cinzel text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-[#3B82F6]" /> Join Royal Court
          </h2>
          <div className="w-9" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Code Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-cinzel">
              Enter 6-Digit Room Code
            </label>
            <input
              type="text"
              required
              maxLength={8}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. R7K9XP"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#141D2C] border-2 border-white/10 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 text-center text-white placeholder-slate-500 font-mono font-bold tracking-widest text-lg uppercase outline-none transition-all"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-cinzel">
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
                      ? 'bg-[#3B82F6] border-2 border-white scale-110 shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                      : 'bg-[#182335] border border-white/10 hover:border-[#3B82F6]/50 hover:bg-[#202e45]'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Player Nickname */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-cinzel">
              Your Court Nickname
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aayush"
              className="w-full px-4 py-3 rounded-2xl bg-[#141D2C] border border-white/10 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 text-white placeholder-slate-500 font-medium text-sm outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="police"
            size="lg"
            fullWidth
            rightIcon={<LogIn className="w-4 h-4" />}
          >
            Enter Royal Chamber
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
