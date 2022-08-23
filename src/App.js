import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import NavBar from "./Components/NavBar";
import DisplayBoards from "./Components/DisplayBoards";
import List from "./Components/ListsInBoard";
import PageNotFound from "./Components/PageNotFound";
class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={DisplayBoards}></Route>
          <Route path="/:boardId" component={List } />
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
