import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconHeart({ size = 32, color = Colors.terracotta }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Heart shape */}
      <Path
        d="M24 40C24 40 6 28 6 18C6 12 10.5 8 16 8C19.5 8 22.5 10 24 13C25.5 10 28.5 8 32 8C37.5 8 42 12 42 18C42 28 24 40 24 40Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small pen nib */}
      <Path
        d="M32 22L36 18M36 18L38 20M36 18L37 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
    </Svg>
  );
}
