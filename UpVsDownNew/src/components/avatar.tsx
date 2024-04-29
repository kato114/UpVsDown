import React from "react";
import { Flag } from "@/components/flags";
import { Icon, IconType } from "@/components/icons";
import { Config } from "@/config";

export interface PlayerProps {
  address?: string;
  avatar: string;
  country: string;
  bettedBalance: number;
  isUpPool: boolean;
  className?: string;
}

export const Avatar: React.FC<PlayerProps> = (props) => {
  return (
    <div
      className={`relative w-16 h-20 flex flex-col items-center ${props.className}`}
    >
      <div
        className={`relative w-10 h-10 rounded-full border-2 border-solid ${
          props.isUpPool ? "border-[#6ca707]" : "border-[#ff1616]"
        }`}
      >
        <img
          alt=""
          src={
            props.avatar
              ? `${Config.serverUrl.avatars}${props.avatar}`
              : "/images/avatar-default.png"
          }
          className="rounded-full w-9 h-9"
        />
        <Flag
          country={props.country}
          className="absolute top-[-2px] right-[-9px] w-[18px] h-[18px]"
        />
      </div>
      <div className="flex flex-row items-center gap-1">
        <Icon
          type={IconType.ETH_COIN}
          className={`fill-[#111016] !w-4 !h-4 rounded-full ${
            props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"
          }`}
        />
        <span
          className={`font-oswald text-lg ${
            props.isUpPool ? "text-[#6ca707]" : "text-[#ff1616]"
          }`}
        >
          {props.bettedBalance.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </span>
      </div>
    </div>
  );
};
