import React, { Component } from "react";
import { withRouter } from "../utils/WithRouter.js";
import "../styles/NavBar.css";
import "../styles/Leaderboard.scss";

import { Container, Navbar, Table } from "react-bootstrap";

const dummydata = [
  {
    name: "Helm's Deep",
    rank: 1,
    money: 232342,
    sol: 30,
  },
  {
    name: "Minas Tirih",
    rank: 2,
    money: 14433,
    sol: 32,
  },
  {
    name: "Moria",
    rank: 3,
    money: 233234,
    sol: 10,
  },
  { name: "Edoras", rank: 4, money: 334534, sol: 23 },
  {
    name: "Rivendell",
    rank: 5,
    money: 44345,
    sol: 10,
  },
];

class Leaderboard extends Component {
  state = {
    buttonIsDisabled: false,
  };

  handleButtonDisable = (buttonIsDisabled) => {
    this.setState({ buttonIsDisabled });
  };

  render() {
    return (
      <>
        <Navbar>
          <button
            onClick={this.handleBackToStartingScreen}
            className="material-icons button-back d-flex ps-4"
          >
            arrow_back
          </button>
          <Container className="size-normal">
            <div>Young Money</div>
          </Container>
        </Navbar>
        <Container className="size-normal pt-5 container-style width">
          <Table hover className="table justify-content-between">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Geld</th>
                <th scope="col">Wohlstand</th>
              </tr>
            </thead>
            <tbody>
              {dummydata.map(
                (item: {
                  name: string,
                  rank: number,
                  money: number,
                  sol: number,
                }) => (
                  <tr key={item.rank}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                    <td>{item.money}</td>
                    <td>{item.sol}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }

  handleBackToStartingScreen = () => {
    //@ts-ignore
    this.props.navigate("/", { replace: true });
  };

}

/* export the component to be used in other components */
export default withRouter(Leaderboard);
