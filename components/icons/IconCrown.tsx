import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

/**
 * A cross with radiating light rays — Catholic "pro" icon
 * matching the illuminated manuscript line-art style.
 */
export function IconCrown({
  size = 80,
  color = Colors.sage,
  accentColor = Colors.terracotta,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Radiant circle behind the cross */}
      <Circle
        cx="40"
        cy="38"
        r="22"
        stroke={color}
        strokeWidth="1.5"
        opacity={0.3}
      />
      {/* Outer glow circle */}
      <Circle
        cx="40"
        cy="38"
        r="30"
        stroke={color}
        strokeWidth="1"
        opacity={0.15}
      />
      {/* Cross — vertical */}
      <Path
        d="M40 16V60"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Cross — horizontal */}
      <Path
        d="M24 34H56"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Decorative serifs on cross ends */}
      <Path
        d="M37 16H43M37 60H43M24 31V37M56 31V37"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Light rays */}
      <Path
        d="M18 16L22 20M62 16L58 20M18 60L22 56M62 60L58 56"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.4}
      />
      {/* Small accent dots at ray tips */}
      <Circle cx="16" cy="14" r="1.5" fill={color} opacity={0.3} />
      <Circle cx="64" cy="14" r="1.5" fill={color} opacity={0.3} />
      <Circle cx="16" cy="62" r="1.5" fill={color} opacity={0.3} />
      <Circle cx="64" cy="62" r="1.5" fill={color} opacity={0.3} />
    </Svg>
  );
}
