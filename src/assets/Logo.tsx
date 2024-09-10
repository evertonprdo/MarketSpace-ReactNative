import * as React from "react";
import Svg, { Path, Ellipse, SvgProps } from "react-native-svg";
const Logo = (props: SvgProps) => (
  <Svg
    width={96}
    height={64}
    viewBox="0 0 96 64"
    fill="none"
    {...props}
  >
    <Path
      d="M30.1538 45.666C19.9097 47.5407 12.56 47.1449 11.4875 44.1361C9.79669 39.3931 24.3452 29.9528 43.9825 23.0506C63.6198 16.1484 80.9096 14.3981 82.6004 19.1411C83.6795 22.1683 78.1435 27.109 68.8915 32.082"
      stroke="#364D9D"
      strokeWidth={2}
    />
    <Ellipse
      cx={46.4646}
      cy={30.8595}
      rx={22.9368}
      ry={22.7755}
      fill="#364D9D"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.7606 23.912C35.7606 22.9972 36.5074 22.2556 37.4287 22.2556H55.7781C56.6994 22.2556 57.4463 22.9972 57.4463 23.912V38.8196C57.4463 39.7344 56.6994 40.476 55.7781 40.476H37.4287C36.5074 40.476 35.7606 39.7344 35.7606 38.8196V23.912ZM55.7781 23.912H37.4287V38.8196H55.7781V23.912Z"
      fill="#EDECEE"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.7606 26.3966C35.7606 25.9392 36.134 25.5684 36.5946 25.5684H56.6122C57.0728 25.5684 57.4463 25.9392 57.4463 26.3966C57.4463 26.854 57.0728 27.2248 56.6122 27.2248H36.5946C36.134 27.2248 35.7606 26.854 35.7606 26.3966Z"
      fill="#EDECEE"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M42.4331 28.8811C42.8937 28.8811 43.2671 29.2519 43.2671 29.7093C43.2671 30.5879 43.6186 31.4305 44.2443 32.0518C44.87 32.6731 45.7186 33.0221 46.6034 33.0221C47.4882 33.0221 48.3368 32.6731 48.9625 32.0518C49.5882 31.4305 49.9396 30.5879 49.9396 29.7093C49.9396 29.2519 50.3131 28.8811 50.7737 28.8811C51.2344 28.8811 51.6078 29.2519 51.6078 29.7093C51.6078 31.0272 51.0805 32.2912 50.142 33.2231C49.2035 34.155 47.9306 34.6785 46.6034 34.6785C45.2761 34.6785 44.0033 34.155 43.0648 33.2231C42.1262 32.2912 41.599 31.0272 41.599 29.7093C41.599 29.2519 41.9724 28.8811 42.4331 28.8811Z"
      fill="#EDECEE"
    />
    <Path
      d="M30.1537 45.666C31.882 45.3497 33.6928 44.9688 35.5697 44.5249M68.8914 32.082C67.1479 33.0191 65.2725 33.9573 63.2846 34.8841"
      stroke="#F7F7F8"
      strokeWidth={2}
    />
  </Svg>
);
export default Logo;
