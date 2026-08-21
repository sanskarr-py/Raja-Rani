import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock } from 'lucide-react';
import type { GameRoom, Player } from '../../types/game';
import { GameTable } from '../table/GameTable';
import { GuessConfirmModal } from './GuessConfirmModal';
import { sound } from '../../utils/sound';
import { botChooseAccusation } from '../../utils/botAi';

interface InvestigationPhaseProps {
  room: GameRoom;
  currentPlayerId: string;
  onAccusePlayer: (accusedId: string) => void;
}

export const InvestigationPhase: React.FC<InvestigationPhaseProps> = ({
  room,
  currentPlayerId,
  onAccusePlayer,
}) => {
  const [timeLeft, setTimeLeft] = useState(25);
  const [selectedSuspect, setSelectedSuspect] = useState<Player | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isPolice = room.policeId === currentPlayerId;
  const policePlayer = room.players.find((p) => p.id === room.policeId);

  // Timer Tick & Heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // If time expires and current player is police or bot is police, auto choose
          if (isPolice) {
            const suspects = room.players.filter((p) => p.id !== room.policeId);
            const randomPick = suspects[Math.floor(Math.random() * suspects.length)];
            if (randomPick) onAccusePlayer(randomPick.id);
          }
          return 0;
        }

        const next = prev - 1;
        if (next <= 5) {
          sound.playCountdownTick(true);
          sound.playSuspenseHeartbeat();
        } else if (next % 3 === 0) {
          sound.playCountdownTick(false);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPolice, room.players, room.policeId, onAccusePlayer]);

  // If Bot is Police, simulate smart deliberation
  useEffect(() => {
    if (policePlayer && policePlayer.isBot) {
      const deliberationTime = 4000 + Math.random() * 3000;
      const timer = setTimeout(() => {
        const chosenId = botChooseAccusation(policePlayer.id, room.players);
        if (chosenId) {
          onAccusePlayer(chosenId);
        }
      }, deliberationTime);
      return () => clearTimeout(timer);
    }
  }, [policePlayer, room.players, onAccusePlayer]);

  const handleSuspectClick = (player: Player) => {
    if (!isPolice) return;
    setSelectedSuspect(player);
    setIsConfirmOpen(true);
  };

  const handleConfirmAccusation = () => {
    if (!selectedSuspect) return;
    setIsConfirmOpen(false);
    onAccusePlayer(selectedSuspect.id);
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-6 z-10 w-full">
      {/* Top Banner Status */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl flex items-center justify-between p-3.5 md:p-4 rounded-2xl bg-[#0E1522]/90 border border-white/10 shadow-lg backdrop-blur-md mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel font-bold text-sm text-white">
                {policePlayer?.name || 'Police'} is on the Case
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                INVESTIGATION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isPolice
                ? 'Click on any courtier to accuse them of being the Chor!'
                : 'Police is examining the court. Maintain your poker face!'}
            </p>
          </div>
        </div>

        {/* Countdown Ring */}
        <div className="flex items-center gap-2 bg-[#141D2C] px-3.5 py-1.5 rounded-2xl border border-white/10">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-spin' : 'text-[#D4AF37]'}`} />
          <span
            className={`font-mono font-bold text-sm md:text-base ${
              timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'
            }`}
          >
            00:{timeLeft.toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Main Virtual Court Game Table */}
      <GameTable
        players={room.players}
        currentPlayerId={currentPlayerId}
        policeId={room.policeId}
        accusedPlayerId={selectedSuspect?.id || null}
        canAccuse={isPolice}
        onSelectAccused={handleSuspectClick}
        showTrueRoles={false}
        centerContent={
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#070A0F]/80 border border-[#D4AF37]/20 shadow-inner max-w-xs">
            <span className="text-xs font-cinzel font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
              {isPolice ? '🎯 YOUR MISSION' : '🔍 IN PROGRESS'}
            </span>
            <p className="text-xs text-slate-200 font-medium leading-tight">
              {isPolice
                ? 'Identify the 🥷 Chor from the suspects below'
                : 'The Inspector is observing all gestures and words...'}
            </p>
          </div>
        }
      />

      {/* Accusation Confirmation Modal */}
      <GuessConfirmModal
        isOpen={isConfirmOpen}
        accusedPlayer={selectedSuspect}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmAccusation}
      />
    </div>
  );
};
