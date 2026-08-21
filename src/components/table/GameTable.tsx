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
      {/* Outer Table Surface */}
      <div className="relative w-full min-h-[380px] md:min-h-[440px] rounded-[48px] bg-gradient-to-b from-[#0E1624] via-[#111A2E] to-[#0A101C] border-2 border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(0,0,0,0.6)] p-6 md:p-10 flex flex-col justify-between items-center overflow-hidden">
        {/* Table Felt Inner Oval Glow */}
        <div className="absolute inset-4 md:inset-8 rounded-[36px] border border-[#D4AF37]/15 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Center Court Emblem / Content */}
        <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
          {centerContent ? (
            centerContent
          ) : (
            <div className="opacity-25 flex flex-col items-center pointer-events-none">
              <span className="text-4xl">👑</span>
              <span className="font-cinzel text-xs tracking-widest text-[#D4AF37] mt-1">
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
