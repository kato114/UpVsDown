import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import BetPanel from "@/layouts/bet-panel";
import GameStatus from "@/layouts/game-status";
import SelectPricePanel from "@/layouts/select-price-panel";
import { Config } from "@/config";
import { useAccount } from "wagmi";
import Header from "@/layouts/header";
import { balanceRequest } from "@/pages/api";
import { toast } from "react-toastify";
import { PlayerProps } from "@/components/avatar";
import ChatPanel, { ChatDataProps } from "@/layouts/chat-panel";
import axios from "axios";
import GraphPanel from "@/layouts/graph-panel";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdate, setPlayer } from '@/store/globalState';

const betPrices = Config.betPrices;
const basicPriceCount = Config.roundTime.basic / Config.interval.priceUpdate;
const preparePriceCount =
  Config.roundTime.prepare / Config.interval.priceUpdate;
const playPriceCount = Config.roundTime.play / Config.interval.priceUpdate;
const refreshPriceCount =
  Config.roundTime.refresh / Config.interval.priceUpdate;
const maxPriceCount =
  basicPriceCount + preparePriceCount + playPriceCount + refreshPriceCount;

let webSocket: any = null;

export interface RoundResultProps {
  playerCount: number;
  winnerCount: number;
  isUpPoolWin: boolean;
  winAmount: number;
}

export interface RecentProps {
  startPrice: number;
  endPrice: number;
}


