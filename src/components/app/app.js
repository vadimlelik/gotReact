import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../error";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./app.css";
import { HousesPage, BooksPage } from "../pages";

export default class App extends Component {
  gotService = new gotService();

  state = {
    showRandomChar: true,
    error: false,
  };
  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  };
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    const char = this.state.showRandomChar ? <RandomChar /> : null;
    return (
      <Router>
        <div className='app'>
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {char}
                <button className="toggle-btn" onClick={this.toggleRandomChar}>
                  Toggle random character
              </button>
              </Col>
            </Row>
            {/* <CharacterPage /> */}

            <Route path='/characters'component={CharacterPage}/>
            <Route path='/books'component={BooksPage}/>
            <Route path='/housePage'component={HousesPage}/>

{/* 
            <Row>
              <Col md="6">
                <ItemList
                  onItemSelected={this.onItemSelected}
                  getData={this.gotService.getAllBooks}
                  renderItem={(item) => `${item.name}`}
                />
              </Col>
              <Col md="6">
                <CharDetails charId={this.state.selectedChar} />
              </Col>
            </Row> */}

            {/* <Row>
              <Col md="6">
                <ItemList
                  onItemSelected={this.onItemSelected}
                  getData={this.gotService.getAllHouses}
                  renderItem={(item) => `${item.name}`}
                />
              </Col>
              <Col md="6">
                <CharDetails charId={this.state.selectedChar} />
              </Col>
            </Row> */}
          </Container>
        </div>
      </Router>

    );
  }
}
