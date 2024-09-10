import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const QrCode = (props: SvgProps) => (
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
      d="M5 7C5 5.89543 5.89543 5 7 5H13C14.1046 5 15 5.89543 15 7V13C15 14.1046 14.1046 15 13 15H7C5.89543 15 5 14.1046 5 13V7ZM13 7H7V13H13V7Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 19C5 17.8954 5.89543 17 7 17H13C14.1046 17 15 17.8954 15 19V25C15 26.1046 14.1046 27 13 27H7C5.89543 27 5 26.1046 5 25V19ZM13 19H7V25H13V19Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 7C17 5.89543 17.8954 5 19 5H25C26.1046 5 27 5.89543 27 7V13C27 14.1046 26.1046 15 25 15H19C17.8954 15 17 14.1046 17 13V7ZM25 7H19V13H25V7Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 17C18.5523 17 19 17.4477 19 18V22C19 22.5523 18.5523 23 18 23C17.4477 23 17 22.5523 17 22V18C17 17.4477 17.4477 17 18 17Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 17C22.5523 17 23 17.4477 23 18V26C23 26.5523 22.5523 27 22 27H18C17.4477 27 17 26.5523 17 26C17 25.4477 17.4477 25 18 25H21V18C21 17.4477 21.4477 17 22 17Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 20C21 19.4477 21.4477 19 22 19H26C26.5523 19 27 19.4477 27 20C27 20.5523 26.5523 21 26 21H22C21.4477 21 21 20.5523 21 20Z"
      fill="black"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26 23C26.5523 23 27 23.4477 27 24V26C27 26.5523 26.5523 27 26 27C25.4477 27 25 26.5523 25 26V24C25 23.4477 25.4477 23 26 23Z"
      fill="black"
    />
  </Svg>
);
export default QrCode;