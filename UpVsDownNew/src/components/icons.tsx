import React from "react";

export enum IconType {
  MENU = "menu",
  CHAT = "chat",
  CLOSE = "close",
  ETH = "eth",
  ETH_COIN = "eth-coin",
  UP = "up",
  USER = "user",
  FLAG_START = "flag-start",
  FLAG_END = "flag-end",
  WALLET = "wallet",
  REFRESH = "refresh",
  COPY = "copy",
  LOADING = "loading",
  EMOJI = "emoji",
  SEND = "send",
}

interface IconProps {
  type: IconType;
  className?: string;
}

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <div className={`Icon-root w-6 h-6 ${props.className}`}>
      {props.type === IconType.MENU && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.615 472.615">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <rect y="377.561" width="472.615" height="95.035"></rect>
              </g>
            </g>
            <g>
              <g>
                <rect y="188.81" width="472.615" height="95.035"></rect>
              </g>
            </g>
            <g>
              <g>
                <rect y="0.02" width="472.615" height="95.035"></rect>
              </g>
            </g>
          </g>
        </svg>
      )}
      {props.type === IconType.CHAT && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <path d="M165,85H145V35H25V135H95v20H34L5,184V35C5,15,25,15,25,15H145c20,0,20,20,20,20V85Z" />
          <path d="M145,105h20v30h30v20H165v30H145V155H115V135h30V105Z" />
          <path d="M44.95,55V75H126V55H44.95Z" />
          <path d="M44.95,95v20H96V95H44.95Z" />
        </svg>
      )}
      {props.type === IconType.CLOSE && (
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <rect
              transform="rotate(45)"
              ry="0"
              y="-1"
              x="4.3137083"
              height="2"
              width="14"
              id="rect1006"
            ></rect>
            <rect
              transform="rotate(-45)"
              ry="0"
              y="10.313708"
              x="-7"
              height="2"
              width="14"
              id="rect1006-5"
            ></rect>
          </g>
        </svg>
      )}
      {props.type === IconType.ETH && (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 226.777 226.777"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <polygon points="112.553,157 112.553,86.977 44.158,116.937 "></polygon>
              <polygon points="112.553,82.163 112.553,-0.056 46.362,111.156 "></polygon>
              <polygon points="116.962,-0.09 116.962,82.163 184.083,111.566 "></polygon>
              <polygon points="116.962,86.977 116.962,157.002 185.405,116.957 "></polygon>
              <polygon points="112.553,227.406 112.553,171.085 44.618,131.31 "></polygon>
              <polygon points="116.962,227.406 184.897,131.31 116.962,171.085 "></polygon>
            </g>
          </g>
        </svg>
      )}
      {props.type === IconType.ETH_COIN && (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0001 3.5C12.1742 3.5 12.3358 3.59058 12.4266 3.73912L16.6012 10.5646C16.6748 10.6849 16.6942 10.8308 16.6545 10.9661C16.6148 11.1015 16.5197 11.2138 16.3928 11.2754L12.2182 13.2991C12.0804 13.3659 11.9197 13.3659 11.782 13.2991L7.6074 11.2754C7.48045 11.2138 7.38541 11.1015 7.34571 10.9661C7.30602 10.8308 7.32536 10.6849 7.39897 10.5646L11.5735 3.73912C11.6644 3.59058 11.8259 3.5 12.0001 3.5ZM12.0001 4.95828L8.53971 10.616L12.0001 12.2935L15.4605 10.616L12.0001 4.95828Z"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0001 20.0503C11.8321 20.0503 11.6753 19.966 11.5828 19.8257L7.40813 13.5003C7.28391 13.3121 7.30107 13.064 7.45001 12.8946C7.59896 12.7253 7.84283 12.6766 8.04536 12.7758L12.0001 14.7127L15.9547 12.7758C16.1572 12.6766 16.4011 12.7253 16.55 12.8946C16.699 13.064 16.7161 13.3121 16.5919 13.5003L12.4174 19.8257C12.3248 19.9659 12.1681 20.0503 12.0001 20.0503ZM12.0001 18.6426L14.7465 14.4811L12.22 15.7185C12.0812 15.7864 11.9189 15.7864 11.7801 15.7185L9.25356 14.481L12.0001 18.6426Z"
            ></path>
          </g>
        </svg>
      )}
      {props.type === IconType.UP && (
        <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M7.5 3L15 11H0L7.5 3Z"></path>
          </g>
        </svg>
      )}
      {props.type === IconType.USER && (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5ZM7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM7.45609 16.7264C6.40184 17.1946 6 17.7858 6 18.5C6 18.7236 6.03976 18.8502 6.09728 18.942C6.15483 19.0338 6.29214 19.1893 6.66219 19.3567C7.45312 19.7145 9.01609 20 12 20C14.9839 20 16.5469 19.7145 17.3378 19.3567C17.7079 19.1893 17.8452 19.0338 17.9027 18.942C17.9602 18.8502 18 18.7236 18 18.5C18 17.7858 17.5982 17.1946 16.5439 16.7264C15.4614 16.2458 13.8722 16 12 16C10.1278 16 8.53857 16.2458 7.45609 16.7264ZM6.64442 14.8986C8.09544 14.2542 10.0062 14 12 14C13.9938 14 15.9046 14.2542 17.3556 14.8986C18.8348 15.5554 20 16.7142 20 18.5C20 18.9667 19.9148 19.4978 19.5973 20.0043C19.2798 20.5106 18.7921 20.8939 18.1622 21.1789C16.9531 21.7259 15.0161 22 12 22C8.98391 22 7.04688 21.7259 5.83781 21.1789C5.20786 20.8939 4.72017 20.5106 4.40272 20.0043C4.08524 19.4978 4 18.9667 4 18.5C4 16.7142 5.16516 15.5554 6.64442 14.8986Z"
            ></path>
          </g>
        </svg>
      )}
      {props.type === IconType.FLAG_START && (
        <svg viewBox="0 0 13 14" width="20.412" height="19.278">
          <path
            fillRule="evenodd"
            d="M12.958 6.124 11.281.58c-.047-.161-.1-.344-.283-.394-.185-.05-.325.077-.487.225-.375.342-1.437 1.117-3.209.967l-.24-.79L7.06.58C6.992.372 6.933.192 6.607.134A8.291 8.291 0 0 0 5.161 0C3.439 0 2.029.577.859 1.838l-.067-.222a.406.406 0 0 0-.503-.266.394.394 0 0 0-.272.492l3.609 11.875a.404.404 0 0 0 .503.266.395.395 0 0 0 .272-.492L3.057 9.069c.025-.033.046-.056.068-.08.505-.56 2.055-1.504 4.03-1.721.651-.072.997-.023.997-.023s-.788.039-1.456.259l.138.46c.069.227.18.338.428.424.35.123.809.194 1.323.194 1.333 0 3.045-.482 4.25-1.816.168-.184.205-.376.123-.642zm-4.622.59c-1.004 0-1.908.095-2.712.286-.503.12-1.418.595-2.746 1.426L.992 2.228c.44-.055 1.372-1.105 2.524-1.464C4.9.332 6.506.588 6.688.628l1.648 6.086zm-.741 1.29c.204-.036.483-.112.721-.245.149-.082.264-.179.352-.272l.014-.001.188.624a4.463 4.463 0 0 1-1.275-.105zM7.459 1.87c.252.018.864-.068 1.835-.258.566-.188 1.12-.48 1.538-.862l.006-.006.572 1.892c.11.446.499 1.706 1.164 3.78-.658.502-1.165.846-1.522 1.03-.319.164-.867.347-1.645.55L7.459 1.87z"
          ></path>
        </svg>
      )}
      {props.type === IconType.FLAG_END && (
        <svg viewBox="0 0 13 14" width="20.412" height="19.278">
          <path
            fillRule="evenodd"
            d="M12.958 6.124 11.281.58c-.047-.161-.1-.344-.283-.394-.185-.05-.325.077-.487.225-.375.342-1.437 1.117-3.209.967l-.24-.79L7.06.58C6.992.372 6.933.192 6.607.134A8.291 8.291 0 0 0 5.161 0C3.439 0 2.029.577.859 1.838l-.067-.222a.406.406 0 0 0-.503-.266.394.394 0 0 0-.272.492l3.609 11.875a.404.404 0 0 0 .503.266.395.395 0 0 0 .272-.492L3.057 9.069c.025-.033.046-.056.068-.08.505-.56 2.055-1.504 4.03-1.721.651-.072.997-.023.997-.023s-.788.039-1.456.259l.138.46c.069.227.18.338.428.424.35.123.809.194 1.323.194 1.333 0 3.045-.482 4.25-1.816.168-.184.205-.376.123-.642zM4.536.498l.6 1.936.013-.002a8.497 8.497 0 0 0-1.214.246 4.318 4.318 0 0 0-1.015.435l.01-.007-.593-1.872A5.48 5.48 0 0 1 4.536.498zM2.282 6.52l-.706-2.323a6.095 6.095 0 0 1 1.339-1.082l.763 2.378h.001c-.717.352-1.149.738-1.397 1.027zm3.596-1.698.646 2.08a8.335 8.335 0 0 0-2.18.657l-.657-2.07c.267-.13.572-.257.922-.37a7.392 7.392 0 0 1 1.3-.305l-.75-2.384c.969-.12 1.655-.02 1.987.053l.74 2.436c-.383-.11-1.064-.228-2.008-.097zm1.717 3.182c.204-.037.483-.113.721-.246.149-.082.264-.179.352-.272l.014-.001.188.624a4.463 4.463 0 0 1-1.275-.105zM9.73 5.977c-.485.114-.772.127-1 .105L8.048 3.83c.378.027.813.021 1.28-.097.22-.055.419-.117.6-.184l-.591-1.94a4.138 4.138 0 0 0 1.496-.86c.002 0 .004-.003.006-.005l.572 1.892c-.24.251-.63.595-1.514.926l.66 2.143a4.71 4.71 0 0 1-.825.272zm2.752.484a4.85 4.85 0 0 1-1.353 1.047l-.547-1.8c.79-.351 1.226-.758 1.448-1.022l.475 1.57c.041.134.02.158-.023.205z"
          ></path>
        </svg>
      )}
      {props.type === IconType.WALLET && (
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          enableBackground="new 0 0 64 64"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <circle cx="46" cy="38" r="2"></circle>
              <path d="M62,32h-2V16c0-2.211-1.789-4-4-4V8c0-1.343-0.404-2.385-1.205-3.099c-1.186-1.058-2.736-0.91-2.896-0.896 c-0.072,0.007-1.484,0.152-3.789,0.39l-0.641-1.761c-0.756-2.078-3.049-3.147-5.127-2.391L24.131,6.871 C15.535,7.764,7.397,8.616,3.89,9.006C0.951,9.332,0.062,12.908,0,14.97c-0.004,0.134,0.021,0.263,0.065,0.38 C0.031,15.562,0,15.777,0,16v44c0,2.211,1.789,4,4,4h52c2.211,0,4-1.789,4-4V44h2c1.105,0,2-0.895,2-2v-8 C64,32.895,63.105,32,62,32z M55,18c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1H55z M50,19 c0,0.553-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2C49.553,18,50,18.447,50,19z M7,58H5c-0.553,0-1-0.447-1-1s0.447-1,1-1 h2c0.553,0,1,0.447,1,1S7.553,58,7,58z M7,20H5c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S7.553,20,7,20z M13,58h-2 c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S13.553,58,13,58z M13,20h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2 c0.553,0,1,0.447,1,1S13.553,20,13,20z M19,58h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S19.553,58,19,58z M19,20 h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S19.553,20,19,20z M25,58h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2 c0.553,0,1,0.447,1,1S25.553,58,25,58z M25,20h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S25.553,20,25,20z M31,58 h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S31.553,58,31,58z M31,20h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2 c0.553,0,1,0.447,1,1S31.553,20,31,20z M31.35,12H15.885l27.141-9.878c1.039-0.378,2.186,0.157,2.564,1.195L48.75,12h-6.098 C41.826,9.672,39.611,8,37,8S32.174,9.672,31.35,12z M44,19c0,0.553-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2 C43.553,18,44,18.447,44,19z M37,10c1.477,0,2.752,0.81,3.445,2h-6.891C34.248,10.81,35.523,10,37,10z M37,58h-2 c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S37.553,58,37,58z M37,20h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2 c0.553,0,1,0.447,1,1S37.553,20,37,20z M43,58h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S43.553,58,43,58z M49,58 h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S49.553,58,49,58z M55,58h-2c-0.553,0-1-0.447-1-1s0.447-1,1-1h2 c0.553,0,1,0.447,1,1S55.553,58,55,58z M62,41c0,0.553-0.447,1-1,1H43c-0.553,0-1-0.447-1-1v-6c0-0.553,0.447-1,1-1h18 c0.553,0,1,0.447,1,1V41z"></path>
            </g>
          </g>
        </svg>
      )}
      {props.type === IconType.REFRESH && (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 279.881 279.881"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path d="M153.905,130.755c2.562-5.39,5.695-12.222,8.169-18.4c2.241-5.57-0.315-13.201-5.314-16.529 C124.589,74.369,15.465,12.559,3.118,151.467c-0.533,5.983-1.594,6.054-2.187,0.076C-1.157,130.63-2.13,84.415,25.457,59.531 c4.46-4.019,12.319-9.801,17.345-13.086c17.884-11.71,62.767-31.857,127.318,2.594c5.303,2.828,10.476,0.598,11.727-5.276 l4.493-21.142c1.246-5.874,4.775-6.467,7.887-1.327l52.917,87.563c3.106,5.14,0.865,10.334-5.009,11.607l-82.375,17.764 C153.878,139.496,151.327,136.178,153.905,130.755z M236.247,239.357c-17.884,11.694-62.761,31.802-127.318-2.622 c-5.303-2.828-11.047-0.756-12.994,4.928l-5.466,15.958c-1.947,5.684-5.793,5.978-8.588,0.658l-42.256-80.444 c-2.796-5.319-0.402-11.052,5.347-12.804l69.832-21.332c5.744-1.751,9.1,1.517,7.5,7.316c-1.795,6.489-4.117,14.947-6.081,22.175 c-1.572,5.798,1.137,13.353,6.206,16.589c32.553,20.766,142.743,80.319,154.741-56.653c0.522-5.983,1.496-6.032,2.007-0.049 c1.806,21.153,2.197,68.157-25.58,93.198C249.133,230.29,241.279,236.072,236.247,239.357z"></path>
            </g>
          </g>
        </svg>
      )}
      {props.type === IconType.COPY && (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z"
            ></path>
          </g>
        </svg>
      )}
      {props.type === IconType.LOADING && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <rect x="17.5" y="30" width="15" height="40">
            <animate
              attributeName="y"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              values="18;30;30"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.2s"
            ></animate>
            <animate
              attributeName="height"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              values="64;40;40"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.2s"
            ></animate>
          </rect>
          <rect x="42.5" y="30" width="15" height="40">
            <animate
              attributeName="y"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              values="20.999999999999996;30;30"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.1s"
            ></animate>
            <animate
              attributeName="height"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              values="58.00000000000001;40;40"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.1s"
            ></animate>
          </rect>
          <rect x="67.5" y="30" width="15" height="40">
            <animate
              attributeName="y"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              values="20.999999999999996;30;30"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
            ></animate>
            <animate
              attributeName="height"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.5;1"
              values="58.00000000000001;40;40"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
            ></animate>
          </rect>
        </svg>
      )}
      {props.type === IconType.EMOJI && (
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              d="M255,160 L256,160 C256,162.209139 254.209139,164 252,164 C249.790861,164 248,162.209139 248,160 L249,160 C249,161.656854 250.343146,163 252,163 C253.656854,163 255,161.656854 255,160 Z M252,168 C256.970563,168 261,163.970563 261,159 C261,154.029437 256.970563,150 252,150 C247.029437,150 243,154.029437 243,159 C243,163.970563 247.029437,168 252,168 Z M252,167 C256.418278,167 260,163.418278 260,159 C260,154.581722 256.418278,151 252,151 C247.581722,151 244,154.581722 244,159 C244,163.418278 247.581722,167 252,167 Z M249,158 C249.552285,158 250,157.552285 250,157 C250,156.447715 249.552285,156 249,156 C248.447715,156 248,156.447715 248,157 C248,157.552285 248.447715,158 249,158 Z M255,158 C255.552285,158 256,157.552285 256,157 C256,156.447715 255.552285,156 255,156 C254.447715,156 254,156.447715 254,157 C254,157.552285 254.447715,158 255,158 Z"
              transform="translate(-243 -150)"
            ></path>
          </g>
        </svg>
      )}
      {props.type === IconType.SEND && (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              d="M2.345 2.245a1 1 0 0 1 1.102-.14l18 9a1 1 0 0 1 0 1.79l-18 9a1 1 0 0 1-1.396-1.211L4.613 13H10a1 1 0 1 0 0-2H4.613L2.05 3.316a1 1 0 0 1 .294-1.071z"
              clip-rule="evenodd"
            ></path>
          </g>
        </svg>
      )}
    </div>
  );
};
