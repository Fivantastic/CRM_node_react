import { Link } from "react-router-dom";
import LogoutButton from "../../components/buttons/LogoutButton.jsx";

import { useSetUser, useUser } from "../../context/authContext.jsx";

export const HomePage = () => {
  const user = useUser(); 
  const setUser = useSetUser();

  return (
    <div>
      <h1>HomePage</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/user">User</Link></li>
          <li><Link to="/customer">Customer</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/sale">Sales</Link></li>
          <li><Link to="/visit">Visits</Link></li>
          <li><Link to="/deliveryNote">Delivery Notes</Link></li>
          <li><Link to="/invoice">Invoices</Link></li>
          <li><Link to="/payment">Payments</Link></li>
          <li><Link to="/shipment">Shipments</Link></li>
          <li><Link to="*">NotFoundPage</Link></li>
        </ul>
      </nav>
      {user && <LogoutButton setUser={setUser} />}
    </div>
  );
};
