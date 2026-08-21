import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import type { Player } from '../../types/game';
import { Button } from '../common/Button';
import { sound } from '../../utils/sound';

interface GuessConfirmModalProps {
  isOpen: boolean;
  accusedPlayer: Player | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const GuessConfirmModal: React.FC<GuessConfirmModalProps> = ({
  isOpen,
  accusedPlayer,
  onCancel,
  onConfirm,
}) => {
  if (!accusedPlayer) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-[#0F1420] border-2 border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.4)] p-6 md:p-8 z-10 text-center text-slate-100"
          >
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h3 className="font-cinzel text-xl md:text-2xl font-black text-white tracking-wide mb-2">
              CONFIRM ACCUSATION
            </h3>

            <p className="text-xs text-slate-400 mb-6">
              This decision is final and will decide the fate of the round.
            </p>

            {/* Accused Target Highlight Box */}
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0B1019] border border-red-500/40 flex items-center justify-center text-3xl shadow-inner">
                {accusedPlayer.avatar}
              </div>
              <div className="text-left">
                <span className="text-[11px] font-cinzel font-bold text-red-400 block uppercase">
                  Accused Suspect
                </span>
                <span className="font-bold text-lg text-white">
                  {accusedPlayer.name}
                </span>
              </div>
            </div>

            {/* Stakes Warning */}
            <div className="text-xs text-slate-300 space-y-1 mb-6 text-left p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span>✓</span> If Chor: Police gets +500 pts, Chor gets 0
              </p>
              <p className="flex items-center gap-1.5 text-rose-400 font-medium">
                <span>✗</span> If Innocent: Police gets 0, Real Chor steals +500 pts
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  sound.playButtonClick();
                  onCancel();
                }}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                size="md"
                onClick={() => {
                  sound.playButtonClick();
                  onConfirm();
                }}
                leftIcon={<AlertTriangle className="w-4 h-4" />}
              >
                Accuse!
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
