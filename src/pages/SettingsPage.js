import React, { Component } from "react";
import { withRouter } from "../utils/WithRouter.js";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API.js";
import "../styles/StartingPage.scss";
import { Link } from "react-router-dom";
import ColorMode from "../components/colorThemes/ColorMode.tsx";

class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      round_salary: 2000,
      win_threshold: 10000,
      inflation: 0.01,
      start_capital: 1000,
      probability_event: 0.28,
      rounds_to_win: 5,
      end_round: 25,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      round_salary,
      win_threshold,
      inflation,
      start_capital,
      probability_event,
      rounds_to_win,
      end_round,
    } = this.state;
    const settings = {
      mode: "sandbox",
      round_salary: round_salary,
      win_threshold: win_threshold,
      inflation: inflation,
      start_capital: start_capital,
      probability_event: probability_event,
      rounds_to_win: rounds_to_win,
      end_round: end_round,
    };

    const gameData = await API.createGame(settings);
    //console.log(gameData)
    //if (gameData) {
    //show the success Message
    document.getElementById("successMessage").style.visibility = "visible";
    setTimeout(
      () =>
        (document.getElementById("successMessage").style.visibility = "hidden"),
      1500
    );
    //}
  };

  handleBackToStartingScreen = () => {
    this.props.push("/");
  };

  handleReset = () => {
    this.setState({
      round_salary: 2000,
      win_threshold: 10000,
      inflation: 0.01,
      start_capital: 1000,
      probability_event: 0.28,
      rounds_to_win: 5,
      end_round: 25,
    });
  };

  render() {
    const {
      round_salary,
      win_threshold,
      inflation,
      start_capital,
      probability_event,
      rounds_to_win,
      end_round,
    } = this.state;

    return (
      <>
        <div className="d-flex align-items-center">
          <Link to="/">
            <button
              href="/"
              onClick={this.handleBackToStartingScreen}
              className="material-icons button-back d-flex ps-4"
            >
              arrow_back
            </button>
          </Link>
          <h2 style={{ marginLeft: "25%" }}>Settings für den Sandbox Modus</h2>
        </div>
        <div className="mx-auto">
          <ColorMode />
        </div>
        <Form className="mx-auto" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formround_salary">
            <Form.Label>Gehalt pro Runde</Form.Label>
            <Form.Control
              type="number"
              placeholder="Gib dein Gehalt pro Runde ein"
              value={round_salary}
              onChange={(event) =>
                this.setState({ round_salary: event.target.value })
              }
              min="0"
              step="100"
              max="10000"
              required
            />
          </Form.Group>

          <Form.Group controlId="formwin_threshold">
            <Form.Label>win_threshold</Form.Label>
            <Form.Control
              type="number"
              placeholder="Gib ein wieviel Geld du zum Gewinnen brauchst"
              value={win_threshold}
              onChange={(event) =>
                this.setState({ win_threshold: event.target.value })
              }
              min="10000"
              step="250"
              required
            />
          </Form.Group>

          <Form.Group controlId="formInflation">
            <Form.Label>Inflation</Form.Label>
            <Form.Control
              type="number"
              placeholder="Gib die Inflationsrate ein"
              value={inflation}
              onChange={(event) =>
                this.setState({ inflation: event.target.value })
              }
              min="0.01"
              step="0.01"
              max="0.5"
              required
            />
          </Form.Group>

          <Form.Group controlId="formstart_capital">
            <Form.Label>start_capital</Form.Label>
            <Form.Control
              type="number"
              placeholder="Gib dein start_capital ein"
              value={start_capital}
              onChange={(event) =>
                this.setState({ start_capital: event.target.value })
              }
              min="1000"
              step="100"
              required
            />
          </Form.Group>

          <Form.Group controlId="formprobability_event">
            <Form.Label>Event Probability</Form.Label>
            <Form.Control
              type="number"
              placeholder="Gib die Wahrscheinlichkeit für Events ein"
              value={probability_event}
              onChange={(event) =>
                this.setState({ probability_event: event.target.value })
              }
              min="0.01"
              step="0.01"
              max="1"
              required
            />
          </Form.Group>

          <Form.Group controlId="formrounds_to_win">
            <Form.Label>Rounds To Win</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rundenanzahl, die du über die Zielsumme vermögen musst"
              value={rounds_to_win}
              onChange={(event) =>
                this.setState({ rounds_to_win: event.target.value })
              }
              min="1"
              step="1"
              required
            />
          </Form.Group>

          <Form.Group controlId="formend_round">
            <Form.Label>End Round</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wieviele Runden möchtest du maximal spielen?"
              value={end_round}
              onChange={(event) =>
                this.setState({ end_round: event.target.value })
              }
              min="1"
              step="1"
              required
            />
          </Form.Group>

          <Button className="myButton" variant="primary" type="submit">
            Einstellungen speichern
          </Button>
          <Button
            className="myButton"
            onClick={this.handleReset}
            variant="primary"
            type="submit"
          >
            Einstellungen zurücksetzen
          </Button>
        </Form>

        <Form.Label style={{ visibility: "hidden" }} id="successMessage">
          Einstellungen wurden gespeichert
        </Form.Label>
      </>
    );
  }
}

export default withRouter(SettingsPage);
