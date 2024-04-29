import React, { useState, useEffect } from "react";
import JackpotHeader from "@/layouts/jackpot_header";
import { balanceRequest } from "@/pages/api";
import { getHistory, getWinnerHistory } from "@/components/api";
import { toast } from "react-toastify";
import { getDisplayString } from "@/utils/utils";
import { Config } from "@/config";
import { Pagination } from "@/components/pagination";
import { useSelector } from "react-redux";

interface WinnersHistoryProps {
  data: Array<any>;
  pageTotalCount: number;
  GoToPage: (page: number) => void;
  handleClose: () => void;
}

const WinnersHistory = ({
  data,
  pageTotalCount,
  GoToPage,
  handleClose,
}: WinnersHistoryProps) => {
  return (
    <div className="section_history">
      <div className="close_history" onClick={handleClose}>
        <img
          src="images/home/icon_close.svg"
          loading="lazy"
          alt=""
          className="close_img"
        />
      </div>
      <div className="history_title">
        <div className="title_h1" style={{ "textShadow": "4px 4px 2px rgba(1,1,1,.72)" }}>WINNERS HISTORY</div>
      </div>
      <div className="block_history">
        <div className="line_gold"></div>
        <div className="history_board_title">
          <div className="history_date">
            <div className="block_title_tab">
              <div className="title_tab">DATE</div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="history_winner">
            <div className="title_tab">WINNER</div>
          </div>
          <div className="separator"></div>
          <div className="history_wallet">
            <div className="block_title_tab">
              <div className="title_tab">WALLET</div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="history_jackpot">
            <div className="block_title_tab">
              <div className="title_tab">JACKPOT</div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="history_spot"></div>
          <div className="separator"></div>
          <div className="history_prize">
            <div className="block_title_tab">
              <div className="title_tab">PRIZE</div>
            </div>
          </div>
        </div>
        <div className="line_gold"></div>
        {data !== null && (
          <div className="history_board_details">
            {data.map((item, index) => {
              return (
                <div key={index} className="history_board">
                  <div className="history_order_entry">
                    <div className="block_title_tab">
                      <div className="entry">
                        {String(new Date(item.date).getDate()).padStart(
                          2,
                          "0"
                        ) +
                          "/" +
                          String(
                            new Date(item.date).getMonth() + 1
                          ).padStart(2, "0") +
                          "/" +
                          new Date(item.date).getFullYear()}
                      </div>
                    </div>
                  </div>
                  <div className="history_winner_entry">
                    <div className="pfp">
                      <img
                        src={
                          item.player.avatar === ""
                            ? "images/avatar-default.png"
                            : Config.serverUrl.avatars + item.player.avatar
                        }
                        loading="lazy"
                        alt=""
                        className="profil_pic rounded-full"
                      />
                    </div>
                  </div>
                  <div className="history_wallet_entry">
                    <div className="block_title_tab">
                      <div className="wallet_board">{getDisplayString(item.player.address, 4, 4)}</div>
                    </div>
                  </div>
                  <div className="history_jackpot_entry">
                    <div className="block_title_tab">
                      <div className="entry">
                        {item.type === "month" ? "MONTHLY" : "WEEKLY"}
                      </div>
                    </div>
                  </div>
                  <div className="history_spot_entry">
                    <div className="icon_entry">
                      <img
                        src={`images/home/trophy_${item.rank}.png`}
                        loading="lazy"
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="prize_jackpot_entry">
                    <div className="block_title_tab">
                      <div className="entry">{item.award} ETH</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex justify-center">
          {pageTotalCount >= 1 && (
            <Pagination
              pageCount={pageTotalCount}
              gotoPage={(page) => GoToPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  
  const player = useSelector((state: any) => state.globalState.player);

  const [showWinnersHistory, setShowWinnersHistory] = useState(false);
  const [monthAward, setMonthAward] = useState(null);
  const [weekAward, setWeekAward] = useState(null);
  const [winnersHistory, setWinnersHistory] = useState([]);
  const [pageTotalCount, setPageTotalCount] = useState(0);

  useEffect(() => {
    const getWinners = async () => {
      const response = await getHistory();
      console.log(response);
      if (response?.status == 200) {
        setMonthAward((response as any).data.data.monthAward);
        setWeekAward((response as any).data.data.weekAward);
      } else {
        toast.error(response?.data?.msg);
      }
    };

    getWinners();
  }, []);

  const getWinnerHistoryData = async (currentPageNum: number) => {
    const response = await getWinnerHistory(currentPageNum);
    console.log(response);
    if (response?.status == 200) {
      setWinnersHistory((response as any).data.data.data);
      setPageTotalCount(
        Math.floor(
          (response as any).data.data.page_total /
          (response as any).data.data.page_count
        )
      );
    } else {
      toast.error(response?.data?.msg);
    }
    setShowWinnersHistory(true);
  };

  return (
    <div className="flex flex-row justify-between w-screen">
      <div className="w-full transition-all duration-1000 ease-in-out">
        <JackpotHeader avatar={player.avatar} ticket={0} jackpotWallet="" endTime="" />
        <div className="w-full h-[1px]" />
        {monthAward && weekAward && (
          <div className="section_winners">
            <div className="winner_row">
              <div className="block_winner_monthly">
                <div className="winner_in">
                  <div className="top">
                    <div className="pfp-2">
                      <img
                        src="images/home/pfp.png"
                        loading="lazy"
                        alt=""
                        className="image-5"
                      />
                    </div>
                    <div className="lines">
                      <div className="winner_card_title">MONTHLY WINNER</div>
                      <div className="winner_card_title_2">WINNER PRIZE:</div>
                      <div className="winner_card_title_3">
                        {(monthAward as any)?.length > 0 ? (monthAward[0] as any)?.award : ""}
                      </div>
                    </div>
                  </div>
                  <div className="separator_winner"></div>
                  <div className="btm">
                    <div className="card_title_gold">
                      {(monthAward as any)?.length > 0 ? getDisplayString(
                        (monthAward[0] as any)?.player.address,
                        4,
                        4
                      ) : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="block_winner">
                <div className="winner_in_weekly">
                  <div className="top">
                    <div className="pfp-2">
                      {(weekAward as any).length > 0 ? (<img
                        src={
                          (weekAward[0][0] as any)?.player.avatar
                            ? Config.serverUrl.avatars +
                            (weekAward[0][0] as any)?.player.avatar
                            : "images/home/pfp.png"
                        }
                        loading="lazy"
                        alt=""
                        className="image-5"
                      />) : (
                        <img
                          src="images/home/pfp.png"
                          loading="lazy"
                          alt=""
                          className="image-5"
                        />
                      )}
                    </div>
                    <div className="lines">
                      <div className="winner_card_title">WEEKLY WINNER 1</div>
                      <div className="winner_card_title_2">WINNER PRIZE:</div>
                      <div className="winner_card_title_3">
                        {(weekAward as any)?.length > 0 ? (weekAward[0][0] as any)?.award : ""}
                      </div>
                    </div>
                  </div>
                  <div className="separator_winner"></div>
                  <div className="btm">
                    <div className="card_title">
                      {(weekAward as any).length > 0 ? getDisplayString(
                        (weekAward[0][0] as any)?.player.address,
                        4,
                        4
                      ) : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="winner_row">
              <div className="block_winner">
                <div className="winner_in_weekly">
                  <div className="top">
                    <div className="pfp-2">
                      {(weekAward as any).length > 1 ? (<img
                        src={
                          (weekAward[1][0] as any)?.player.avatar
                            ? Config.serverUrl.avatars +
                            (weekAward[1][0] as any)?.player.avatar
                            : "images/home/pfp.png"
                        }
                        loading="lazy"
                        alt=""
                        className="image-5"
                      />) : (
                        <img
                          src="images/home/pfp.png"
                          loading="lazy"
                          alt=""
                          className="image-5"
                        />
                      )}
                    </div>
                    <div className="lines">
                      <div className="winner_card_title">WEEKLY WINNER 2</div>
                      <div className="winner_card_title_2">WINNER PRIZE:</div>
                      <div className="winner_card_title_3">
                        {(weekAward as any).length > 1 ? (weekAward[1][0] as any)?.award : ""}
                      </div>
                    </div>
                  </div>
                  <div className="separator_winner"></div>
                  <div className="btm">
                    <div className="card_title">
                      {(weekAward as any).length > 1 ? getDisplayString(
                        (weekAward[1][0] as any)?.player.address,
                        4,
                        4
                      ) : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="block_winner">
                <div className="winner_in_weekly">
                  <div className="top">
                    <div className="pfp-2">
                      {(weekAward as any).length > 2 ? (<img
                        src={
                          (weekAward[2][0] as any)?.player.avatar
                            ? Config.serverUrl.avatars +
                            (weekAward[2][0] as any)?.player.avatar
                            : "images/home/pfp.png"
                        }
                        loading="lazy"
                        alt=""
                        className="image-5"
                      />) : (
                        <img
                          src="images/home/pfp.png"
                          loading="lazy"
                          alt=""
                          className="image-5"
                        />
                      )}
                    </div>
                    <div className="lines">
                      <div className="winner_card_title">WEEKLY WINNER 3</div>
                      <div className="winner_card_title_2">WINNER PRIZE:</div>
                      <div className="winner_card_title_3">
                        {(weekAward as any).length > 2 ? (weekAward[2][0] as any)?.award : ""}
                      </div>
                    </div>
                  </div>
                  <div className="separator_winner"></div>
                  <div className="btm">
                    <div className="card_title">
                      {(weekAward as any).length > 2 ? getDisplayString(
                        (weekAward[2][0] as any)?.player.address,
                        4,
                        4
                      ) : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="winner_row">
              <div className="block_winner">
                <div className="winner_in_weekly">
                  <div className="top">
                    <div className="pfp-2">
                      {(weekAward as any).length > 3 ? (<img
                        src={
                          (weekAward[3][0] as any)?.player.avatar
                            ? Config.serverUrl.avatars +
                            (weekAward[3][0] as any)?.player.avatar
                            : "images/home/pfp.png"
                        }
                        loading="lazy"
                        alt=""
                        className="image-5"
                      />) : (
                        <img
                          src="images/home/pfp.png"
                          loading="lazy"
                          alt=""
                          className="image-5"
                        />
                      )}
                    </div>
                    <div className="lines">
                      <div className="winner_card_title">WEEKLY WINNER 4</div>
                      <div className="winner_card_title_2">WINNER PRIZE:</div>
                      <div className="winner_card_title_3">
                        {(weekAward as any).length > 3 ? (weekAward[3][0] as any)?.award : ""}
                      </div>
                    </div>
                  </div>
                  <div className="separator_winner"></div>
                  <div className="btm">
                    <div className="card_title">
                      {(weekAward as any).length > 3 ? getDisplayString(
                        (weekAward[3][0] as any)?.player.address,
                        4,
                        4
                      ) : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="block_winner">
                <div className="winner_in_weekly">
                  <div className="top">
                    <div className="pfp-2">
                      {(weekAward as any).length > 4 ? (<img
                        src={
                          (weekAward[4][0] as any)?.player.avatar
                            ? Config.serverUrl.avatars +
                            (weekAward[4][0] as any)?.player.avatar
                            : "images/home/pfp.png"
                        }
                        loading="lazy"
                        alt=""
                        className="image-5"
                      />) : (
                        <img
                          src="images/home/pfp.png"
                          loading="lazy"
                          alt=""
                          className="image-5"
                        />
                      )}
                    </div>
                    <div className="lines">
                      <div className="winner_card_title">WEEKLY WINNER 5</div>
                      <div className="winner_card_title_2">WINNER PRIZE:</div>
                      <div className="winner_card_title_3">
                        {(weekAward as any).length > 4 ? (weekAward[4][0] as any)?.award : ""}
                      </div>
                    </div>
                  </div>
                  <div className="separator_winner"></div>
                  <div className="btm">
                    <div className="card_title">
                      {(weekAward as any).length > 4 ? getDisplayString(
                        (weekAward[4][0] as any)?.player.address,
                        4,
                        4
                      ) : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="hidden sm:flex footer_winners text-white">
          <div
            className="button_footer w-button cursor-pointer"
            onClick={() => getWinnerHistoryData(0)}
          >
            WINNER HISTORY
          </div>
        </div>
      </div>
      {showWinnersHistory === true && (
        <WinnersHistory
          data={winnersHistory}
          pageTotalCount={pageTotalCount}
          GoToPage={(page) => getWinnerHistoryData(page)}
          handleClose={() => setShowWinnersHistory(false)}
        />
      )}
    </div>
  );
}
