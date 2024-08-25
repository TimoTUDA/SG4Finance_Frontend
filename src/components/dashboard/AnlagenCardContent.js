// import react
import * as React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

// import mui
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DialogContent } from "@mui/material";

// import custom
import "../../styles/CategoryInvestment.css";
import LineChart from "./LineChart";
import LoadingSpinner from "./LoadingSpinner";
import { DivNumber } from "../../utils/Utils";
import styled from "styled-components";

const MyAppBar = styled(AppBar)`
  background-color: var(--bg-color) !important;
  color: var(--text-color) !important;
`;

const MyDialogContent = styled(DialogContent)`
  background-color: var(--dashbord-card-color) !important;
  color: var(--text-color) !important;
`;

export default function AnlagenCardContent(props) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  // show loading when data is still being retrieved from api
  function handleChartLoading(
    lineData,
    catName,
    investmentName,
    lineDataLength
  ) {
    if (lineDataLength !== 0) {
      return (
        <LineChart
          title="Line chart"
          lineData={lineData[catName][investmentName]}
        ></LineChart>
      );
    } else {
      return <LoadingSpinner />;
    }
  }

  return (
    <div>
      <ListGroup>
        {props.category_investments.map((category_investments) => (
          <ListGroup.Item
            key={category_investments.category.name}
            className="mb-2 category-investment"
            action
            onClick={() => {
              setIndex(
                props.category_investments.indexOf(category_investments)
              );
              setOpen(true);
            }}
          >
            <Row>
              <Col xs="3" className="text-01">
                {" "}
                {/* Name der Kategorie */}
                <Tooltip title="Kategorie-Name" arrow>
                  <div>{category_investments.category.name}</div>
                </Tooltip>
              </Col>

              <Col xs="3" className="text-01">
                {" "}
                {/* Aktueller Gesamtwert der Kategorie */}
                <Tooltip title="Gesamt-Wert" arrow>
                  {DivNumber(
                    category_investments.category_overall_amount + category_investments.category_current_amount,
                    0,
                    "€"
                  )}
                </Tooltip>
              </Col>

              <Col xs="3" className="text-01">
                {" "}
                {/* Prozentuale Änderung seit letzter Runde */}
                <Tooltip title="Änderung seit letzter Runde" arrow>
                  {DivNumber(
                    100 * category_investments.category_difference_percent,
                    2,
                    "%",
                    true
                  )}
                </Tooltip>
              </Col>

              <Col xs="3" className="text-01">
                {" "}
                {/* Gesamtbilanz der Kategorie seit letzter Runde */}
                <Tooltip title="Änderung seit letzter Runde" arrow>
                  {DivNumber(
                    category_investments.category_difference_amount,
                    0,
                    "€",
                    true
                  )}
                </Tooltip>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        PaperProps={{ style: { backgroundColor: "#606060" } }}
      >
        <MyAppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </MyAppBar>

        <MyDialogContent>
          <Container fluid>
            <Row className="investment align-items-center">
              <Col xs="2" className="text-02">
                Name
              </Col>
              <Col xs="3" className="text-02">
                Verlauf
              </Col>
              <Col xs="2" className="text-02">
                Wert
              </Col>
              <Col xs="3" className="text-02">
                Investment
              </Col>
              <Col xs="2" className="text-02">
                Bilanz
              </Col>
            </Row>
          </Container>

          {/* Loop über jedes category_investment.investments element (type: investment) */}
          {props.category_investments[index].investments.map((investment) => (
            <ListGroup.Item key={investment.investment.name}>
              <Container fluid>
                <Row className="investment d-flex flex-row mt-2 align-items-center">
                  <Tooltip title="Investment-Name" arrow>
                    <Col xs="2" className="text-01">
                      {investment.investment.name}
                    </Col>
                  </Tooltip>

                  <Col xs="3" className="p-0">
                    {handleChartLoading(
                      props.lineData,
                      props.category_investments[index].category.name,
                      investment.investment.name,
                      Object.keys(props.lineData).length
                    )}
                  </Col>

                  <Col xs="2">
                    <Tooltip title="Aktueller Wert" arrow>
                      {DivNumber(investment.asset_value, "auto", "€")}
                    </Tooltip>
                    <Tooltip title="Veränderung zur letzten Runde" arrow>
                      {DivNumber(
                        100 * investment.difference_percent,
                        "auto",
                        "%",
                        true,
                        true
                      )}
                    </Tooltip>
                  </Col>

                  <Col xs="3">
                    <Row className=" d-flex flex-row mt-3 align-items-center">
                      <Tooltip title="Aktuelles Investment" arrow>
                        <div className="text-01 margin-bot05em">
                          {DivNumber(investment.overall_amount, 0, "€")}
                        </div>
                      </Tooltip>
                    </Row>

                    <Row className="gx-1 d-flex felx-row align-items-center">
                      <Col xs="2" align="center">
                        <img
                          src="Button_Investment_Decrease_Max.png"
                          alt="Decrease Max"
                          width="32"
                          height="32"
                        />
                        <img
                          className="glow32"
                          src="Button_Investment_Decrease_Max.png"
                          alt="Decrease Max"
                          width="32"
                          height="32"
                          onClick={() => {
                            props.onSetValue(investment, -investment.overall_amount);
                          }}
                        />
                      </Col>

                      <Col xs="2" align="center">
                        <img
                          src="Button_Investment_Decrease.png"
                          alt="Decrease"
                          width="32"
                          height="32"
                        />
                        <img
                          className="glow32"
                          src="Button_Investment_Decrease.png"
                          alt="Decrease"
                          width="32"
                          height="32"
                          onClick={() => {
                            props.onSetValue(investment, investment.current_amount - 1000);
                          }}
                        />
                      </Col>

                      <Col xs="4" align="center">
                        <Tooltip title="Neues Investment" arrow>
                          <div className="text-01">
                            {DivNumber(
                              investment.current_amount +
                                investment.overall_amount,
                              0,
                              "€"
                            )}
                          </div>
                        </Tooltip>
                      </Col>

                      <Col xs="2" align="center">
                        <img
                          src="Button_Investment_Increase.png"
                          alt="Increase"
                          width="32"
                          height="32"
                        />
                        <img
                          className="glow32"
                          src="Button_Investment_Increase.png"
                          alt="Increase"
                          width="32"
                          height="32"
                          onClick={() => {
                            props.onSetValue(investment, investment.current_amount + 1000);
                          }}
                        />
                      </Col>

                      <Col xs="2" align="center">
                        <img
                          src="Button_Investment_Increase_Max.png"
                          alt="Increase Max"
                          width="32"
                          height="32"
                        />
                        <img
                          className="glow32"
                          src="Button_Investment_Increase_Max.png"
                          alt="Increase Max"
                          width="32"
                          height="32"
                          onClick={() => {
                            props.onSetValue(investment, investment.current_amount + props.currentCapital);
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className=" d-flex flex-row mt-3 align-items-center">
                      <Col xs="5"></Col>

                      <Col xs="2" align="center">
                        <img
                          src="Button_Investment_Undo.png"
                          alt="Undo"
                          width="32"
                          height="32"
                        />
                        <img
                          className="glow32"
                          src="Button_Investment_Undo.png"
                          alt="Undo"
                          width="32"
                          height="32"
                          onClick={() => {
                            props.onSetValue(investment, 0);
                          }}
                        />
                      </Col>

                      <Col xs="5"></Col>
                    </Row>
                  </Col>

                  <Col xs="2">
                    <Tooltip title="Gewinn seit letzter Runde" arrow>
                      {DivNumber(investment.difference_amount, 0, "€", true)}
                    </Tooltip>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          ))}
        </MyDialogContent>
      </Dialog>
    </div>
  );
}
