import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CreditCard = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 8C2 6.89543 2.89543 6 4 6H28C29.1046 6 30 6.89543 30 8V24C30 25.1046 29.1046 26 28 26H4C2.89543 26 2 25.1046 2 24V8ZM4 13.1125V24H28V13.1125H4ZM28 11.1125H4V8H28V11.1125ZM14 21C14 20.4477 14.4477 20 15 20H17C17.5523 20 18 20.4477 18 21C18 21.5523 17.5523 22 17 22H15C14.4477 22 14 21.5523 14 21ZM20 21C20 20.4477 20.4477 20 21 20H25C25.5523 20 26 20.4477 26 21C26 21.5523 25.5523 22 25 22H21C20.4477 22 20 21.5523 20 21Z"
    />
  </Svg>
);
export default CreditCard;