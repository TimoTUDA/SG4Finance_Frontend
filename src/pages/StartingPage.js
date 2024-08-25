import StartGameButton from "../components/starting page/StartGameButton";
import React, { Component } from "react";
import { Col, Container, Row, Image, ButtonGroup } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import InfoDialog from "../components/InfoDialog";
import "../styles/NavBar.css";
import "../styles/StartingPage.scss";
import StartingPanel from "../components/starting page/StartingPanel";
import { BsListOl } from "react-icons/bs";
import { Link } from "react-router-dom";

class StartingPage extends Component {
  state = {
    buttonIsDisabled: false,
  };

  handleButtonDisable = (buttonIsDisabled) => {
    this.setState({ buttonIsDisabled });
  };

  render() {
    return (
      <>
        <Container fluid className="d-flex flex-column gradient">
          <Row className="mt-5 d-flex">
            <Col md="12" className="d-flex justify-content-center">
              <Image fluid src={"/StartPage.png"} className="main-img"></Image>
            </Col>
          </Row>
          <Row className="py-5 d-flex flex-grow-1 align-items-end">
            <Col className="text-center">
              <ButtonGroup>
                <StartingPanel
                  onSetDisable={this.handleButtonDisable}
                  isDisabled={this.state.buttonIsDisabled}
                  variant={0}
                  link="/game"
                  text="Neues Spiel Starten"
                  classes={"btn-lg btn-start mx-3 btnStyle border-0"}
                />
              </ButtonGroup>
              <ButtonGroup>
                <StartGameButton
                  onSetDisable={this.handleButtonDisable}
                  isDisabled={this.state.buttonIsDisabled}
                  variant={1}
                  link="/game"
                  text="Spiel Fortsetzen"
                  classes={"btn-lg mx-3 box border-0"}
                  settingIDs={{
                    player_name: "player_name",
                    start_situation: "startSituation",
                    game_mode: "game_mode",
                  }}
                />
              </ButtonGroup>
              <ButtonGroup>
                <StartingPanel
                  onSetDisable={this.handleButtonDisable}
                  isDisabled={this.state.buttonIsDisabled}
                  variant={2}
                  link="/game"
                  text="Spiel Beitreten"
                  classes={"btn-lg btn-start mx-3 btnStyle border-0"}
                />
              </ButtonGroup>
              <ButtonGroup>
                <Link to="/interestPage">
                  <button
                    className="myButton"
                    href="/interestPage"
                    classes={"btn-lg btn-start mx-3 btnStyle border-0"}
                  >
                    Investment Rechner
                  </button>
                </Link>
              </ButtonGroup>
              <ButtonGroup>
                <Link to="/settings">
                  <button
                    className="myButton"
                    href="/settings"
                    classes={"btn-lg btn-start mx-3 btnStyle border-0"}
                  >
                    Settings
                  </button>
                </Link>
              </ButtonGroup>
              <ButtonGroup>
                <InfoDialog variant={1}></InfoDialog>
              </ButtonGroup>
              <ButtonGroup>
                <Link to="/leaderboard">
                  <IconButton aria-label="delete">
                    <BsListOl className="Icon" />
                  </IconButton>
                </Link>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default StartingPage;
