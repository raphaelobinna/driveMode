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

export const MessageSVG = props => {
  return (
    <Svg
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M31.125 21.875C31.125 22.6485 30.8177 23.3904 30.2707 23.9374C29.7237 24.4844 28.9819 24.7917 28.2083 24.7917H10.7083L4.875 30.625V7.29167C4.875 6.51812 5.18229 5.77625 5.72927 5.22927C6.27625 4.68229 7.01812 4.375 7.79167 4.375H28.2083C28.9819 4.375 29.7237 4.68229 30.2707 5.22927C30.8177 5.77625 31.125 6.51812 31.125 7.29167V21.875Z"
        stroke="#EBEBEB"
        stroke-width="2.1875"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
