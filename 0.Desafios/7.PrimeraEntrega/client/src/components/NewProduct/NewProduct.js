import React from "react";
import "./NewProductStyles.css";
const moment = require("moment");

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    let prod = [];

  }

  
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit = (event) => {
    const producto = {
      nombre: event.target.nombreP.value,
      descripcion: event.target.descripcionP.value,
      imagen: event.target.imagenP.value,
      precio: event.target.precioP.value,
      codigo: parseInt(event.target.codigoP.value),
      timestamp: moment().format("D/MM/YYYY LTS"),
    };
    this.prod = producto;
    console.log("Deja veo this.prod", this.prod);
    alert(`Producto agregado ${this.prod.nombre}`)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.prod),
    });
    event.preventDefault();
  };

  render() {
    return (
      <form className="formulario" onSubmit={
        this.handleSubmit
        }>
        {" "}
        <label>Nombre:</label>
        <input
          type="text"
          name="nombreP"
          // value={this.state.value}
          // onChange={this.handleChange}
        />{" "}
        <label>Descripcion:</label>
        <input
          type="text"
          name="descripcionP"
          // value={this.state.value}
          // onChange={this.handleChange}
        />{" "}
        <label>URL imagen:</label>
        <input
          type="text"
          name="imagenP"
          // value={this.state.value}
          // onChange={this.handleChange}
        />{" "}
        <label>Precio:</label>
        <input
          type="number"
          name="precioP"
          // value={this.state.value}
          // onChange={this.handleChange}
        />{" "}
        <label>Codigo:</label>
        <input
          type="text"
          name="codigoP"
          // value={this.state.value}
          // onChange={this.handleChange}
        />{" "}
        <input type="submit" className="buttonC" value="Agregar producto" />
      </form>
    );
  }
}
export default NewProduct;
