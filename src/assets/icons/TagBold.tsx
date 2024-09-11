import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const TagBold = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0493 1.76534C15.4519 1.6865 15.8678 1.70797 16.2602 1.82787C16.6521 1.94762 17.0086 2.16187 17.2982 2.45175C17.2985 2.45211 17.2989 2.45248 17.2993 2.45284L30.3434 15.497C30.577 15.7272 30.7627 16.0013 30.8899 16.3035C31.0186 16.609 31.0848 16.9372 31.0848 17.2686C31.0848 17.6001 31.0186 17.9282 30.8899 18.2338C30.7627 18.536 30.577 18.8101 30.3434 19.0403L19.0404 30.3433C18.8102 30.5769 18.5361 30.7626 18.2339 30.8898C17.9284 31.0184 17.6002 31.0847 17.2687 31.0847C16.9373 31.0847 16.6091 31.0184 16.3036 30.8898C16.0014 30.7626 15.7273 30.5769 15.4971 30.3433L2.45295 17.2992C2.45258 17.2988 2.45221 17.2984 2.45184 17.298C2.16197 17.0084 1.94773 16.652 1.82799 16.2601C1.70809 15.8677 1.68661 15.4518 1.76545 15.0492L1.76648 15.0439L1.76649 15.0439L3.77899 4.95641C3.89757 4.36205 4.36217 3.89745 4.95653 3.77887L15.044 1.76637L15.3375 3.23739L15.0493 1.76534ZM15.1765 4.57267L15.1768 4.57305C15.1767 4.57292 15.1766 4.5728 15.1765 4.57267ZM15.1757 4.57193L15.1765 4.57267C15.1762 4.57243 15.176 4.57218 15.1757 4.57193ZM15.3652 4.76142L27.8724 17.2686L17.2687 27.8723L4.76153 15.3651L6.52516 6.52505L15.3652 4.76142Z"
    />
    <Path
      d="M10.5 12.5C11.6046 12.5 12.5 11.6046 12.5 10.5C12.5 9.39543 11.6046 8.5 10.5 8.5C9.39543 8.5 8.5 9.39543 8.5 10.5C8.5 11.6046 9.39543 12.5 10.5 12.5Z"
    />
  </Svg>
);
export default TagBold;