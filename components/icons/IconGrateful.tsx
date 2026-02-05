import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
}

export function IconGrateful({ size = 32, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Chalice cup */}
      <Path
        d="M16 12H32L30 28C30 32 27 36 24 36C21 36 18 32 18 28L16 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Chalice stem */}
      <Path
        d="M24 36V42"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Chalice base */}
      <Path
        d="M20 42H28"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Host/wafer above */}
      <Circle
        cx="24"
        cy="10"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Cross on host */}
      <Path
        d="M24 7V13M21 10H27"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Rays of grace */}
      <Path
        d="M12 8L10 6M36 8L38 6M24 4V2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
}
