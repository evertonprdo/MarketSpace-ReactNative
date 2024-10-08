import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const User = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="#000000"
    viewBox="0 0 256 256"
    {...props}
  >
    <Path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z" />
  </Svg>
);
export default User;
