import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import NavBar from "./Components/NavBar";
import DisplayBoards from "./Components/DisplayBoards";
import Board from "./Components/Board";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/boards">
            <>
              <NavBar />
              <DisplayBoards />
            </>
          </Route>
          <Route path="/boards/:boardId" component={Board} />
          <Route path="*" component={<p>Page Not Found!</p>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
