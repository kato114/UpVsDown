import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Config } from "@/config";
import { ChartJs2Graph, Position } from "@/components/chart-js-2-graph";
import { Icon, IconType } from "@/components/icons";
import styled, { keyframes } from "styled-components";
import { RecentProps } from "@/pages/play";
import { getDashboardData } from "@/components/api";
import { toast } from "react-toastify";


const historyAnim = keyframes`
  0%{
    width: 0px;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 60px;
  }
`;

const HistoryAnimButton = styled.button`
  animation: ${historyAnim} 0.5s ease-in-out forwards;
`;

const historyDetailAnim = keyframes`
  0%{
    height: 0px;
  }
  100% {
    height: 128px
  }
`;

const HistoryDetailAnimDiv = styled.div`
  animation: ${historyDetailAnim} 0.5s ease-in-out forwards;
`;

const notificationAnim = keyframes`
  0%, 10%, 20% {
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.3);
  }
  5%, 15% {
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.5);
  }
  25% {
    color: #f4d56f;
    transform: translate(0, 0) scale(1);
    top: 10px;
    left: 20px;
  }
  100% {
    color: #f4d56f;
    top: 10px;
    left: 20px;
    transform: translate(0, 0) scale(1);
  }
`;

const NotificationAnimDiv = styled.div`
  animation: ${notificationAnim} 8s ease-in-out forwards;
`;

const alignAnim = keyframes`
  0%, 20% {
    left: 50%;
    transform: translateX(-50%);
  }
  25%, 100% {
    left: 0;
    transform: translateX(0);
  }
`;

const AlignAnimDiv = styled.div`
  animation: ${alignAnim} 8s ease-in-out forwards;
`;

interface GraphPanelProps {
  btcPrices: number[];
  jackpot: number;
  histories: RecentProps[];
}

const graphHorizontalWidth = 60;
const typicalPriceCount = 5;
const graphVerticalRatio = Config.graphVerticalRatio;

const basicPriceCount = Config.roundTime.basic / Config.interval.priceUpdate;
const preparePriceCount =
  Config.roundTime.prepare / Config.interval.priceUpdate;
const playPriceCount = Config.roundTime.play / Config.interval.priceUpdate;
const refreshPriceCount =
  Config.roundTime.refresh / Config.interval.priceUpdate;
const maxPriceCount =
  basicPriceCount + preparePriceCount + playPriceCount + refreshPriceCount;

