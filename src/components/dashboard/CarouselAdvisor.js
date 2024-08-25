import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "./CarouselItem";
import * as React from "react";
import { Box, Button, Modal } from "@mui/material";
import "../../styles/Carousel.css";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

export default function CarouselAdvisor() {
  const imagesList = [
    "/stonks.png",
    "/bear_bull.png",
    "/wsb_kid.png",
    "/crypto.png",
    "/bank.png",
    "/car.png",
  ];

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const itemsList = require("../data/financialTips.json");

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const toggleCarousel = (open) => {
    setOpen(open);
  };

  return (
    <div>
      <Button
        id="open-carousel"
        className="btn-carousel"
        onClick={() => toggleCarousel(true)}
        variant="outlined"
      >
        <TipsAndUpdatesRoundedIcon />
        <span className="txt-tips-btn">Finanzielle Tipps</span>
      </Button>

      <Modal open={open} onClose={() => toggleCarousel(false)}>
        <Box className="carousel-box">
          <Carousel
            interval={15000}
            activeIndex={index}
            onSelect={handleSelect}
            variant="dark"
          >
            {itemsList.map((item) => (
              <Carousel.Item key={item.index}>
                <CarouselItem
                  itemTitle={item.title}
                  itemText={item.text}
                  image={
                    imagesList[Math.floor(Math.random() * imagesList.length)]
                  }
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Box>
      </Modal>
    </div>
  );
}
