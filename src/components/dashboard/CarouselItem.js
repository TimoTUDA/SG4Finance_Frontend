import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "../../styles/Carousel.css";

/**
 * item that goes inside of the carousel
 */
class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.itemText = props.itemText;
    this.itemTitle = props.itemTitle;
    this.image = props.image;
  }

  render() {
    return (
      <Container className="item-container">
        <Row>
          <Col md="12">
            <Image src={this.image} className="img-carousel"></Image>
          </Col>
          <Col md="12" className="d-flex justify-content-center">
            <h4>{this.itemTitle}</h4>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md="12">
            <p>{this.itemText}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CarouselItem;
