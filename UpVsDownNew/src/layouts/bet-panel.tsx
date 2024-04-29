import React from "react";
import { Avatar, PlayerProps } from "@/components/avatar";
import { Icon, IconType } from "@/components/icons";
import styled, { keyframes } from "styled-components";
import { RoundResultProps } from "@/pages/play";

const appearAvatar = keyframes`
  0% {
    transform: scale(2.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const AppearAvatarDiv = styled.div<{}>`
  animation: ${appearAvatar} 0.5s ease-in-out forwards;
`;

const zoomText = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const ZoomTextDiv = styled.div`
  animation: ${zoomText} 1s ease-in-out infinite;
`;

interface BetPanelProps {
  isUpPool: boolean;
  players: PlayerProps[];
  className?: string;
  bet: (isUpPool: boolean) => void;
  isBettable: boolean;
  isResultReady: boolean;
  roundResult: RoundResultProps;
  isChatView: boolean;
}

export default function BetPanel(props: BetPanelProps) {
  return (
    <div
      className={`${props.className} relative w-1/2 h-full min-w-[190px] p-3 sm:p-5 flex flex-col-reverse gap-5 ${props.isChatView ? "xl:max-w-xs xl:flex-col" : "lg:max-w-xs lg:flex-col"
        }`}
    >
      <div
        className={`w-full h-full rounded-xl flex flex-col py-3 sm:py-5 gap-4
          }`}
      >
        <div
          className={`w-full flex flex-col items-center justify-start gap-2`}
        >
          <span
            className={`${props.isUpPool ? "text-white" : "text-white"
              } w-full py-4 px-1 text-sm sm:text-md font-nulshock leading-4 sm:leading-5 text-center rounded-xl ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"
              }`}
          >
            {props.isUpPool ? "UP POOL TREASURY" : "DOWN POOL TREASURY"}
          </span>
          <div
            className={`w-full h-[40px] flex items-center justify-between gap-2 ${props.isUpPool ? "flex-row" : "flex-row-reverse"
              }`}
          >
            <div className={`hidden sm:flex flex-row h-full w-full items-center justify-center gap-1 rounded-xl ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"} p-1`}>
              <Icon
                type={IconType.ETH_COIN}
                className={`fill-[#fff] w-4 h-4 ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"} rounded-full sm:w-5 sm:h-5`}
              />
              <span className={`font-nulshock font-bold text-md sm:text-xl leading-6 ${props.isUpPool ? "text-white" : "text-white"}`}>
                {props.players
                  .reduce((sum, player) => sum + player.bettedBalance, 0)
                  .toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
              </span>
            </div>
            <div className={`flex h-full w-full justify-center items-center text-sm sm:text-md ${props.isUpPool ? "text-white" : "text-white"} rounded-xl ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"} p-1 font-nulshock`}>
              PLAYERS
            </div>
            <div className={`flex h-full w-full flex-col justify-center items-center gap-1 rounded-xl ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"} p-2 font-nulshock`}>
              <span
                className={`font-nulshock text-md sm:text-xl leading-6 ${props.isUpPool ? "text-white" : "text-white"
                  }`}
              >
                {props.players.length}
              </span>
            </div>
          </div>

          <div className={`flex sm:hidden flex-row h-full w-full items-center justify-center gap-1 rounded-xl ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"} p-1`}>
            <Icon
              type={IconType.ETH_COIN}
              className={`fill-[#fff] w-4 h-4 ${props.isUpPool ? "bg-[#6ca707]" : "bg-[#ff1616]"} rounded-full sm:w-5 sm:h-5`}
            />
            <span className={`font-nulshock font-bold text-md sm:text-xl leading-6 ${props.isUpPool ? "text-white" : "text-white"}`}>
              {props.players
                .reduce((sum, player) => sum + player.bettedBalance, 0)
                .toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
            </span>
          </div>

        </div>
        <div
          className={`relative w-full h-full min-h-[160px] p-2 flex flex-row items-start overflow-hidden ${props.isUpPool
            ? "justify-end rounded-bl-none"
            : "justify-start rounded-br-none"
            } rounded-xl border-4 ${props.isUpPool ? "border-[#6ca707]" : "border-[#ff1616]"}`}
        >
          <div
            className={`flex ${props.isUpPool ? "flex-row-reverse" : "flex-row"
              } gap-2 flex-wrap`}
          >
            {props.players?.length > 0 &&
              props.players.map((item, index) => (
                <AppearAvatarDiv key={index}>
                  <Avatar
                    avatar={item.avatar}
                    country={item.country}
                    bettedBalance={item.bettedBalance}
                    isUpPool={item.isUpPool}
                  />
                </AppearAvatarDiv>
              ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          props.bet(props.isUpPool);
        }}
        disabled={!props.isBettable}
        className={`Button-root w-full h-[80px] rounded-xl border-2 border-solid flex flex-row items-center justify-center transition-all ease-in-out duration-300 left-right ${!props.isBettable ? "filter grayscale-[80%]" : "filter grayscale-0"
          } ${props.isUpPool
            ? "border-[#6ca707] hover:border-[#9affc6] bg-gradient-to-r from-[#6ca707] to-[#6ca707]"
            : "border-[#ff0e0e] hover:border-[#ffabab] bg-gradient-to-r from-[#ec0000] to-[#6c0002]"
          }`}
      >
        <img src={`${props.isUpPool ? "/images/arrow_up.png" : "/images/arrow_down.png"}`}
          className="opacity-70 w-10" /> :
      </button>
      {props.isResultReady && (
        <div
          className={`absolute top-0 left-0 flex flex-row items-start justify-center w-full h-full backdrop-blur-sm bg-[#00000080]  overflow-hidden ${props.isChatView
            ? "xl:items-center xl:backdrop-blur-0 xl:bg-transparent"
            : "lg:items-center lg:backdrop-blur-0 lg:bg-transparent"
            }`}
        >
          <ZoomTextDiv className="flex flex-col items-center w-full py-5">
            <span
              className={`text-center font-oswald text-4xl sm:text-6xl !leading-tight ${props.isUpPool ? "text-[#6ca707]" : "text-[#ff1616]"
                }`}
            >
              {props.isUpPool
                ? props.roundResult.isUpPoolWin
                  ? props.roundResult.winnerCount
                  : props.roundResult.playerCount -
                  props.roundResult.winnerCount
                : !props.roundResult.isUpPoolWin
                  ? props.roundResult.winnerCount
                  : props.roundResult.playerCount - props.roundResult.winnerCount}
              <br />
              {props.isUpPool
                ? props.roundResult.isUpPoolWin
                  ? "WINNERS"
                  : "LOSERS"
                : !props.roundResult.isUpPoolWin
                  ? "WINNERS"
                  : "LOSERS"}
              <br />
              {(props.isUpPool
                ? props.roundResult.isUpPoolWin
                  ? props.roundResult.winAmount
                  : 0
                : !props.roundResult.isUpPoolWin
                  ? props.roundResult.winAmount
                  : 0
              ).toLocaleString(undefined, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </span>
          </ZoomTextDiv>
        </div>
      )}
    </div>
  );
}
