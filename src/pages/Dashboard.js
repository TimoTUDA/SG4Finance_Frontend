import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Navbar,
  Row,
} from "react-bootstrap";
import { withRouter } from "../utils/WithRouter.js";
import API from "../utils/API.js";
import InfoDialog from "../components/InfoDialog";
import EndRoundButton from "../components/dashboard/EndRoundButton";
import CardContent from "@mui/material/CardContent";
import OverviewPieChart from "../components/dashboard/OverviewPieChart";
import "../styles/Dashboard.scss";
import "../styles/EndRoundButton.scss";
import MultiplayerList from "../components/dashboard/MultiplayerList.js";
import Utils from "../utils/Utils.js";
import AnlagenCardContent from "../components/dashboard/AnlagenCardContent.js";
import CardNeeds from "../components/dashboard/CardNeeds.js";
import Glossary from "../components/dashboard/Glossary.tsx";
import GoalProgress from "../components/dashboard/GoalProgress.js";
import EndingScreen from "../components/dashboard/EndingScreen.js";
import CarouselAdvisor from "../components/dashboard/CarouselAdvisor.js";
import ColorMode from "../components/colorThemes/ColorMode.tsx";

class Dashboard extends Component {
  state = this.getStateWithCurrent({
    ...Utils.copyObject(this.props),
    showEvent: false,
    showMoralEvent: false,
    lineData: {},
  });

  
  roundData = {};

 
  catInvestmentList = this.state.category_investments.map((cat) => [
    cat.category.name,
  ]);

