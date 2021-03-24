import React from "react";
import Signup from "./Signup.js";
import { AuthProvider } from "../contexts/AuthContext";
import { DatabaseProvider } from "../contexts/DatabaseContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
          </Switch>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
