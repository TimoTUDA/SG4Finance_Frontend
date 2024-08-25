import React, { Component } from "react";

import "rc-slider/assets/index.css";
import { withRouter } from "../utils/WithRouter.js";
//import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import SavingsCalculator from "../components/interestPage/savingsCalculator";
import CustomBarChart from "../components/interestPage/customBarChart.js";
class InterestPage extends Component {
  //This page is supposed to show the SavingsCalculator Component. All logic is implemented there
  state = {
    buttonIsDisabled: false,
  };

  handleButtonDisable = (buttonIsDisabled) => {
    this.setState({ buttonIsDisabled });
  };

  render() {
    return (
      <div>
        <div>
          <SavingsCalculator></SavingsCalculator>
        </div>
      </div>
    );
  }
}

export default withRouter(InterestPage);
