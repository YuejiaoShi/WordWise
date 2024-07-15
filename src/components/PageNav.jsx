import { NavLink } from "react-router-dom";
function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing Page</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product Page</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
