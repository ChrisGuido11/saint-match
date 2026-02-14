import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

export function IconNovena({
  size = 80,
  color = Colors.sage,
  accentColor = Colors.terracotta
}: IconProps) {
  // 9 dots evenly spaced in a circle (representing the 9 days of a novena)
  const cx = 40;
  const cy = 36;
  const radius = 20;
  const dots = Array.from({ length: 9 }, (_, i) => {
    const angle = (i * 2 * Math.PI) / 9 - Math.PI / 2; // start from top
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Prayer bead circle — 9 dots */}
      {dots.map((dot, i) => (
        <Circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={3}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      ))}
      {/* Connecting ring between beads */}
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={0.3}
      />
      {/* Cross hanging below */}
      <Path
        d="M40 56V70"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M35 62H45"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small connector from bottom bead to cross */}
      <Path
        d="M40 56V52"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Gentle glow rays from top */}
      <Path
        d="M40 10V8M32 12L30 10M48 12L50 10"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}
