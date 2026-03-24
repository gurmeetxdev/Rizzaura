/**
 * Rizz Analysis Engine (Demo Mock)
 * 
 * Provides mock analysis data for the landing page UI.
 */

export interface RizzScore {
  charisma: number;
  verbal: number;
  presence: number;
  total: number;
  archetype: string;
}

const RIZZ_ARCHETYPES = [
  "The Silent Architect",
  "The Magnetic Storyteller",
  "The Stoic Strategist",
  "The Radiant Catalyst",
  "The Unfazed Maverick"
];

export function calculateRizz(name: string): RizzScore {
  // Deterministic seed based on name string
  const seed = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const charisma = 40 + (seed % 60);
  const verbal = 50 + ((seed * 7) % 50);
  const presence = 30 + ((seed * 3) % 70);
  const total = Math.min(100, (charisma + verbal + presence) / 3);
  
  const archetypeIndex = seed % RIZZ_ARCHETYPES.length;
  
  return {
    charisma,
    verbal,
    presence,
    total,
    archetype: RIZZ_ARCHETYPES[archetypeIndex]
  };
}
