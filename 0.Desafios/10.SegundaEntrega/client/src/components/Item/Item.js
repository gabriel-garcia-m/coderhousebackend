import './itemStyles.css'
import {Link} from 'react-router-dom'

const Item = ({ _id, nombre, descripcion, precio, imagenurl, timestamp, codigo }) => {

  return (
    <div className = 'card'>
      <img src={imagenurl} alt={nombre} width={300} height={200} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>Timestamp: {timestamp}</p>
      <p>Codigo: {codigo}</p>
      <p className='price'>Precio: $US {precio}</p>
      <Link to={`/item/${_id}`}>
      <button className='card button'>Ver detalle</button>
      </Link>
   
    </div>
  );
};

export default Item;