  render() {
    return (
      <>
        {this.dashboardNavbar()}
        {this.dashboardEndscreen()}

        <Container fluid className="App px-3 pt-3 d-flex h-100 gradient">
          <Row className="h-100 w-100">
            <Col sm="4" md="3" xl="2" className="h-100">
              <Row>
                <Col md="12">
                  <Card className="dashboard-card h-100">
                    <Card.Body>
                      <Card.Title>
                        <div className="size-title">{this.lobbyTitle()}</div>
                        {this.divSessionID()}
                      </Card.Title>
                      <Col className="h-100 d-flex flex-column">
                        <MultiplayerList
                          players={this.playersEveryone()}
                        ></MultiplayerList>
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* right side: Aktueller Stand (oben), Anlagen, Bedürfnisse, Events, Portfolio*/}
            <Col sm="8" md="9" xl="10" className="h-100 d-flex flex-column">
              <Row>
                {/* goal card: */}
                <Col md="12">
                  <Card className="progress-card px-3">
                    <Card.Body>
                      <GoalProgress
                        goal={this.state.game.gamemode.win_threshold}
                        totalMoney={this.getTotalMoney()}
                        current_capital={this.state.game.current_capital}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="pt-4">
                {/* investments card: */}
                <Col xl="6" md="12">
                  <Card className="dashboard-card px-2">
                    <Card.Body>
                      <Card.Title>
                        <div className="size-title d-flex justify-content-center align-items-center">
                          <div className="emoji">&#x1F4C8;</div>
                          ANLAGEN
                          <div className="emoji">&#x1F4C9;</div>
                        </div>
                      </Card.Title>

                      <Col>
                        <AnlagenCardContent
                          category_investments={this.state.category_investments}
                          onSetValue={this.investmentSet}
                          currentCapital={this.state.game.current_capital}
                          currentRound={this.state.game.current_round}
                          lineData={this.state.lineData}
                        ></AnlagenCardContent>
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>

                {/* needs card: */}
                <Col xl="6" md="12">
                  <Card className="dashboard-card px-2">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <div className="size-title">BEDÜRFNISSE</div>
                      </Card.Title>

                      <Col xs="12" className="py-0">
                        <CardNeeds
                          needs={this.state.needs_investments}
                          valueUpdateHandler={this.needsAdd}
                        />
                      </Col>

                      <Row>
                        <Col xs="2"></Col>
                        <Col xs="10">
                          <Row>
                            <Col xs="2"> {this.generateButton(0.0)} </Col>
                            <Col xs="2"> {this.generateButton(0.33)} </Col>
                            <Col xs="2"> {this.generateButton(0.5)} </Col>
                            <Col xs="2">{this.generateButton(0.66)} </Col>
                            <Col xs="2"> {this.generateButton(1.0)} </Col>
                          </Row>
                        </Col>
                        <Col xs="2"></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="pt-4">
                {/* overall pie card: */}
                <Col xl="6" md="12">
                  <Card className="dashboard-card px-2">
                    {" "}
                    {/*was hat sich jetzt hier geändert durch px-3 ?*/}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-center">
                        <div className="size-title">EVENTS</div>
                      </Card.Title>

                      <Row className="py-0">
                        <Col xs="6">
                          <ListGroup>
                            <ListGroupItem className="mb-2 category-investment text-01">
                              {this.state.moralEvent !== null
                                ? this.state.moralEvent.name
                                : "Persönliches Event"}
                            </ListGroupItem>
                          </ListGroup>
                        </Col>

                        <Col xs="6">
                          <ListGroup>
                            <ListGroupItem className="mb-2 category-investment text-01">
                              {this.state.event !== null
                                ? this.state.event.name
                                : "Welt Event"}
                            </ListGroupItem>
                          </ListGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="6">
                          <ListGroup>
                            <ListGroupItem className="mb-2 category-investment blocksatz">
                              {this.state.moralEvent !== null
                                ? this.state.moralEvent.text
                                : ""}
                            </ListGroupItem>
                          </ListGroup>
                        </Col>

                        <Col xs="6">
                          <ListGroup>
                            <ListGroupItem className="mb-2 category-investment blocksatz">
                              {this.state.event !== null
                                ? this.state.event.text
                                : ""}
                            </ListGroupItem>
                          </ListGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                {/* current pie card: */}
                <Col xl="6" md="12" className="pt-sm-4 pt-xl-0">
                  <Card className="dashboard-card">
                    <CardContent>
                      <div className="card-title size-title">PORTFOLIO</div>
                      <Row>
                        <Col xs="6">
                          <OverviewPieChart
                            pieData={this.totalPieChartData(this.state)}
                            title={"GESAMT"}
                          ></OverviewPieChart>
                        </Col>
                        <Col xs="6">
                          <OverviewPieChart
                            pieData={this.currentPieChartData(this.state)}
                            title={"AKTUELL"}
                          ></OverviewPieChart>
                        </Col>
                      </Row>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
              <Row className="pt-4 pb-3 flex-grow-1">
                <Col md="12" className="d-flex align-items-start ">
                  <Col md="4" className="flex-row d-flex">
                    <CarouselAdvisor />
                    {/* Glossary toggle button */}
                    <div className="ms-2">
                      <Glossary />
                    </div>
                  </Col>

                  <Col md="4">
                    <EndRoundButton
                      data={{ ...this.state }}
                      onNextRound={this.handleNextRound}
                    />
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  /**
   * Wird nach dem Rendern des Components aufgerufen. Ruft die API auf, um die Spiel- und Investitionsdaten abzurufen, aktualisiert den Spielzustand und erstellt die Daten für die Liniendiagramme.
   * @returns {void}
   */
  componentDidMount() {
    setTimeout(() => {
      // Verzögere den API-Aufruf um einige Millisekunden & mache ihn asynchron
      API.getGame(this.props.navigate).then((response) => {
        // Rufe die API auf, um die Spiel- und Investitionsdaten abzurufen.
        if (response) {
          // Wenn die API-Antwort erfolgreich ist:
          let stateWithCurrent = this.getStateWithCurrent({ ...response });
          this.roundData = this.getDefaultRoundData(stateWithCurrent);
          this.setState(stateWithCurrent);
          this.createLineChartData(this.catInvestmentList).then((data) => {
            this.setState({ lineData: data });
          });
        }
      });
    });
  }

  /**
   * Parses investment data from API response into a dictionary with investment values per round
   * @param {object} apiResult - The API response containing investment data
   * @returns {object} Dictionary containing investment values per round
   */
  parseRoundInvestments(apiResult) {
    let dictFinal = {};
    for (let roundData of apiResult.rounds) {
      const roundNr = roundData.round_number;
      for (let catInvestment of roundData.category_investments) {
        for (let investment of catInvestment.investments) {
          let investmentName = investment.investment.name;
          let assetValue = investment.asset_value;

          if (dictFinal[investmentName] === undefined) {
            dictFinal[investmentName] = [["ROUND", investmentName]];
          }
          dictFinal[investmentName].push([roundNr, assetValue]);
        }
      }
    }
    return dictFinal;
  }

  async createLineChartData(presentCategoriesList) {
    let retrievedCatInvestments = {};
    retrievedCatInvestments.total = [];

    for (let category of presentCategoriesList) {
      let categoryString = JSON.stringify(category).replace(/]|[[]/g, "");
      let catInvestmentsFromApi = await API.getCategoryInvestments(
        null,
        categoryString
      );

      if (catInvestmentsFromApi) {
        // init dictionary key
        if (retrievedCatInvestments[category] === undefined) {
          retrievedCatInvestments[category] = {};
        }
        retrievedCatInvestments[category] = this.parseRoundInvestments(
          catInvestmentsFromApi
        );

        retrievedCatInvestments.total.push(catInvestmentsFromApi);
      }
    }

    // get total investments per round
    let list = [];
    for (let i = 1; i <= this.state.game.current_round; i++) {
      list.push({ round: i, overall_amount: 0, difference_amount: 0 });
    }

    for (let cat of retrievedCatInvestments.total) {
      for (let round of cat.rounds) {
        let rnd = round.round_number;
        if (rnd > 0) {
          for (let investment of round.category_investments) {
            list[rnd - 1].round = rnd;
            list[rnd - 1].overall_amount += investment.category_overall_amount;
            list[rnd - 1].difference_amount +=
              investment.category_difference_amount;
          }
        }
      }
    }

    retrievedCatInvestments.total = list;

    return retrievedCatInvestments;
  }

  handleBackToStartingScreen = () => {
    this.props.navigate("/", { replace: true });
  };

  totalPieChartData = (data) => {
    // first row of data to send to pie chart creation
    const chartData = [
      ["Investment Type", "Amount"],
      ["Bargeld", data.game.current_capital],
    ];

    const catData = data.category_investments.map((cat) => [
      cat.category.name,
      cat.category_overall_amount + cat.category_current_amount,
    ]);
    for (let idc in catData) {
      chartData.push(catData[idc]);
    }
    return chartData;
  };

  currentPieChartData = (data) => {
    // init data with
    const chartData = [
      ["Investment Type", "Amount"],
      ["Bargeld", data.game.current_capital],
    ];

    const catData = data.category_investments.map((cat) => [
      cat.category.name,
      cat.category_current_amount > 0 ? cat.category_current_amount : 0,
    ]);

    for (let idc in catData) {
      chartData.push(catData[idc]);
    }

    // for need categories:
    const needData = data.needs_investments.map((cat) => [
      cat.category.name,
      cat.category_current_amount > 0 ? cat.category_current_amount : 0,
    ]);

    for (let idc in needData) {
      chartData.push(needData[idc]);
    }

    return chartData;
  };

  handleNextRound = (data) => {
    let stateWithCurrent = this.getStateWithCurrent({
      ...Utils.copyObject(data),
    });
    stateWithCurrent.showEvent = false;
    stateWithCurrent.showMoralEvent = false;
    stateWithCurrent.lineData = {};

    this.roundData = this.getDefaultRoundData(stateWithCurrent);
    this.setState(stateWithCurrent);

    this.createLineChartData(this.catInvestmentList).then((data) => {
      this.setState({ lineData: data });
    });
  };

  /**
   * add current_investment and needs data to (state) object
   * @param {*} data
   * @returns
   */
  getStateWithCurrent(data) {
    let state = { ...data };
    for (let category of state.category_investments) {
      category.category_current_amount = 0;
      for (let investment of category.investments) {
        investment.current_amount = 0;
      }
    }

    /* ------- for needs ------- */
    let needs_investments = [
      {
        category: {
          name: "Wohnung",
        },
        category_max_amount: state.game.morals[0].housing_max,
        category_current_amount: state.game.morals[0].housing_investment,
      },
      {
        category: {
          name: "Gesundheit",
        },
        category_max_amount: state.game.morals[0].health_max,
        category_current_amount: state.game.morals[0].health_investment,
      },
      {
        category: {
          name: "Freizeit",
        },
        category_max_amount: state.game.morals[0].freetime_max,
        category_current_amount: state.game.morals[0].freetime_investment,
      },
    ];

    let needs_investment_sum =
      state.game.morals[0].housing_investment +
      state.game.morals[0].health_investment +
      state.game.morals[0].freetime_investment;

    if (needs_investment_sum <= state.game.current_capital) {
      state.game.current_capital -= needs_investment_sum;
    } else {
      needs_investments[0].category_current_amount = 0;
      needs_investments[1].category_current_amount = 0;
      needs_investments[2].category_current_amount = 0;
    }

    state.needs_investments = needs_investments;
    /* --------------------- */
    //console.log("getStateWithCurrent")
    //console.log(state)
    return state;
  }

  /**
   * Generates a button component with a click handler and a percentage value displayed as text.
   * @param {Number} percentage - The value to be displayed and passed as argument to the needsSet function.
   * @returns {ReactElement} - The generated button component.
   */
  generateButton(percentage) {
    return (
      <Button
        onClick={() => {
          this.needsSet(percentage);
        }}
      >
        <span className="size-reset-btn">{percentage * 100}%</span>
      </Button>
    );
  }

  /**
   * getDefaultRoundData returns a new object with updated properties.
   * @param {Object} data - The original data object to be copied and updated.
   * @return {Object} defaultData - A new object with updated properties.
   */
  getDefaultRoundData(data) {
    let defaultData = Utils.copyObject(data);
    let needs_investment_sum =
      defaultData.game.morals[0].housing_investment +
      defaultData.game.morals[0].health_investment +
      defaultData.game.morals[0].freetime_investment;
    defaultData.game.current_capital += needs_investment_sum;
    defaultData.needs_investments[0].category_current_amount = 0;
    defaultData.needs_investments[1].category_current_amount = 0;
    defaultData.needs_investments[2].category_current_amount = 0;
    return defaultData;
  }

  /**
   * Calculates the total amount of money a player has.
   * @return {number} Total amount of money a player has
   */
  getTotalMoney() {
    return (
      this.investmentGetAll() +
      this.needsGetAll() +
      this.state.game.current_capital
    );
  }

  /**
   * Calculates the total amount of investments made by a player.
   * @return {number} Total amount of investments made by a player
   */
  investmentGetAll() {
    let sum = 0;
    for (var i = 0; i < this.state.category_investments.length; i++) {
      sum +=
        this.state.category_investments[i].category_overall_amount +
        this.state.category_investments[i].category_current_amount;
    }
    return sum;
  }

  /**
   * Calculates the difference of all the category investments
   * @returns {number} the sum of all category investments' difference amount
   */
  investmentGetDifference() {
    let sum = 0;
    for (let i = 0; i < this.state.category_investments.length; i++) {
      sum += this.state.category_investments[i].category_difference_amount;
    }
    return sum;
  }

  /**
   * Returns the title for the lobby section based on the number of players in the game lobby.
   * @returns {string} - The title of the lobby section, which is either "Spielerliste" or "Spielerliste (number of players)".
   */
  lobbyTitle() {
    let lobbyName = "Spielerliste";
    if (this.state.game.lobby != null) {
      lobbyName = `(${this.state.game.lobby.number_of_players}) ${lobbyName}`;
    }
    return lobbyName;
  }

  /**
   * This function returns a div element containing the session ID of the current lobby.
   * If there is no lobby, it returns an empty string.
   * @return {JSX.Element | string}
   */
  divSessionID() {
    if (this.state.game.lobby) {
      return (
        <div className="size-normal">
          SessionID: ({this.state.game.lobby.access_key})
        </div>
      );
    }
    return "";
  }

  /**
   * Returns an array of all the players in the game, including the current player.
   * @returns {Array} playerList - An array of all the players in the game, including the current player.
   * 								 Each player is represented as an object with the following properties:
   *									- name: the name of the player
   *									- capital: the current capital of the player
   *									- lastCapital: the capital of the player in the previous round
   *									- salary (only for the current player): the salary of the player
   *									- investment_money (only for the current player): the difference between
   *														 the investment money in the current round and the previous round
   *									- needs_money (only for the current player): the total amount of money needed
   *																					to cover all the needs
   *									- event_money (only for the current player): the value of the current event
   *									- currentRound (only for other players): the current round of the player
   */
  playersEveryone() {
    let playerList = [];
    playerList.push(this.playersMyself());
    if (this.state.game.lobby != null) {
      for (let i = 0; i < this.state.game.lobby.number_of_players; i++) {
        if (
          this.state.game.player_name ===
          this.state.game.lobby.players[i].player_name
        )
          continue;
        let player = {};
        player.name = this.state.game.lobby.players[i].player_name;
        player.capital = this.state.game.lobby.players[i].current_capital;
        player.lastCapital = this.state.game.lobby.players[i].previous_capital;
        player.currentRound = this.state.game.lobby.players[i].current_round;
        player.investment = this.state.game.lobby.players[i].current_investment;
        player.lastInvestment =
          this.state.game.lobby.players[i].previous_investment;
        playerList.push(player);
      }
    }
    return playerList;
  }

  /**
   * playersMyself - Returns an object with information about the player
   * @returns {Object} player - An object containing information about the player, including their name, capital, salary, investment_money, needs_money, and event_money
   */
  playersMyself() {
    let player = {};
    player.name = this.state.game.player_name;
    player.capital = this.state.game.current_capital;
    player.lastCapital = this.state.game.previous_capital;
    player.salary =
      this.state.game.gamemode.round_salary *
      this.state.game.round_salary_multiplier;
    player.investment = this.state.game.current_investment;
    player.previous_investment = this.state.game.previous_investment;
    player.investment_money = this.investmentGetDifference();
    player.needs_money = -this.needsGetAll();
    let event_money = 0;
    if (this.state.event) event_money += this.state.event.value;
    if (
      this.state.moralEvent &&
      this.state.moralEvent.moral_operation_type === "1"
    )
      event_money += this.state.moralEvent.value;
    player.event_money = event_money;
    return player;
  }

  /**
   * Berechnet die Gesamtmenge an Geld, die für Bedürfnisse ausgegeben wurde.
   * @returns {Number} sum - Gesamtmenge an Geld, die für Bedürfnisse ausgegeben wurde
   */
  needsGetAll() {
    let sum = 0;
    for (var i = 0; i < this.state.needs_investments.length; i++) {
      sum += this.state.needs_investments[i].category_current_amount;
    }
    return sum;
  }

  /**
   * Sets the investment amount for all needs to a given percentage of their max amount
   * @param {number} percentage - The percentage of the max amount to set as the investment amount (0 <= percentage <= 1)
   * @returns {undefined} - This function does not return a value.
   */
  needsSet(percentage) {
    let stateCpy = Utils.copyObject(this.state);
    stateCpy.needs_investments.forEach((investment) => {
      this.needsSetWithoutUpdate(
        investment,
        percentage * investment.category_max_amount,
        stateCpy
      );
    });
    this.setState({ ...stateCpy });
  }

  /**
   * Add investment to a need and update the state.
   * @param {object} need - The need to add investment to.
   * @param {number} amount - The investment amount to add.
   * @returns {undefined} - This function does not return a value.
   */
  needsAdd = (need, amount) => {
    let stateCpy = Utils.copyObject(this.state);
    this.needsAddWithoutUpdate(
      stateCpy.needs_investments[this.state.needs_investments.indexOf(need)],
      amount,
      stateCpy
    );
    this.setState({ ...stateCpy });
  };

  /**
   * Set the investment of a need without updating the state.
   * @param {object} need - The need to set investment for.
   * @param {number} value - The new investment value.
   * @param {object} stateCpy - A copy of the current state.
   * @returns {undefined} - This function does not return a value.
   */
  needsSetWithoutUpdate(need, value, stateCpy) {
    let amount = value - need.category_current_amount;
    this.needsAddWithoutUpdate(need, amount, stateCpy);
  }

  /**
   * Add investment to a need without updating the state.
   * @param {object} need - The need to add investment to.
   * @param {number} amount - The amount of investment to add.
   * @param {object} stateCpy - A copy of the current state.
   * @returns {undefined} - This function does not return a value.
   */
  needsAddWithoutUpdate(need, amount, stateCpy) {
    amount = Math.min(
      need.category_max_amount - need.category_current_amount,
      Math.max(-need.category_current_amount, amount)
    );
    if (
      need.category_current_amount + amount >= 0 &&
      stateCpy.game.current_capital - amount >= 0
    ) {
      need.category_current_amount += amount;
      stateCpy.game.current_capital -= amount;
    }
  }

  /**
   * Setzt den aktuellen Betrag des gegebenen Investments auf den gegebenen Wert und aktualisiert den Spielzustand.
   * @param {Object} investment - Das Investment, dessen Betrag aktualisiert wird.
   * @param {number} value - Der Wert, auf den der aktuelle Betrag des Investments gesetzt wird.
   * @returns {void}
   */
  investmentSet = (investment, value) => {
    // Berechne die Differenz zwischen dem neuen und dem aktuellen Betrag des Investments
    const amount = value - investment.current_amount;
    // Füge die Differenz zum Investment hinzu und aktualisiere den Spielzustand
    this.investmentAdd(investment, amount);
  };

  /**
   * Fügt einen Betrag zu einem bestehenden Investment hinzu und aktualisiert den Spielzustand.
   * @param {Object} investment - Das Investment, dem der Betrag hinzugefügt wird.
   * @param {number} amount - Der Betrag, der hinzugefügt wird.
   * @returns {void}
   */
  investmentAdd = (investment, amount) => {
    let categoryID = -1;
    let investmentID = 0;
    // Suche die Kategorie und das Investment, das dem gegebenen Investment entspricht
    for (var i = 0; i < this.state.category_investments.length; i++) {
      investmentID =
        this.state.category_investments[i].investments.indexOf(investment);
      if (investmentID !== -1) {
        categoryID = i;
        break;
      }
    }
    // Wenn das Investment gefunden wurde, füge den Betrag hinzu und aktualisiere den Spielzustand
    if (categoryID !== -1) {
      let stateCpy = Utils.copyObject(this.state);
      this.investmentAddWithoutUpdate(
        stateCpy.category_investments[categoryID],
        stateCpy.category_investments[categoryID].investments[investmentID],
        amount,
        stateCpy
      );
      this.setState({ ...stateCpy });
    }
  };

  /**
   * Fügt ein Investment zu einer Kategorie hinzu, ohne das Spiel-Update zu aktualisieren.
   * @param {Object} category - Die Kategorie, zu der das Investment hinzugefügt wird.
   * @param {Object} investment - Das Investment, das hinzugefügt wird.
   * @param {number} amount - Der Betrag des Investments.
   * @param {Object} stateCpy - Eine Kopie des aktuellen Spielzustands.
   * @returns {void}
   */
  investmentAddWithoutUpdate(category, investment, amount, stateCpy) {
    if (investment.overall_amount + investment.current_amount + amount < 0) {
      amount = -(investment.current_amount + investment.overall_amount);
    }
    if (stateCpy.game.current_capital - amount < 0) {
      amount = stateCpy.game.current_capital;
    }
    investment.current_amount += amount;
    category.category_current_amount += amount;
    stateCpy.game.current_capital -= amount;
  }

  dashboardNavbar() {
    return (
      <Navbar>
        <button
          onClick={this.handleBackToStartingScreen}
          className="material-icons button-back d-flex ps-4"
        >
          arrow_back
        </button>
        <Container className="size-normal">
          <div>Young Money TU</div>
          <div>
            Runde:{" "}
            {this.state.game.current_round >= 20
              ? 20
              : this.state.game.current_round}{" "}
            / {this.state.game.gamemode.end_round}
          </div>
          <div>
            <InfoDialog isOpen={this.state.showIntro} variant={2}></InfoDialog>
          </div>
          <div>
            <ColorMode />
          </div>
        </Container>
      </Navbar>
    );
  }

  dashboardEndscreen() {
    if (this.state.game.won !== null) {
      return (
        <EndingScreen
          goal={this.state.game.gamemode.win_threshold}
          currentRound={this.state.game.current_round}
          totalMoney={this.getTotalMoney()}
          totalInvestments={this.state.lineData.total}
          currentCapital={this.state.game.current_capital}
          handleBackToStartingScreen={this.handleBackToStartingScreen}
        />
      );
    }
  }
}

export default withRouter(Dashboard);
