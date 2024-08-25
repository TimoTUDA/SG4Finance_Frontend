import React from "react";

enum Variabels {
  PrimaryColor = "--bs-primary",
  SecondaryColor = "--bs-secondary",
  button = "--button",
  buttonBorderColor = "--button-border-color",
  BackgroundColor = "--bg-color",
  navbarColor = "--navbar-color",
  Footer = "--footer",
  BackButton = "--back-button-color",
  LoadingSpin1 = "--loading-spin-color1",
  LoadingSpin2 = "--loading-spin-color2",
  GradientColor1 = "--gradient-color1",
  GradientColor2 = "--gradient-color2",
  EventButton = "--event-button-color",
  DashbordCard = "--dashbord-card-color",
  CapitolCard = "--capital-card-color",
  NeedsText = "--needs-text-color",
  TitleText = "--title-text-color",
  CapitalText = "--capital-text-color",
  TextColor = "--text-color",
  NavbarText = "--navbar-text-color",
  EventText = "--event-bg-color",
  BackToStartButton = "--back-to-start-button-color",
  BackButtonText = "--back-button-text",
  BackToStartButtonText = "--back-to-start-button-text-color",
  buttonTextColor = "--button-text-color",
  StartingPageGradient1 = "--StartingPageGradient1",
  StartingPageGradient2 = "--StartingPageGradient2",
  StartingPageGradient3 = "--StartingPageGradient3",
  StartingPageGradient4 = "--StartingPageGradient4",
  arrowUpColor = "--arrow-up-color",
  arrowDownColor = "--arrow-down-color",
  PlayerNameColor = "--player-name-color"
}


function changeColorTheme(name, newColor) {
  document.documentElement.style.setProperty(name, newColor, "important");
}

export default function ColorHandler(colors) {

  for (let i = 0; i < Object.keys(Variabels).length; i++) {
    //console.log("set " + Object.values(Variabels).at(i) + "to " + Object.values(colors).at(i))
    changeColorTheme(Object.values(Variabels).at(i), Object.values(colors).at(i))
  }

}
