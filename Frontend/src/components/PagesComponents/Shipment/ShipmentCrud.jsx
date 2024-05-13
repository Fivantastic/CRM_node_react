import { useEffect, useState } from 'react';
import { useUser } from '../../../context/authContext.jsx';
import { ShipmentList } from '../../PagesComponents/Shipment/ShipmentList.jsx';
import { CreateShipment } from '../../PagesComponents/Shipment/CreateShipment.jsx';
import { UpdateShipment } from '../../PagesComponents/Shipment/UpdateShipment.jsx';
import { DeleteGenericModal } from '../../../components/forms/DeleteGenericModal.jsx';

const ShipmentsCrud = () => {
  const token = useUser();
  const [shipmentList, setShipmentList] = useState([]);

  const typeModule = 'shipments';
  const typeModuleMessage = 'Envío';

  const getShipmentList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/shipment/route`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Obtener envíos satisfactorio:', responseData);
        setShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obtener envíos fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de envíos:', error);
    }
  };

  useEffect(() => {
    getShipmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addShipment = async () => {
    try {
      await getShipmentList();
    } catch (error) {
      console.error('Error al agregar el envío:', error);
    }
  };

  const deleteShipment = async (id_shipment) => {
    try {
      setShipmentList((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id_shipment !== id_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  const updateShipment = async (id_shipment) => {
    try {
      setShipmentList((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id_shipment !== id_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error('Error al actualizar el envío:', error);
    }
  };

  return (
    <section id='shipment_container' className="mainContainer">
      <h1 id='shipment_title' className="mainTitle">Envíos</h1>
      <CreateShipment onAddShipment={addShipment} token={token} />
      <ol id='shipments_list' className='main_olist'>
        {shipmentList.map((data) => {
          return (
            <li key={data.id_shipment} className='main_ilist'>
              <ShipmentList shipment={data} />
              <UpdateShipment
                shipment={data.id_shipment}
                onUpdateShipment={updateShipment}
                token={token}
              />
              <DeleteGenericModal
                id={data.id_shipment}
                onDelete={deleteShipment}
                token={token}
                typeModule={typeModule}
                typeModuleMessage={typeModuleMessage}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ShipmentsCrud;
