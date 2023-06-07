import * as React from "react";

function CardSetIcon(props) {
  return (
    <svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_535_262)">
        <mask
          id="prefix__a"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={25}
          height={25}
        >
          <path d="M25 0H0v25h25V0z" fill="#fff" />
        </mask>
        <g mask="url(#prefix__a)">
          <path
            d="M4.167 6.25H2.083v14.583a2.09 2.09 0 002.084 2.084H18.75v-2.084H4.167V6.25zm16.666-4.167h-12.5A2.09 2.09 0 006.25 4.167v12.5a2.09 2.09 0 002.083 2.083h12.5a2.09 2.09 0 002.084-2.083v-12.5a2.09 2.09 0 00-2.084-2.084zm-1.041 9.375H9.375V9.375h10.417v2.083zm-4.167 4.167h-6.25v-2.083h6.25v2.083zm4.167-8.333H9.375V5.208h10.417v2.084z"
            fill="#FFCED0"
          />
        </g>
      </g>
      <defs>
        <clipPath id="prefix__clip0_535_262">
          <path fill="#fff" d="M0 0h25v25H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CardSetIcon;