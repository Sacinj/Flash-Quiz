import * as React from "react";
import './passwordSet.css';

function PassSetIcon(props) {
  return (
    <svg
      /* width={24}
      height={24} */
    //   fill="none"
        className="icon"
    fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_82_62)">
        <path d="M24 0H0v24h24V0z" fill="#fff" /> //background color
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 8v2H8V8a4 4 0 118 0zm2 0v2a3 3 0 013 3v2.764A2.989 2.989 0 0019 15v-2a1 1 0 00-1-1H6a1 1 0 00-1 1v5a1 1 0 001 1h9c0 .768.289 1.47.764 2H6a3 3 0 01-3-3v-5a3 3 0 013-3V8a6 6 0 1112 0zm-9 7a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0zm-5 1a1 1 0 100-2 1 1 0 000 2zm7.42 4.604c.158-.065.298-.157.434-.26l-.01.016.546.212c.125.048.266 0 .33-.12l.456-.79a.275.275 0 00-.065-.347l-.46-.368-.012.016.01-.065c.008-.065.017-.13.017-.195s-.009-.13-.018-.195l-.009-.065.011.016.46-.368a.274.274 0 00.066-.347l-.455-.79a.27.27 0 00-.33-.12l-.548.211.01.017a2.434 2.434 0 00-.432-.25l-.093-.585a.264.264 0 00-.265-.227h-.91a.264.264 0 00-.265.227l-.092.585a1.96 1.96 0 00-.434.26l.011-.016-.552-.211a.264.264 0 00-.33.12l-.456.79a.274.274 0 00.065.347l.46.368.011-.016-.007.055c-.01.064-.02.132-.02.2 0 .064.01.13.019.194l.001.013.007.052-.01-.016-.46.368a.274.274 0 00-.066.347l.455.79a.27.27 0 00.33.12l.548-.211-.006-.022c.136.103.277.195.434.26l.092.58c.016.135.13.233.265.233h.91c.136 0 .25-.098.265-.228l.093-.585zm-1.895-1.896c0-.595.487-1.083 1.083-1.083s1.083.488 1.083 1.083c0 .596-.487 1.084-1.083 1.084a1.087 1.087 0 01-1.083-1.084z"
          fill="#A85062"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_82_62">
          {/* <path fill="#fff" d="M0 0h24v24H0z" /> */} // icon color
          <path fill="#A85062" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PassSetIcon;