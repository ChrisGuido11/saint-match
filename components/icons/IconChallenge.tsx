import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

export function IconChallenge({ 
  size = 80, 
  color = Colors.sage,
  accentColor = Colors.terracotta 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Shield outline */}
      <Path
        d="M40 8C40 8 16 16 16 36C16 56 40 68 40 68C40 68 64 56 64 36C64 16 40 8 40 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner shield detail */}
      <Path
        d="M40 16C40 16 24 22 24 36C24 50 40 58 40 58C40 58 56 50 56 36C56 22 40 16 40 16Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.5}
      />
      {/* Sword */}
      <Path
        d="M40 24V48"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M36 28H44"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Sword guard */}
      <Path
        d="M32 48H48"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Sword handle */}
      <Path
        d="M40 48V56M36 56H44"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Sparkle accents */}
      <Path
        d="M52 20L54 18M52 24L54 26"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}
