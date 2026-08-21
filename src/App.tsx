import { useState, useEffect, useCallback } from 'react';
import type { GamePhase, GameRoom, Player, RoleId } from './types/game';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { CreateRoom } from './components/landing/CreateRoom';
import { JoinRoom } from './components/landing/JoinRoom';
import { LobbyView } from './components/lobby/LobbyView';
import { RoleRevealPhase } from './components/phases/RoleRevealPhase';
import { PoliceRevealPhase } from './components/phases/PoliceRevealPhase';
import { InvestigationPhase } from './components/phases/InvestigationPhase';
import { SuspensePhase } from './components/phases/SuspensePhase';
import { ResultRevealPhase } from './components/phases/ResultRevealPhase';
import { ScoreboardPhase } from './components/phases/ScoreboardPhase';
import { GameOverPhase } from './components/phases/GameOverPhase';
import { createBotPlayer, getRandomDialogue } from './utils/botAi';
import { network } from './utils/network';
import { sound } from './utils/sound';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function App() {
  const [currentPlayerId] = useState<string>(() => {
    return 'player_' + Math.random().toString(36).substring(2, 9);
  });

  const [phase, setPhase] = useState<GamePhase>('landing');
  const [room, setRoom] = useState<GameRoom | null>(null);

  // Network message sync handler
  useEffect(() => {
    const unsubscribe = network.subscribe((msg) => {
      if (msg.type === 'SYNC_STATE' && msg.payload) {
        setRoom(msg.payload);
        setPhase(msg.payload.phase);
      }
    });
    return () => unsubscribe();
  }, []);

  // Update & broadcast state helper
  const updateRoomState = useCallback((updatedRoom: GameRoom) => {
    setRoom(updatedRoom);
    setPhase(updatedRoom.phase);
    network.broadcast('SYNC_STATE', currentPlayerId, updatedRoom);
  }, [currentPlayerId]);

  // Handle Quick Solo Match (1 human + 4 AI bots)
  const handleQuickPlay = () => {
    const code = generateRoomCode();
    network.setRoom(code);

    const humanPlayer: Player = {
      id: currentPlayerId,
      name: 'Sanskar',
      avatar: '👑',
      isBot: false,
      isHost: true,
      isReady: true,
      score: 0,
      roundScore: 0,
      role: null,
      hasViewedRole: false,
      isPoliceRevealed: false,
    };

    const botPlayers = [
      createBotPlayer('bot_1', 0),
      createBotPlayer('bot_2', 1),
      createBotPlayer('bot_3', 2),
      createBotPlayer('bot_4', 3),
    ];

    const initialRoom: GameRoom = {
      code,
      hostId: currentPlayerId,
      targetScore: 5000,
      round: 1,
      phase: 'lobby',
      players: [humanPlayer, ...botPlayers],
      policeId: null,
      accusedPlayerId: null,
      investigationTimeLeft: 25,
      isCorrectGuess: null,
      actualChorId: null,
      winner: null,
    };

    updateRoomState(initialRoom);
  };

  // Handle Host Create Room
  const handleCreateRoom = (hostName: string, avatar: string, targetScore: number) => {
    const code = generateRoomCode();
    network.setRoom(code);

    const hostPlayer: Player = {
      id: currentPlayerId,
      name: hostName,
      avatar,
      isBot: false,
      isHost: true,
      isReady: true,
      score: 0,
      roundScore: 0,
      role: null,
      hasViewedRole: false,
      isPoliceRevealed: false,
    };

    // Pre-populate with 4 bots so host can immediately test/play or remove them
    const initialBots = [
      createBotPlayer('bot_1', 0),
      createBotPlayer('bot_2', 1),
      createBotPlayer('bot_3', 2),
      createBotPlayer('bot_4', 3),
    ];

    const newRoom: GameRoom = {
      code,
      hostId: currentPlayerId,
      targetScore,
      round: 1,
      phase: 'lobby',
      players: [hostPlayer, ...initialBots],
      policeId: null,
      accusedPlayerId: null,
      investigationTimeLeft: 25,
      isCorrectGuess: null,
      actualChorId: null,
      winner: null,
    };

    updateRoomState(newRoom);
  };

  // Handle Guest Join Room
  const handleJoinRoom = (roomCode: string, playerName: string, avatar: string) => {
    network.setRoom(roomCode);

    const guestPlayer: Player = {
      id: currentPlayerId,
      name: playerName,
      avatar,
      isBot: false,
      isHost: false,
      isReady: true,
      score: 0,
      roundScore: 0,
      role: null,
      hasViewedRole: false,
      isPoliceRevealed: false,
    };

    // Check if room exists in local storage or create joined room
    const existing = network.loadSavedRoom(roomCode);
    let updatedPlayers: Player[] = [];

    if (existing) {
      // Remove a bot if room is full
      const filtered = existing.players.filter((p) => p.id !== currentPlayerId);
      if (filtered.length >= 8 && filtered.some((p) => p.isBot)) {
        const botIdx = filtered.findIndex((p) => p.isBot);
        filtered.splice(botIdx, 1);
      }
      updatedPlayers = [...filtered, guestPlayer];
      const updatedRoom: GameRoom = {
        ...existing,
        players: updatedPlayers,
      };
      updateRoomState(updatedRoom);
    } else {
      // Fallback initial room state
      const fallbackRoom: GameRoom = {
        code: roomCode,
        hostId: 'host_player',
        targetScore: 5000,
        round: 1,
        phase: 'lobby',
        players: [
          {
            id: 'host_player',
            name: 'King Host',
            avatar: '👑',
            isBot: true,
            isHost: true,
            isReady: true,
            score: 0,
            roundScore: 0,
            role: null,
            hasViewedRole: false,
            isPoliceRevealed: false,
          },
          guestPlayer,
          createBotPlayer('bot_1', 0),
          createBotPlayer('bot_2', 1),
          createBotPlayer('bot_3', 2),
        ],
        policeId: null,
        accusedPlayerId: null,
        investigationTimeLeft: 25,
        isCorrectGuess: null,
        actualChorId: null,
        winner: null,
      };
      updateRoomState(fallbackRoom);
    }
  };

  // Add Bot to Lobby
  const handleAddBot = () => {
    if (!room || room.players.length >= 8) return;
    sound.playButtonClick();
    const newBot = createBotPlayer(`bot_${Date.now()}`, room.players.length);
    const updated = {
      ...room,
      players: [...room.players, newBot],
    };
    updateRoomState(updated);
  };

  // Remove Bot from Lobby
  const handleRemoveBot = () => {
    if (!room) return;
    sound.playButtonClick();
    const botIdx = [...room.players].reverse().findIndex((p) => p.isBot);
    if (botIdx !== -1) {
      const realIdx = room.players.length - 1 - botIdx;
      const updatedPlayers = [...room.players];
      updatedPlayers.splice(realIdx, 1);
      const updated = { ...room, players: updatedPlayers };
      updateRoomState(updated);
    }
  };

  // Start Game & Role Assignment
  const handleStartGame = () => {
    if (!room || room.players.length < 4) return;
    sound.playCardShuffle();

    // Prepare role deck based on player count
    const baseRoles: RoleId[] = ['raja', 'rani', 'mantri', 'police', 'chor'];
    const expansionPool: RoleId[] = ['senapati', 'jyotishi', 'dhukuti'];

    let deck: RoleId[] = [];
    if (room.players.length === 4) {
      deck = ['raja', 'rani', 'police', 'chor'];
    } else if (room.players.length === 5) {
      deck = [...baseRoles];
    } else {
      deck = [...baseRoles];
      for (let i = 5; i < room.players.length; i++) {
        deck.push(expansionPool[(i - 5) % expansionPool.length]);
      }
    }

    const shuffledDeck = shuffleArray(deck);
    let assignedPoliceId: string | null = null;
    let assignedChorId: string | null = null;

    const assignedPlayers: Player[] = room.players.map((p, idx) => {
      const role = shuffledDeck[idx];
      if (role === 'police') assignedPoliceId = p.id;
      if (role === 'chor') assignedChorId = p.id;

      return {
        ...p,
        role,
        roundScore: 0,
        hasViewedRole: p.isBot,
        isPoliceRevealed: false,
        botPersonality: p.isBot
          ? {
              bluffStyle: 'calm',
              dialogue: getRandomDialogue(role),
            }
          : undefined,
      };
    });

    const updatedRoom: GameRoom = {
      ...room,
      phase: 'private_role_reveal',
      players: assignedPlayers,
      policeId: assignedPoliceId,
      actualChorId: assignedChorId,
      accusedPlayerId: null,
      isCorrectGuess: null,
    };

    updateRoomState(updatedRoom);
  };

  // Proceed from Private Role Reveal -> Police Reveal
  const handleProceedToPoliceReveal = () => {
    if (!room) return;
    const updatedRoom: GameRoom = {
      ...room,
      phase: 'police_reveal',
    };
    updateRoomState(updatedRoom);
  };

  // Reveal Police Identity publicly -> Investigation
  const handlePoliceRevealed = () => {
    if (!room) return;
    const updatedPlayers = room.players.map((p) =>
      p.id === room.policeId ? { ...p, isPoliceRevealed: true } : p
    );

    const updatedRoom: GameRoom = {
      ...room,
      players: updatedPlayers,
      phase: 'investigation',
    };
    updateRoomState(updatedRoom);
  };

  // Police Accuses a Player -> Suspense Phase
  const handleAccusePlayer = (accusedId: string) => {
    if (!room) return;
    const isCorrect = accusedId === room.actualChorId;

    const updatedRoom: GameRoom = {
      ...room,
      accusedPlayerId: accusedId,
      isCorrectGuess: isCorrect,
      phase: 'suspense',
    };
    updateRoomState(updatedRoom);
  };

  // Suspense Finishes -> Result Reveal & Calculate Points
  const handleSuspenseFinished = () => {
    if (!room) return;
    const isCorrect = room.isCorrectGuess;

    const updatedPlayers = room.players.map((player) => {
      let roundPts = 0;
      if (player.role === 'raja') roundPts = 2000;
      else if (player.role === 'rani') roundPts = 1500;
      else if (player.role === 'mantri') roundPts = 1000;
      else if (player.role === 'senapati') roundPts = 800;
      else if (player.role === 'jyotishi') roundPts = 600;
      else if (player.role === 'dhukuti') roundPts = 400;
      else if (player.role === 'police') {
        roundPts = isCorrect ? 500 : 0;
      } else if (player.role === 'chor') {
        roundPts = isCorrect ? 0 : 500;
      }

      return {
        ...player,
        roundScore: roundPts,
        score: player.score + roundPts,
      };
    });

    const updatedRoom: GameRoom = {
      ...room,
      players: updatedPlayers,
      phase: 'result_reveal',
    };
    updateRoomState(updatedRoom);
  };

  // View Scoreboard & Check Game Over
  const handleViewScoreboard = () => {
    if (!room) return;
    const sorted = [...room.players].sort((a, b) => b.score - a.score);
    const topScorer = sorted[0];

    // If target score reached, trigger GameOver!
    if (room.targetScore > 0 && topScorer && topScorer.score >= room.targetScore) {
      const gameOverRoom: GameRoom = {
        ...room,
        winner: topScorer,
        phase: 'game_over',
      };
      updateRoomState(gameOverRoom);
    } else {
      const scoreboardRoom: GameRoom = {
        ...room,
        phase: 'scoreboard',
      };
      updateRoomState(scoreboardRoom);
    }
  };

  // Next Round
  const handleNextRound = () => {
    if (!room) return;
    const nextRoundRoom: GameRoom = {
      ...room,
      round: room.round + 1,
    };
    setRoom(nextRoundRoom);
    // Restart role assignment for next round
    handleStartGame();
  };

  // Play Again (Match Reset)
  const handlePlayAgain = () => {
    if (!room) return;
    const resetPlayers = room.players.map((p) => ({
      ...p,
      score: 0,
      roundScore: 0,
      role: null,
      isPoliceRevealed: false,
    }));

    const resetRoom: GameRoom = {
      ...room,
      round: 1,
      players: resetPlayers,
      winner: null,
      phase: 'lobby',
    };
    updateRoomState(resetRoom);
  };

  // Return to Lobby
  const handleReturnToLobby = () => {
    if (!room) return;
    const resetPlayers = room.players.map((p) => ({
      ...p,
      role: null,
      isPoliceRevealed: false,
    }));

    const lobbyRoom: GameRoom = {
      ...room,
      phase: 'lobby',
      players: resetPlayers,
      winner: null,
    };
    updateRoomState(lobbyRoom);
  };

  // Leave room and return to landing
  const handleLeaveRoom = () => {
    setRoom(null);
    setPhase('landing');
  };

  const currentPlayer = room?.players.find((p) => p.id === currentPlayerId);

  return (
    <div className="relative min-h-screen bg-[#FAF8F2] dark:bg-[#070A0F] text-[#263238] dark:text-[#F8FAFC] flex flex-col font-sans overflow-x-hidden transition-colors duration-300">
      {/* Background Ambience */}
      <ParticleBackground />

      {/* Royal Navigation Bar */}
      <Navbar
        roomCode={room?.code}
        round={room && phase !== 'landing' && phase !== 'create_room' && phase !== 'join_room' && phase !== 'lobby' ? room.round : undefined}
        onLeaveRoom={room ? handleLeaveRoom : undefined}
        showLogo={true}
      />

      {/* Dynamic Game View Router */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center">
        {phase === 'landing' && (
          <LandingPage
            onCreateRoomClick={() => setPhase('create_room')}
            onJoinRoomClick={() => setPhase('join_room')}
            onQuickPlayClick={handleQuickPlay}
          />
        )}

        {phase === 'create_room' && (
          <CreateRoom
            onBack={() => setPhase('landing')}
            onCreateRoom={handleCreateRoom}
          />
        )}

        {phase === 'join_room' && (
          <JoinRoom
            onBack={() => setPhase('landing')}
            onJoinRoom={handleJoinRoom}
          />
        )}

        {phase === 'lobby' && room && (
          <LobbyView
            room={room}
            currentPlayerId={currentPlayerId}
            onAddBot={handleAddBot}
            onRemoveBot={handleRemoveBot}
            onToggleReady={() => {}}
            onStartGame={handleStartGame}
          />
        )}

        {phase === 'private_role_reveal' && room && (
          <RoleRevealPhase
            role={currentPlayer?.role || null}
            onProceed={handleProceedToPoliceReveal}
          />
        )}

        {phase === 'police_reveal' && room && (
          <PoliceRevealPhase
            room={room}
            currentPlayerId={currentPlayerId}
            onRevealPolice={handlePoliceRevealed}
          />
        )}

        {phase === 'investigation' && room && (
          <InvestigationPhase
            room={room}
            currentPlayerId={currentPlayerId}
            onAccusePlayer={handleAccusePlayer}
          />
        )}

        {phase === 'suspense' && room && (
          <SuspensePhase
            room={room}
            onRevealFinished={handleSuspenseFinished}
          />
        )}

        {phase === 'result_reveal' && room && (
          <ResultRevealPhase
            room={room}
            onViewScoreboard={handleViewScoreboard}
          />
        )}

        {phase === 'scoreboard' && room && (
          <ScoreboardPhase
            room={room}
            currentPlayerId={currentPlayerId}
            onNextRound={handleNextRound}
            onReturnToLobby={handleReturnToLobby}
          />
        )}

        {phase === 'game_over' && room && (
          <GameOverPhase
            room={room}
            onPlayAgain={handlePlayAgain}
            onReturnToLobby={handleReturnToLobby}
          />
        )}
      </main>
    </div>
  );
}

export default App;
