import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Col, Container, Image, Row } from "react-bootstrap";
import "../styles/InfoDialog.css";

export default class InfoIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.isOpen === undefined ? false : props.isOpen,
    };
    this.handleClick = this.handleClickOpen.bind(this);
    this.handleClick = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setText(variant) {
    switch (variant) {
      case 1:
        return (
          <>
            <h5>
              <b>Was ist Young Money?</b>
            </h5>
            <p>
              Young Money ist ein interaktives Spiel, bei dem es darum geht,
              Wissen über Finanzen und Lebensplanung zu vermitteln, indem man
              eine virtuelle Simulation des wirtschaftlichen Lebens durchspielt.
              Es ist eine spaßige Möglichkeit, wichtige Fähigkeiten im Umgang
              mit Geld und Budgetierung zu erlernen.
            </p>
            <h5>
              <b>Was ist mein Ziel?</b>
            </h5>
            <p>
              Das Ziel des Spiels ist es, möglichst viel Geld zu verdienen, aber
              auch daran zu denken, dass man Geld für persönliche Bedürfnisse
              ausgeben muss. Du musst also eine geschickte Balance finden, um
              erfolgreich im Spiel zu sein.
            </p>
            <h5>
              <b>Wie wird gespielt?</b>
            </h5>
            <p>
              Das Spiel wird in Runden gespielt, in denen du Entscheidungen über
              deine finanziellen Mittel treffen musst. Jede Runde stellt einen
              Zeitraum deines Lebens dar und du musst entscheiden, wie du dein
              Geld verwenden möchtest, um möglichst viel davon zu verdienen. Am
              Ende des Spiels geht es darum, das meiste Geld anzusammeln und
              sich als erfolgreicher Spieler zu beweisen.
            </p>
            <p>
              Zusammenfassend kann man sagen, dass Young Money ein wertvolles
              Lern- und Unterhaltungstool ist, das junge Menschen dabei hilft,
              wichtige finanzielle Fähigkeiten zu erwerben. Es ist unterhaltsam,
              lehrreich und eine großartige Möglichkeit, um ein besseres
              Verständnis für das wirtschaftliche Leben zu erlangen. Probiere es
              jetzt aus und starte deine Reise zu einer erfolgreichen
              finanziellen Zukunft!
            </p>
            <h5>
                <b>Spielmodi</b>
            </h5>
            <p>
                langfristige Planung: Du musst innerhalb von 20 Runden ein Vermögen von über von 100000€ erlangen und es für 5 Runden halten. 
            </p>
            <p>
                hoher Gewinn: Du musst innerhalb von 25 Runden ein Vermögen von über 150000€ erlangen.
            </p>
            <p>
                arbeitslos: Du musst innerhalb von 20 Runden ein Vermögen von über 100000€ erlangen, erhälst aber kein Gehalt pro Runde.
            </p>
          </>
        );

      case 2:
        return (
          <Container>
            <Row>
              <Col md="12" className="text-center mb-4">
                <h1>Willkommen bei Young Money!</h1>
                <Row className="d-flex">
                  <Col>
                    <Image src={"/wsb_kid.png"}></Image>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-center">
                    Young Money dreht sich um Geldmanagement und darum, wie man
                    durch verschiedene Investitionen möglichst viel Geld
                    verdient. Vergiss aber nicht, dass es auch wichtig ist, sich
                    um persönliche Bedürfnisse und Notsituationen zu kümmern.
                  </Col>
                </Row>
              </Col>
              <Col md="12">
                <h5>
                  <b>Wie wird gespielt?</b>
                </h5>
                <p>
                  Das Spiel ist in Runden organisiert, in denen du entscheidest,
                  was du mit deinem Geld und Gehalt machen möchtest. Eine Runde
                  symbolisiert dabei einen Zeitabschnitt deines Lebens. Über die
                  Grafiken hast du einen Überblick über deine Gesamtaufteilung
                  und die Aufteilung der aktuellen Runde.
                </p>
              </Col>
              <Col md="12">
                <h5>
                  <b>Wie kann ich investieren?</b>
                </h5>
                <p>
                  <b>Anlagen</b> siehst du verschiedene Kategorien von
                  Investitionen. Klicke auf eine Kategorie, um sie dir genauer
                  anzusehen. Nutze dann dort die Pfeile, um deine Investition
                  für die aktuelle Runde anzupassen. Wenn du dann deine Runde
                  beendest wird dein Investment getätigt und die neue Runde
                  beginnt. <br /> Tipp: Mit shift + klick kann direkt mehr
                  investiert werden
                </p>
              </Col>
              <Col md="12">
                <h5>
                  <b>Was ist mit meinen Bedürfnissen?</b>
                </h5>
                <p>
                  In der Kachel <b>Ausgaben</b> kannst du in deine Bedürfnisse
                  investieren. Vernachlässigst du Wohnung, Gesundheit oder
                  Freizeit zu sehr, kann das negative Auswirkungen haben. Halte
                  deine Bedürfnisse im Auge, das kann auch positive Auswirkungen
                  haben.
                </p>
              </Col>
            </Row>
          </Container>
        );

      default:
        break;
    }
  }

  getStyle(variant) {
    switch (variant) {
      case 1:
        return "sm";
      case 2:
        return "xl";
      default:
    }
  }

  render() {
    return (
      <div>
        <IconButton aria-label="delete" onClick={this.handleClickOpen}>
          <BsFillInfoCircleFill className="Icon" />
        </IconButton>
        <Dialog
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth={this.getStyle(this.props.variant)}
        >
          <DialogContent className="Dialog">
            <DialogContentText
              className="Dialog"
              id="alert-dialog-slide-description"
              component={"div"}
            >
              {this.setText(this.props.variant)}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="Dialog" sx={{ justifyContent: "center" }}>
            <Button className="Button" onClick={this.handleClose}>
              Alles klar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
