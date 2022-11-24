import './itemStyles.css'
import {Link} from 'react-router-dom'

const Item = ({ id, nombre, descripcion, precio, imagen, timestamp, codigo }) => {

  return (
    <div className = 'card'>
      <img src={imagen} alt={nombre} width={300} height={200} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>Timestamp: {timestamp}</p>
      <p>Codigo: {codigo}</p>
      <p className='price'>Precio: $US {precio}</p>
      <Link to={`/item/${id}`}>
      <button className='card button'>Ver detalle</button>
      </Link>
   
    </div>
  );
};

export default Item;
