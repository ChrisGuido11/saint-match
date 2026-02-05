export const Springs = {
  buttonPress: { damping: 15, stiffness: 300 },
  buttonRelease: { damping: 12, stiffness: 200 },
  cardEntrance: { damping: 12, stiffness: 200 },
  celebration: { damping: 8, stiffness: 150 },
  subtle: { damping: 20, stiffness: 400 },
} as const;

export const Durations = {
  fast: 200,
  normal: 400,
  slow: 600,
  entrance: 500,
} as const;

export const Delays = {
  stagger: 50,
  cascade: 100,
} as const;
