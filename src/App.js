import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigator from "./components/Navigator";
import Routering from "./components/Routerig";

import * as DecisioniService from "./service/Decisioni";

function App() {
  const [indexDecisione] = useState(DecisioniService.getSelectedName());
  const [actualDecisione, setActualDecisione] = useState("");

  useEffect(() => {
    setActualDecisione(DecisioniService.get());
  }, [indexDecisione]);

  return (
    <Router>
      <Navigator nomeDecisione={indexDecisione} />
      <Routering actualDecisione={actualDecisione} />
    </Router>
  );
}

export default App;
