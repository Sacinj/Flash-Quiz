import * as React from "react";

function AddCardIcon(props) {
  return (
    <svg
      width={37}
      height={37}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="prefix__a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={37}
        height={37}
      >
        <path d="M37 0H0v37h37V0z" fill="#fff" />
      </mask>
      <g mask="url(#prefix__a)" fill="#251B37">
        <path d="M26.208 29.63h-18.5V10.793H18.5V7.708H7.708a3.092 3.092 0 00-3.083 3.084v18.5a3.092 3.092 0 003.083 3.083h18.5a3.092 3.092 0 003.084-3.083V18.5h-3.084v11.13zM29.292 3.083h-3.084v4.625h-4.624c.015.016 0 3.084 0 3.084h4.625v4.61c.015.015 3.083 0 3.083 0v-4.61h4.625V7.708h-4.625V3.083z" />
        <path d="M23.125 13.875H10.79v3.083h12.334v-3.083zM10.791 18.5v3.083h12.334V18.5H10.79zM23.125 23.125H10.79v3.083h12.334v-3.083z" />
      </g>
    </svg>
  );
}

export default AddCardIcon;