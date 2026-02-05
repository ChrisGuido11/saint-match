import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconJoy({ size = 32, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Sun center */}
      <Circle
        cx="24"
        cy="24"
        r="8"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Sun rays - cardinal */}
      <Path
        d="M24 8V12M24 36V40M8 24H12M36 24H40"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Sun rays - diagonal */}
      <Path
        d="M12.7 12.7L15.5 15.5M32.5 32.5L35.3 35.3M12.7 35.3L15.5 32.5M32.5 15.5L35.3 12.7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Inner smile representing joy */}
      <Path
        d="M20 26C20 26 22 28 24 28C26 28 28 26 28 26"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
