import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import Decisione from "./Decisione";

function Routering({ actualDecisione }) {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/attuale" />
      </Route>
      <Route path="/attuale">
        <Decisione decisione={actualDecisione} />
      </Route>
      <Route path="/lista-decisioni">
        <h1>lavori in corso</h1>
      </Route>
    </Switch>
  );
}

Routering.propTypes = {
  actualDecisione: PropTypes.string.isRequired,
};

export default Routering;
