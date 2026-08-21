import React from 'react';
import type { Player } from '../../types/game';
import { TablePlayer } from './TablePlayer';

interface GameTableProps {
  players: Player[];
  currentPlayerId: string;
  policeId: string | null;
  accusedPlayerId: string | null;
  canAccuse: boolean;
  onSelectAccused?: (player: Player) => void;
  showTrueRoles?: boolean;
  centerContent?: React.ReactNode;
}

export const GameTable: React.FC<GameTableProps> = ({
  players,
  currentPlayerId,
  accusedPlayerId,
  canAccuse,
  onSelectAccused,
  showTrueRoles = false,
  centerContent,
}) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-4 px-2 flex flex-col items-center">
      {/* Outer Board Game Table Surface */}
      <div className="relative w-full min-h-[380px] md:min-h-[440px] rounded-[48px] bg-gradient-to-b from-[#F7F3EA] dark:from-[#0E1522] via-[#F3EDE1] dark:via-[#111A2E] to-[#ECE2D0] dark:to-[#0A101C] border-2 border-[#D8BD6A] shadow-[0_20px_50px_rgba(23,59,103,0.09)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 md:p-10 flex flex-col justify-between items-center overflow-hidden transition-colors duration-300">
        {/* Table Felt Inner Oval Glow */}
        <div className="absolute inset-3 md:inset-6 rounded-[38px] border-2 border-[#173B67]/15 dark:border-[#D8BD6A]/20 bg-[radial-gradient(ellipse_at_center,#FFFDF8_0%,#F3EDE1_75%)] dark:bg-[radial-gradient(ellipse_at_center,#141D2B_0%,#0E1522_75%)] pointer-events-none shadow-inner transition-colors duration-300" />
        <div className="absolute inset-5 md:inset-8 rounded-[32px] border border-dashed border-[#D8BD6A]/40 pointer-events-none" />

        {/* Center Court Emblem / Content */}
        <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
          {centerContent ? (
            centerContent
          ) : (
            <div className="opacity-40 dark:opacity-60 flex flex-col items-center pointer-events-none">
              <span className="text-4xl">👑</span>
              <span className="font-playfair text-xs font-bold tracking-widest text-[#173B67] dark:text-[#D8BD6A] mt-1">
                ROYAL COURT OF NEPAL
              </span>
            </div>
          )}
        </div>

        {/* Players Grid / Ring Around the Table */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-4">
          {players.map((p) => (
            <TablePlayer
              key={p.id}
              player={p}
              isCurrentPlayer={p.id === currentPlayerId}
              canBeAccused={canAccuse && p.id !== currentPlayerId && !p.isPoliceRevealed}
              isAccused={p.id === accusedPlayerId}
              onSelectAccused={onSelectAccused}
              showTrueRole={showTrueRoles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
