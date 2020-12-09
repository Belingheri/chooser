import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import Decisione from "./Decisione";
import ListaDecisioni from "./ListaDecisioni";

function Routering({ actualDecisione, nomeDecisione, ...rest }) {
  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <Redirect to="/attuale" />
        </Route>
        <Route path="/attuale">
          <Decisione decisione={actualDecisione} />
        </Route>
        <Route path="/lista-decisioni">
          <ListaDecisioni nomeDecisione={nomeDecisione} {...rest} />
        </Route>
      </Switch>
    </Container>
  );
}

Routering.propTypes = {
  actualDecisione: PropTypes.string.isRequired,
  nomeDecisione: PropTypes.string.isRequired,
};

export default Routering;
