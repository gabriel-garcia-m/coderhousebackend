import React, { useState } from "react";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [productCartList, setProductCartList] = useState([]);

  const isInCart = (idProducto) => {
    const isInProd = productCartList.some((item) => item.id === idProducto);
    return isInProd;
  };

  const addItem = (item, quantity) => {
    const newProduct = {
      ...item,
      quantity,
    };
    if (isInCart(item.id)) {
      const prod = productCartList.findIndex(
        (producto) => producto.id === item.id
      );
      const newArray = [...productCartList];
      newArray[prod].quantity = newArray[prod].quantity + quantity;
      newArray[prod].quantityPrice =
        newArray[prod].quantity * newArray[prod].precio;
      setProductCartList(newArray);
    } else {
      const newList = [...productCartList];
      newProduct.quantityPrice = newProduct.quantity * newProduct.precio;
      newList.push(newProduct);
      setProductCartList(newList);
    }
  };

  const removeItem = (itemId) => {
    const newList = productCartList.filter((prod) => prod.id !== itemId);
    setProductCartList(newList);
  };

  const clearCart = () => {
    setProductCartList([]);
  };

  const getPrecioTotal = () => {
    const precioTotal = productCartList.reduce(
      (acumulador, item) => acumulador + item.quantityPrice,
      0
    );
    return precioTotal;
  };

  const getTotalQuantity = () => {
    const total = productCartList.reduce(
        (acumulador, item) => acumulador + item.quantity,
        0
      );
      return total;
  }

  return (
    <CartContext.Provider
      value={{
        productCartList,
        addItem,
        removeItem,
        clearCart,
        getPrecioTotal,
        getTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
