import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import AdminSection from "../AdminSection/AdminSection";
import Author from "../Author/Author";
import Blog from "../Blog/Blog";
import Dashboard from "../Dashboard/Dashboard";
import Tag from "../Tag/Tag";
import "./Layout.scss";

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact path="/u" component={Dashboard} />
      <Route
        exact
        path="/page/:no"
        render={(props) => <Dashboard {...props} />}
      />
      <Route exact path="/create" component={AdminSection} />
      <Route exact path="/blog/:id" component={Blog} />
      <Route exact path="/tag/:id" component={Tag} />
      <Route exact path="/author/:id" component={Author} />
      {/* <Redirect to="/u" /> */}
    </React.Fragment>
  );
};

export default withRouter(Layout);
