import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";

import Decisione from "./components/Decisione";

import * as DecisioniService from "./service/Decisioni";

function App() {
  const [indexDecisione] = useState(DecisioniService.getSelectedName());
  const [actualDecisione, setActualDecisione] = useState("");

  useEffect(() => {
    setActualDecisione(DecisioniService.get());
  }, [indexDecisione]);

  return (
    <main>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Be Prometeo</Navbar.Brand>
        <Navbar.Text>{indexDecisione}</Navbar.Text>
      </Navbar>
      <Decisione decisione={actualDecisione} />
    </main>
  );
}

export default App;
