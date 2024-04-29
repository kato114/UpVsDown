import React from "react";
import useWindowSize from "../hooks/use-window-size";

export const Logo = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex flex-row h-full items-center">
      <div className="flex-row items-center flex font-oswald">
        <img
          alt="avatar"
          src={`
            ${isMobile ? "/images/upvsdown_com.png" : "/images/upvsdown.png"}
          `}
          className={`${!isMobile ? "w-[200px]" : "w-[45px]"}`}
        />
      </div>
    </div>
  );
};
