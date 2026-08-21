import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Play, PlusCircle, Sparkles, BookOpen } from 'lucide-react';
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-lg flex flex-col items-center text-center"
      >
        {/* Royal Crown Badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#F59E0B] to-[#997A15] p-1 shadow-[0_0_35px_rgba(212,175,55,0.45)]">
            <div className="w-full h-full bg-[#0E1522] rounded-[22px] flex items-center justify-center">
              <Crown className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37]/20" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#3B82F6] text-white text-[10px] font-bold tracking-wider shadow-lg flex items-center gap-1 border border-blue-300">
            <Sparkles className="w-3 h-3" />
            <span>NEPALI CLASSIC</span>
          </div>
        </motion.div>

        {/* Main Title & Slogan */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-black tracking-wider gold-gradient-text drop-shadow-lg mb-2">
          RAJA RANI
        </h1>
        <p className="text-lg md:text-xl font-cinzel font-semibold tracking-widest text-slate-300 mb-1">
          Trust nobody.
        </p>
        <p className="text-xs md:text-sm text-slate-400 max-w-sm mb-8 font-medium">
          The legendary royal court deduction game of Nepal. Unmask the thief, claim the bounty, rule the realm.
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-3.5">
          {/* Quick Play vs AI */}
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

          {/* Create Multiplayer Room */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            leftIcon={<PlusCircle className="w-5 h-5 text-[#D4AF37]" />}
            onClick={() => {
              sound.playButtonClick();
              onCreateRoomClick();
            }}
          >
            Create Private Room
          </Button>

          {/* Join Room */}
          <Button
            variant="ghost"
            size="md"
            fullWidth
            leftIcon={<Users className="w-4 h-4 text-blue-400" />}
            onClick={() => {
              sound.playButtonClick();
              onJoinRoomClick();
            }}
          >
            Join with Room Code
          </Button>
        </div>

        {/* How to Play link */}
        <div className="mt-8">
          <button
            onClick={() => {
              sound.playButtonClick();
              setIsRulesOpen(true);
            }}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>How to play & role scoring rules</span>
          </button>
        </div>
      </motion.div>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
};
