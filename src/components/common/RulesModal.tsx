import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, ShieldAlert, Award, HelpCircle } from 'lucide-react';
import { ROLES_CONFIG, type RoleId } from '../../types/game';
import { Button } from './Button';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#173B67]/30 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF8F2] border-2 border-[#D8BD6A] shadow-[0_20px_50px_rgba(23,59,103,0.15)] p-6 md:p-8 z-10 text-[#263238]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D8BD6A]/30 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#FAF3DE] border border-[#D8BD6A] text-[#C9A227]">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-playfair font-black text-[#173B67] tracking-wide">
                    How to Play Raja Rani
                  </h2>
                  <p className="text-xs md:text-sm text-[#5F6872] font-medium">
                    Traditional Nepali Royal Deduction • Trust Nobody. Guess Wisely.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#5F6872] hover:text-[#173B67] hover:bg-[#F3EDE1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-sm">
              {/* Core Decree */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#D8BD6A]/40 shadow-sm">
                <h3 className="font-playfair text-base font-bold text-[#173B67] mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A227]" /> The Royal Decree
                </h3>
                <p className="text-[#5F6872] leading-relaxed text-xs md:text-sm">
                  Each player is secretly dealt one royal role. Everyone keeps their identity strictly hidden —{' '}
                  <strong className="text-[#173B67]">only the Police must publicly reveal themselves</strong>. The Police then interrogates the court to catch the elusive <span className="text-[#B63A32] font-bold">Chor (Thief)</span>.
                </p>
              </div>

              {/* Roles Table */}
              <div>
                <h3 className="font-playfair text-base font-bold text-[#173B67] mb-3">Roles & Royal Bounty</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['raja', 'rani', 'mantri', 'police', 'chor'] as RoleId[]).map((roleId) => {
                    const r = ROLES_CONFIG[roleId];
                    return (
                      <div
                        key={r.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#E2D7C3] flex flex-col justify-between hover:border-[#D8BD6A] transition-colors shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{r.emoji}</span>
                            <div>
                              <span className="font-playfair font-bold text-[#173B67] text-sm">{r.name}</span>
                              <span className="text-[10px] text-[#5F6872] block font-medium">{r.nepaliName}</span>
                            </div>
                          </div>
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-bold font-playfair"
                            style={{ backgroundColor: r.badgeBg, color: r.color, border: `1px solid ${r.borderColor}` }}
                          >
                            {r.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-[#5F6872] mt-1 font-medium leading-tight">{r.secretObjective}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scoring & Police Guess Rule */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#D8BD6A]/40 shadow-sm space-y-3">
                <h3 className="font-playfair text-base font-bold text-[#173B67] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#173B67]" /> The Police Accusation Rules
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-[#5F6872]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>
                      <strong className="text-[#173B67]">Correct Guess:</strong> If Police identifies the Chor, Police earns <span className="text-emerald-700 font-bold">+500 pts</span> and Chor gets <span className="text-[#5F6872] font-bold">0 pts</span>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B63A32] font-bold">✗</span>
                    <span>
                      <strong className="text-[#173B67]">Wrong Guess:</strong> If Police accuses someone else, Police gets <span className="text-[#5F6872] font-bold">0 pts</span> and the sly Chor steals the <span className="text-[#B63A32] font-bold">+500 pts</span>!
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A227] font-bold">👑</span>
                    <span>
                      <strong className="text-[#173B67]">Court Members:</strong> Raja (+2000), Rani (+1500), and Mantri (+1000) always receive their full bounty.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Golden Pro Tip */}
              <div className="p-3.5 rounded-2xl bg-[#FAF3DE] border border-[#D8BD6A] text-xs text-[#173B67] flex items-center gap-3 shadow-sm">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-[#C9A227]" />
                <span className="font-medium">
                  <strong>Tip for Police:</strong> Watch other players’ reactions and bluff cues. The Chor will pretend to be the King or Queen!
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#D8BD6A]/30 flex justify-end">
              <Button variant="primary" size="md" onClick={onClose}>
                I Understand
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
