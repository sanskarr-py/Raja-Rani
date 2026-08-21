import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowLeft, Target, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

const AVATARS = ['👑', '🦁', '🐯', '🦅', '🐺', '🦊', '👸', '🥷', '👮', '🐲', '🦄', '🐼'];

interface CreateRoomProps {
  onBack: () => void;
  onCreateRoom: (hostName: string, avatar: string, targetScore: number) => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ onBack, onCreateRoom }) => {
  const [name, setName] = useState('Sanskar');
  const [selectedAvatar, setSelectedAvatar] = useState('👑');
  const [targetScore, setTargetScore] = useState<number>(5000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    sound.playButtonClick();
    onCreateRoom(name.trim(), selectedAvatar, targetScore);
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
            <Crown className="w-5 h-5 text-[#C9A227]" /> Create Royal Room
          </h2>
          <div className="w-9" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6872] dark:text-slate-300 mb-2 font-sans">
              Choose Royal Crest / Avatar
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

          {/* Host Nickname Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6872] dark:text-slate-300 mb-2 font-sans">
              Your Court Name
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sanskar"
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F2] dark:bg-[#141D2B] border border-[#D8BD6A]/60 dark:border-[#D8BD6A]/30 focus:border-[#173B67] dark:focus:border-[#D8BD6A] focus:ring-2 focus:ring-[#173B67]/20 text-[#173B67] dark:text-white placeholder-slate-400 font-semibold text-sm outline-none transition-all"
            />
          </div>

          {/* Target Score Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6872] dark:text-slate-300 mb-2 font-sans flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#C9A227]" /> Victory Target Score
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '5,000', value: 5000 },
                { label: '10,000', value: 10000 },
                { label: '15,000', value: 15000 },
                { label: 'Endless', value: 0 },
              ].map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    sound.playButtonClick();
                    setTargetScore(item.value);
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-playfair font-bold transition-all cursor-pointer ${
                    targetScore === item.value
                      ? 'bg-[#173B67] dark:bg-[#D8BD6A] text-white dark:text-[#070A0F] border border-[#D8BD6A] shadow-md'
                      : 'bg-[#FAF8F2] dark:bg-[#141D2B] text-[#5F6872] dark:text-slate-300 border border-[#E2D7C3] dark:border-[#233348] hover:border-[#D8BD6A]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#5F6872] dark:text-slate-400 mt-1.5 font-medium">
              First player to reach {targetScore > 0 ? `${targetScore.toLocaleString()} points` : 'any score'} wins the grand crown.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<Sparkles className="w-4 h-4 text-[#D8BD6A]" />}
          >
            Create Room & Open Lobby
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
