import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconGrow({ size = 32, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Main stem */}
      <Path
        d="M24 42V24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left branch with leaf */}
      <Path
        d="M24 34C20 34 16 30 16 26"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M12 26C12 26 14 22 18 24C20 25 20 29 16 30C14 30 12 26 12 26Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right branch with leaf */}
      <Path
        d="M24 28C28 28 32 24 32 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M36 20C36 20 34 16 30 18C28 19 28 23 32 24C34 24 36 20 36 20Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* New growth top */}
      <Path
        d="M24 24C24 20 22 16 20 14M24 24C24 20 26 16 28 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M24 10C24 10 22 14 24 16C26 14 24 10 24 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
