import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CaretUp = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.2929 9.29289C15.6834 8.90237 16.3166 8.90237 16.7071 9.29289L26.7071 19.2929C27.0976 19.6834 27.0976 20.3166 26.7071 20.7071C26.3166 21.0976 25.6834 21.0976 25.2929 20.7071L16 11.4142L6.70711 20.7071C6.31658 21.0976 5.68342 21.0976 5.29289 20.7071C4.90237 20.3166 4.90237 19.6834 5.29289 19.2929L15.2929 9.29289Z"
    />
  </Svg>
);
export default CaretUp;