export default function GraphPanel(props: GraphPanelProps) {
  const [typicalPrices, setTypicalPrices] = useState<number[]>([]);
  const [liveBtcPrice, setLiveBtcPrice] = useState<number>(0);
  const [startBtcPrice, setStartBtcPrice] = useState<number>(0);
  const [dotPositions, setDotPositions] = useState<Position[]>([]);

  const [extraBtcPrices, setExtraBtcPrices] = useState<number[]>([]);
  const [extraDotPositions, setExtraDotPositions] = useState<Position[]>([]);

  const [lastPricePosition, setLastPricePosition] = useState<number>(
    graphVerticalRatio / 2
  );
  const [startPlayVerticalPosition, setStartPlayVerticalPosition] =
    useState<number>(graphVerticalRatio / 2);
  const [startPlayHorizontalPosition, setStartPlayHorzontalPosition] =
    useState<number>(0);
  const [playingDepth, setPlayingDepth] = useState(0);

  const [isAlertStart, setIsAlertStart] = useState(false);
  const [alertText, setAlertText] = useState([
    "NO MORE TRADES!",
    "WAIT FOR NEXT ROUND",
  ]);

  const [winRatio, setWinRatio] = useState(0);
  const [livePlayers, setLivePlayers] = useState(0);
  const [winsPaid, setWinsPaid] = useState(0);
  const [allTimeWinsPaid, setAllTimeWinsPaid] = useState(0);
  const [lastMaxPrice, setLastMaxPrice] = useState(0);
  const [lastMinPrice, setLastMinPrice] = useState(0);

  useEffect(() => {
    if (isAlertStart)
      getDashboardInfo();
  }, [isAlertStart])

  const getDashboardInfo = async() => {
    const response = await getDashboardData();
    console.log(response);
    if (response?.status == 200) {
      if ((response as any)?.data.data.trades === 0)
        setWinRatio(0);
      else
        setWinRatio(Number((((response as any)?.data.data.wins)/((response as any)?.data.data.trades)*100).toFixed(2)));
      setLivePlayers((response as any)?.data.data.player);
      setWinsPaid((response as any)?.data.data.paid);
      setAllTimeWinsPaid((response as any)?.data.data.total);
    } else {
      toast.error(response?.data?.msg);
    }
  }

  useEffect(() => {
    if (props.btcPrices.length > 0) {
      let priceCount = props.btcPrices.length;
      let newMaxPrice = Math.max(...props.btcPrices);
      let newMinPrice = Math.min(...props.btcPrices);
      if (
        priceCount > basicPriceCount + preparePriceCount &&
        priceCount < basicPriceCount + preparePriceCount + playPriceCount &&
        lastMaxPrice != 0 &&
        lastMinPrice != 0
      ) {
        newMaxPrice = lastMaxPrice;
        newMinPrice = lastMinPrice;
      }
      setLastMaxPrice(newMaxPrice);
      setLastMinPrice(newMinPrice);
      const standardPrice = (newMaxPrice + newMinPrice) / 2;
      const priceOffset =
        (newMaxPrice - newMinPrice) /
        ((graphVerticalRatio * (typicalPriceCount - 1)) /
          (typicalPriceCount + 1));
      //   console.log(
      //     "GraphPanel useEffect log - 1 : ",
      //     maxPrice,
      //     minPrice,
      //     standardPrice
      //   );
      resetLastPricePosition(
        standardPrice,
        props.btcPrices[props.btcPrices.length - 1],
        priceOffset
      );
      resetTypicalPrices(newMaxPrice, newMinPrice);
      resetDotPositions(props.btcPrices, standardPrice, priceOffset);
      checkWhilePlaying(props.btcPrices);

      resetAlert(props.btcPrices.length);
    }
  }, [props]);

  const resetAlert = (priceCount: number) => {
    if (
      priceCount > basicPriceCount &&
      priceCount < basicPriceCount + preparePriceCount
    ) {
      setAlertText(["UP OR DOWN?", "PLACE YOUR TRADE!"]);
      setIsAlertStart(true);
      return;
    }

    if (
      priceCount > basicPriceCount + preparePriceCount &&
      priceCount < basicPriceCount + preparePriceCount + playPriceCount
    ) {
      setAlertText(["NO MORE TRADES!", "WAIT FOR NEXT ROUND"]);
      setIsAlertStart(true);
      return;
    }
    if (
      priceCount > basicPriceCount + preparePriceCount + playPriceCount &&
      priceCount < maxPriceCount
    ) {
      setAlertText(["DISTRIBUTING PAYOUTS", ""]);
      setIsAlertStart(true);
      return;
    }
    setIsAlertStart(false);
  };

  const checkWhilePlaying = (btcPrices: number[]) => {
    if (
      btcPrices.length <= basicPriceCount + preparePriceCount ||
      btcPrices.length >
      maxPriceCount - Math.floor(1000 / Config.interval.priceUpdate)
    ) {
      setPlayingDepth(0);
    } else {
      let newDepth = btcPrices.length - (basicPriceCount + preparePriceCount);
      if (
        newDepth > Math.floor(Config.zoomTime / Config.interval.priceUpdate)
      ) {
        newDepth =
          maxPriceCount -
          Math.floor(1000 / Config.interval.priceUpdate) -
          btcPrices.length;
      }

      if (
        newDepth > Math.floor(Config.zoomTime / Config.interval.priceUpdate)
      ) {
        newDepth = Math.floor(Config.zoomTime / Config.interval.priceUpdate);
      }
      // console.log("checkWhilePlaying log - 1 : ", newDepth);
      setPlayingDepth(newDepth);
    }
  };

  const resetLastPricePosition = (
    standardPrice: number,
    lastPrice: number,
    priceOffset: number
  ) => {
    setLastPricePosition(
      graphVerticalRatio / 2 - (lastPrice - standardPrice) / priceOffset
    );
    setLiveBtcPrice(lastPrice);
  };

  const resetTypicalPrices = (maxPrice: number, minPrice: number) => {
    let newTypicalPrices = [];
    newTypicalPrices.push(minPrice);
    const offset = (maxPrice - minPrice) / (typicalPriceCount - 1);
    for (let i = 1; i < typicalPriceCount; i++) {
      newTypicalPrices.push(minPrice + offset * i);
    }
    setTypicalPrices(newTypicalPrices);
  };

  const resetDotPositions = (
    btcPrices: number[],
    standardPrice: number,
    priceOffset: number
  ) => {
    const priceCount = btcPrices.length;
    const newDotPositions: Position[] = [];
    newDotPositions.push({
      x: -priceCount + 1,
      y: graphVerticalRatio / 2 + (btcPrices[0] - standardPrice) / priceOffset,
    });
    if (priceCount > 1) {
      for (let i = 1; i < priceCount; i++) {
        newDotPositions.push({
          x: -priceCount + i + 1,
          y:
            graphVerticalRatio / 2 +
            (btcPrices[i] - standardPrice) / priceOffset,
        });
        if (i === basicPriceCount + preparePriceCount) {
          setStartPlayVerticalPosition(
            graphVerticalRatio / 2 -
            (btcPrices[i] - standardPrice) / priceOffset
          );
          setStartBtcPrice(btcPrices[basicPriceCount + preparePriceCount]);
        }
      }
    }
    // console.log("resetDotPositions log - 1 : ", standardPrice, priceOffset);
    setDotPositions([...newDotPositions]);

    //-----*-----*-----*-----*-----*-----*-----*-----*-----*-----//

    let newExtraBtcPrices = extraBtcPrices;
    if (btcPrices.length == (basicPriceCount + playPriceCount)) {
      newExtraBtcPrices = newExtraBtcPrices.splice(-basicPriceCount);
    }
    newExtraBtcPrices.push(btcPrices[btcPrices.length - 1]);
    setExtraBtcPrices([...newExtraBtcPrices]);

    const extraBtcPriceCount = newExtraBtcPrices.length;
    const newExtraDotPositions: Position[] = [];
    newExtraDotPositions.push({
      x: -extraBtcPriceCount + 1,
      y:
        graphVerticalRatio / 2 +
        (newExtraBtcPrices[0] - standardPrice) / priceOffset,
    });

    if (extraBtcPriceCount > 1) {
      for (let i = 1; i < extraBtcPriceCount; i++) {
        newExtraDotPositions.push({
          x: -extraBtcPriceCount + i + 1,
          y:
            graphVerticalRatio / 2 +
            (newExtraBtcPrices[i] - standardPrice) / priceOffset,
        });
      }
    }
    setExtraDotPositions([...newExtraDotPositions]);

    //-----*-----*-----*-----*-----*-----*-----*-----*-----*-----//

    const displayPriceCount = playingDepth
      ? basicPriceCount /
      ((Config.graphHorizontalZoomRatio * playingDepth) /
        Math.floor(Config.zoomTime / Config.interval.priceUpdate))
      : basicPriceCount;
    const horizontalOffset = graphHorizontalWidth / displayPriceCount;
    const newStartPlayHorzontalPosition =
      (displayPriceCount +
        basicPriceCount +
        preparePriceCount -
        btcPrices.length +
        1) *
      horizontalOffset;
    setStartPlayHorzontalPosition(newStartPlayHorzontalPosition);
  };

  return (
    <div className="relative w-full h-full rounded-2xl border-2 border-solid border-[#FEB600] flex flex-row items-center overflow-hidden">
      <div className="absolute flex flex-col w-full h-full">
        <div
          className="w-full bg-gradient-to-b from-[#282e0b] to-[#4b5d06] transition-all ease-in-out duration-100"
          style={{
            height: `${((playingDepth ? startPlayVerticalPosition : lastPricePosition) *
              100) /
              graphVerticalRatio
              }%`,
          }}
        />
        <div
          className="w-full bg-gradient-to-b from-[#dc0000] to-[#470004] border-t border-solid border-[#babef4] transition-all ease-in-out duration-100"
          style={{
            height: `${((graphVerticalRatio -
              (playingDepth
                ? startPlayVerticalPosition
                : lastPricePosition)) *
              100) /
              graphVerticalRatio
              }%`,
          }}
        />
      </div>
      <div className="absolute flex flex-col-reverse justify-between w-full h-4/6">
        {typicalPrices.length > 0 &&
          typicalPrices.map((item, index) => (
            <div
              key={index}
              className="h-[1px] flex flex-row items-center w-full gap-2 px-2"
            >
              <div className="w-full h-[1px] bg-[#e6c49e77]" />
              <span className="text-sm text-[#626264] font-open-sans font-normal">
                {(item / Config.btcPriceDecimal).toFixed(2)}
              </span>
            </div>
          ))}
      </div>
      <div
        className={`absolute h-full top-0 left-0 ${dotPositions.length > basicPriceCount + refreshPriceCount
          ? "opacity-100"
          : "opacity-0"
          }`}
        style={{
          width: `${graphHorizontalWidth}%`,
        }}
      >
        <ChartJs2Graph
          dotPositions={dotPositions}
          playingDepth={playingDepth}
          color="#FEB600"
        />
      </div>
      <div
        className={`absolute h-full top-0 left-0 ${dotPositions.length > basicPriceCount + refreshPriceCount
          ? "opacity-0"
          : "opacity-100"
          }`}
        style={{
          width: `${graphHorizontalWidth}%`,
        }}
      >
        <ChartJs2Graph
          dotPositions={extraDotPositions}
          playingDepth={playingDepth}
          color="#FEB600"
        />
      </div>
      <div
        className="absolute w-3 h-3 translate-x-[-6px] translate-y-[-6px] rounded-full bg-[#FEB600] transition-all ease-in-out duration-100"
        style={{
          left: `${graphHorizontalWidth}%`,
          top: `${(lastPricePosition * 100) / graphVerticalRatio}%`,
        }}
      />
      <div
        className={`absolute h-full flex flex-col justify-between gap-2 py-3 transition-all ease-linear ${dotPositions.length >
          maxPriceCount - Math.floor(3000 / Config.interval.priceUpdate) ||
          dotPositions.length <
          basicPriceCount + Math.floor(1000 / Config.interval.priceUpdate)
          ? "opacity-0"
          : "opacity-100"
          }`}
        style={{
          left: `${startPlayHorizontalPosition}%`,
          width: `${playingDepth
            ? (graphHorizontalWidth * playPriceCount) / basicPriceCount +
            ((graphHorizontalWidth * playPriceCount) / basicPriceCount) *
            (playingDepth /
              Math.floor(Config.zoomTime / Config.interval.priceUpdate))
            : (graphHorizontalWidth * playPriceCount) / basicPriceCount
            }%`,
          transitionDuration: `${Config.interval.priceUpdate}ms`,
        }}
      >
        <div className="flex flex-row items-center justify-between w-full h-5">
          <Icon
            type={IconType.FLAG_START}
            className="w-5 h-5 fill-[#FEB600] translate-x-[-8px]"
          />
          <Icon
            type={IconType.FLAG_END}
            className="w-5 h-5 fill-[#FEB600]  translate-x-[14px]"
          />
        </div>
        <div className="w-full h-full border-x border-dashed border-[#FEB600]" />
      </div>
      <div
        className="absolute w-full h-[3px] bg-[#FEB600] flex flex-row items-center justify-end px-1 sm:px-2 transition-all ease-in-out duration-100"
        style={{
          top: `calc(${(lastPricePosition * 100) / graphVerticalRatio}% - 1px)`,
        }}
      >
        <div className="relative py-1 px-2 rounded-lg border border-solid border-[#FEB600] bg-[#111016] flex flex-col items-center">
          <span className="absolute -top-3 sm:-top-5 bg-[#FEB600] rounded-md sm:rounded-lg px-2 text-xs sm:text-md font-nulshock text-[#111016] whitespace-nowrap">
            Live Bitcoin
          </span>
          <span
            className={`${!playingDepth ||
              dotPositions.length >= maxPriceCount - refreshPriceCount
              ? "text-[#FEB600]"
              : lastPricePosition > startPlayVerticalPosition
                ? "text-[#ff1616]"
                : "text-[#2dffb5]"
              } font-open-sans font-bold text-sm sm:text-xl`}
          >
            {parseFloat(
              (liveBtcPrice / Config.btcPriceDecimal).toString()
            ).toLocaleString(undefined, {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })}
          </span>
        </div>
      </div>
      {playingDepth && (
        <div
          className="absolute w-full h-[1px] flex flex-row items-center justify-start px-1 sm:px-2 transition-all ease-in-out duration-500"
          style={{
            top: `${(startPlayVerticalPosition * 100) / graphVerticalRatio}%`,
          }}
        >
          <div className="relative py-1 px-2 rounded-lg border border-solid border-[#FEB600] bg-[#111016] flex flex-col items-center">
            <span className="absolute -top-3 sm:-top-5 bg-[#FEB600] rounded-md sm:rounded-lg px-2 text-xs sm:text-base font-open-sans font-bold text-[#111016] whitespace-nowrap">
              Start Rate
            </span>
            <span className="text-[#FEB600] font-open-sans font-bold text-sm sm:text-xl">
              {parseFloat(
                (startBtcPrice / Config.btcPriceDecimal).toString()
              ).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}
            </span>
          </div>
        </div>
      )}
      {isAlertStart && (
        <div className="absolute w-full h-full">
          <NotificationAnimDiv className="absolute h-12 sm:h-[88px] text-[#ffffff] font-oswald text-xl sm:text-4xl leading-tight text-center whitespace-nowrap flex flex-col">
            <AlignAnimDiv className="absolute">{alertText[0]}</AlignAnimDiv>
            <AlignAnimDiv className="absolute bottom-0">
              {alertText[1]}
            </AlignAnimDiv>
          </NotificationAnimDiv>
        </div>
      )}
      <div className="absolute bottom-0 flex flex-row items-end gap-8 px-3 py-3">
        <Link href="/weekly_jackpot" className="min-w-[100px] bg-[#FEB600] flex flex-col items-center rounded-lg overflow-hidden">
          <span className="w-full px-4 py-2 bg-black text-[#FEB600] text-center font-nulshock text-md">
            JACKPOT
          </span>
          <span className="px-3 py-1 text-md text-center font-nulshock">
            {props.jackpot.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            })}
          </span>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex items-end">
            <span className="text-xs 2xl:text-[1em] font-semibold text-[#cec5b7] align-bottom uppercase mr-6">
              24h win<br/> ratio:
            </span>
            <span className="flex items-center text-xs 2xl:text-[1.1em] font-semibold text-[#FEB600] mt-[-0.02em] mr-[0.45em] ml-[0.2em]">
              <span style={{
                transition: "all 0.8s ease-out 0s"
              }}>{winRatio}</span>
              %
            </span>
            <span className="hidden sm:block text-xs 2xl:text-[1em] border-l-[0.1em] border-[#cec5b7] pl-[0.45em] font-semibold text-[#cec5b7] align-bottom uppercase mr-6">
              24h live<br/> players:
            </span>
            <span className="hidden sm:flex items-center text-xs 2xl:text-[1.1em] font-semibold text-[#FEB600] mt-[-0.02em] mr-[0.45em] ml-[0.2em]">{livePlayers}</span>
            <span className="hidden sm:block text-xs 2xl:text-[1em] border-l-[0.1em] border-[#cec5b7] pl-[0.45em] font-semibold text-[#cec5b7] align-bottom uppercase mr-6">
              24h wins<br/> paid:
            </span>
            <span className="hidden sm:flex items-center text-xs 2xl:text-[1.1em] font-semibold text-[#FEB600] mt-[-0.02em] mr-[0.45em] ml-[0.2em]">{winsPaid}</span>
            <span className="hidden sm:block text-xs 2xl:text-[1em] border-l-[0.1em] border-[#cec5b7] pl-[0.45em] font-semibold text-[#cec5b7] align-bottom uppercase mr-6">
              all time<br/> wins paid:
            </span>
            <span className="hidden sm:flex items-center text-xs 2xl:text-[1.1em] font-semibold text-[#FEB600] mt-[-0.02em] mr-[0.45em] ml-[0.2em]">{allTimeWinsPaid}</span>
          </div>
          <div className="flex flex-wrap h-[50px] gap-8">
            {props.histories.length > 0 &&
              props.histories.map((item, index) => (
                <div key={index}>
                  <UpVsDownHistory start={item.startPrice} end={item.endPrice} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface UpVsDownHistoryProps {
  start: number;
  end: number;
}

const UpVsDownHistory: React.FC<UpVsDownHistoryProps> = (props) => {
  const { start, end } = props;
  const [isDetailShow, setIsDetailShow] = useState(false);
  return (
    <div className="relative flex flex-col items-center transition-all duration-300 ease-in-out">
      <HistoryAnimButton
        onMouseEnter={() => {
          setIsDetailShow(true);
        }}
        onMouseLeave={() => {
          setIsDetailShow(false);
        }}
        className="border-2 border-solid rounded-lg border-[#f5cd48] bg-[#00000080] px-4 py-2"
      >
        <Icon
          type={IconType.UP}
          className={`${start > end ? "rotate-180 fill-[#ff3333]" : "fill-[#73b302]"
            }`}
        />
      </HistoryAnimButton>
      {isDetailShow && (
        <div className="absolute flex flex-col items-center bottom-14">
          <HistoryDetailAnimDiv className="absolute h-32 w-28 gap-1 bottom-0 border-2 border-solid border-[#3f404f] bg-[#262735] flex flex-col items-center justify-center rounded-xl overflow-hidden">
            <span className="text-xs font-oswald text-[#777a99]">
              START RATE
            </span>
            <span className="text-base text-white font-oswald">
              {(start / Config.btcPriceDecimal).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              })}
            </span>
            <div className="w-full h-[2px] bg-[#3f404f]" />
            <span className="text-xs font-oswald text-[#777a99]">END RATE</span>
            <span
              className={`text-base font-oswald ${start < end ? "text-[#73b302]" : "text-[#ff3333]"
                }`}
            >
              {(end / Config.btcPriceDecimal).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              })}
            </span>
          </HistoryDetailAnimDiv>
          <div className="w-3 h-3 rotate-45 absolute bg-[#262735] -bottom-[6px] border-r-2 border-b-2 border-solid border-[#3f404f]" />
        </div>
      )}
    </div>
  );
};
