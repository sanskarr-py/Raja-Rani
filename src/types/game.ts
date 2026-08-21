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
    color: '#9A7815',
    badgeBg: '#FAF3DE',
    borderColor: '#C9A227',
    glowColor: 'rgba(201, 162, 39, 0.25)',
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
    color: '#9D2B6B',
    badgeBg: '#FDF2F8',
    borderColor: '#D8BD6A',
    glowColor: 'rgba(216, 189, 106, 0.3)',
    description: 'The royal queen of grace and influence. Treasured by the kingdom.',
    secretObjective: 'Remain secret and blend in with the courtiers while enjoying royal bounty.',
    rank: 2,
  },
  mantri: {
    id: 'mantri',
    name: 'Mantri',
    nepaliName: 'मन्त्री (Minister)',
    points: 1000,
    emoji: '🧠',
    color: '#173B67',
    badgeBg: '#F0F4F8',
    borderColor: '#D8BD6A',
    glowColor: 'rgba(23, 59, 103, 0.2)',
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
    color: '#173B67',
    badgeBg: '#EBF2FA',
    borderColor: '#234F7D',
    glowColor: 'rgba(23, 59, 103, 0.3)',
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
    color: '#B63A32',
    badgeBg: '#FDF2F1',
    borderColor: '#D8726A',
    glowColor: 'rgba(182, 58, 50, 0.25)',
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
    color: '#2A7A58',
    badgeBg: '#F0F7F4',
    borderColor: '#78B89A',
    glowColor: 'rgba(42, 122, 88, 0.25)',
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
    color: '#3D5A80',
    badgeBg: '#EEF3F8',
    borderColor: '#98B4D4',
    glowColor: 'rgba(61, 90, 128, 0.25)',
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
    color: '#9C6228',
    badgeBg: '#FAF5EE',
    borderColor: '#D4A876',
    glowColor: 'rgba(156, 98, 40, 0.25)',
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
