import React, { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

import ModalBox from "./common/ModalBox";
import ElementoR from "./ElementoR";

import Elemento from "../model/Elemento";

function Elementi({ elementi, onChange, onSaveDecisione, onDelete }) {
  const [show, setShow] = useState(false);
  const [elementoToDelete, setElementoToDelete] = useState("");
  const bottoni = [
    {
      render: (
        <Button variant="outline-danger">
          <i className="far fa-trash-alt"></i>
        </Button>
      ),
      id: "cancella",
    },
  ];
  const handleCloseModal = (risposta) => {
    setShow(false);
    if (risposta === "cancella") onDelete(elementoToDelete);
  };
  const handleDeleteButton = (descrizioneElemento) => {
    setElementoToDelete(descrizioneElemento);
    setShow(true);
  };
  const modalBody = (
    <p>
      Eliminare definitivamente{" "}
      <Badge variant="danger">{elementoToDelete}</Badge>
    </p>
  );
  const elementiOrdinati = elementi.sort((a, b) => b.valore - a.valore);
  return (
    <div>
      <h1>
        Oggetti{" "}
        <Button variant="success" className="mx-4" onClick={onSaveDecisione}>
          Salva Selezione
        </Button>
      </h1>
      {elementiOrdinati.map((elemento) => {
        return (
          <ElementoR
            key={elemento.descrizione}
            elemento={elemento}
            onChange={onChange}
            onDelete={handleDeleteButton}
            canDelete={elementiOrdinati.length > 1}
          />
        );
      })}

      {elementiOrdinati.length > 1 && (
        <ModalBox
          show={show}
          buttons={bottoni}
          title="Attenzione"
          body={modalBody}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

Elementi.propTypes = {
  elementi: PropTypes.arrayOf(PropTypes.instanceOf(Elemento)).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  onSaveDecisione: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  elementiErrors: PropTypes.object,
};

export default Elementi;
