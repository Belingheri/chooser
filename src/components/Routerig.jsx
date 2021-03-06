import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import Decisione from "./Decisione";
import ListaDecisioni from "./ListaDecisioni";

function Routering({
  actualDecisione,
  nomeDecisione,
  onChangeSelected,
  ...rest
}) {
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
          <ListaDecisioni
            nomeDecisione={nomeDecisione}
            onChangeSelected={onChangeSelected}
            {...rest}
          />
        </Route>
      </Switch>
    </Container>
  );
}

Routering.propTypes = {
  actualDecisione: PropTypes.object.isRequired,
  nomeDecisione: PropTypes.string.isRequired,
  onChangeSelected: PropTypes.func.isRequired,
};

export default Routering;
