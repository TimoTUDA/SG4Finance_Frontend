import React, { Component } from "react";
import { withRouter } from "../../utils/WithRouter.js";
import API from "../../utils/API.js";

class StartGameButton extends Component {
  state = {};

  handleOnClick = () => {
    let default_player_name = "";
    let default_start_situation = "arm";
    let default_game_mode = "arbeitslos";
    let default_session_key = "1"; // 1 = neue Session aufmachen, Buchstabe = Session beitreten

    //console.log("StartButtonPressed:");
    //console.log(this.props);

    if (this.props.variant === 2) {
      this.props.settingIDs.player_name += "_multi_player";
      this.props.settingIDs.start_situation += "_multi_player";
      this.props.settingIDs.game_mode += "_multi_player";
      this.props.settingIDs.session_key += "_multi_player";
    }

    if (this.props.settingIDs != null) {
      if (document.getElementById(this.props.settingIDs.player_name) != null) {
        default_player_name = document.getElementById(
          this.props.settingIDs.player_name
        ).value;
        //console.log("Name: " + default_player_name);
      }
      if (
        document.getElementById(this.props.settingIDs.start_situation) != null
      ) {
        default_start_situation = document.getElementById(
          this.props.settingIDs.start_situation
        ).value;
      }
      if (document.getElementById(this.props.settingIDs.game_mode) != null) {
        default_game_mode = document.getElementById(
          this.props.settingIDs.game_mode
        ).value;
      }
      if (this.props.variant === 2) {
        // Session_key existiert nur in variant == 2 (Multiplayer)
        if (
          document.getElementById(this.props.settingIDs.session_key) != null
        ) {
          default_session_key = document.getElementById(
            this.props.settingIDs.session_key
          ).value;
        }
      }
    }

    let settings =
      default_player_name +
      ":" +
      default_start_situation +
      ":" +
      default_game_mode +
      (this.props.variant === 2 ? ":" + default_session_key : ":0");

    //console.log("Settings für Spielstart:");
    //console.log(settings);

    switch (this.props.variant) {
      case 0:
        {
          API.createGame(settings).then((response) => {
            if (response) {
              const { access_token, navigate, ...data } = response;
              data.showIntro = true;
              this.props.navigate(this.props.link, {
                replace: true,
                state: data,
              });
            }
            this.props.onSetDisable(false);
          });
        }
        break;

      case 1:
        {
          API.getGame(this.props.navigate).then((response) => {
            if (response) {
              const { access_token, navigate, ...data } = response;
              this.props.navigate(this.props.link, {
                replace: true,
                state: data,
              });
            }
            this.props.onSetDisable(false);
          });
        }
        break;

      case 2:
        {
          API.createGame(settings).then((response) => {
            if (response) {
              const { access_token, navigate, ...data } = response;
              data.showIntro = true;
              this.props.navigate(this.props.link, {
                replace: true,
                state: data,
              });
            }
            this.props.onSetDisable(false);
          });
        }
        break;
      default:
        {
        }
        break;
    }
  };

  getStyle() {
    let style = { ...this.props.style };
    if (this.props.variant === 1 && !localStorage.getItem("token")) {
      style.display = "none";
    }
    return style;
  }

  render() {
    return (
      <div
        onClick={() => {
          this.props.onSetDisable(true);
          this.handleOnClick();
        }}
        variant="primary"
        style={this.getStyle()}
        className={this.props.classes}
        disabled={this.props.isDisabled}
      >
        {this.props.text}
      </div>
    );
  }
}

export default withRouter(StartGameButton);
