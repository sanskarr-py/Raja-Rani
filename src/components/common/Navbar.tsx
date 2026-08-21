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
      <header className="relative z-30 w-full px-4 py-3 md:px-8 border-b border-[#D8BD6A]/35 bg-[#FAF8F2]/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          {showLogo ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#D8BD6A] p-0.5 shadow-[0_2px_10px_rgba(201,162,39,0.3)] flex items-center justify-center">
                <div className="w-full h-full bg-[#FAF8F2] rounded-[14px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#C9A227]" />
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-playfair font-black tracking-wider text-[#173B67] leading-tight">
                  RAJA RANI
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-[#5F6872] font-semibold">
                  The Royal Game of Deception
                </p>
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* Center Info: Round & Room Code */}
          <div className="flex items-center gap-2 md:gap-4">
            {round !== undefined && round > 0 && (
              <div className="px-3.5 py-1 rounded-full bg-[#FAF3DE] border border-[#D8BD6A] text-xs font-playfair font-bold text-[#173B67] shadow-sm">
                ROUND {round}
              </div>
            )}

            {roomCode && (
              <button
                onClick={copyCode}
                title="Click to copy room code"
                className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white hover:bg-[#FAF3DE] border border-[#D8BD6A]/60 hover:border-[#C9A227] text-xs font-mono text-[#263238] transition-all cursor-pointer shadow-sm group"
              >
                <span className="text-[#5F6872] text-[10px] font-bold">ROOM</span>
                <span className="font-bold tracking-wider text-[#173B67] group-hover:text-[#C9A227]">
                  {roomCode}
                </span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#5F6872] group-hover:text-[#173B67]" />
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
              className="p-2 rounded-xl bg-white hover:bg-[#FAF3DE] border border-[#D8BD6A]/50 hover:border-[#C9A227] text-[#173B67] transition-all cursor-pointer shadow-sm"
            >
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-xl bg-white hover:bg-[#FAF3DE] border border-[#D8BD6A]/50 hover:border-[#C9A227] text-[#173B67] transition-all cursor-pointer shadow-sm"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-[#B63A32]" />
              ) : (
                <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-[#C9A227]" />
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
                className="p-2 rounded-xl bg-[#FDF2F1] hover:bg-[#FCE8E6] border border-[#D8726A]/40 text-[#B63A32] transition-all cursor-pointer shadow-sm ml-1"
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
