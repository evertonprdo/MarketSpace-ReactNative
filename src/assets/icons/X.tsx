import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const X = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.7071 6.29289C26.0976 6.68342 26.0976 7.31658 25.7071 7.70711L7.70711 25.7071C7.31658 26.0976 6.68342 26.0976 6.29289 25.7071C5.90237 25.3166 5.90237 24.6834 6.29289 24.2929L24.2929 6.29289C24.6834 5.90237 25.3166 5.90237 25.7071 6.29289Z""
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L25.7071 24.2929C26.0976 24.6834 26.0976 25.3166 25.7071 25.7071C25.3166 26.0976 24.6834 26.0976 24.2929 25.7071L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z"
    />
  </Svg>
);
export default X;
