import { useState } from "react";
import "./ItemCountStyle.css";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [contador, setContador] = useState(initial);
  const suma = () => {
    if (contador < stock) setContador(contador + 1);
  };

  const resta = () => {
    if (contador >= 1) setContador(contador - 1);
  };

  return (
    <>
      <div className="counter">
        <button className="btn1" onClick={resta}>
          -
        </button>
        <div className="count">{contador}</div>
        <button className="btn2" onClick={suma}>
          +
        </button>
      </div>
      <button
        disabled={stock===0}
        className="btnAdd"
        onClick={()=>onAdd(contador)}
        
      >
        Añadir a carrito
      </button>
    </>
  );
};

export default ItemCount;
