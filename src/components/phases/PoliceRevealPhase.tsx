import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';
import type { GameRoom } from '../../types/game';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface PoliceRevealPhaseProps {
  room: GameRoom;
  currentPlayerId: string;
  onRevealPolice: () => void;
}

export const PoliceRevealPhase: React.FC<PoliceRevealPhaseProps> = ({
  room,
  currentPlayerId,
  onRevealPolice,
}) => {
  const isPolice = room.policeId === currentPlayerId;
  const policePlayer = room.players.find((p) => p.id === room.policeId);

  // If Police is a Bot, automatically reveal after 2 seconds with fanfare
  useEffect(() => {
    if (policePlayer && policePlayer.isBot && !policePlayer.isPoliceRevealed) {
      const timer = setTimeout(() => {
        sound.playPoliceFanfare();
        onRevealPolice();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [policePlayer, onRevealPolice]);

  const handleRevealClick = () => {
    sound.playPoliceFanfare();
    onRevealPolice();
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center p-4 md:p-8 z-10 max-w-xl mx-auto w-full text-center text-[#263238]">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        {/* Animated Police Siren Shield in Royal Blue & Gold */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative mb-6"
        >
          <div className="w-22 h-22 rounded-3xl bg-gradient-to-br from-[#173B67] to-[#234F7D] p-1 border-2 border-[#D8BD6A] shadow-[0_8px_30px_rgba(23,59,103,0.25)] flex items-center justify-center text-white">
            <Shield className="w-11 h-11 text-white fill-[#D8BD6A]/30" />
          </div>
          <div className="absolute -top-2 -right-2 text-2xl">
            🚨
          </div>
        </motion.div>

        {/* Phase Announcement */}
        <span className="px-3.5 py-1 rounded-full bg-[#FAF3DE] border border-[#D8BD6A] text-[#173B67] text-xs font-playfair font-bold tracking-widest uppercase mb-3 inline-block shadow-sm">
          PHASE 2 • IDENTITY REVEAL
        </span>

        <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#173B67] tracking-wide mb-2">
          WHO IS THE POLICE?
        </h2>

        <p className="text-sm text-[#5F6872] max-w-md mb-8 font-medium">
          In Raja Rani, all royal roles remain in total secrecy — <strong className="text-[#173B67]">only the Police must step forward and reveal their badge</strong>.
        </p>

        {/* Interactive Reveal Area */}
        {isPolice ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-6 rounded-3xl bg-white border-2 border-[#173B67] shadow-[0_12px_36px_rgba(23,59,103,0.14)] flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center gap-2 text-[#173B67] font-playfair font-bold text-base">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              <span>YOU ARE THE POLICE INSPECTOR</span>
            </div>
            <p className="text-xs text-[#5F6872] font-medium">
              Step forward to the royal court, announce your duty, and begin the interrogation to catch the Chor!
            </p>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleRevealClick}
              leftIcon={<Shield className="w-5 h-5 fill-[#D8BD6A] text-[#D8BD6A]" />}
            >
              Step Forward • Reveal Identity
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-3xl bg-white border border-[#D8BD6A]/60 max-w-md w-full flex flex-col items-center gap-3 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#173B67] border-t-transparent animate-spin mb-1" />
            <span className="font-playfair text-base font-bold text-[#173B67]">
              Waiting for Police to step forward...
            </span>
            <p className="text-xs text-[#5F6872] font-medium">
              Keep your own royal identity secret. Maintain your poker face!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
