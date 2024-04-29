import { Config } from "@/config";
import axios from "axios";
import { textEncrypt } from "./basic";

const serverUrl = Config.serverUrl.https;
const encryptKey = Config.encryptKey.normal;

export const balanceRequest = async (address: string) => {
  try {
    const data = textEncrypt(
      JSON.stringify({
        address: address,
      }),
      encryptKey
    );
    const balanceResult = await axios.get(
      `${serverUrl}/api/get-balance?data=${data}`
    );
    console.log("balanceRequest log - 1 : ", balanceResult);
    return {
      result: true,
      balance: balanceResult.data.balance,
      avatar: balanceResult.data.avatar,
      country: balanceResult.data.country,
    };
  } catch (error: any) {
    console.log("balanceRequest log - error : ", error);
    return {
      result: false,
      error:
        error?.response?.status === 400 ? error.response.data.error : error,
    };
  }
};

export const swapCoinRequest = async (
  address: string,
  isDepositMode: boolean,
  param: string
) => {
  try {
    const data = textEncrypt(
      JSON.stringify({
        address: address,
        isDepositMode: isDepositMode,
        param: param,
      }),
      encryptKey
    );
    const swapResult = await axios.post(`${serverUrl}/api/swap`, {
      data: data,
    });
    if (swapResult.status == 200) {
      return { result: true };
    } else {
      return { result: false, error: swapResult.data.error };
    }
  } catch (error: any) {
    console.log("swapCoinRequest log - error : ", error);
    return {
      result: false,
      error:
        error?.response?.status === 400 ? error.response.data.error : error,
    };
  }
};
