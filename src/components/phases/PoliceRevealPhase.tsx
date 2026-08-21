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
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center p-4 md:p-8 z-10 max-w-xl mx-auto w-full text-center">
      {/* Background Spotlight Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.15)_0%,transparent_65%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        {/* Animated Police Siren Shield */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-1 shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center text-white">
            <Shield className="w-12 h-12 text-white fill-blue-400/30" />
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            🚨
          </div>
        </motion.div>

        {/* Phase Announcement */}
        <span className="px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/40 text-blue-400 text-xs font-cinzel font-bold tracking-widest uppercase mb-3 inline-block">
          PHASE 2 • IDENTITY REVEAL
        </span>

        <h2 className="text-3xl md:text-4xl font-cinzel font-black text-white tracking-wide mb-2">
          WHO IS THE POLICE?
        </h2>

        <p className="text-sm text-slate-300 max-w-md mb-8">
          In Raja Rani, all royal roles remain in total darkness — <strong className="text-blue-400">only the Police must step forward and reveal their badge</strong>.
        </p>

        {/* Interactive Reveal Area */}
        {isPolice ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md p-6 rounded-3xl bg-blue-950/60 border-2 border-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.5)] flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center gap-2 text-[#93C5FD] font-cinzel font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>YOU ARE THE POLICE INSPECTOR</span>
            </div>
            <p className="text-xs text-slate-300">
              Step forward to the royal court, announce your duty, and begin the interrogation to catch the Chor!
            </p>
            <Button
              variant="police"
              size="lg"
              fullWidth
              onClick={handleRevealClick}
              leftIcon={<Shield className="w-5 h-5 fill-current" />}
            >
              Step Forward • Reveal Identity
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-3xl bg-[#111722]/80 border border-white/10 max-w-md w-full flex flex-col items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-1" />
            <span className="font-cinzel text-base font-bold text-white">
              Waiting for Police to step forward...
            </span>
            <p className="text-xs text-slate-400">
              Keep your own royal identity secret. Do not give any hints to the Inspector!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
