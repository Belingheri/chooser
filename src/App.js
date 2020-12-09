import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigator from "./components/Navigator";
import Routering from "./components/Routerig";

import * as DecisioniService from "./service/Decisioni";

function App() {
  const [indexDecisione, setIndexDecisione] = useState(
    DecisioniService.getSelectedName()
  );
  const [actualDecisione, setActualDecisione] = useState("");

  useEffect(() => {
    setActualDecisione(DecisioniService.get());
  }, [indexDecisione]);

  const handleChangeDecisione = (decisione) => {
    setIndexDecisione(decisione);
  };

  return (
    <Router>
      <Navigator nomeDecisione={indexDecisione} />
      <Routering
        actualDecisione={actualDecisione}
        nomeDecisione={indexDecisione}
        onChange={handleChangeDecisione}
      />
    </Router>
  );
}

export default App;
