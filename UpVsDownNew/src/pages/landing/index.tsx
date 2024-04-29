"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.ref)
    if (router.query.ref !== undefined)
      localStorage.setItem("referral", (router.query.ref as string));
  }, [router])

  return (
    <main className="flex w-full flex-col items-center bg-[#1D222C]">
      <div className="flex flex-col w-full items-center gap-10 bg-[url('/images/home/home-up-bg.png')] bg-no-repeat bg-cover">
        <div className="flex w-full h-[108px] justify-between items-center bg-gradient-to-r from-[#2C2C2D] to-[#1D222C] p-5 sm:px-16">
          <img
            src="images/upvsdown.png"
            className="w-[136px] h-[39px] sm:w-[266px] sm:h-[79px]"
          />
          <div className="flex gap-10">
            <Link href="/faq" className="hidden sm:flex cursor-pointer w-[128px] h-[46px] sm:w-[168px] sm:h-[46px] justify-center items-center rounded-md border-2 border-solid border-[#FEB600] gap-2 hover:bg-[#4c4c4e]">
              <p className="text-sm font-nulshock uppercase text-white">How to play</p>
              <p className="w-[20px] h-[20px] text-center text-sm font-nulshock uppercase text-black rounded-full bg-white">?</p>
            </Link>
            <Link href="/play" className="cursor-pointer flex w-[128px] h-[46px] sm:w-[168px] sm:h-[46px] justify-center items-center rounded-md bg-[#FEB600] gap-2 hover:bg-[#cfaa4a]">
              <p className="text-sm font-nulshock uppercase text-white">Play Now</p>
              <img
                src="images/home/play.png"
              />
            </Link>
          </div>
        </div>
        <img
          src="images/home/home-title.png"
          className="px-10"
        />
        <div className="flex flex-col sm:flex-row items-center justify-center px-10 gap-10">
          <div className="flex flex-col sm:w-1/2  items-center px-10">
            <div className="flex flex-col gap-4">
              <p className="text-5xl sm:text-6xl font-nulshock text-white uppercase">up or down</p>
              <p className="text-5xl sm:text-6xl font-nulshock text-white uppercase">predict &</p>
              <p className="text-6xl sm:text-7xl font-nulshock text-yellow-400 uppercase">win.</p>
              <p className="text-lg font-ClashDisplay-Medium text-[#AAAAAA] uppercase">You have 5 prize pools that gives you the best chance to win.
                If you are a heavy gainer you will have a big chance</p>
              <div className="flex gap-10 mt-5">
                <div className="flex cursor-pointer">
                  <img
                    src="images/home/leaderboard_btn.png"
                    className="sm:w-[170px] sm:h-[50px]"
                  />
                </div>
                <div className="flex cursor-pointer">
                  <img
                    src="images/home/watch_video_btn.png"
                    className="sm:w-[170px] sm:h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:w-1/2 justify-center items-center">
            <div className="flex border-4 border-white rounded-md">
              <img
                src="images/home/bears-logo.gif"
                alt=""
                className="flex w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full items-center p-10 pt-20 gap-10 bg-[url('/images/home/weekly-jackpot-bg.png')] bg-no-repeat bg-cover">
        <div className="flex flex-col sm:w-1/2  items-center px-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-5">
              <p className="text-3xl sm:text-6xl font-nulshock text-white uppercase">weekly</p>
              <p className="text-3xl sm:text-6xl font-nulshock text-yellow-400 uppercase">jackpot</p>
            </div>
            <p className="text-lg font-ClashDisplay-Medium text-white uppercase">{`10% of the platform's income will be raffled
              among all the participants in the game.`}</p>
            <p className="text-lg font-ClashDisplay-Regular text-[#969393]">You have 5 prize pools that gives you the best chance to win,
              if you are a heavy gainer you will have a big chance. if you are
              a small fish you can still win, as many trades you do, your chances will be higher!</p>
          </div>
        </div>
        <div className="flex sm:w-1/2 justify-center items-center">
          <img
            src="images/home/jackpot-bull.png"
            alt=""
            className="flex w-[400px]"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row w-full items-center p-10 gap-10 bg-[url('/images/home/monthly-jackpot-bg.png')] bg-no-repeat bg-cover">
        <div className="flex sm:w-1/2 justify-center items-center">
          <img
            src="images/home/monthly-jackpot.png"
            alt=""
            className="flex w-[400px]"
          />
        </div>
        <div className="flex flex-col sm:w-1/2  items-center px-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-5">
              <p className="text-3xl sm:text-6xl font-nulshock text-white uppercase">monthly</p>
              <p className="text-3xl sm:text-6xl font-nulshock text-yellow-400 uppercase">jackpot</p>
            </div>
            <p className="text-lg font-ClashDisplay-Medium text-white uppercase">{`10% of the platform's income will be raffled
              among all the participants in the game.`}</p>
            <p className="text-lg font-ClashDisplay-Regular text-[#969393]">You have 5 prize pools that gives you the best chance to win,
              if you are a heavy gainer you will have a big chance. if you are
              a small fish you can still win, as many trades you do, your chances will be higher!</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-center p-10 gap-10 bg-[url('/images/home/benefits-bg.png')] bg-no-repeat bg-cover">
        <p className="text-3xl sm:text-6xl font-nulshock text-yellow-400 uppercase">benefits</p>
        <div className="flex flex-col sm:flex-row w-full gap-10">
          <div className="flex sm:w-1/3 justify-center items-center">
            <img
              src="images/home/benefit-bulls.png"
              alt=""
              className="flex w-2/3"
            />
          </div>
          <div className="hidden lg:flex flex-col sm:w-2/3 px-10 gap-10 justify-center">
            <div className="relative flex w-full h-[120px] items-center gap-3">
              <img
                src="images/home/benefit-box.png"
                className="absolute w-full h-full" />
              <div className="z-10 flex gap-3 p-5 items-center">
                <div className="relative flex w-[80px] h-[80px] items-center justify-center">
                  <img
                    src="images/home/benefit-number-bg.png"
                    className="absolute w-full h-full" />
                  <p className="text-white font-ClashDisplay-Medium text-3xl">01</p>
                </div>
                <p className="text-white font-ClashDisplay-Medium text-3xl uppercase">{`10% of the platform's income will be raffled`}</p>
              </div>
            </div>
            <div className="relative flex w-full h-[120px] items-center gap-3">
              <img
                src="images/home/benefit-box.png"
                className="absolute w-full h-full" />
              <div className="z-10 flex gap-3 p-5 items-center">
                <div className="relative flex w-[80px] h-[80px] items-center justify-center">
                  <img
                    src="images/home/benefit-number-bg.png"
                    className="absolute w-full h-full" />
                  <p className="text-white font-ClashDisplay-Medium text-3xl">02</p>
                </div>
                <p className="text-white font-ClashDisplay-Medium text-3xl uppercase">{`10% of the platform's income will be raffled`}</p>
              </div>
            </div>
            <div className="relative flex w-full h-[120px] items-center gap-3">
              <img
                src="images/home/benefit-box.png"
                className="absolute w-full h-full" />
              <div className="z-10 flex gap-3 p-5 items-center">
                <div className="relative flex w-[80px] h-[80px] items-center justify-center">
                  <img
                    src="images/home/benefit-number-bg.png"
                    className="absolute w-full h-full" />
                  <p className="text-white font-ClashDisplay-Medium text-3xl">03</p>
                </div>
                <p className="text-white font-ClashDisplay-Medium text-3xl uppercase">{`10% of the platform's income will be raffled`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-center p-10 gap-10 bg-[url('/images/home/best-chance-bg.png')] bg-no-repeat bg-cover">
        <div className="flex flex-wrap gap-5 justify-center">
          <p className="text-3xl sm:text-6xl font-nulshock text-white uppercase">todays best</p>
          <p className="text-3xl sm:text-6xl font-nulshock text-yellow-400 uppercase">chance</p>
        </div>
        <p className="text-xl font-ClashDisplay-Medium text-white uppercase">Best Web3 Game Play!</p>
        <div className="flex justify-center items-center">
          <img
            src="images/home/best-todays.png"
            alt=""
            className="flex w-[400px]"
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-center p-10 gap-10 bg-[url('/images/home/blockchain-bg.png')] bg-no-repeat bg-cover">
        <p className="text-3xl sm:text-6xl font-nulshock text-white uppercase">blockchain</p>
        <p className="text-3xl sm:text-6xl font-nulshock text-yellow-400 uppercase">network</p>
        <p className="text-xl font-ClashDisplay-Medium text-white uppercase leading-loose tracking-widest text-center">The game is running on Web3 Ethereum<br />
          blockchain network, to play the game you need<br />to have sol coins.</p>
        <p className="text-2xl sm:text-4xl font-nulshock text-yellow-400 uppercase text-center">our game is web3 game in the<br />
          ethereum network!</p>
      </div>
      <div className="flex flex-col w-full items-center p-10 gap-5">
        <img
          src="images/upvsdown.png"
          className="w-[136px] h-[39px] sm:w-[266px] sm:h-[79px]"
        />
        <p className="text-md font-ClashDisplay-Regular text-white">All Right Reserved @ 0xEthDao 2024</p>
      </div>
    </main>
  );
}
