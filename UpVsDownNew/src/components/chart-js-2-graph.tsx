import React, { useState, useEffect } from "react";
import { Config } from "@/config";
import { Scatter } from "react-chartjs-2";

const graphVerticalRatio = Config.graphVerticalRatio;
const graphHorizontalRatio =
  Config.roundTime.basic / Config.interval.priceUpdate;

const basicPriceCount = Config.roundTime.basic / Config.interval.priceUpdate;
const preparePriceCount =
  Config.roundTime.prepare / Config.interval.priceUpdate;
const playPriceCount = Config.roundTime.play / Config.interval.priceUpdate;

export interface Position {
  x: number;
  y: number;
}

interface ChartJs2GraphProps {
  dotPositions: Position[];
  playingDepth: number;
  color: string;
}

export const ChartJs2Graph: React.FC<ChartJs2GraphProps> = (props) => {
  const { dotPositions, playingDepth, color } = props;
  // const lastPointIndex = dotPositions.length - 1;

  const chartData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: dotPositions,
        pointRadius: (context: any) => {
          return (context.dataIndex === basicPriceCount + preparePriceCount ||
            context.dataIndex ===
              basicPriceCount + preparePriceCount + playPriceCount) &&
            playingDepth
            ? 5
            : 0;
        },
        pointBackgroundColor: (context: any) => {
          return (context.dataIndex === basicPriceCount + preparePriceCount ||
            context.dataIndex ===
              basicPriceCount + preparePriceCount + playPriceCount) &&
            playingDepth
            ? color
            : "rgba(0,0,0,0)";
        },
        // pointRadius: 0,
        borderColor: color,
        showLine: true, // This will connect the dots with a line
        fill: false,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: { enabled: false },
    scales: {
      yAxes: [
        {
          display: false, // Hides the y-axis
          gridLines: { display: false }, // Hides the grid lines
          ticks: { min: 0, max: graphVerticalRatio },
        },
      ],
      xAxes: [
        {
          display: false, // Hides the y-axis
          gridLines: { display: false }, // Hides the grid lines
          ticks: {
            min: playingDepth
              ? -(
                  graphHorizontalRatio -
                  (graphHorizontalRatio -
                    graphHorizontalRatio / Config.graphHorizontalZoomRatio) *
                    (playingDepth /
                      Math.floor(Config.zoomTime / Config.interval.priceUpdate))
                )
              : -graphHorizontalRatio,
            max: 0,
          },
        },
      ],
    },
    hover: { mode: null },
    animation: {
      duration: Config.interval.priceUpdate, // Duration in milliseconds (1 second in this case)
      easing: "linear", // Easing function to use
    },
  };

  return (
    <div className="w-full h-full">
      <Scatter data={chartData} options={chartOptions} />
    </div>
  );
};
