import CartWidgetImg from './CartWidget.svg'
import {useContext} from 'react'
import {CartContext} from '../../context/CartContext'

function CartWidget() {
  const {getTotalQuantity} = useContext(CartContext)
  return (
    <div>
        
        <img width={100} height={65} src={CartWidgetImg} alt='CartWidget'></img>

        <span style={{backgroundColor: 'red', borderRadius: '20%', width:'10px', height:'10px', fontSize:'20px', color:'white', fontWeight:'bold', textDecoration:'none'}}>{getTotalQuantity()}</span>
    </div>
  )
}

export default CartWidget