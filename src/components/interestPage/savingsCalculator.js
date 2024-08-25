import React, { useState, useEffect } from "react";
import { withRouter } from "../../utils/WithRouter.js";
import { Col, Row } from "react-bootstrap";
import "../../styles/interestPage.css";
import CustomBarChart from "./customBarChart";

function SavingsCalculator(props) {
  //calculate for base Variable on load of window
  useEffect(() => {
    calculateEndCapital();
  }, []);

  const [startCapital, setStartCapital] = useState(1000);
  const [endCapital, setEndCapital] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(100);
  const [monthlySavingsIncrease, setMonthlySavingsIncrease] = useState(2);
  const [years, setYears] = useState(40);
  const [interestRate, setInterestRate] = useState(7);
  const [barChartData, setBarChartData] = useState([]);

  const handleChangeStartCapital = (event) => {
    setStartCapital(parseFloat(event.target.value));
  };

  const handleChangeMonthlyInvestment = (event) => {
    setMonthlyInvestment(parseFloat(event.target.value));
  };

  const handleChangeMonthlySavingsIncrease = (event) => {
    setMonthlySavingsIncrease(parseFloat(event.target.value));
  };

  const handleChangeYears = (event) => {
    setYears(parseInt(event.target.value));
  };

  const handleChangeInterestRate = (event) => {
    setInterestRate(parseFloat(event.target.value));
  };

  //This is the logic to calculate the Investment
  //please note that this considers yearly interest and not monthly
  //you may change this by converting the yearly interest to a monthly interest
  const calculateEndCapital = () => {
    const data = [];

    let total = 0;
    let yearlyInvestment = 0;
    let yearlyInterest = 0;
    let interestTotal = 0;
    let monthlyTotal = 0;
    //console.log(monthlyInvestment)
    total = startCapital;
    interestTotal = 0;
    for (let i = 1; i <= years; i++) {
      monthlyTotal =
        monthlyInvestment + monthlyTotal * (monthlySavingsIncrease / 100);
      //console.log(monthlyTotal)
      yearlyInvestment += monthlyTotal * 12;
      yearlyInterest = total * (interestRate / 100);
      interestTotal += yearlyInterest;
      total = startCapital + yearlyInvestment + interestTotal;
      //console.log("Year: {i}, Yearly Investment: {yearlyInvestment}, Yearly Interest: {yearlyInterest}, Total: {total}")

      data.push({
        year: i,
        startCapital: startCapital.toFixed(2),
        monthlyInvestment: yearlyInvestment.toFixed(2),
        interest: interestTotal.toFixed(2),
        total: total,
      });
    }
    //console.log(total);
    document.getElementById("endInvestmentField").value =
      total.toFixed(2).toString() + "€";
    setBarChartData(data);
    setEndCapital(total);
  };

  const handleCalculate = (event) => {
    event.preventDefault();
    calculateEndCapital();
  };

  const handleBackToStartingScreen = () => {
    props.navigate("/", { replace: true });
  };

  return (
    <div className="background">
      <div className="header">
        <button
          onClick={handleBackToStartingScreen}
          className="material-icons button-back d-flex ps-4"
        >
          arrow_back
        </button>
        <div className="header-text">Investment Rechner</div>
      </div>

      <form onSubmit={handleCalculate}>
        <Row className="margin">
          <Col xs="1"></Col>
          <Col xs="5">Startkapital:</Col>
          <Col xs="5" className="zinseszins-window-align-right">
            <input
              className="myTextFields"
              type="number"
              id="inputStartCapital"
              step="250"
              min="0"
              value={startCapital}
              onChange={handleChangeStartCapital}
            />
          </Col>
        </Row>

        <Row className="margin">
          <Col xs="1"></Col>
          <Col xs="5">Anlagezeitraum:</Col>
          <Col xs="5" className="zinseszins-window-align-right">
            <input
              className="myTextFields"
              type="number"
              id="inputYears"
              placeholder="1"
              step="1"
              min="1"
              value={years}
              onChange={handleChangeYears}
            />
          </Col>
        </Row>

        <Row className="margin">
          <Col xs="1"></Col>
          <Col xs="5">Monatliches Investment:</Col>
          <Col xs="5" className="zinseszins-window-align-right">
            <input
              className="myTextFields"
              type="number"
              id="monthlyInvestmentInput"
              step="10"
              min="0"
              value={monthlyInvestment}
              onChange={handleChangeMonthlyInvestment}
            />
          </Col>
        </Row>

        <Row className="margin">
          <Col xs="1"></Col>
          <Col xs="5">Monatliche Spardynamik (%):</Col>
          <Col xs="5" className="zinseszins-window-align-right">
            <input
              className="myTextFields"
              type="number"
              id="inputInvestmentDynamics"
              min="0"
              value={monthlySavingsIncrease}
              onChange={handleChangeMonthlySavingsIncrease}
            />
          </Col>
        </Row>

        <Row className="margin">
          <Col xs="1"></Col>
          <Col xs="5">Jährliche Zinsen (%):</Col>
          <Col xs="5" className="zinseszins-window-align-right">
            <input
              className="myTextFields"
              type="number"
              min="0"
              value={interestRate}
              onChange={handleChangeInterestRate}
            />
          </Col>
        </Row>

        <Row className="margin">
          <Col xs="1"></Col>
          <Col xs="5">Endsumme:</Col>
          <Col xs="5" className="zinseszins-window-align-right">
            <input className="myTextFields" id="endInvestmentField" readOnly />
          </Col>
        </Row>

        <Row className="margin">
          <Col xs="12" className="zinseszins-window-align-center">
            <input className="myButton" type="submit" value="Calculate" />
          </Col>
        </Row>
      </form>

      <div
        style={{ margin: "4rem", display: "flex", justifyContent: "center" }}
      >
        <CustomBarChart data={barChartData} />
      </div>
    </div>
  );
}

export default withRouter(SavingsCalculator);
