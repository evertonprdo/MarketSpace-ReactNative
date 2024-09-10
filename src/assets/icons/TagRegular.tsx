import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const TagRegular = (props: SvgProps) => (
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
      d="M15.1453 2.25602C15.4675 2.19295 15.8002 2.21013 16.1141 2.30605C16.4278 2.40191 16.7131 2.57347 16.9449 2.80561C16.9448 2.80547 16.9451 2.80574 16.9449 2.80561L29.9912 15.8519C30.1784 16.0361 30.3272 16.2555 30.4291 16.4975C30.5319 16.7416 30.5848 17.0038 30.5848 17.2686C30.5848 17.5335 30.5319 17.7957 30.4291 18.0398C30.3272 18.2818 30.1784 18.5012 29.9912 18.6854L18.6855 29.9911C18.5013 30.1783 18.2819 30.3271 18.0399 30.429C17.7958 30.5318 17.5336 30.5847 17.2687 30.5847C17.0039 30.5847 16.7417 30.5318 16.4976 30.429C16.2556 30.3271 16.0362 30.1783 15.852 29.9911L2.80613 16.9452C2.806 16.9451 2.80627 16.9454 2.80613 16.9452C2.574 16.7134 2.40202 16.4277 2.30616 16.114C2.21024 15.8001 2.19306 15.4674 2.25613 15.1452L2.25683 15.1417L4.26933 5.05424C4.34838 4.658 4.65811 4.34826 5.05435 4.26921L15.1418 2.25671L15.3375 3.23739L15.1453 2.25602ZM15.5297 4.21875L6.10011 6.09999L4.21886 15.5295L4.21961 15.5303L17.2687 28.5794L28.5795 17.2686L15.5297 4.21875Z"
      fill="black"
    />
    <Path
      d="M10.5 12C11.3284 12 12 11.3284 12 10.5C12 9.67157 11.3284 9 10.5 9C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12Z"
      fill="black"
    />
  </Svg>
);
export default TagRegular;
