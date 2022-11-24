import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CartContainer } from "./components/CartContainer/CartContainer";
import NewProduct from "./components/NewProduct/NewProduct";
import EditP from './components/EditP/EditP'

function App() {
  return (
    <div className="estructura">
      <CartProvider>
        <BrowserRouter>
          <div className="fondo">
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={<ItemListContainer greeting="de teclados..." />}
              />
              <Route
                path="/category/:categoryId"
                element={
                  <ItemListContainer greeting=", mira los teclados de esta categoría..." />
                }
              />
              <Route
                path="/item/:productId"
                element={<ItemDetailContainer />}
              />
              
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/editproduct/:id" element={<EditP />} />
              <Route path="/cartcontainer" element={<CartContainer />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
      <>
        <footer
          className="subtitle"
          style={{
            height: "40px",
            background: "lightgray",
            textAlign: "center",
            padding: "40px",
          }}
        >
          Tiendita de Teclados, 2022.
        </footer>
      </>
    </div>
  );
}

export default App;