export default function Play() {
  
  const { address, isConnected } = useAccount();
  const player = useSelector((state: any) => state.globalState.player);
  const dispatch = useDispatch();
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [btcPrices, setBtcPrices] = useState<number[]>([]);
  const lastReceiveIdRef = useRef();

  const [bettedBalance, setBettedBalance] = useState(betPrices[0]);
  const [players, setPlayers] = useState<PlayerProps[]>([]);

  const [roundResult, setRoundResult] = useState<RoundResultProps>({
    playerCount: 0,
    winnerCount: 0,
    isUpPoolWin: true,
    winAmount: 0,
  });
  const [isResultReady, setIsResultReady] = useState(false);
  const [isChatView, setIsChatView] = useState(false);
  const [chatData, setChatData] = useState<ChatDataProps[]>([]);
  const [newMessage, setNewMessage] = useState<ChatDataProps>({
    avatar: "",
    message: "",
  });

  const [jackpotBalance, setJackpotBalance] = useState(0);
  const [recentHistories, setRecentHistories] = useState<RecentProps[]>([]);

  const audioRef = useRef(null);

  useEffect(() => {
    webSocket = new WebSocket(Config.serverUrl.wss);
    webSocket.onopen = () => {
      console.log("socket log - onopen");
      setIsSocketOpen(true);
    };
    webSocket.onclose = () => {
      setIsSocketOpen(false);
    };
    webSocket.onmessage = (event: any) => {
      if (event.data) {
        const message = JSON.parse(atob(event.data)).message;
        // console.log("socket log - 1 : ", message);
        const socketType = Config.socketType;
        switch (message.type) {
          case socketType.btcPrice:
            // console.log("socket log - 2 : ", message.btcPrices, message.id);
            if (lastReceiveIdRef.current !== message.id) {
              setBtcPrices(message.btcPrices);
              lastReceiveIdRef.current = message.id;
            }
            break;
          case socketType.players:
            console.log("socket log - 3 : ", message.data);
            setPlayers(message.data);
            break;
          case socketType.updateMessage:
            console.log("socket log - 4 : ", message.data);
            if (lastReceiveIdRef.current !== message.id) {
              setNewMessage({
                avatar: message.data.avatar,
                message: message.data.message,
              });
              lastReceiveIdRef.current = message.id;
            }
            break;
          case socketType.basicMessages:
            console.log("socket log - 5 : ", message.data);
            if (lastReceiveIdRef.current !== message.id) {
              let currentChatData: ChatDataProps[] = [...chatData];
              if (currentChatData.length === 0) {
                message.data.map((item: any) => {
                  currentChatData.push({
                    avatar: item.avatar,
                    message: item.message,
                  });
                });
                setChatData([...currentChatData]);
              }
              lastReceiveIdRef.current = message.id;
            }
            break;
          default:
            break;
        }
      }
    };
  }, []);

  useEffect(() => {
    if (newMessage.message) {
      let currentChatData: ChatDataProps[] = [...chatData];
      currentChatData.push(newMessage);
      setChatData([...currentChatData]);
      setNewMessage({
        avatar: "",
        message: "",
      });
    }
  }, [newMessage]);

  const sendSocket = (message: any) => {
    if (!isSocketOpen) return;
    webSocket.send(btoa(JSON.stringify(message)));
  };

  const sendMessage = (message: string) => {
    console.log("sendMessage log - 1 : ", message);
    if (!isConnected) {
      return;
    }

    sendSocket({
      type: Config.socketType.sendMessage,
      data: {
        address: address,
        message: message,
      },
    });
  };

  useEffect(() => {
    getBalance();
    getRecent();
  }, [address, isConnected]);

  const getRecent = async () => {
    try {
      const history = await axios.get(
        `${Config.serverUrl.https}/api/get-game-history`
      );
      console.log("getRecent log - 1 : ", history.data);
      setRecentHistories(history.data?.data || []);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (
      btcPrices.length > basicPriceCount + preparePriceCount + playPriceCount &&
      !isResultReady
    ) {
      // console.log("Home useEffect log - 1 : ");

      const fee = Config.fee;
      const upPlayers = players.filter((player) => player.isUpPool);
      const dpPlayers = players.filter((player) => !player.isUpPool);

      const upt = upPlayers.reduce(
        (sum, player) => sum + player.bettedBalance,
        0
      );
      const dpt = dpPlayers.reduce(
        (sum, player) => sum + player.bettedBalance,
        0
      );

      const isUpPoolWin =
        btcPrices[basicPriceCount + preparePriceCount] <
        btcPrices[basicPriceCount + preparePriceCount + playPriceCount]
          ? true
          : false;
      const winnerCount = isUpPoolWin ? upPlayers.length : dpPlayers.length;
      const winAmount = isUpPoolWin
        ? dpt - dpt * fee + upt
        : upt - upt * fee + dpt;
      
      let me = upPlayers.find((player) => player.address?.toLowerCase() === address?.toLowerCase())
      if (me && isUpPoolWin) {
        playWinMusic()
      }
      me = dpPlayers.find((player) => player.address?.toLowerCase() === address?.toLowerCase())
      if (me && !isUpPoolWin) {
        playWinMusic()
      }
      if (isUpPoolWin) {}
      setRoundResult({
        playerCount: players.length,
        winnerCount: winnerCount,
        isUpPoolWin: isUpPoolWin,
        winAmount: winAmount,
      });
      setIsResultReady(true);
      
      setTimeout(() => {
        dispatch(setIsUpdate());
        getBalance();
      }, 500);
    }
    
    if (btcPrices.length >= maxPriceCount) {
      getRecent();
    }

    if (
      btcPrices.length < basicPriceCount + preparePriceCount &&
      isResultReady
    ) {
      setIsResultReady(false);
      getBalance();
    }
  }, [btcPrices, isResultReady]);
  
  const playWinMusic = () => {
    console.log("Music player **********");
    (audioRef as any).current.play();
  }
  const getBalance = async () => {
    // console.log("getBalance log - 1 : ");
    try {
      const response = await axios.get(
        `${Config.serverUrl.https}/api/get-extra`
      );
      console.log("getBalance log - 2 : ", response.data);
      setJackpotBalance(response.data.jackpot);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeBet = (newBet: number) => {
    const ownPlayInfo = players.find((player) => player.address?.toLowerCase() === address?.toLowerCase());
    console.log("onChangeBet log - 1 : ", ownPlayInfo);
    setBettedBalance(ownPlayInfo ? ownPlayInfo.bettedBalance : newBet);
  };

  const bet = (isUpPool: boolean) => {
    console.log("bet log - 1 : ", isUpPool, bettedBalance);
    if (!isConnected) {
      toast.warning("Connect wallet to bet.");
      return;
    }
    if (player.balance < bettedBalance) {
      toast.warning("Insufficient balance.");
      return;
    }
    sendSocket({
      type: Config.socketType.bet,
      data: {
        address: address,
        isUpPool: isUpPool,
        bettedBalance: bettedBalance,
      },
    });
    setTimeout(() => {
      dispatch(setIsUpdate());
      getBalance();
    }, 500);
  };

  const isBettable = () => {
    const elapsedTime = btcPrices.length * Config.interval.priceUpdate;
    if (
      elapsedTime > Config.roundTime.basic + Config.roundTime.prepare ||
      players.find((player) => player.address?.toLowerCase() === address?.toLowerCase())
        ? true
        : false
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-row justify-between w-screen">
      <div className="w-full transition-all duration-1000 ease-in-out">
        <Header
          setChatVisible={() => {
            setIsChatView(!isChatView);
          }}
          setReferralLinkData={(data) => {}}
          isChatview={isChatView}
          hiddenChat={false}
        />
        <main className="h-[calc(100vh-98px)]">
          <div
            className={`flex-row items-start justify-between hidden h-full ${
              isChatView ? "xl:flex" : "lg:flex"
            }`}
          >
            <BetPanel
              isUpPool={true}
              players={players.filter((player) => player.isUpPool)}
              bet={bet}
              isBettable={isBettable()}
              isResultReady={isResultReady}
              roundResult={roundResult}
              isChatView={isChatView}
            />
            <div className="relative flex flex-col-reverse justify-between w-full h-full gap-5 px-5 py-5">
              <SelectPricePanel
                betPrices={betPrices}
                bettedPrice={bettedBalance}
                onChangeBet={onChangeBet}
                isBettable={isBettable()}
              />
              <div className={`w-full h-full`}>
                <GraphPanel
                  btcPrices={btcPrices}
                  jackpot={jackpotBalance}
                  histories={recentHistories}
                />
              </div>
              <GameStatus
                address={address}
                priceCount={btcPrices.length}
                bettedBalance={bettedBalance}
                players={players}
              />
            </div>
            <BetPanel
              isUpPool={false}
              players={players.filter((player) => !player.isUpPool)}
              bet={bet}
              isBettable={isBettable()}
              isResultReady={isResultReady}
              roundResult={roundResult}
              isChatView={isChatView}
            />
          </div>
          <div
            className={`flex flex-col w-full h-full ${
              isChatView ? "xl:hidden" : "lg:hidden"
            }`}
          >
            <div className="flex flex-col-reverse justify-between w-full h-full gap-5 px-5 py-5">
              <SelectPricePanel
                betPrices={betPrices}
                bettedPrice={bettedBalance}
                onChangeBet={onChangeBet}
                isBettable={isBettable()}
              />
              <div className={`w-full h-full min-h-[30vh]`}>
                <GraphPanel
                  btcPrices={btcPrices}
                  jackpot={jackpotBalance}
                  histories={recentHistories}
                />
              </div>
              <GameStatus
                address={address}
                priceCount={btcPrices.length}
                bettedBalance={bettedBalance}
                players={players}
              />
            </div>
            <div className="flex flex-row items-start justify-between">
              <BetPanel
                isUpPool={true}
                players={players.filter((player) => player.isUpPool)}
                bet={bet}
                isBettable={isBettable()}
                isResultReady={isResultReady}
                roundResult={roundResult}
                isChatView={isChatView}
              />
              <BetPanel
                isUpPool={false}
                players={players.filter((player) => !player.isUpPool)}
                bet={bet}
                isBettable={isBettable()}
                isResultReady={isResultReady}
                roundResult={roundResult}
                isChatView={isChatView}
              />
            </div>
          </div>
        </main>
      </div>
      {isChatView && (
        <div className="hidden h-screen lg:flex">
          <ChatPanel
            messages={chatData}
            sendMessage={sendMessage}
            onCloseChatRoom={() => {
              setIsChatView(false);
            }}
            isConnected={isConnected}
          />
        </div>
      )}
      <audio ref={audioRef} loop={false}>
        <source src="/audio/winner.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
