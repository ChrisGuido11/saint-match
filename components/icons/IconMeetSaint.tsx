import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  accentColor?: string;
}

export function IconMeetSaint({ 
  size = 80, 
  color = Colors.sage,
  accentColor = Colors.terracotta 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Church/arch outline */}
      <Path
        d="M40 8L16 28V68H64V28L40 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Doorway */}
      <Path
        d="M32 68V48C32 44 36 40 40 40C44 40 48 44 48 48V68"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Rose window / cross above door */}
      <Circle
        cx="40"
        cy="28"
        r="6"
        stroke={accentColor}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M40 22V34M34 28H46"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Side windows */}
      <Path
        d="M24 36V44M56 36V44"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Ground/base */}
      <Path
        d="M12 68H68"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Gentle rays of light */}
      <Path
        d="M40 4V2M28 6L26 4M52 6L54 4"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}
