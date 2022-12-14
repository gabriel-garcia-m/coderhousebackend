import './itemDetailStyles.css'
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import {Link, useNavigate} from 'react-router-dom'



const ItemDetail = ({ item }) => {
  const {addItem} = useContext(CartContext)
  const [contador, setContador]=useState(0)

  const onAdd = (dato)=>{
    setContador(dato)
    addItem(item, dato)
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
  }

  return (
    <div className = 'card_container'>
      <img src={item.imagenurl} alt={item.nombre} width={300} height={200} />
      <h2>{item.nombre}</h2>
      <p>{item.descripcion}</p>
      <p>Timestamp: {item.timestamp}</p>
      <p>Codigo: {item.codigo}</p>
      <p className='price_container'>Precio: $US {item.precio}</p>
      <Link to={`/editproduct/${item._id}`}>
      <button className='card button'>Editar</button>
      </Link>
      
      <button className='card button' onClick={() => {
        alert('Producto eliminado', item.nombre)
        fetch(`/productos/${item._id}`, { method: 'DELETE' })
        routeChange()
      }}>Eliminar</button>
      
     
      <ItemCount stock={10} initial={1} onAdd={onAdd}/>

      {
          contador > 0 &&
          <Link to='/cartcontainer'>
          <button className='btnTerminar'>Terminar mi compra</button>
          </Link>
      }
    </div>
  );
};

export default ItemDetail;
