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

export const ProfileSVG = props => {
  return (
    <Svg
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_1557_338)">
        <Path
          d="M29.6668 30.625V27.7083C29.6668 26.1612 29.0522 24.6775 27.9583 23.5835C26.8643 22.4896 25.3806 21.875 23.8335 21.875H12.1668C10.6197 21.875 9.136 22.4896 8.04204 23.5835C6.94808 24.6775 6.3335 26.1612 6.3335 27.7083V30.625"
          stroke="#EBEBEB"
          stroke-width="2.1875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17.9998 16.0417C21.2215 16.0417 23.8332 13.43 23.8332 10.2083C23.8332 6.98667 21.2215 4.375 17.9998 4.375C14.7782 4.375 12.1665 6.98667 12.1665 10.2083C12.1665 13.43 14.7782 16.0417 17.9998 16.0417Z"
          stroke="#EBEBEB"
          stroke-width="2.1875"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1557_338">
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
