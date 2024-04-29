import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Header from "@/layouts/header";

import { getReferralDashboardData } from "@/components/api";
import { toast } from "react-toastify";
import Link from 'next/link'

export default function Home() {

  const { isConnected } = useAccount();

  const [todayEarned, setTodayEarned] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    const getReferralDashboardInfo = async () => {
      const response = await getReferralDashboardData();
      console.log(response)
      if (response?.status == 200) {
        setTodayEarned((response as any).data.data.today);
        setTotalEarned((response as any).data.data.total);
      } else {
        toast.error(response?.data?.msg);
      }
    };

    if (isConnected) {
      getReferralDashboardInfo();
    }
  }, []);

  return (
    <div className="flex flex-row justify-between w-screen">
      <div className="w-full transition-all duration-1000 ease-in-out">
        <Header
          setChatVisible={() => { }}
          setReferralLinkData={(data) => { }}
          isChatview={false}
          hiddenChat={true}
        />
        <div className="absolute z-10 top-[58px] sm:top-[98px] left-0 w-full h-[calc(100vh-50px)] sm:h-[calc(100vh-72px)] bg-[#161721]">
          <div className="flex flex-col items-center gap-5 pt-10 h-full">
          <span className="text-center font-nulshock text-[#fff] text-3xl uppercase" style={{ "textShadow": "4px 4px 2px rgba(1,1,1,.72)" }}>
              referral program dashboard
            </span>
            <div className="flex flex-col w-full h-full gap-5 bg-[#161721]">
              <div className="w-full h-[1px]"/>
              <div className="section_program">
                <div className="block_program_top w-[70%] mx-auto">
                  <div className="program_block_top w-1/2">
                    <div className="program_details">
                      <Link href="#" className="icon_today w-button"></Link>
                      <div className="title_program">{todayEarned} ETH</div>
                      <div className="program_sub">EARNED TODAY</div>
                    </div>
                  </div>
                  <div className="program_block_top w-1/2">
                    <div className="program_details">
                      <Link href="#" className="icon_total w-button"></Link>
                      <div className="title_program">{totalEarned} ETH</div>
                      <div className="program_sub">TOTAL EARNED</div>
                    </div>
                  </div>
                </div>
                {/* <div className="block_program_bottom">
                  <div className="program_block_bottom">
                    <div className="program_details_bottom">
                      <div className="title_program">{tier01Today} ETH</div>
                      <div className="program_sub">TODAY</div>
                    </div>
                    <div className="friends_tiers">
                      <div className="tier">
                        <div className="title_tiers">FRIENDS TIER 01 (%)</div>
                      </div>
                    </div>
                    <div className="program_details_bottom">
                      <div className="title_program">{tier01TotalPaid} ETH</div>
                      <div className="program_sub">TOTAL PAID</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
