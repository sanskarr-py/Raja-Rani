import React, { useState } from 'react';
import { Volume2, VolumeX, HelpCircle, Copy, Check, Crown, LogOut, Sun, Moon } from 'lucide-react';
import { sound } from '../../utils/sound';
import { copyToClipboard } from '../../utils/clipboard';
import { RulesModal } from './RulesModal';
import { useTheme } from '../../context/useTheme';

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
  const { isDark, toggleTheme } = useTheme();
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    return sound.subscribe((muted) => {
      setIsMuted(muted);
    });
  }, []);

  const toggleSound = () => {
    sound.toggleMute();
  };

  const handleThemeToggle = () => {
    sound.playButtonClick();
    toggleTheme();
  };

  const copyCode = async () => {
    if (!roomCode) return;
    const success = await copyToClipboard(roomCode);
    if (success) {
      sound.playButtonClick();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <header className="relative z-30 w-full px-4 py-3 md:px-8 border-b border-[#D8BD6A]/35 dark:border-[#D8BD6A]/20 bg-[#FAF8F2]/95 dark:bg-[#070A0F]/95 backdrop-blur-md shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          {showLogo ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#D8BD6A] p-0.5 shadow-[0_2px_10px_rgba(201,162,39,0.3)] flex items-center justify-center">
                <div className="w-full h-full bg-[#FAF8F2] dark:bg-[#0E1522] rounded-[14px] flex items-center justify-center transition-colors">
                  <Crown className="w-5 h-5 text-[#C9A227]" />
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-playfair font-black tracking-wider text-[#173B67] dark:text-white leading-tight transition-colors">
                  RAJA RANI
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-[#5F6872] dark:text-[#94A3B8] font-semibold transition-colors">
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
              <div className="px-3.5 py-1 rounded-full bg-[#FAF3DE] dark:bg-[#141D2B] border border-[#D8BD6A] text-xs font-playfair font-bold text-[#173B67] dark:text-[#D8BD6A] shadow-sm transition-colors">
                ROUND {round}
              </div>
            )}

            {roomCode && (
              <button
                onClick={copyCode}
                title="Click to copy room code"
                aria-label={copied ? 'Room code copied to clipboard' : `Copy room code ${roomCode}`}
                className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#141D2B] hover:bg-[#FAF3DE] dark:hover:bg-[#1A2536] border border-[#D8BD6A]/60 dark:border-[#D8BD6A]/40 text-xs font-mono text-[#263238] dark:text-slate-200 transition-all cursor-pointer shadow-sm group"
              >
                <span className="text-[#5F6872] dark:text-slate-400 text-[10px] font-bold">ROOM</span>
                <span className="font-bold tracking-wider text-[#173B67] dark:text-white group-hover:text-[#C9A227]">
                  {roomCode}
                </span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#5F6872] dark:text-slate-400 group-hover:text-[#173B67] dark:group-hover:text-white" />
                )}
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button (Light/Dark) */}
            <button
              onClick={handleThemeToggle}
              title={isDark ? 'Switch to Royal Ivory' : 'Switch to Midnight Onyx'}
              aria-label={isDark ? 'Switch to Royal Ivory light theme' : 'Switch to Midnight Onyx dark theme'}
              className="p-2 rounded-xl bg-white dark:bg-[#141D2B] hover:bg-[#FAF3DE] dark:hover:bg-[#1A2536] border border-[#D8BD6A]/50 dark:border-[#D8BD6A]/30 text-[#173B67] dark:text-[#D8BD6A] transition-all cursor-pointer shadow-sm"
            >
              {isDark ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-[#C9A227] animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-[#173B67]" />
              )}
            </button>

            {/* Rules Button */}
            <button
              onClick={() => {
                sound.playButtonClick();
                setIsRulesOpen(true);
              }}
              title="Game Rules"
              aria-label="View Game Rules"
              className="p-2 rounded-xl bg-white dark:bg-[#141D2B] hover:bg-[#FAF3DE] dark:hover:bg-[#1A2536] border border-[#D8BD6A]/50 dark:border-[#D8BD6A]/30 text-[#173B67] dark:text-slate-200 transition-all cursor-pointer shadow-sm"
            >
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio (Press M)' : 'Mute Audio (Press M)'}
              aria-label={isMuted ? 'Unmute game audio (Shortcut: M)' : 'Mute game audio (Shortcut: M)'}
              aria-keyshortcuts="KeyM"
              aria-pressed={!isMuted}
              className="p-2 rounded-xl bg-white dark:bg-[#141D2B] hover:bg-[#FAF3DE] dark:hover:bg-[#1A2536] border border-[#D8BD6A]/50 dark:border-[#D8BD6A]/30 text-[#173B67] dark:text-slate-200 transition-all cursor-pointer shadow-sm relative group"
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
                aria-label="Leave current room"
                className="p-2 rounded-xl bg-[#FDF2F1] dark:bg-red-950/40 hover:bg-[#FCE8E6] dark:hover:bg-red-900/50 border border-[#D8726A]/40 text-[#B63A32] dark:text-red-400 transition-all cursor-pointer shadow-sm ml-1"
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
