import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Header from "@/layouts/header";
import { getReferralReport } from "@/components/api";
import { toast } from "react-toastify";
import { Pagination } from "@/components/pagination";

export default function Home() {

  const { isConnected } = useAccount();

  const [referralReport, setReferralReport] = useState(null);
  const [pageTotalCount, setPageTotalCount] = useState(0);

  useEffect(() => {
    if (isConnected) {
      getReferralReportData(0);
    }
  }, []);

  const getReferralReportData = async (currentPageNum: number) => {
    const response = await getReferralReport(currentPageNum);
    console.log(response);
    if (response?.status == 200) {
      setReferralReport((response as any)?.data.data.reportData);
      setPageTotalCount(
        Math.floor(
          (response as any).data.data.page_total /
          (response as any).data.data.page_count
        )
      );
    } else {
      toast.error(response?.data?.msg);
    }
  };

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
          <div className="flex flex-col items-center gap-5 pt-10">
            <span className="text-center font-nulshock text-[#fff] text-xl sm:text-3xl uppercase" style={{ "textShadow": "4px 4px 2px rgba(1,1,1,.72)" }}>
              referral program earnings report
            </span>
            <div className="flex flex-col w-full gap-5 bg-[#161721]">
              <div className="overflow-x-auto w-full">
                <div className="w-full inline-block align-middle">
                  <div className="overflow-auto">
                    <div className="w-full h-[1px]" />
                    {referralReport !== null && (
                      <table className="min-w-full bg-table">
                        <thead className="">
                          <tr className="w-full h-14 bg-[#111016] font-oswald text-[10px] sm:text-base text-[#fff] uppercase">
                            <th scope="col" className="px-2 sm:px-6 py-4 text-center">
                              <span className="cursor-pointer inline-flex items-center">
                                date
                              </span>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-4 text-center">
                              <span className="cursor-pointer inline-flex items-center">
                                tier
                              </span>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-4 text-center">
                              <span className="cursor-pointer inline-flex items-center">
                                total amount
                              </span>
                            </th>
                            <th scope="col" className="px-2 sm:px-6 py-4 text-center">
                              <span className="cursor-pointer inline-flex items-center">
                                status
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-medium text-neutral-black-700">
                          {(referralReport as Array<any>).map(
                            (item: any, index: number) => {
                              return (
                                <tr
                                  key={index}
                                  className="w-full h-14 bg-[#111016] font-oswald text-[10px] sm:text-base text-[#fff]"
                                >
                                  <td className="text-center px-2 sm:px-6 py-2">
                                    <p>{item.date}</p>
                                  </td>
                                  <td className="text-center px-2 sm:px-6 py-2">
                                    <p>{item.referral}</p>
                                  </td>
                                  <td className="text-center px-2 sm:px-6 py-2">
                                    <p>{item.earn}</p>
                                  </td>
                                  <td className="text-center px-2 sm:px-6 py-2">
                                    <p></p>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                {pageTotalCount >= 1 && (
                  <Pagination
                    pageCount={pageTotalCount}
                    gotoPage={(page) => getReferralReportData(page)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
