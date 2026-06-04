import React, { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./Modalstock.module.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalStock({ id, price }) {
  const [modal, setModal] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    setNewPrice(price);
  }, []);

  //funcion para capturar el precio
  const handlePrice = (e) => {
    setNewPrice(e.target.value);
  };

  //funcion handle stock

  // Función para abrir y cerrar el modal
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Button onClick={toggle} children={"Modificar Stock"} fullWidth={true} />
      <Modal
        isOpen={modal}
        toggle={toggle}
        modalClassName="bg-opacity-75"
        contentClassName={styles.background}
        centered={true}
      >
        <ModalHeader toggle={toggle}>
          El id del producto es: {id} precio: {price}
        </ModalHeader>
        <ModalBody>
          <h2>¿Cuántas unidades desea agregar?</h2>
          <input type="number" className="form-control" />
          <h2>Puedes modificar el precio si así lo deseas</h2>
          <input
            type="number"
            className="form-control"
            value={newPrice}
            onChange={handlePrice}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Aceptar</Button>{" "}
          <Button onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalStock;
