import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Bank = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4759 3.14834C15.7973 2.95055 16.2027 2.95055 16.5241 3.14834L29.5241 11.1483C29.9051 11.3828 30.084 11.8419 29.9622 12.2723C29.8404 12.7028 29.4474 13 29 13H3C2.5526 13 2.15965 12.7028 2.0378 12.2723C1.91596 11.8419 2.09487 11.3828 2.4759 11.1483L15.4759 3.14834ZM6.53304 11H25.467L16 5.17418L6.53304 11Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 11C7.55228 11 8 11.4477 8 12V22C8 22.5523 7.55228 23 7 23C6.44772 23 6 22.5523 6 22V12C6 11.4477 6.44772 11 7 11Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 11C13.5523 11 14 11.4477 14 12V22C14 22.5523 13.5523 23 13 23C12.4477 23 12 22.5523 12 22V12C12 11.4477 12.4477 11 13 11Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 11C19.5523 11 20 11.4477 20 12V22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22V12C18 11.4477 18.4477 11 19 11Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25 11C25.5523 11 26 11.4477 26 12V22C26 22.5523 25.5523 23 25 23C24.4477 23 24 22.5523 24 22V12C24 11.4477 24.4477 11 25 11Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 22C3 21.4477 3.44772 21 4 21H28C28.5523 21 29 21.4477 29 22C29 22.5523 28.5523 23 28 23H4C3.44772 23 3 22.5523 3 22Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 26C1 25.4477 1.44772 25 2 25H30C30.5523 25 31 25.4477 31 26C31 26.5523 30.5523 27 30 27H2C1.44772 27 1 26.5523 1 26Z"
    />
  </Svg>
);
export default Bank;