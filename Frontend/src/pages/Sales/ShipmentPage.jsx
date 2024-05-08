import { Link } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout.jsx";

export const ShipmentPage = () => {
  return (
    <>
        <MainLayout>
          <li><Link to="/">Home</Link></li>
          <div>ShipmentPage</div>
        </MainLayout>
    </>
);
};

