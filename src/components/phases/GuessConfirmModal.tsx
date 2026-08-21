import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Check } from 'lucide-react';
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
            className="absolute inset-0 bg-[#173B67]/30 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-[#FAF8F2] border-2 border-[#173B67] shadow-[0_20px_50px_rgba(23,59,103,0.18)] p-6 md:p-8 z-10 text-center text-[#263238]"
          >
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#FAF3DE] border-2 border-[#D8BD6A] text-[#173B67] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShieldAlert className="w-8 h-8 text-[#173B67]" />
            </div>

            <h3 className="font-playfair text-xl md:text-2xl font-black text-[#173B67] tracking-wide mb-1">
              FINAL ACCUSATION
            </h3>

            <p className="text-xs text-[#5F6872] mb-6 font-medium">
              This decree will determine the fate of the entire court.
            </p>

            {/* Accused Target Highlight Box */}
            <div className="p-4 rounded-2xl bg-white border-2 border-[#D8BD6A] flex items-center justify-center gap-4 mb-6 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F2] border border-[#D8BD6A] flex items-center justify-center text-3xl shadow-sm">
                {accusedPlayer.avatar}
              </div>
              <div className="text-left">
                <span className="text-[11px] font-playfair font-bold text-[#5F6872] block uppercase tracking-wider">
                  Accused Suspect
                </span>
                <span className="font-playfair font-black text-lg text-[#173B67]">
                  {accusedPlayer.name}
                </span>
              </div>
            </div>

            {/* Stakes Warning */}
            <div className="text-xs text-[#5F6872] space-y-1.5 mb-6 text-left p-3.5 rounded-xl bg-[#FAF3DE]/70 border border-[#D8BD6A]/70">
              <p className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span>✓</span> If Chor: Police gets +500 pts, Chor gets 0
              </p>
              <p className="flex items-center gap-1.5 text-[#B63A32] font-bold">
                <span>✗</span> If Innocent: Police gets 0, Real Chor steals +500 pts
              </p>
            </div>

            {/* Action Buttons: Cancel and Accuse */}
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
                variant="primary"
                size="md"
                onClick={() => {
                  sound.playButtonClick();
                  onConfirm();
                }}
                leftIcon={<Check className="w-4 h-4 text-[#D8BD6A]" />}
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
