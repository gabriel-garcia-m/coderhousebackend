import Item from "../Item/Item";
import './itemListStyles.css'

const ItemList = ({ itemsList }) => {
  return (

    <div className="contenedorItem">
      
      {itemsList.map((prod) => {
        return (
            <div >
            <Item
              _id={prod._id}
              nombre={prod.nombre}
              descripcion={prod.descripcion}
              precio={prod.precio}
              imagenurl={prod.imagenurl}
              codigo={prod.codigo}
              timestamp={prod.timestamp}
            />
            </div>
          
        );
      })}
      
    </div>
  );
};

export default ItemList;
