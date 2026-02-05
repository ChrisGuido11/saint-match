import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

export function IconLogo({ 
  size = 100, 
  color = Colors.sage,
  accentColor = Colors.terracotta 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Outer circle/halo */}
      <Circle
        cx="50"
        cy="50"
        r="42"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        opacity={0.3}
      />
      {/* Inner circle */}
      <Circle
        cx="50"
        cy="50"
        r="36"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Central cross - vertical */}
      <Path
        d="M50 28V72"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Central cross - horizontal */}
      <Path
        d="M28 50H72"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Decorative rays */}
      <Path
        d="M50 14V20M50 80V86M14 50H20M80 50H86"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.5}
      />
      {/* Corner accents */}
      <Path
        d="M26 26L30 30M74 26L70 30M26 74L30 70M74 74L70 70"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.4}
      />
    </Svg>
  );
}
