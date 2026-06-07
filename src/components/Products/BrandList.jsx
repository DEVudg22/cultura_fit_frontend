import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function BrandList({ listName, url, endPoint, keyName, selected }) {
  const { data, loading, error } = useFetch(`${url}${endPoint}`);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(listName);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="m-3">
      <DropdownToggle caret>{opcionSeleccionada}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Elige opción</DropdownItem>
        {data.map((item, index) => (
          <DropdownItem
            onClick={() => {
              setOpcionSeleccionada(item[keyName]);
              selected(item.id);
            }}
          >
            {item[keyName]}
          </DropdownItem>
        ))}

        <DropdownItem divider />
        <DropdownItem disabled>Opción Deshabilitada</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default BrandList;
