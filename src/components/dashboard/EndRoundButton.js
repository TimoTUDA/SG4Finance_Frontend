import React, { Component } from "react";
import { withRouter } from "../../utils/WithRouter.js";
import API from "../../utils/API.js";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "../../styles/EndRoundButton.scss";
import Utils from "../../utils/Utils.js";

class EndRoundButton extends Component {
  constructor(props) {
    super(props);
    this.endRoundButton = React.createRef();
  }

  state = { isOpen: false, isDisabled: false };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
    this.endRoundButton.current.blur();
  };

  handleNextRound = () => {
    this.setState({ isDisabled: true });
    API.endRound(this.props.navigate, this.getEndRoundData()).then(
      (response) => {
        if (response) {
          if (response.information) {
            alert("Spiel beendet!");
            this.setState({ isOpen: false, isDisabled: false });
            return;
          }
          this.props.onNextRound(response);
        }
        this.setState({ isOpen: false, isDisabled: false });
      }
    );
  };

  getEndRoundData() {
    let stateCpy = Utils.copyObject(this.props.data);
    for (let category of stateCpy.category_investments) {
      for (let investment of category.investments) {
        investment.overall_amount += investment.current_amount;
      }
    }
    // update moral investments
    stateCpy.game.morals[0].housing_investment =
      stateCpy.needs_investments[0].category_current_amount;
    stateCpy.game.morals[0].health_investment =
      stateCpy.needs_investments[1].category_current_amount;
    stateCpy.game.morals[0].freetime_investment =
      stateCpy.needs_investments[2].category_current_amount;

    stateCpy.lineData = null;
    return stateCpy;
  }

  render() {
    return (
      <>
        <button
          className="end-round-button size-end-btn mx-3 px-3"
          onClick={this.handleOpen}
          ref={this.endRoundButton}
          disabled={this.state.isOpen}
        >
          Runde beenden
        </button>
        <Modal show={this.state.isOpen} centered onHide={this.handleClose}>
          <Modal.Body className="bg-color">
            <Container>
              <Row>
                <Col md="12">
                  <h4>Runde beenden?</h4>
                </Col>
                {this.props.data.game.current_capital < 1500 && (
                  <Col md="12" className="d-flex align-items-center">
                    <span className="text-danger size-normal">
                      Achtung: Du hast sehr wenige Geldreserven!
                    </span>
                  </Col>
                )}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="bg-color">
            <Button variant="secondary" onClick={this.handleClose}>
              Noch nicht!
            </Button>
            <Button
              disabled={this.state.isDisabled}
              onClick={this.handleNextRound}
            >
              Ja
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(EndRoundButton);
