import { Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import { DivNumber } from "../../utils/Utils";
import "../../styles/MultiplayerList.css";

export default function MultiplayerList(params) {
  //console.log(params.players);
  // players[i].capital
  // players[i].name

  const printInvestmentMoney = (player) => {
    return params.players.indexOf(player) === 0 ? (
      <Row className="no-padding no-margin">
        <Col xs="6" className="no-padding no-margin">
          <div className="multiplayer-description-text">Investment Trend:</div>
        </Col>
        <Col xs="6" className="no-padding no-margin">
          {DivNumber(player.investment_money, 0, "€", true)}
        </Col>
      </Row>
    ) : (
      ""
    );
  };

  const printNeedsMoney = (player) => {
    return params.players.indexOf(player) === 0 ? (
      <Row className="no-padding no-margin">
        <Col xs="6" className="no-padding no-margin">
          <div className="multiplayer-description-text">Bedürfnisse:</div>
        </Col>
        <Col xs="6" className="no-padding no-margin">
          {DivNumber(player.needs_money, 0, "€", true)}
        </Col>
      </Row>
    ) : (
      ""
    );
  };

  const printSalary = (player) => {
    return params.players.indexOf(player) === 0 ? (
      <Row className="no-padding no-margin">
        <Col xs="6" className="no-padding no-margin">
          <div className="multiplayer-description-text">Gehalt:</div>
        </Col>
        <Col xs="6" className="no-padding no-margin">
          {DivNumber(player.salary, 0, "€", true)}
        </Col>
      </Row>
    ) : (
      ""
    );
  };

  const printEventMoney = (player) => {
    return params.players.indexOf(player) === 0 ? (
      <Row className="no-padding no-margin">
        <Col xs="6" className="no-padding no-margin">
          <div className="multiplayer-description-text">Events:</div>
        </Col>
        <Col xs="6" className="no-padding no-margin">
          {DivNumber(player.event_money, 0, "€", true)}
        </Col>
      </Row>
    ) : (
      ""
    );
  };

  return (
    <div>
      <ListGroup>
        {params.players.map((player) => (
          <ListGroupItem
			className = "category-investment"
		  >
            <Row>
              <Row className="no-padding no-margin multiplayer-player-name">
                <div>
                  <br></br>
				  {params.players.indexOf(player) !== 0 ? (" (" + player.currentRound + ") "): ""}
                  {player.name}
                </div>
              </Row>
              <hr style={{ color: "black", height: "2px" }} />
              <Row className="no-padding no-margin">
                <Col xs="6" className="no-padding no-margin">
                  <div className="emoji-small">&#x1F4B8;</div>
                </Col>
                <Col xs="6" className="no-padding no-margin">
                  {DivNumber(player.capital, 0, "€")}
                </Col>
              </Row>
              <Row className="no-padding no-margin">
                <Col xs="6" className="no-padding no-margin">
                  <div className="multiplayer-description-text">Trend:</div>
                </Col>
                <Col xs="6" className="no-padding no-margin">
                  {DivNumber(player.capital - player.lastCapital, 0, "€", true)}
                </Col>
              </Row>
              <Row className="no-padding no-margin">
                <Col xs="6" className="no-padding no-margin">
                  <div className="multiplayer-description-text">Investment:</div>
                </Col>
                <Col xs="6" className="no-padding no-margin">
                  {DivNumber(player.investment, 0, "€")}
                </Col>
              </Row>
              {printInvestmentMoney(player)}
              {printSalary(player)}
              {printNeedsMoney(player)}
              {printEventMoney(player)}
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
