import "./itemDetailContainerStyles.css";
import ItemDetail from "../ItemDetail/ItemDetail";
import datos from "../ItemListContainer/muestra-datos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditP from "../EditP/EditP";
// import { db } from "../../utils/firebase";
// import {
//   doc,
//   getDoc,
//   collection,
//   getDocs,
//   query,
//   where,
//   limit,
// } from "firebase/firestore";
// import { async } from "@firebase/util";

function ItemDetailContainer() {
  const { productId } = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const prod = []
      console.log('imprimo id', productId)
      const response = await fetch(`/productos/${productId}`);
      const body = await response.json();
      const productos = body.ResultadoID.map((prod) => {
        const newProduct = {
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          precio: prod.precio,
          imagen: prod.imagen,
          id: prod.id,
          codigo: prod.codigo,
          timestamp: prod.timestamp
        }
        return newProduct
      })
      console.log('imp productos',productos[0])
      setItem(productos[0]);
    };
    getData();
  }, [productId]);

  return (
    <div>
      <h2>Mira los detalles del teclado:</h2>
      <ItemDetail item={item} />
      
    </div>
  );
}

export default ItemDetailContainer;
