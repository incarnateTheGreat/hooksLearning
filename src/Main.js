import React from "react";
import { Switch, Route } from "react-router-dom";
import Details from "./components/Details";
import EditUserForm from "./components/EditUserForm";
import Posts from "./components/Posts";
import Comments from "./components/Comments";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/" component={Details} />
        <Route exact={true} path="/editPost/:id" component={EditUserForm} />
        <Route exact={true} path="/posts" component={Posts} />
        <Route exact={true} path="/posts/comments/:id" component={Comments} />
      </Switch>
    </main>
  );
};

export default Main;
