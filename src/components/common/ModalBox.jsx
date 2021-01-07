import { Modal } from "react-bootstrap";

function ModalBox({ show, onClose, buttons, title, body }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      {body && <Modal.Body>{body}</Modal.Body>}
      <Modal.Footer>
        {buttons.map((bottone) => {
          return (
            <div key={bottone.id} onClick={() => onClose(bottone.id)}>
              {bottone.render}
            </div>
          );
        })}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBox;
