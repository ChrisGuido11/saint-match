import { TextStyle } from 'react-native';

// Distinctive, characterful font pairing
// Cormorant Garamond: Elegant serif for headlines (kept - works well)
// DM Sans: Friendly, modern sans-serif with personality (replaces generic Inter)

export const FontFamily = {
  serif: 'CormorantGaramond_600SemiBold',
  serifBold: 'CormorantGaramond_700Bold',
  serifItalic: 'CormorantGaramond_600SemiBold_Italic',
  sans: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansSemiBold: 'DMSans_600SemiBold',
  sansBold: 'DMSans_700Bold',
} as const;

export const Typography: Record<string, TextStyle> = {
  // Display - Hero moments
  heroTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  
  // Headings - Clear hierarchy with more contrast
  h1: {
    fontFamily: FontFamily.serifBold,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FontFamily.serif,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: FontFamily.serif,
    fontSize: 20,
    lineHeight: 26,
  },
  
  // Saint names - Special treatment
  saintName: {
    fontFamily: FontFamily.serifBold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0.3,
  },
  
  // Body - More contrast between sizes
  bodyLarge: {
    fontFamily: FontFamily.sans,
    fontSize: 18,
    lineHeight: 28,
  },
  body: {
    fontFamily: FontFamily.sans,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: FontFamily.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // UI Elements - Refined
  button: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 14,
    lineHeight: 18,
  },
  label: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: FontFamily.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  
  // Numbers - Distinctive
  streakNumber: {
    fontFamily: FontFamily.sansBold,
    fontSize: 52,
    lineHeight: 56,
  },
  statNumber: {
    fontFamily: FontFamily.sansBold,
    fontSize: 28,
    lineHeight: 32,
  },
} as const;
