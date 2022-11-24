import logo from "../../logo.svg";
import "./styles.css";
import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div>
        <Link to="/">
          <img width={100} src={logo} alt="logo"></img>
        </Link>
      </div>

      <div>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "claseActive" : "claseInactive"
              }
              to="/"
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "claseActive" : "claseInactive"
              }
              to="/newproduct"
            >
              Alta Productos
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "claseActive" : "claseInactive"
              }
              to="/category/60"
            >
              Teclados tamaño 65%
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "claseActive" : "claseInactive"
              }
              to="/category/70"
            >
              Teclados tamaño 75% y más...
            </NavLink>
          </li> */}
    
        </ul>
      </div>
      <NavLink to="/cartcontainer">
        <div>
          <CartWidget />
        </div>
      </NavLink>

    </div>
  );
};

export default NavBar;
