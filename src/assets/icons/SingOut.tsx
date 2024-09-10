import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SingOut = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.0429 10.0429C21.4334 9.65237 22.0666 9.65237 22.4571 10.0429L27.7071 15.2929C28.0976 15.6834 28.0976 16.3166 27.7071 16.7071L22.4571 21.9571C22.0666 22.3476 21.4334 22.3476 21.0429 21.9571C20.6524 21.5666 20.6524 20.9334 21.0429 20.5429L25.5858 16L21.0429 11.4571C20.6524 11.0666 20.6524 10.4334 21.0429 10.0429Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 16C12 15.4477 12.4477 15 13 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H13C12.4477 17 12 16.5523 12 16Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H13C13.5523 4 14 4.44772 14 5C14 5.55228 13.5523 6 13 6L6 6L6 26H13C13.5523 26 14 26.4477 14 27C14 27.5523 13.5523 28 13 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V6C4 5.46957 4.21071 4.96086 4.58579 4.58579Z"
      fill="black"
    />
  </Svg>
);
export default SingOut;
