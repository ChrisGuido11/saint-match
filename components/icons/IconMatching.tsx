import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconMatching({ size = 48, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Search circle */}
      <Circle
        cx="22"
        cy="22"
        r="12"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Magnifying glass handle */}
      <Path
        d="M31 31L40 40"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Inner sparkle - representing divine connection */}
      <Path
        d="M22 16V20M22 24V28M18 22H20M24 22H28"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.5}
      />
      {/* Orbiting dots */}
      <Circle cx="22" cy="6" r="2" fill={color} opacity={0.4} />
      <Circle cx="38" cy="22" r="2" fill={color} opacity={0.4} />
      <Circle cx="22" cy="38" r="2" fill={color} opacity={0.4} />
    </Svg>
  );
}
