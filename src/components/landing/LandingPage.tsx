import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Play, PlusCircle, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { RulesModal } from '../common/RulesModal';
import { sound } from '../../utils/sound';

interface LandingPageProps {
  onCreateRoomClick: () => void;
  onJoinRoomClick: () => void;
  onQuickPlayClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateRoomClick,
  onJoinRoomClick,
  onQuickPlayClick,
}) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center p-4 md:p-8 z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-lg flex flex-col items-center text-center"
      >
        {/* Royal Crown Emblem */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-5"
        >
          <div className="w-22 h-22 rounded-3xl bg-gradient-to-br from-[#FAF3DE] via-white to-[#F3EDE1] p-1 border-2 border-[#D8BD6A] shadow-[0_8px_24px_rgba(201,162,39,0.22)] flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center">
              <Crown className="w-11 h-11 text-[#C9A227] fill-[#FAF3DE]" />
            </div>
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#173B67] text-[#FAF8F2] text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1 border border-[#D8BD6A]/50 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-[#D8BD6A]" />
            <span>NEPALI ROYAL CLASSIC</span>
          </div>
        </motion.div>

        {/* Main Title & Slogan */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-black tracking-wide text-[#173B67] drop-shadow-sm mb-1 mt-2">
          RAJA <span className="font-cormorant italic font-normal text-[#C9A227]">Rani</span>
        </h1>

        <p className="text-base md:text-lg font-playfair font-bold tracking-widest text-[#5F6872] uppercase mb-3">
          Trust nobody. Guess wisely.
        </p>

        {/* Subtle Gold Decorative Line */}
        <div className="w-44 h-0.5 gold-divider mb-4 mx-auto" />

        <p className="text-xs md:text-sm text-[#5F6872] max-w-sm mb-8 font-medium leading-relaxed">
          The traditional royal deduction game reimagined as a luxury card game. Unmask the hidden thief and rule the court.
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-3.5 max-w-sm">
          {/* Create Room Button (Primary) */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<PlusCircle className="w-5 h-5 text-[#D8BD6A]" />}
            onClick={() => {
              sound.playButtonClick();
              onCreateRoomClick();
            }}
          >
            Create Room
          </Button>

          {/* Quick Match Solo / AI Button */}
          <Button
            variant="gold"
            size="lg"
            fullWidth
            leftIcon={<Play className="w-5 h-5 fill-current" />}
            onClick={() => {
              sound.playButtonClick();
              onQuickPlayClick();
            }}
          >
            Quick Match (Solo / AI)
          </Button>

          {/* Join Room Button (Secondary Outlined) */}
          <Button
            variant="secondary"
            size="md"
            fullWidth
            leftIcon={<Users className="w-4 h-4 text-[#173B67]" />}
            onClick={() => {
              sound.playButtonClick();
              onJoinRoomClick();
            }}
          >
            Join Room
          </Button>
        </div>

        {/* How to Play link */}
        <div className="mt-8">
          <button
            onClick={() => {
              sound.playButtonClick();
              setIsRulesOpen(true);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#173B67] hover:text-[#C9A227] transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#C9A227]" />
            <span className="underline underline-offset-4">How to play & role scoring rules</span>
          </button>
        </div>
      </motion.div>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
};
