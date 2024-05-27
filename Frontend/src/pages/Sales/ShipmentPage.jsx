import { MainLayout } from '../../layout/MainLayout.jsx';
import { ShipmentsCrud } from '../../components/PagesComponents/Shipment/ShipmentCrud.jsx'; 
import '../../components/PagesComponents/Shipment/ShipmentPage.css'; 

export const ShipmentPage = () => {
  return (
    <MainLayout title="Envíos">
      <section id="Shipment_external_container" className="mainExternalContainer">
        <ShipmentsCrud />
      </section>
    </MainLayout>
  );
};
