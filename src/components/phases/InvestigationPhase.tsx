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
  const [timeLeft, setTimeLeft] = useState(20);
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

  // Handle keyboard shortcuts (1-9) to select suspect
  useEffect(() => {
    if (!isPolice || isConfirmOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const suspects = room.players.filter((p) => p.id !== room.policeId && !p.isPoliceRevealed);
        const targetSuspect = suspects[num - 1];
        if (targetSuspect) {
          e.preventDefault();
          sound.playButtonClick();
          setSelectedSuspect(targetSuspect);
          setIsConfirmOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPolice, isConfirmOpen, room.players, room.policeId]);

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
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-between p-4 md:p-6 z-10 w-full text-[#263238]">
      {/* Top Banner Status */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-[#D8BD6A] shadow-[0_6px_24px_rgba(23,59,103,0.06)] mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#EBF2FA] border border-[#234F7D] text-[#173B67]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-playfair font-black text-base md:text-lg text-[#173B67] leading-tight">
              FIND THE CHOR
            </h2>
            <p className="text-xs text-[#5F6872] font-semibold">
              {policePlayer?.name} has 20 seconds to decide.
            </p>
          </div>
        </div>

        {/* Elegant Circular / Capsule Countdown Timer */}
        <div className="flex items-center gap-2 bg-[#FAF3DE] px-4 py-2 rounded-2xl border-2 border-[#D8BD6A] shadow-sm">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-[#B63A32] animate-spin' : 'text-[#173B67]'}`} />
          <span
            className={`font-mono font-black text-sm md:text-base ${
              timeLeft <= 5 ? 'text-[#B63A32] animate-pulse' : 'text-[#173B67]'
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
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 border border-[#D8BD6A] shadow-sm max-w-xs">
            <span className="text-xs font-playfair font-black text-[#173B67] uppercase tracking-widest mb-1">
              {isPolice ? '🎯 YOUR MISSION' : '🔍 IN PROGRESS'}
            </span>
            <p className="text-xs text-[#5F6872] font-semibold leading-tight">
              {isPolice
                ? 'Select a suspected courtier around the table'
                : 'Police is inspecting the royal court...'}
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
