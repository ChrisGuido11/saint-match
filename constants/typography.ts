import { TextStyle } from 'react-native';

export const FontFamily = {
  serif: 'CormorantGaramond_600SemiBold',
  serifBold: 'CormorantGaramond_700Bold',
  serifItalic: 'CormorantGaramond_600SemiBold_Italic',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
} as const;

export const Typography: Record<string, TextStyle> = {
  // Display
  heroTitle: {
    fontFamily: FontFamily.serifBold,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.5,
  },
  // Headings
  h1: {
    fontFamily: FontFamily.serifBold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FontFamily.serif,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: FontFamily.serif,
    fontSize: 22,
    lineHeight: 28,
  },
  // Saint names
  saintName: {
    fontFamily: FontFamily.serifBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.3,
  },
  // Body
  bodyLarge: {
    fontFamily: FontFamily.sans,
    fontSize: 17,
    lineHeight: 26,
  },
  body: {
    fontFamily: FontFamily.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: FontFamily.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  // UI Elements
  button: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  buttonSmall: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  label: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: FontFamily.sans,
    fontSize: 12,
    lineHeight: 16,
  },
  // Numbers
  streakNumber: {
    fontFamily: FontFamily.sansBold,
    fontSize: 48,
    lineHeight: 52,
  },
  statNumber: {
    fontFamily: FontFamily.sansBold,
    fontSize: 24,
    lineHeight: 28,
  },
} as const;
