export const Colors = {
  // Primary palette - Richer, warmer sage
  sage: '#7A8F70',
  sageLight: '#9AAF8C',
  sageDark: '#5D7054',
  sageMuted: 'rgba(122, 143, 112, 0.12)',
  sageSubtle: 'rgba(122, 143, 112, 0.06)',

  // Accent - Warmer, earthier terracotta
  terracotta: '#C96B55',
  terracottaLight: '#D98B73',
  terracottaDark: '#A85440',
  terracottaMuted: 'rgba(201, 107, 85, 0.12)',
  terracottaSubtle: 'rgba(201, 107, 85, 0.04)',
  terracottaGlow: 'rgba(201, 107, 85, 0.25)',

  // Backgrounds - Warmer cream tones
  cream: '#F5F1EA',        // Deeper, warmer cream
  creamDark: '#E8E2D8',    // For borders/dividers
  creamWarm: '#EDE7DC',    // Accent backgrounds
  white: '#FFFCF8',        // Slightly warm white

  // Text - Softer charcoal for easier reading
  charcoal: '#2D2A26',     // Warm charcoal
  charcoalLight: '#4A4640', // Slightly lighter
  charcoalMuted: '#6B665E', // For secondary text
  charcoalSubtle: '#9A958A', // For hints/tertiary

  // Functional
  success: '#6B9E6B',
  warning: '#C9A055',
  error: '#C45E5E',
  streak: '#E07A3E',
  streakGlow: 'rgba(224, 122, 62, 0.3)',

  // Overlays
  overlay: 'rgba(45, 42, 38, 0.5)',
  overlayLight: 'rgba(45, 42, 38, 0.25)',
  glassBg: 'rgba(122, 143, 112, 0.08)',
  cardShadow: 'rgba(45, 42, 38, 0.08)',
} as const;

export const MoodColors = {
  peace: '#8BA8A0',
  focus: '#7B8FA3',
  grow: '#9E8B83',
  grateful: '#C49A6C',
  joy: '#D4A85E',
  serve: '#8B9D83',
} as const;
