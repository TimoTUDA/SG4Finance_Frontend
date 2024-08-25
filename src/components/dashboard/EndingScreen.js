import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import GoalProgress from "./GoalProgress";

function EndingScreen(props) {
  const [isOpen, SetIsOpen] = useState(true);

  const level_1 = 0.6;
  const level_2 = 0.7;
  const level_3 = 0.8;
  const level_4 = 0.9;
  const level_5 = 1;

  function getInvestmentsMoney() {
    return props.totalInvestments === undefined
      ? null
      : props.totalInvestments.reduce(
          (sum, cur) => sum + cur.difference_amount,
          0
        );
  }

  function showInvestmentsMoney() {
    if (getInvestmentsMoney() === null) {
      return (
        <span className="spinner-container-small">
          <span className="loading-spinner-small"></span>
        </span>
      );
    } else {
      return (
        <span className={getClassName(getInvestmentsMoney())}>
          {getInvestmentsMoney().toLocaleString()}€
        </span>
      );
    }
  }

  function getClassName(value) {
    if (value > 0) return "color-green";
    else if (value < 0) return "color-red";
  }

  function getHouseImg(value) {
    if (value < level_1) return "dog_house.png";
    else if (value < level_2) return "plattenbau.png";
    else if (value < level_3) return "haus1.png";
    else if (value < level_4) return "haus2.png";
    else if (value < level_5) return "haus_big.png";
    else if (value >= level_5) return "villa2.png";
  }

  function getCarImg(value) {
    if (value < level_1) return "bike.png";
    else if (value < level_2) return "scooter.png";
    else if (value < level_3) return "car_small.png";
    else if (value < level_4) return "car_normal.png";
    else if (value < level_5) return "car.png";
    else if (value >= level_5) return "car_big.png";
  }

  return (
    <Dialog maxWidth={"100%"} open={isOpen}>
      <Container>
        <Row>
          <Col md="12" className="pt-3 text-center">
            <h1>Spiel beendet!</h1>
          </Col>
          {props.currentCapital < 0 && (
            <Col md="12">
              <h4 className="text-center text-danger">
                Du hast keine Bargeld-Reserven mehr! Du konntest eine Rechnung
                nicht mehr bezahlen!
              </h4>
            </Col>
          )}
          <Col md="12" className="p-5 text-center">
            <GoalProgress
              goal={props.goal}
              totalMoney={props.totalMoney}
              currentCapital={props.current_capital}
            />
          </Col>
          <Col md="12" className="pt-3 text-center">
            <h4>Du hast das Spiel in Runde {props.currentRound} beendet!</h4>
          </Col>
          <Col md="12">
            <h4 className="text-center" style={{}}>
              Es wurde insgesamt {showInvestmentsMoney()} mit Investitionen
              verdient!
            </h4>
          </Col>
          {props.totalMoney >= props.goal && (
            <>
              <Col md="12">
                <h4 className="text-center">
                  <div className="emoji">&#129351;</div>
                  Das Ziel von{" "}
                  <span className="goal-value">
                    {props.goal.toLocaleString()}€
                  </span>{" "}
                  wurde erreicht!
                  <div className="emoji">&#129351;</div>
                </h4>
              </Col>
              <Col md="12">
                <h4 className="text-center">
                  <div className="emoji">&#129351;</div>
                  Du hast gewonnen!
                  <div className="emoji">&#129351;</div>
                </h4>
              </Col>
            </>
          )}
          {props.totalMoney < props.goal && (
            <>
              <Col md="12">
                <h4 className="text-center">
                  <div className="emoji">&#10060;</div>
                  Das Ziel von{" "}
                  <span className="goal-value">
                    {props.goal.toLocaleString()}€
                  </span>{" "}
                  wurde nicht erreicht!
                  <div className="emoji">&#10060;</div>
                </h4>
              </Col>
              <Col md="12">
                <h4 className="text-center">
                  <div className="emoji">&#10060;</div>
                  Du hast verloren!
                  <div className="emoji">&#10060;</div>
                </h4>
              </Col>
            </>
          )}

          <Col md="12">
            <Row className="d-flex justify-content-center flex-row pt-5">
              <Col md="6" className="align-items-center d-flex flex-column">
                <h4 className="text-center ">Deine Wohnung</h4>
                <Image
                  style={{ height: "250px" }}
                  fluid
                  src={
                    "/achievement-images/" +
                    getHouseImg(props.totalMoney / props.goal)
                  }
                ></Image>
              </Col>
              <Col md="6" className="align-items-center d-flex flex-column">
                <h4 className="text-center">Dein Fahrzeug</h4>
                <Image
                  style={{ height: "250px" }}
                  fluid
                  src={
                    "/achievement-images/" +
                    getCarImg(props.totalMoney / props.goal)
                  }
                ></Image>
              </Col>
            </Row>
          </Col>
          <Col md="12">
            <Row className="pt-5 pb-4 align-items-center flex-column">
              <Col md="6">
                <button
                  className="endscreen-button size-end-btn px-3"
                  onClick={() => {
                    SetIsOpen(false);
                    props.handleBackToStartingScreen();
                  }}
                >
                  Zurück zur Startseite
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Dialog>
  );
}

export default EndingScreen;
