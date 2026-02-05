import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconPeace({ size = 32, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Candle flame */}
      <Path
        d="M24 8C24 8 20 14 20 18C20 22 24 26 24 26C24 26 28 22 28 18C28 14 24 8 24 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Candle body */}
      <Path
        d="M20 26H28V38C28 39.1046 27.1046 40 26 40H22C20.8954 40 20 39.1046 20 38V26Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Candle base */}
      <Path
        d="M18 40H30"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Glow lines */}
      <Path
        d="M16 16L14 14M32 16L34 14M24 4V2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
}
