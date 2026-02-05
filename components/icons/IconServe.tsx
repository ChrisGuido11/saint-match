import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconServe({ size = 32, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Left hand */}
      <Path
        d="M14 32C12 30 10 26 12 22C14 18 18 18 20 20L24 24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right hand */}
      <Path
        d="M34 32C36 30 38 26 36 22C34 18 30 18 28 20L24 24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Heart shape formed by hands */}
      <Path
        d="M24 28C24 28 20 24 18 26C16 28 18 32 20 34C22 36 24 38 24 38C24 38 26 36 28 34C30 32 32 28 30 26C28 24 24 28 24 28Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Service lines */}
      <Path
        d="M8 40L12 36M40 40L36 36"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
}
