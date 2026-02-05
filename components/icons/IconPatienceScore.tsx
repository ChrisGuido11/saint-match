import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export function IconPatienceScore({ size = 32, color = Colors.sage, level }: IconProps) {
  const renderFace = () => {
    switch (level) {
      case 1: // Struggling - sad face
        return (
          <>
            <Circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="11" cy="14" r="2" fill={color} />
            <Circle cx="21" cy="14" r="2" fill={color} />
            <Path d="M11 22C11 22 13 20 16 20C19 20 21 22 21 22" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        );
      case 2: // Difficult - worried face
        return (
          <>
            <Circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M10 13L12 15M12 13L10 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M22 13L20 15M20 13L22 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M12 23H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 3: // Okay - neutral face
        return (
          <>
            <Circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="11" cy="14" r="2" fill={color} />
            <Circle cx="21" cy="14" r="2" fill={color} />
            <Path d="M12 22H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 4: // Good - happy face
        return (
          <>
            <Circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="11" cy="14" r="2" fill={color} />
            <Circle cx="21" cy="14" r="2" fill={color} />
            <Path d="M11 21C11 21 13 25 16 25C19 25 21 21 21 21" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        );
      case 5: // Peaceful - very happy/peaceful
        return (
          <>
            <Circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M10 14C10 14 11 12 13 14" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <Path d="M22 14C22 14 21 12 19 14" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <Path d="M11 22C11 22 13 26 16 26C19 26 21 22 21 22" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {renderFace()}
    </Svg>
  );
}
