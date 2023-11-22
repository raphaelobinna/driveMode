import * as React from 'react';
import Svg, {
  Ellipse,
  Rect,
  Circle,
  G,
  ClipPath,
  Defs,
  Path,
} from 'react-native-svg';

export const OptionSVG = props => {
  return (
    <Svg
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_1557_342)">
        <G clip-path="url(#clip1_1557_342)">
          <Circle
            cx="18"
            cy="17.5"
            r="16.4062"
            stroke="#EBEBEB"
            stroke-width="2.1875"
          />
          <Path
            d="M18.0002 18.5936C18.7049 18.5936 19.2762 18.0223 19.2762 17.3175C19.2762 16.6128 18.7049 16.0415 18.0002 16.0415C17.2954 16.0415 16.7241 16.6128 16.7241 17.3175C16.7241 18.0223 17.2954 18.5936 18.0002 18.5936Z"
            stroke="#EBEBEB"
            stroke-width="2.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M26.9323 18.5936C27.637 18.5936 28.2083 18.0223 28.2083 17.3175C28.2083 16.6128 27.637 16.0415 26.9323 16.0415C26.2276 16.0415 25.6562 16.6128 25.6562 17.3175C25.6562 18.0223 26.2276 18.5936 26.9323 18.5936Z"
            stroke="#EBEBEB"
            stroke-width="2.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M9.06755 18.5936C9.77228 18.5936 10.3436 18.0223 10.3436 17.3175C10.3436 16.6128 9.77228 16.0415 9.06755 16.0415C8.36281 16.0415 7.7915 16.6128 7.7915 17.3175C7.7915 18.0223 8.36281 18.5936 9.06755 18.5936Z"
            stroke="#EBEBEB"
            stroke-width="2.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1557_342">
          <Rect
            width="35"
            height="35"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
        <ClipPath id="clip1_1557_342">
          <Rect
            width="35"
            height="35"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
