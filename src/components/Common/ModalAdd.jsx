import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";
import BrandList from "../Products/BrandList";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalAdd() {
  const [modal, setModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedSup, setSelectedSup] = useState();
  const [presentacion, setPresentacion] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [description, setDescription] = useState();

  const url = import.meta.env.VITE_API_URL;
  const { dataChanged, setDataChanged, token } = useAuth();

  useEffect(() => {
    setDataChanged(false);
  }, []);

  // Función para abrir y cerrar el modal
  const toggle = () => {
    setModal(!modal);
  };

  //handlers input

  const handlePresentacion = (e) => {
    setPresentacion(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleStock = (e) => {
    setStock(e.target.value);
  };

  const handleImg = (e) => {
    setImgUrl(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  //limpiar formulario

  const clearForm = () => {
    setSelectedBrand(null);
    setSelectedSup(null);
    setPresentacion(null);
    setPrice(null);
    setStock(null);
    setImgUrl(null);
    setDescription(null);
  };

  return (
    <div className="mb-3">
      <Button
        onClick={toggle}
        children={"Agregar nuevo producto"}
        fullWidth={false}
      />
      <Modal
        isOpen={modal}
        toggle={toggle}
        modalClassName="bg-opacity-75"
        centered={true}
      >
        <ModalHeader toggle={toggle}>AGREGAR NUEVO PRODUCTO</ModalHeader>
        <ModalBody>
          <div className="container d-flex flex-wrap gap-3">
            <div className="border border-end">
              <BrandList
                listName={"Marca"}
                url={url}
                endPoint={"marcas"}
                keyName={"nombre_marca"}
                selected={setSelectedBrand}
              />

              <BrandList
                listName={"Suplemento"}
                url={url}
                endPoint={"suplementos"}
                keyName={"nombre_suplemento"}
                selected={setSelectedSup}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Presentación ej: 250 gr"
                value={presentacion}
                onChange={handlePresentacion}
              />
              <input
                type="number"
                className="form-control mb-1"
                placeholder="Precio..."
                step="0.01"
                min="1"
                value={price}
                onChange={handlePrice}
              />
              <input
                type="number"
                className="form-control mb-1"
                placeholder="¿Unidades?"
                min="1"
                value={stock}
                onChange={handleStock}
              />
            </div>
            <hr />
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Link de la imagen del producto..."
              value={imgUrl}
              onChange={handleImg}
            />
            <div className="container">
              <textarea
                name=""
                id=""
                className="form-control w-100"
                placeholder="Descripción del producto..."
                value={description}
                onChange={handleDescription}
              ></textarea>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              toggle();
              alert(
                `marca id: ${selectedBrand}, suplemento id: ${selectedSup}, presentación ${presentacion}, precio: ${price}, unidades: ${stock}, img: ${imgUrl}, desc: ${description}`,
              );
              setDataChanged(true);
              clearForm();
            }}
          >
            Aceptar
          </Button>{" "}
          <Button onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAdd;
