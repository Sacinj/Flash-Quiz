import * as React from "react";

function EditIcon(props) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_563_744)">
        <mask
          id="prefix__a"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={32}
          height={32}
        >
          <path d="M32 0H0v32h32V0z" fill="#fff" />
        </mask>
        <g mask="url(#prefix__a)">
          <path
            d="M4 23.28v4.053a.66.66 0 00.667.667H8.72a.625.625 0 00.467-.2l14.56-14.547-5-5L4.2 22.8a.655.655 0 00-.2.48zM27.613 9.387c.52-.52.52-1.36 0-1.88l-3.12-3.12c-.52-.52-1.36-.52-1.88 0l-2.44 2.44 5 5 2.44-2.44z"
            fill="#F4E7EA"
          />
        </g>
      </g>
      <defs>
        <clipPath id="prefix__clip0_563_744">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default EditIcon;