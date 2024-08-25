// import react
import * as React from "react";
import {Col, ListGroup, ListGroupItem, ProgressBar, Row} from "react-bootstrap";
import { BsFillInfoCircleFill } from "react-icons/bs";

// import mui
import Tooltip from "@mui/material/Tooltip";

// import custom
import "../../styles/CategoryInvestment.css";
import { DivNumber } from "../../utils/Utils";

/**
 * @param {Array} needs List of Needs
 * @param {Function} valueUpdateHandler (e.g. needsAdd)
 */
export default function CardNeeds(props) {
  //console.log(props);
  return (
    <div>
      <Tooltip title="Investitionen in Bedürfnisse lösen mit einer gewissen Wahrscheinlichkeit persönliche Events aus. Bei 0% ist ein negatives, bei 100% ein positives Event garantiert. Bei 50% werden weder negative, noch positive Events auftreten. Es kann maximal ein Event gleichzeitig eintreten (alles auf 100% zu setzen ist also sinnlos)" arrow>
        <div className="info">
          <BsFillInfoCircleFill />
        </div>
      </Tooltip>
      <ListGroup>
        {props.needs.map((need) => (
          <ListGroupItem
            key={need.category.name}
            className="mb-2 category-investment"
          >
            <Row>
              <Col xs="3" className="text-01">
                <Tooltip title="Kategorie-Name" arrow>
                  <div>{need.category.name}</div>
                </Tooltip>
              </Col>

              <Col xs="2" className="text-01">
                <Tooltip title="maximal" arrow>
                  {DivNumber(need.category_max_amount)}
                </Tooltip>
              </Col>

              <Col xs="7" className="text-01">
                <Row className="gx-1 d-flex felx-row align-items-center">
                  <Col xs="2" align="center">
                    <img
                      src="Button_Investment_Decrease.png"
                      alt="Decrease"
                      width="24"
                      height="24"
                    />
                    <img
                      className="glow24"
                      src="Button_Investment_Decrease.png"
                      alt="Decrease"
                      width="24"
                      height="24"
                      onClick={(e) => {
                        props.valueUpdateHandler(
                          need,
                          -50 * (e.shiftKey ? 1 : 2)
                        );
                      }}
                    />
                  </Col>

                  <Col xs="8" align="center">
                    <ProgressBar
                      className="progress-needs"
                      variant="info"
                      striped
                      now={need.category_current_amount}
                      max={need.category_max_amount}
                    ></ProgressBar>
                    <div className="progress-needs-text">
                      <Tooltip title="Aktuelles Investment" arrow>
                        {DivNumber(need.category_current_amount)}
                      </Tooltip>
                    </div>
                    {/*
							Nur Jesus weiß wie man hier die Farben (frei) ändert...
							Es gibt ein paar voreinstellungen aber die sind kacke
							<= 25% -> Gefahr
							<= 50% "okay"
							> 50% gut */}
                  </Col>

                  <Col xs="2" align="center">
                    <img
                      src="Button_Investment_Increase.png"
                      alt="Increase"
                      width="24"
                      height="24"
                    />
                    <img
                      className="glow24"
                      src="Button_Investment_Increase.png"
                      alt="Increase"
                      width="24"
                      height="24"
                      onClick={(e) => {
                        props.valueUpdateHandler(
                          need,
                          50 * (e.shiftKey ? 1 : 2)
                        );
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
