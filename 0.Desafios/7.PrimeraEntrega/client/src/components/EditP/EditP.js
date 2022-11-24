import "./itemDetailStyles.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditP = () => {
  const { productId } = useParams();
  const { addItem } = useContext(CartContext);

  // console.log('Revisando ID***',productId)
  // const response = fetch(`/${productId}`);
  // const body = response.json();
  // const productos = body.ResultadoID;

  // let navigate = useNavigate();
  // const routeChange = () =>{
  //   let path = '/';
  //   navigate(path);
  // }

  return (
    <div>
      <h2>Test {productId}</h2>
    </div>
  );
};

export default EditP;
