import axios from "axios";
import { Config } from "@/config";

const STORAGE_KEY = "token";

axios.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(STORAGE_KEY);
    if (accessToken != null) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export async function generateReferral(name: string) {
  try {
    return await axios.post(`${Config.serverUrl.https}/api/generate-referral`, {
      name: name,
    });
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getReferral() {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/get-referral`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getReferralReport(pageNum: number) {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/get-referral-report?page_num=${pageNum}`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getReferralDashboardData() {
  try {
    return await axios.get(
      `${Config.serverUrl.https}/api/get-referral-dashboard`
    );
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getWeeklyJackpot(address: string) {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/weekly-jackpot?address=${address}`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getMonthlyJackpot(address: string) {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/montly-jackpot?address=${address}`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getHistory() {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/history`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getWinnerHistory(pageNum: number) {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/winner-history?page_num=${pageNum}`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getTradeHistory() {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/get-my-history`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getLeaderboardData(type: string) {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/leaderboard?type=${type}`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getDashboardData() {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/get-dashboard`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function userDisconnect() {
  try {
    return await axios.post(`${Config.serverUrl.https}/api/disconnect`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function uploadAvatar(formData: FormData) {
  try {
    return await axios.post(Config.serverUrl.https + '/api/upload-avatar',
      formData,
      {
        headers: {
          "Accept": "*/**",
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
          'Access-Control-Allow-Methods': '*',
          "Cross-Origin-Resource-Policy": '*',
          "timeout": 1000,
        }
      });
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function login(address: string, referral: string) {
  try {
    return await axios.post(`${Config.serverUrl.https}/api/login`, {
      address: address,
      referral: referral
    });
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}

export async function getPlayer() {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/get-player`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}
export async function getRecent(address:string, point: number) {
  try {
    return await axios.get(`${Config.serverUrl.https}/api/get-recent?address=${address}&point=${point}`);
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}
export async function updatePlayer(country: string) {
  try {
    return await axios.post(`${Config.serverUrl.https}/api/update-player`, {
      country: country
    });
  } catch (err) {
    console.error("Api Error >>>", err);
  }
}
