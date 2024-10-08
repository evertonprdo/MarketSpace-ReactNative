import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Trash = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7C4 6.44772 4.44772 6 5 6H27C27.5523 6 28 6.44772 28 7C28 7.55228 27.5523 8 27 8H5C4.44772 8 4 7.55228 4 7Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3C10 2.44772 10.4477 2 11 2H21C21.5523 2 22 2.44772 22 3C22 3.55228 21.5523 4 21 4H11C10.4477 4 10 3.55228 10 3Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 6C7.55228 6 8 6.44772 8 7V26H24V7C24 6.44772 24.4477 6 25 6C25.5523 6 26 6.44772 26 7V26C26 26.5304 25.7893 27.0391 25.4142 27.4142C25.0391 27.7893 24.5304 28 24 28H8C7.46957 28 6.96086 27.7893 6.58579 27.4142C6.21071 27.0391 6 26.5304 6 26V7C6 6.44772 6.44772 6 7 6Z"
    />
  </Svg>
);
export default Trash;
