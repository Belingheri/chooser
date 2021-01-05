import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ListGroup, ListGroupItem, Badge, Button } from "react-bootstrap";

import * as DecisioniService from "../service/Decisioni";
import NuovaDecisone from "./NuovaDecisione";

function ListaDecisioni({ nomeDecisione, onChangeSelected }) {
  const [decisioni, setDecisioni] = useState([]);
  const history = useHistory();

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

  const handleSelectItem = (nomeDecisione) => {
    if (nomeDecisione !== DecisioniService.getSelectedName())
      onChangeSelected(nomeDecisione);
    history.push("/attuale");
  };

  const handleDeleteDecisione = (e, nomeDecisione) => {
    e.preventDefault();
    e.stopPropagation();
    const attSelected = DecisioniService.getSelectedName();
    DecisioniService.remove(nomeDecisione);
    if (nomeDecisione === attSelected)
      onChangeSelected(DecisioniService.getSelectedName());
    const idx = decisioni.findIndex((el) => el === nomeDecisione);
    const newDecisioni = [...decisioni];
    newDecisioni.splice(idx, 1);
    setDecisioni(newDecisioni);
  };

  return (
    <div>
      <NuovaDecisone onAdd={onChangeSelected} />
      <ListGroup>
        {decisioni.map((decisione) => {
          return (
            <ListGroupItem
              key={decisione}
              onClick={() => handleSelectItem(decisione)}
            >
              {renderDecisioneName(decisione)}
              {decisioni.length > 1 && (
                <Button
                  variant="outline-danger"
                  className="float-right"
                  onClick={(e) => handleDeleteDecisione(e, decisione)}
                >
                  <i className="far fa-trash-alt"></i>
                </Button>
              )}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}

ListaDecisioni.propTypes = {
  nomeDecisione: PropTypes.string.isRequired,
  onChangeSelected: PropTypes.func.isRequired,
};

export default ListaDecisioni;
