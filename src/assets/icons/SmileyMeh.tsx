import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SmileyMeh = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="#000000"
    viewBox="0 0 256 256"
    {...props}
  >
    <Path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-56a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,160ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Z" />
  </Svg>
);
export default SmileyMeh;
