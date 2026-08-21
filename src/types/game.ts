export type RoleId = 'raja' | 'rani' | 'mantri' | 'police' | 'chor' | 'senapati' | 'jyotishi' | 'dhukuti';

export interface RoleConfig {
  id: RoleId;
  name: string;
  nepaliName: string;
  points: number;
  emoji: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  glowColor: string;
  description: string;
  secretObjective: string;
  rank: number;
}

export const ROLES_CONFIG: Record<RoleId, RoleConfig> = {
  raja: {
    id: 'raja',
    name: 'Raja',
    nepaliName: 'राजा (King)',
    points: 2000,
    emoji: '👑',
    color: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.45)',
    description: 'The supreme ruler of the kingdom. Enjoys royal majesty and commands the highest wealth.',
    secretObjective: 'Keep your royal identity hidden. Let the Police catch the Chor to safeguard the realm.',
    rank: 1,
  },
  rani: {
    id: 'rani',
    name: 'Rani',
    nepaliName: 'रानी (Queen)',
    points: 1500,
    emoji: '👸',
    color: '#EC4899',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    borderColor: '#F472B6',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    description: 'The royal queen of grace and influence. Treasured by the kingdom.',
    secretObjective: 'Remain secret and blend in with the courtiers while enjoying royal points.',
    rank: 2,
  },
  mantri: {
    id: 'mantri',
    name: 'Mantri',
    nepaliName: 'मन्त्री (Minister)',
    points: 1000,
    emoji: '🧠',
    color: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    borderColor: '#A78BFA',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    description: 'The shrewd prime minister and royal advisor.',
    secretObjective: 'Advise silence, act innocent, and observe the Police’s investigation from the shadows.',
    rank: 3,
  },
  police: {
    id: 'police',
    name: 'Police',
    nepaliName: 'प्रहरी / कोतवाल (Inspector)',
    points: 500,
    emoji: '👮',
    color: '#3B82F6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    borderColor: '#60A5FA',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    description: 'The guardian of law. Must publicly announce their role and hunt down the elusive Chor!',
    secretObjective: 'Publicly reveal yourself, investigate suspect behaviors, and correctly accuse the Chor for 500 points.',
    rank: 4,
  },
  chor: {
    id: 'chor',
    name: 'Chor',
    nepaliName: 'चोर (Thief)',
    points: 0,
    emoji: '🥷',
    color: '#EF4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#F87171',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    description: 'The cunning thief operating in the shadows of the royal court.',
    secretObjective: 'Act completely innocent! If Police accuses someone else, you steal the 500 points!',
    rank: 5,
  },
  senapati: {
    id: 'senapati',
    name: 'Senapati',
    nepaliName: 'सेनापति (General)',
    points: 800,
    emoji: '⚔️',
    color: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#34D399',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    description: 'The military commander protecting the borders.',
    secretObjective: 'Stay discreet and keep the peace in court.',
    rank: 6,
  },
  jyotishi: {
    id: 'jyotishi',
    name: 'Jyotishi',
    nepaliName: 'ज्योतिषी (Astrologer)',
    points: 600,
    emoji: '🔮',
    color: '#06B6D4',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#22D3EE',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    description: 'The court astrologer reading the stars.',
    secretObjective: 'Keep your celestial wisdom secret.',
    rank: 7,
  },
  dhukuti: {
    id: 'dhukuti',
    name: 'Dhukuti',
    nepaliName: 'ढुकुटी (Treasurer)',
    points: 400,
    emoji: '💰',
    color: '#F97316',
    badgeBg: 'rgba(249, 115, 22, 0.15)',
    borderColor: '#FB923C',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    description: 'Keeper of the royal vault.',
    secretObjective: 'Guard your wealth in silence.',
    rank: 8,
  },
};

export interface Player {
  id: string;
  name: string;
  avatar: string;
  isBot: boolean;
  isHost: boolean;
  isReady: boolean;
  score: number;
  roundScore: number;
  role: RoleId | null;
  hasViewedRole: boolean;
  isPoliceRevealed: boolean;
  botPersonality?: {
    bluffStyle: 'calm' | 'nervous' | 'talkative' | 'defensive';
    dialogue: string;
  };
}

export type GamePhase =
  | 'landing'
  | 'create_room'
  | 'join_room'
  | 'lobby'
  | 'role_assignment'
  | 'private_role_reveal'
  | 'police_reveal'
  | 'investigation'
  | 'suspense'
  | 'result_reveal'
  | 'scoreboard'
  | 'game_over';

export interface GameRoom {
  code: string;
  hostId: string;
  targetScore: number; // 0 = unlimited rounds
  round: number;
  phase: GamePhase;
  players: Player[];
  policeId: string | null;
  accusedPlayerId: string | null;
  investigationTimeLeft: number;
  isCorrectGuess: boolean | null;
  actualChorId: string | null;
  winner: Player | null;
  statusMessage?: string;
}

export interface NetworkMessage {
  type: 'SYNC_STATE' | 'PLAYER_JOIN' | 'PLAYER_LEAVE' | 'START_GAME' | 'REVEAL_POLICE' | 'MAKE_ACCUSATION' | 'NEXT_ROUND' | 'RESET_GAME';
  roomCode: string;
  senderId: string;
  payload?: any;
  timestamp: number;
}
