import React from 'react';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  streak?: number;
}

export function IconMilestone({ size = 72, color = Colors.terracotta, streak = 1 }: IconProps) {
  // Different crown/star styles based on streak milestone
  const isMajor = streak >= 30;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      {/* Outer circle */}
      <Circle
        cx="36"
        cy="36"
        r="32"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity={0.2}
      />
      
      {isMajor ? (
        // Crown for major milestones
        <>
          <Path
            d="M20 48H52L48 28L40 36L36 24L32 36L24 28L20 48Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="M24 28C24 26 26 24 28 24C30 24 32 26 32 28M40 28C40 26 42 24 44 24C46 24 48 26 48 28"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Circle cx="36" cy="20" r="3" stroke={color} strokeWidth="2" fill="none" />
        </>
      ) : (
        // Star for smaller milestones
        <>
          <Path
            d="M36 16L40 28H52L42 36L46 48L36 40L26 48L30 36L20 28H32L36 16Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}
      
      {/* Center gem */}
      <Circle cx="36" cy="36" r="4" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  );
}
