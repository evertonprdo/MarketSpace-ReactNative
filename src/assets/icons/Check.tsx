import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Check = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 256 256"
    {...props}
  >
    <Path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-34.34,77.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
  </Svg>
);
export default Check;
