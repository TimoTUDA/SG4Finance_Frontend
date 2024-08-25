import React from "react";
import { Chart } from "react-google-charts";

/**
 * create graph history for a single investment
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LineChart(props) {
  // set line color based on the line trend comparing the last 2 rounds
  function setColor(data) {
    let lastValue = data[data.length - 1][1];
    let secondLastValue = data[data.length - 2][1];

    return lastValue > secondLastValue ? ["#008800"] : ["#ff0000"];
  }

  const options = {
    legend: { position: "none" },
    vAxis: { title: "Wert", viewWindow: { min: 0 } },
    hAxis: { title: "Rounds", format: "0" },
    colors: setColor(props.lineData),
    chartArea: { width: "65%", height: "80%", left: "30%" },
    backgroundColor: "none",
  };

  return (
    <div className="div-line-chart">
      <Chart
        chartType="LineChart"
        width="100%"
        height="200px"
        data={props.lineData}
        options={options}
      />
    </div>
  );
}

export default LineChart;
