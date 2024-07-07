import * as React from 'react';
import { memo, SVGProps } from 'react';

const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="0.70em"
    height="0.70em"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
    />
  </svg>
);

export const MenuSvg = memo(Menu);
