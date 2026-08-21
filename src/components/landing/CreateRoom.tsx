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
    <div className="relative min-h-[calc(100vh-68px)] flex items-center justify-center p-4 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-[#0E1522] border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl text-slate-100"
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
            <Crown className="w-5 h-5 text-[#D4AF37]" /> Create Royal Room
          </h2>
          <div className="w-9" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-cinzel">
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
                      ? 'bg-[#D4AF37] border-2 border-white scale-110 shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                      : 'bg-[#182335] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#202e45]'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Host Nickname Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-cinzel">
              Your Court Name
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sanskar"
              className="w-full px-4 py-3 rounded-2xl bg-[#141D2C] border border-white/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 text-white placeholder-slate-500 font-medium text-sm outline-none transition-all"
            />
          </div>

          {/* Target Score Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-cinzel flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#D4AF37]" /> Victory Target Score
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
                  className={`py-2 px-1 rounded-xl text-xs font-cinzel font-bold transition-all cursor-pointer ${
                    targetScore === item.value
                      ? 'bg-gradient-to-b from-[#D4AF37] to-[#997A15] text-black border border-[#FFF0B3] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'bg-[#141D2C] text-slate-300 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              First player to reach {targetScore > 0 ? `${targetScore.toLocaleString()} points` : 'any score'} wins the grand crown.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gold"
            size="lg"
            fullWidth
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Create Room & Open Lobby
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
