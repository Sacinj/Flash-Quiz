import * as React from "react";

function DeleteIcon(props) {
  return (
    <svg
      width={25}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.583 10.917v7.291m-4.167-7.291v7.291M4.166 6.75h16.667m-2.083 0v12.292c0 1.166 0 1.75-.227 2.195-.2.393-.519.711-.91.91-.447.228-1.03.228-2.196.228H9.583c-1.166 0-1.75 0-2.196-.227-.392-.2-.71-.518-.91-.91-.227-.446-.227-1.03-.227-2.196V6.75h12.5zm-2.084 0H8.333c0-.97 0-1.456.159-1.839.211-.51.616-.916 1.127-1.127.383-.159.868-.159 1.84-.159h2.082c.971 0 1.457 0 1.84.159.51.211.915.617 1.127 1.127.158.383.159.868.159 1.839z"
        stroke="#F4E7EA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DeleteIcon;