import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconFocus({ size = 32, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Outer compass circle */}
      <Circle
        cx="24"
        cy="24"
        r="16"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner circle */}
      <Circle
        cx="24"
        cy="24"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Compass needle - vertical */}
      <Path
        d="M24 8V16M24 32V40"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Compass needle - horizontal */}
      <Path
        d="M8 24H16M32 24H40"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Direction markers */}
      <Path
        d="M24 6L22 8H26L24 6Z"
        fill={color}
      />
    </Svg>
  );
}
