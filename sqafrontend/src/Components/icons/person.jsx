import * as React from "react";

function PersonIcon(props) {
  return (
    <svg
      width={41}
      height={38}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.692 19c5.497 0 9.95-4.13 9.95-9.23 0-5.1-4.453-9.232-9.95-9.232-5.496 0-9.948 4.131-9.948 9.231S15.196 19 20.692 19zm0 4.615c-6.64 0-19.897 3.093-19.897 9.231v4.616H40.59v-4.616c0-6.138-13.257-9.23-19.898-9.23z"
        fill="#261F2E"
      />
    </svg>
  );
}

export default PersonIcon;