import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import * as DecisioniService from "../service/Decisioni";
import { ListGroup, ListGroupItem, Badge, Button } from "react-bootstrap";

function ListaDecisioni({ nomeDecisione }) {
  const [decisioni, setDecisioni] = useState([]);

  useEffect(() => {
    const decisioniSorted = DecisioniService.getAll().sort((a, b) => a - b);
    setDecisioni(decisioniSorted);
  }, [nomeDecisione]);

  const renderDecisioneName = (decisione) => {
    if (decisione === nomeDecisione)
      return (
        <span>
          {decisione}
          <Badge variant="info" className="mx-2">
            <i className="fas fa-mountain fa-lg"></i>
            <i className="fas fa-crow fa-lg fa-flip-horizontal"></i>
          </Badge>
        </span>
      );
    return decisione;
  };
  return (
    <ListGroup>
      {decisioni.map((e) => {
        return (
          <ListGroupItem key={e}>
            {renderDecisioneName(e)}
            {decisioni.length > 1 && (
              <Button variant="outline-danger" className="float-right">
                <i className="far fa-trash-alt"></i>
              </Button>
            )}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

ListaDecisioni.propTypes = {
  nomeDecisione: PropTypes.string.isRequired,
};

export default ListaDecisioni;
