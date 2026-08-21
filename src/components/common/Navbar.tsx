import React, { useState } from 'react';
import { Volume2, VolumeX, HelpCircle, Copy, Check, Crown, LogOut } from 'lucide-react';
import { sound } from '../../utils/sound';
import { RulesModal } from './RulesModal';

interface NavbarProps {
  roomCode?: string;
  round?: number;
  onLeaveRoom?: () => void;
  showLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  roomCode,
  round,
  onLeaveRoom,
  showLogo = true,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const copyCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    sound.playButtonClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="relative z-30 w-full px-4 py-3 md:px-8 border-b border-white/10 bg-[#070A0F]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          {showLogo ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#997A15] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center">
                <div className="w-full h-full bg-[#0B1019] rounded-[14px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-cinzel font-bold tracking-wider gold-gradient-text leading-tight">
                  RAJA RANI
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                  Trust Nobody
                </p>
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* Center Info: Round & Room Code */}
          <div className="flex items-center gap-2 md:gap-4">
            {round !== undefined && round > 0 && (
              <div className="px-3 py-1 rounded-full bg-[#111722] border border-[#D4AF37]/30 text-xs font-cinzel font-bold text-[#D4AF37] shadow-sm">
                ROUND {round}
              </div>
            )}

            {roomCode && (
              <button
                onClick={copyCode}
                title="Click to copy room code"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111722] hover:bg-[#182232] border border-white/10 hover:border-[#D4AF37]/40 text-xs font-mono text-slate-200 transition-all cursor-pointer group"
              >
                <span className="text-slate-400 text-[10px]">ROOM</span>
                <span className="font-bold tracking-wider text-white group-hover:text-[#D4AF37]">
                  {roomCode}
                </span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                )}
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Rules Button */}
            <button
              onClick={() => {
                sound.playButtonClick();
                setIsRulesOpen(true);
              }}
              title="Game Rules"
              className="p-2 rounded-xl bg-[#111722] hover:bg-[#182232] border border-white/10 hover:border-[#D4AF37]/40 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-xl bg-[#111722] hover:bg-[#182232] border border-white/10 hover:border-[#D4AF37]/40 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
              )}
            </button>

            {/* Leave Room if active */}
            {onLeaveRoom && (
              <button
                onClick={() => {
                  sound.playButtonClick();
                  onLeaveRoom();
                }}
                title="Leave Room"
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer ml-1"
              >
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </>
  );
};
