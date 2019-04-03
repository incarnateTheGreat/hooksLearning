import React from "react";
import { Switch, Route } from "react-router-dom";
import Details from "./components/Details";
import Posts from "./components/Posts";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Details} />
        <Route path="/Posts" component={Posts} />
      </Switch>
    </main>
  );
};

export default Main;
