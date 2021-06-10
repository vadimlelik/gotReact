import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../error";
import gotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./app.css";
import { BooksPage,CharacterPage,HousesPage } from "../pages";

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
            <Route path='/characters'component={CharacterPage}/>
            <Route path='/housePage'  component={HousesPage}/>
            <Route path='/books' exact component={BooksPage}/>
            
          </Container>
        </div>
      </Router>

    );
  }
}
