import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconCompleted({ size = 56, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* Circle background */}
      <Circle
        cx="28"
        cy="28"
        r="24"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity={0.3}
      />
      {/* Checkmark */}
      <Path
        d="M18 28L25 35L38 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Accent line */}
      <Path
        d="M28 4V8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
}
