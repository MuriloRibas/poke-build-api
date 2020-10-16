import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from '../pages/landing/index';
import { Start } from "../pages/start";
import { Navbar } from "../components/navbar";
import { Team } from "../pages/team";

const App = () => {

  return (
    <>
      <Navbar/>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/start" exact component={Start} />
          <Route path="/team/:id" exact component={Team} />
        </Switch>
      </Router>
    </>
  )
}

export default App