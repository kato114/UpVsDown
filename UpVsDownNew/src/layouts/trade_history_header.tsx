import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon, IconType } from "@/components/icons";
import { Drawer, DrawerPosition } from "@/components/drawer";
import { useAccount, useDisconnect } from "wagmi";
import { Config } from "@/config";
import { userDisconnect } from "@/components/api";
import { toast } from "react-toastify";

interface TradeHistoryHeaderProps {
  avatar: string;
}

export default function TradeHistoryHeader(props: TradeHistoryHeaderProps) {
  const { avatar } = props;

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [files, setFiles] = useState<FileList | null>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const fileUpload = useRef(null);

  useEffect(() => {
    if (files && files?.length > 0) {
      setUploadedImageUrl(URL.createObjectURL(files[0]));
    }
  }, [files]);

  return (
    <div className="flex flex-col gap-4 w-full bg-[#161721] relative py-4 bg-gradient-to-r from-[#2C2C2D] to-[#1D222C]">
      <div className="relative z-20 flex flex-row justify-between w-full px-2 sm:px-8">
        <Link
          href="/play"
          className="flex justify-center items-center"
        >
          <img
            src="images/home/back.png"
            loading="lazy"
            alt=""
            className="w-6 sm:w-10"
          />
        </Link>
        <div className="main_title">
          <div className="title_h1" style={{ "textShadow": "4px 4px 2px rgba(1,1,1,.72)" }}>MY HISTORY</div>
        </div>
        <button
          className="pl-4"
          onClick={() => {
            if (isConnected)
              setIsOpenMenu(true);
          }}
        >
          <img
            alt="menu"
            src="/images/menu.png"
            className="w-10 h-10"
          />
        </button>
      </div>
      <Drawer
        isOpen={isOpenMenu}
        position={DrawerPosition.RIGHT}
        onClose={() => {
          setIsOpenMenu(false);
        }}
      >
        <div className="w-60 p-5 h-screen bg-[#2e2a65] flex flex-col items-center gap-3 overflow-auto">
          <div className="flex flex-col items-center w-full gap-2">
            {isConnected && (
              <div
                className="relative border-2 border-solid border-[#fff699] w-36 h-36 aspect-square rounded-full cursor-pointer overflow-hidden"
                onClick={() => {
                  fileUpload.current &&
                    (fileUpload.current as HTMLInputElement).click();
                }}
              >
                {uploadedImageUrl ? (
                  <img alt="" src={uploadedImageUrl} className="w-full h-full" />
                ) : (
                  <img
                    alt=""
                    src={
                      avatar
                        ? `${Config.serverUrl.avatars}${avatar}`
                        : "/images/avatar-default.png"
                    }
                    className="w-full h-full"
                  />
                )}
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={fileUpload}
                  onChange={(e) => {
                    setFiles(e.target.files);
                  }}
                />
              </div>
            )}

            {isConnected && (
              <div className="flex flex-row items-center gap-2">
                <span className="text-[#fff699] font-nulshock text-xl">{`${address?.slice(
                  0,
                  4
                )}...${address?.slice(-4)}`}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address ? address : "");
                  }}
                >
                  <Icon
                    type={IconType.COPY}
                    className="fill-[#fff699] hover:fill-[#e0e0e0] w-5 h-5 transition-all ease-in-out duration-500"
                  />
                </button>
              </div>
            )}
            {isConnected && (
              <div className="flex flex-row items-center gap-3 w-full">
                <button
                  onClick={() => {
                    userDisconnect().then((response) => {
                      if (response?.status == 200) {
                        disconnect();
                      } else {
                        toast.error(response?.data?.msg);
                      }
                    });
                  }}
                  className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]"
                >
                  DISCONNECT
                </button>
              </div>
            )}
          </div>
          {isConnected && <div className="w-full h-[2px] bg-[#FEB600]" />}
          <div className="flex w-full lg:hidden">
            <button className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]" onClick={() => router.push("/share")}>
              AFFILIATES
            </button>
          </div>
          <div className="flex w-full lg:hidden">
            <button className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]" onClick={() => router.push("/dashboard")}>
              WINNERS
            </button>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <p className="text-[#FEB600] text-xl font-nulshock">Leaderboard</p>
              <Link href="/leaderboard" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                Top Winners
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#FEB600] text-xl font-nulshock">My Activity</p>
              <Link href="/trade_history" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                Trades History
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#FEB600] text-xl font-nulshock">Referral Program</p>
              <div className="flex flex-col gap-2">
                <Link href="/share" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  Link Manager
                </Link>
                <Link href="/dashboard" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  Dashboard
                </Link>
                <Link href="/share_report" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  Earnings Report
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#FEB600] text-xl font-nulshock">Jackpot</p>
              <div className="flex flex-col gap-2">
                <Link href="/weekly_jackpot" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  Weekly Jackpot
                </Link>
                <Link href="/monthly_jackpot" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  Monthly Jackpot
                </Link>
                <Link href="/jackpot_winners" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  History
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#FEB600] text-xl font-nulshock">Info</p>
              <div className="flex flex-col gap-2">
                <Link href="/faq" className="flex justify-center items-center border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]">
                  FAQ
                </Link>
                <button
                  className="border-2 border-solid border-[#FEB600] hover:border-[#9e8130] rounded-lg font-nulshock text-xs text-[#FEB600] hover:text-[#9e8130] w-full h-[35px]"
                  onClick={() => {
                    setIsOpenMenu(false);
                  }}
                >
                  Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
