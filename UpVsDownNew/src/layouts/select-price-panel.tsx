import React from "react";

interface SelectPricePanelProps {
  betPrices: number[];
  bettedPrice: number;
  onChangeBet: (bet: number) => void;
  isBettable: boolean;
}

export default function SelectPricePanel(props: SelectPricePanelProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-1 sm:gap-4">
      {props.betPrices.length > 0 &&
        props.betPrices.map((item, index) => (
          <button
            onClick={() => {
              props.onChangeBet(item);
            }}
            disabled={!props.isBettable}
            key={index}
            className={`w-full h-[52px] font-nulshock rounded-xl text-xl sm:text-2xl border-2 border-solid border-[#988032] transition-all ease-in-out hover:scale-110 duration-300 ${
              !props.isBettable
                ? "filter grayscale-[80%]"
                : "filter grayscale-0"
            } ${
              item === props.bettedPrice
                ? "text-black bg-[#FEB600]"
                : "text-[#FEB600]"
            }`}
          >
            {item}
          </button>
        ))}
    </div>
  );
}
