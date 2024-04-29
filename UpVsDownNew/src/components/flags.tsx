import React from "react";
import { Country } from "@/config/countries";

interface FlagProps {
  country: string;
  className?: string;
}

export const Flag: React.FC<FlagProps> = (props) => {
  return (
    <div className={`Flag-root w-6 h-6 ${props.className}`}>
      {props.country === Country.US && (
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M48 6.6C43.3 3.7 37.9 2 32 2v4.6h16" fill="#ed4c5c"></path>
            <path
              d="M32 11.2h21.6C51.9 9.5 50 7.9 48 6.6H32v4.6z"
              fill="#ffffff"
            ></path>
            <path
              d="M32 15.8h25.3c-1.1-1.7-2.3-3.2-3.6-4.6H32v4.6z"
              fill="#ed4c5c"
            ></path>
            <path
              d="M32 20.4h27.7c-.7-1.6-1.5-3.2-2.4-4.6H32v4.6"
              fill="#ffffff"
            ></path>
            <path
              d="M32 25h29.2c-.4-1.6-.9-3.1-1.5-4.6H32V25z"
              fill="#ed4c5c"
            ></path>
            <path
              d="M32 29.7h29.9c-.1-1.6-.4-3.1-.7-4.6H32v4.6"
              fill="#ffffff"
            ></path>
            <path
              d="M61.9 29.7H32V32H2c0 .8 0 1.5.1 2.3h59.8c.1-.8.1-1.5.1-2.3c0-.8 0-1.6-.1-2.3"
              fill="#ed4c5c"
            ></path>
            <path
              d="M2.8 38.9h58.4c.4-1.5.6-3 .7-4.6H2.1c.1 1.5.3 3.1.7 4.6"
              fill="#ffffff"
            ></path>
            <path
              d="M4.3 43.5h55.4c.6-1.5 1.1-3 1.5-4.6H2.8c.4 1.6.9 3.1 1.5 4.6"
              fill="#ed4c5c"
            ></path>
            <path
              d="M6.7 48.1h50.6c.9-1.5 1.7-3 2.4-4.6H4.3c.7 1.6 1.5 3.1 2.4 4.6"
              fill="#ffffff"
            ></path>
            <path
              d="M10.3 52.7h43.4c1.3-1.4 2.6-3 3.6-4.6H6.7c1 1.7 2.3 3.2 3.6 4.6"
              fill="#ed4c5c"
            ></path>
            <path
              d="M15.9 57.3h32.2c2.1-1.3 3.9-2.9 5.6-4.6H10.3c1.7 1.8 3.6 3.3 5.6 4.6"
              fill="#ffffff"
            ></path>
            <path
              d="M32 62c5.9 0 11.4-1.7 16.1-4.7H15.9c4.7 3 10.2 4.7 16.1 4.7"
              fill="#ed4c5c"
            ></path>
            <path
              d="M16 6.6c-2.1 1.3-4 2.9-5.7 4.6c-1.4 1.4-2.6 3-3.6 4.6c-.9 1.5-1.8 3-2.4 4.6c-.6 1.5-1.1 3-1.5 4.6c-.4 1.5-.6 3-.7 4.6c-.1.8-.1 1.6-.1 2.4h30V2c-5.9 0-11.3 1.7-16 4.6"
              fill="#428bc1"
            ></path>
            <g fill="#ffffff">
              <path d="M25 3l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M29 9l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M21 9l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M25 15l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M17 15l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M9 15l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M29 21l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M21 21l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M13 21l.5 1.5H15l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M25 27l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M17 27l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M9 27l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5z"></path>
              <path d="M11.8 13l1.2-.9l1.2.9l-.5-1.5l1.2-1h-1.5L13 9l-.5 1.5h-1.4l1.2.9l-.5 1.6"></path>
              <path d="M3.8 25l1.2-.9l1.2.9l-.5-1.5l1.2-1H5.5L5 21l-.5 1.5h-1c0 .1-.1.2-.1.3l.8.6l-.4 1.6"></path>
            </g>
          </g>
        </svg>
      )}
      {props.country === Country.UK && (
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g fill="#2a5f9e">
              <path d="M22 60.3V46.5l-10.3 7.6c2.9 2.7 6.4 4.8 10.3 6.2"></path>
              <path d="M42 60.3c3.9-1.4 7.4-3.5 10.3-6.2L42 46.4v13.9"> </path>
              <path d="M3.7 42c.3 1 .7 1.9 1.2 2.9L8.8 42H3.7"> </path>
              <path d="M55.2 42l3.9 2.9c.4-.9.8-1.9 1.2-2.9h-5.1"> </path>
            </g>
            <g fill="#ffffff">
              <path d="M23.5 38H2.6c.3 1.4.7 2.7 1.1 4h5.1l-3.9 2.9c.8 1.7 1.7 3.2 2.8 4.7L18 42h4v2l-11.7 8.6l1.4 1.4L22 46.5v13.8c1.3.5 2.6.8 4 1.1V38h-2.5"></path>
              <path d="M61.4 38H38v23.4c1.4-.3 2.7-.7 4-1.1V46.5L52.3 54c1.4-1.3 2.6-2.7 3.8-4.2L45.4 42h6.8l6.1 4.5c.3-.5.6-1.1.8-1.6L55.2 42h5.1c.4-1.3.8-2.6 1.1-4"></path>
            </g>
            <g fill="#ed4c5c">
              <path d="M7.7 49.6c.8 1.1 1.6 2.1 2.5 3.1L22 44.1v-2h-4L7.7 49.6"></path>
              <path d="M45.5 42l10.7 7.8c.4-.5.7-1 1.1-1.5c.1-.1.1-.2.2-.2c.3-.5.7-1.1 1-1.6L52.2 42h-6.7"></path>
            </g>
            <g fill="#2a5f9e">
              <path d="M42 3.7v13.8l10.3-7.6C49.4 7.2 45.9 5.1 42 3.7"></path>
              <path d="M22 3.7c-3.9 1.4-7.4 3.5-10.3 6.2L22 17.6V3.7"> </path>
              <path d="M60.3 22c-.3-1-.7-1.9-1.2-2.9L55.2 22h5.1"> </path>
              <path d="M8.8 22l-3.9-2.9c-.4 1-.8 1.9-1.2 2.9h5.1"> </path>
            </g>
            <g fill="#ffffff">
              <path d="M40.5 26h20.8c-.3-1.4-.7-2.7-1.1-4h-5.1l3.9-2.9c-.8-1.7-1.7-3.2-2.8-4.7L46 22h-4v-2l11.7-8.6l-1.4-1.4L42 17.5V3.7c-1.3-.5-2.6-.8-4-1.1V26h2.5"></path>
              <path d="M2.6 26H26V2.6c-1.4.3-2.7.7-4 1.1v13.8L11.7 10c-1.4 1.3-2.6 2.7-3.8 4.2L18.6 22h-6.8l-6.1-4.5c-.3.5-.6 1.1-.8 1.6L8.8 22H3.7c-.4 1.3-.8 2.6-1.1 4"></path>
            </g>
            <g fill="#ed4c5c">
              <path d="M56.3 14.4c-.8-1.1-1.6-2.1-2.5-3.1L42 19.9v2h4l10.3-7.5"></path>
              <path d="M18.5 22L7.9 14.2c-.4.5-.7 1-1.1 1.5c-.1.1-.1.2-.2.2c-.3.5-.7 1.1-1 1.6l6.1 4.5h6.8"></path>
              <path d="M61.4 26H38V2.6c-1.9-.4-3.9-.6-6-.6s-4.1.2-6 .6V26H2.6c-.4 1.9-.6 3.9-.6 6s.2 4.1.6 6H26v23.4c1.9.4 3.9.6 6 .6s4.1-.2 6-.6V38h23.4c.4-1.9.6-3.9.6-6s-.2-4.1-.6-6"></path>
            </g>
          </g>
        </svg>
      )}
      {props.country === Country.CA && (
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M48 6.6C43.4 3.7 37.9 2 32 2S20.6 3.7 16 6.6v50.7c4.6 2.9 10.1 4.6 16 4.6s11.4-1.7 16-4.6V6.6z"
              fill="#f9f9f9"
            ></path>
            <g fill="#ed4c5c">
              <path d="M48 6.6v50.7c8.4-5.2 14-14.8 14-25.4s-5.6-20-14-25.3"></path>
              <path d="M16 6.6C7.6 11.9 2 21.5 2 32s5.6 20.1 14 25.4V6.6z"></path>
              <path d="M42.9 31.6c-.4-.2-.5-.6-.4-.8l1-3.6l-3.5.7c-.1 0-.5 0-.6-.7l-.3-1.2l-2.4 2.8s-1.6 1.7-1.1-.9l1-5.5l-1.9 1c-.1 0-.5.1-1-.9L32 19l-1.8 3.3c-.5 1-.9.9-1 .9l-1.9-1l1 5.5c.5 2.6-1.1.9-1.1.9l-2.4-2.8l-.3 1.2c-.2.7-.5.7-.6.7l-3.5-.7l1 3.6c0 .3 0 .6-.4.8l-1 .6s4 3.2 5.3 4.3c.3.2.9.8.7 1.5l-.5 1.4l5.5-.8c.3 0 .9 0 .8.9l-.3 5.7h1l-.3-5.7c0-.9.6-.9.8-.9l5.5.8l-.5-1.4c-.2-.7.4-1.3.7-1.5C40 35.2 44 32 44 32l-1.1-.4"></path>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};
