import React from "react";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import "../../styles/InfoDialog.css";
import "../../styles/StartingPanel.css";
import StartGameButton from "./StartGameButton.js";

export default class StartingPanel extends React.Component {
  state = {
    buttonIsDisabled: false,
  };

  handleButtonDisable = (buttonIsDisabled) => {
    this.setState({ buttonIsDisabled });
  };

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
      case 0:
        return (
          <DialogContent className="Dialog StartingPanel">
            <DialogContentText
              className="Dialog"
              id="alert-dialog-slide-description"
              component={"div"}
            >
              <h1 className="">Game Settings</h1>
              <form>
                <div className="form-group mt-3">
                  <label for="text">Spielername</label>
                  <input
                    id="player_name"
                    className="form-control Dialog border-0"
                    type="text"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="form-group mt-3 Dialog">
                  <label for="text">Start Situation</label>
                  <select
                    id="start_situation"
                    className="form-control Dialog border-0"
                  >
                    <option selected="selected">arm</option>
                    <option>normal</option>
                    <option>reich</option>
                  </select>
                  <label for="text">Spielmodus</label>
                  <select
                    id="game_mode"
                    className="form-control Dialog border-0"
                  >
                    <option>langfristige Planung</option>
                    <option>hoher Gewinn</option>
                    <option selected="selected">arbeitslos</option>
                    <option>sandbox</option>
                  </select>
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
        );

      case 1:
        return <></>;

      case 2:
        return (
          <DialogContent className="Dialog StartingPanel">
            <DialogContentText
              className="Dialog"
              id="alert-dialog-slide-description"
              component={"div"}
            >
              <h1 className="">Game Settings</h1>
              <form>
                <div className="form-group mt-3">
                  <label for="text">Spielername</label>
                  <input
                    id="player_name_multi_player"
                    className="form-control Dialog border-0"
                    type="text"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <label for="text">Sessionkey</label>
                  <input
                    id="session_key_multi_player"
                    className="form-control Dialog border-0"
                    type="text"
                    placeholder="SessionKey"
                    aria-label="SessionKey"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="form-group mt-3 Dialog">
                  <label for="text">Start Situation</label>
                  <select
                    id="start_situation_multi_player"
                    className="form-control Dialog border-0"
                  >
                    <option selected="selected">arm</option>
                    <option>normal</option>
                    <option>reich</option>
                  </select>
                  <label for="text">Spielmodus</label>
                  <select
                    id="game_mode_multi_player"
                    className="form-control Dialog border-0"
                  >
                    <option>langfristige Planung</option>
                    <option>hoher Gewinn</option>
                    <option selected="selected">arbeitslos</option>
                  </select>
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
        );

      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <div className="box" aria-label="delete" onClick={this.handleClickOpen}>
          {this.props.text}
        </div>
        <Dialog
          className="Dialog text-center"
          open={this.state.open}
          keepMounted
          onClose={this.handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          {this.setText(this.props.variant)} 
          <DialogActions className="Dialog" sx={{ justifyContent: "center" }}>
            <StartGameButton
              onSetDisable={this.handleButtonDisable}
              isDisabled={this.state.buttonIsDisabled}
              variant={this.props.variant}
              link={this.props.link}
              text={this.props.text}
              classes={"mx-3 box border-0"}
              settingIDs={{
                player_name: "player_name",
                start_situation: "start_situation",
                game_mode: "game_mode",
				session_key: "session_key"
              }}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
