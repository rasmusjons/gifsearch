import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import SearchContainer from "../SearchContainer/SearchContainer";
import GifsContainer from "../GifsContainer/GifsContainer";
import classes from "./Home.module.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div className={classes.verticalCenter}>
          <Container>
            <SearchContainer></SearchContainer>
          </Container>
        </div>
        <div className={classes.verticalCenterAlt}>
          <Container>
            <GifsContainer></GifsContainer>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
