import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import "./CartContainerCont.css";
import "./CartContainerS1.css";
import "./CartContainerS2.css";

export const CartContainer = () => {
  const { productCartList, removeItem, clearCart, getPrecioTotal } =
    useContext(CartContext);
  const [idOrder, setIdOrder] = useState("");

  const enviarOrden = (event) => {
    event.preventDefault();
    const order = {
      buyer: {
        name: event.target[0].value,
        phone: event.target[1].value,
        email: event.target[2].value,
      },
      items: productCartList,
      total: getPrecioTotal(),
      date: getDate(),
    };
    console.log("order", order);

    const queryRef = collection(db, "orders");
    addDoc(queryRef, order).then((response) => {
      console.log("response", response);
      setIdOrder(response.id);
      clearCart();
    });
  };

  const getDate = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  };
  const updateOrder = () => {
    const queryRef = doc(db, "orders", "cWlTcp6yk1kf8pBy5UUE");
    updateDoc(queryRef, {
      buyer: {
        name: "panchito",
        phone: "123",
        email: "123@olo.com",
      },
      items: [
        {
          category: "60",

          imagen:
            "https://firebasestorage.googleapis.com/v0/b/tiendita-teclados.appspot.com/o/k1.jpg?alt=media&token=5ef8fcd4-f3f6-4ec3-8e47-e177fca29c9e",

          precio: 100,
          quantity: 1,
          quantityPrice: 100,
          nombre: "Mechanical Keyboard 60% K1",
        },
      ],
      total: 400,
    }).then((response) => console.log(response));
  };
  return (
    <div className="Cart-Container">
      {idOrder.length > 0 ? (
        <p className="title" style={{textAlign:'center'}}>Tu orden ha sido creada, con el siguiente ID: {idOrder}</p>
        
      ) : productCartList.length > 0 ? (
        <div>
          <div className="Header">
            <h1 className="Heading">Carrito de compras</h1>
            <h5 className="Action" onClick={clearCart}>
              Remover todos los artículos
            </h5>
          </div>
          {productCartList.map((item) => (
            <>
              <div className="Cart-Items">
                <img
                  className="image-box"
                  src={item.imagen}
                  alt={item.nombre}
                  title={item.nombre}
                  width={120}
                  height={100}
                />
                <Link
                  to={"/item/" + item.id}
                  style={{ textDecoration: "none" }}
                >
                  <p className="title">{item.nombre}</p>
                </Link>
                <p className="subtitle">Cantidad: {item.quantity}</p>
                <p className="prices">Precio unitario: $US {item.precio}</p>
                <p className="prices">
                  Subtotal teclado: $US {item.quantityPrice}
                </p>

                <button onClick={() => removeItem(item.id)}>
                  <img
                    alt="remove"
                    title="Eliminar"
                    width="15px"
                    height="15px"
                    src="http://getdrawings.com/free-icon/delete-icon-png-60.png"
                  ></img>
                </button>
              </div>
            </>
          ))}
          <hr className="hr"></hr>
          <p className="pTotal">
            {" "}
            Precio total del carrito: $US {getPrecioTotal()}
          </p>
          <>
            <div>
              <form onSubmit={enviarOrden} className="formulario">
                <label>Nombre:</label>
                <input type="text"></input>
                <label>Telefono:</label>
                <input type="text"></input>
                <label>Correo:</label>
                <input type="email"></input>
                <button className="buttonC" type="submit">
                  Enivar pedido
                </button>
              </form>
            </div>
          </>
        </div>
      ) : (
        <div className="Header">
          <p className="Heading">Tu carrito está vació, añade artículos.</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            Ir al listado de teclados...
          </Link>
        </div>
      )}
    </div>
  );
};
