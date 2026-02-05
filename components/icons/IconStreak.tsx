import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

export function IconStreak({ 
  size = 80, 
  color = Colors.sage,
  accentColor = Colors.terracotta 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Outer flame */}
      <Path
        d="M40 12C40 12 24 24 24 44C24 58 32 68 40 68C48 68 56 58 56 44C56 24 40 12 40 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Middle flame */}
      <Path
        d="M40 24C40 24 32 32 32 44C32 52 36 58 40 58C44 58 48 52 48 44C48 32 40 24 40 24Z"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner flame/core */}
      <Path
        d="M40 36C40 36 36 40 36 46C36 50 38 52 40 52C42 52 44 50 44 46C44 40 40 36 40 36Z"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Sparks */}
      <Path
        d="M28 20L26 16M52 20L54 16M40 8V4"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}
