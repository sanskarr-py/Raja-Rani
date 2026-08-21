import type { Player, RoleId } from '../types/game';

export const BOT_NAMES = [
  'Biraj (AI)',
  'Aayush (AI)',
  'Prashant (AI)',
  'Anjali (AI)',
  'Pooja (AI)',
  'Kiran (AI)',
  'Roshan (AI)',
  'Sita (AI)',
];

export const BOT_AVATARS = ['🦁', '🐯', '🦅', '🐺', '🦊', '🦉', '🐲', '🦄', '🐼', '🐆'];

export const BLUFF_DIALOGUES: Record<string, string[]> = {
  chor: [
    "Why are you looking at me? I'm just an innocent courtier! 👀",
    "Police dai, please! Look at how calm I am! 😇",
    "I swear on Pashupatinath, it's not me! 🥷",
    "Check Player 2, they're trembling! 🤫",
    "I was with the Mantri the whole time! 📜",
  ],
  raja: [
    "The crown fears no false accusations. 👑",
    "Mind your tone, Inspector. Royal dignity is at stake! ✨",
    "I have 2000 reasons to be calm right now. 🏛️",
    "Justice must prevail in my kingdom! ⚔️",
  ],
  rani: [
    "Grace and majesty cannot be questioned. 👸",
    "Find the real thief before you disturb the palace. 🌸",
    "Such accusations do not suit a noble queen! 💎",
  ],
  mantri: [
    "As court advisor, I suggest you look closer at the others. 🧠",
    "Logic dictates the Chor is trying too hard to seem innocent! 🔍",
    "My intellect speaks for itself. Keep searching. 📜",
  ],
  general: [
    "I have nothing to hide! Look at my honorable stance. 🛡️",
    "Police inspector, don't waste your precious accusation on me! ⚔️",
  ],
};

export function getRandomDialogue(role: RoleId | null): string {
  if (!role) return "I'm watching everyone carefully...";
  const pool = BLUFF_DIALOGUES[role] || BLUFF_DIALOGUES.general;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function createBotPlayer(id: string, nameIndex: number): Player {
  const name = BOT_NAMES[nameIndex % BOT_NAMES.length];
  const avatar = BOT_AVATARS[nameIndex % BOT_AVATARS.length];
  const personalities: ('calm' | 'nervous' | 'talkative' | 'defensive')[] = ['calm', 'nervous', 'talkative', 'defensive'];
  const bluffStyle = personalities[Math.floor(Math.random() * personalities.length)];

  return {
    id,
    name,
    avatar,
    isBot: true,
    isHost: false,
    isReady: true,
    score: 0,
    roundScore: 0,
    role: null,
    hasViewedRole: true,
    isPoliceRevealed: false,
    botPersonality: {
      bluffStyle,
      dialogue: "Ready for the royal court.",
    },
  };
}

export function botChooseAccusation(policeId: string, players: Player[]): string {
  // Filter out police themselves
  const suspects = players.filter((p) => p.id !== policeId);
  if (suspects.length === 0) return '';

  // Smart probability: 60% chance to guess randomly, 40% chance smart pick
  const chor = suspects.find((p) => p.role === 'chor');
  if (chor && Math.random() < 0.45) {
    return chor.id;
  }

  // Random suspect pick
  const randomSuspect = suspects[Math.floor(Math.random() * suspects.length)];
  return randomSuspect.id;
}
