import "./itemDetailStyles.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const moment = require("moment");

const EditP = () => {
  const productId = useParams();
  console.log("Revisando ID***", productId.id);
  const { addItem } = useContext(CartContext);

  const [item, setItem] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [precio, setPrecio] = useState("");
  const [codigo, setCodigo] = useState("");
  let prod = [];

  useEffect(() => {
    const getData = async () => {
      console.log("imprimo id getData EditP", productId);
      const response = await fetch(`/productos/${productId.id}`);
      const body = await response.json();
      const productos = body.ResultadoID.map((prod) => {
        const newProduct = {
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          precio: prod.precio,
          imagenurl: prod.imagenurl,
          _id: prod._id,
          codigo: prod.codigo,
          timestamp: prod.timestamp,
        };
        return newProduct;
      });
      console.log("imp productos", productos[0]);
      setItem(productos[0]);
    };
    getData();
  }, [productId]);

  const handleSubmit = (event) => {
    const producto = {
      nombre: event.target.nombreP.value,
      descripcion: event.target.descripcionP.value,
      imagenurl: event.target.imagenP.value,
      precio: event.target.precioP.value,
      codigo: event.target.codigoP.value,
      timestamp: moment().format("D/MM/YYYY LTS"),
    };
    prod = producto;
    console.log("Deja veo this.prod", prod);
    alert(`Producto MODIFICADO ${prod.nombre}`)
    fetch(`/productos/${productId.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prod),
    });
    event.preventDefault();
    // alert(`The name you entered was: ${descripcion}`);
  };

  return (
    <div>
      <form className="formulario" onSubmit={handleSubmit}>
        {" "}
        <label>Nombre:</label>
        <input
          type="text"
          name="nombreP"
          // value={nombre}
          defaultValue={item.nombre}
          onChange={(e) => setNombre(e.target.value)}
        />{" "}
        <label>Descripcion:</label>
        <input
          type="text"
          name="descripcionP"
          defaultValue={item.descripcion}
          // onChange={this.handleChange}
          onChange={(e) => setDescripcion(e.target.value)}
        />{" "}
        <label>URL imagen:</label>
        <input
          type="text"
          name="imagenP"
          defaultValue={item.imagenurl}
          // onChange={this.handleChange}
        />{" "}
        <label>Precio:</label>
        <input
          type="number"
          name="precioP"
          defaultValue={item.precio}
          // onChange={this.handleChange}
        />{" "}
        <label>Codigo:</label>
        <input
          type="text"
          name="codigoP"
          defaultValue={item.codigo}
          // onChange={this.handleChange}
        />{" "}
        <input type="submit" className="buttonC" value="Modificar producto" />
      </form>
    </div>
  );
};

export default EditP;
