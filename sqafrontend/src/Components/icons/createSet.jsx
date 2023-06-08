import * as React from "react";

function CreateSetIcon(props) {
  return (
    <svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_539_250)">
        <mask
          id="prefix__a"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={22}
          height={22}
        >
          <path d="M22 0H0v22h22V0z" fill="#fff" />
        </mask>
        <g mask="url(#prefix__a)">
          <path
            d="M2.75 5.5a.92.92 0 00-.917.917v11.916c0 1.009.825 1.834 1.834 1.834h11.916a.92.92 0 00.917-.917.92.92 0 00-.917-.917h-11a.92.92 0 01-.916-.916v-11A.92.92 0 002.75 5.5zm15.583-3.667h-11A1.839 1.839 0 005.5 3.667v11c0 1.008.825 1.833 1.833 1.833h11a1.839 1.839 0 001.834-1.833v-11a1.839 1.839 0 00-1.834-1.834zm-1.833 8.25h-2.75v2.75a.92.92 0 01-.917.917.92.92 0 01-.916-.917v-2.75h-2.75a.92.92 0 01-.917-.916.92.92 0 01.917-.917h2.75V5.5a.92.92 0 01.916-.917.92.92 0 01.917.917v2.75h2.75a.92.92 0 01.917.917.92.92 0 01-.917.916z"
            fill="#261F2E"
          />
        </g>
      </g>
      <defs>
        <clipPath id="prefix__clip0_539_250">
          <path fill="#fff" d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CreateSetIcon;