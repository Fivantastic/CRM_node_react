import { MainLayout } from '../../layout/MainLayout.jsx';
import {ShipmentsCrud} from '../../components/PagesComponents/Shipment/ShipmentCrud.jsx'; 
import {DeliveryRoutes} from '../../components/PagesComponents/Shipment/DeliveryRoute.jsx'

export const ShipmentPage = () => {

  return (
    <MainLayout title="Envíos">
      <section id="Shipment_external_container" className="mainExternalContainer">
        <ShipmentsCrud />
        <DeliveryRoutes />
      </section>
    </MainLayout>
  );
};