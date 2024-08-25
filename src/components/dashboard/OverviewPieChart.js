import React from "react";
import { Chart } from "react-google-charts";
import "../../styles/Dashboard.scss";

/**
 * Data to be passed in the form: [["",""],["", x],[]....]
 * First element is two strings, the others string description and corresponding value
 * @param props
 * @returns {JSX.Element}
 */
function overviewPieChart(props) {
  /**
   * Options
   * @type {{pieSliceText: string, pieStartAngle: number, legend: string, title: string}}
   */
  const options = {
    title: props.title,
    //titlePosition: "none",
    // legend: "none",
    pieSliceText: "label",
    pieStartAngle: 180,
    pieHole: 0.4,
    is3D: false,
    backgroundColor: "transparent",
    legend: { position: "bottom", maxLines: 2 }, // maxLines only works for position: "top" for some reason
  };

  return (
    <div className="h-100">
      {/* <div className="card-title size-title">{props.title}</div>  */}
      <Chart
        chartType="PieChart"
        data={props.pieData}
        options={options}
        width={"100%"}
        height={"250px"}
        legend_toggle
        colors={"#FB7A21"}
        backgroundColor="transparent"
      />
    </div>
  );
}

export default overviewPieChart;
