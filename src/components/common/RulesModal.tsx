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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D131F] border border-[#D4AF37]/30 shadow-2xl p-6 md:p-8 z-10 text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-cinzel font-bold text-white tracking-wide">
                    How to Play Raja Rani
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400">
                    Traditional Nepali Royal Deduction • Trust Nobody
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-sm">
              {/* Core Philosophy */}
              <div className="p-4 rounded-2xl bg-[#111722] border border-[#D4AF37]/20">
                <h3 className="font-cinzel text-base font-bold text-[#D4AF37] mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4" /> The Royal Decree
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs md:text-sm">
                  Each player is secretly dealt one royal role. Everyone keeps their identity strictly hidden —{' '}
                  <strong className="text-white">only the Police must publicly reveal themselves</strong>. The Police then interrogates the court to catch the elusive <span className="text-[#EF4444] font-semibold">Chor (Thief)</span>.
                </p>
              </div>

              {/* Roles Table */}
              <div>
                <h3 className="font-cinzel text-base font-bold text-white mb-3">Roles & Royal Bounty</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['raja', 'rani', 'mantri', 'police', 'chor'] as RoleId[]).map((roleId) => {
                    const r = ROLES_CONFIG[roleId];
                    return (
                      <div
                        key={r.id}
                        className="p-3.5 rounded-2xl bg-[#141C2B] border border-white/5 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{r.emoji}</span>
                            <div>
                              <span className="font-cinzel font-bold text-white text-sm">{r.name}</span>
                              <span className="text-[10px] text-slate-400 block">{r.nepaliName}</span>
                            </div>
                          </div>
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-bold font-cinzel"
                            style={{ backgroundColor: r.badgeBg, color: r.color, border: `1px solid ${r.borderColor}40` }}
                          >
                            {r.points} pts
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{r.secretObjective}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scoring & Police Guess Rule */}
              <div className="p-4 rounded-2xl bg-[#141C2B] border border-white/10 space-y-3">
                <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#3B82F6]" /> The Police Accusation Rules
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span>
                      <strong className="text-white">Correct Guess:</strong> If Police correctly identifies the Chor, Police earns <span className="text-[#10B981] font-bold">+500 pts</span> and Chor gets <span className="text-slate-400 font-bold">0 pts</span>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">✗</span>
                    <span>
                      <strong className="text-white">Wrong Guess:</strong> If Police falsely accuses someone else, Police gets <span className="text-slate-400 font-bold">0 pts</span> and the sly Chor steals the <span className="text-[#EF4444] font-bold">+500 pts</span>!
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">👑</span>
                    <span>
                      <strong className="text-white">Court Members:</strong> Raja (+2000), Rani (+1500), and Mantri (+1000) always receive their full bounty.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Golden Pro Tip */}
              <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#FFF3C4] flex items-center gap-3">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-[#D4AF37]" />
                <span>
                  <strong>Tip for Police:</strong> Watch other players’ reactions and facial expressions during investigation. The Chor will pretend to be the King or Queen!
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <Button variant="gold" size="md" onClick={onClose}>
                I Understand
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
