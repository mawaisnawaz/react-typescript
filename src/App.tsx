import "antd/dist/antd.css";
import React from "react";
import { AppContainer } from "./App.style";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ShipmentList from "./components/ShipmentList";
import ShipmentDetails from "./components/ShipmentDetails";

function App(): React.ReactElement {
  return (
    <Router>
      <AppContainer>
        <Route path="/details" exact component={ShipmentDetails} />
        <Route path="/" exact component={ShipmentList} />
      </AppContainer>
    </Router>
  );
}

export default App;
