import "./itemListContainerStyles.css";
import ItemList from "../ItemList/ItemList";
import datos from "./muestra-datos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { async } from "@firebase/util";

function ItemListContainer({ greeting }) {
  // const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getData = async () => {
      // if (categoryId) {
      //   const queryRef = query(
      //     collection(db, "items"),
      //     where("category", "==", categoryId)
      //   );
      //   const response = await getDocs(queryRef);
      //   const productos = response.docs.map((doc) => {
      //     const newProduct = {
      //       ...doc.data(),
      //       id: doc.id,
      //     };
      //     return newProduct;
      //   });

      //   setItems(productos);
      // } else {
      //   const queryRef = collection(db, "items");
      //   const response = await getDocs(queryRef);
      //   const productos = response.docs.map((doc) => {
      //     const newProduct = {
      //       ...doc.data(),
      //       id: doc.id,
      //     };
      //     return newProduct;
      //   });
      //   setItems(productos);
      // }

      const response = await fetch("/react");
      const body = await response.json();
      console.log("Print body de callBackend", body);
      const productos = body.express.map((prod) => {
        const newProduct = {
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          precio: prod.precio,
          imagen: prod.imagen,
          id: prod.id,
          codigo: prod.codigo,
          timestamp: prod.timestamp,
        };
        console.log('veo newProduct', newProduct.codigo)
        return newProduct;
      });
      setItems(productos);
     
      // return body;
    };

    getData();
  }, []);

  return (
    <div>
      <h2>Bienvenidx a la tiendita {greeting}</h2>

      <div className="contenedorItemList">
        {items.length > 0 ? (
          <ItemList itemsList={items} />
        ) : (
          <div>Obteniendo productos...</div>
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
