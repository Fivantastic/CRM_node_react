import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../../context/authContext.jsx';
import defaultAvatar from '/profile.svg';
import shipmentIcon from '../../../../public/shipmentRoute.svg';
import { Toast } from '../../alerts/Toast.jsx';
import './DeliveryRoutes.css'; // Archivo de estilos para la representación visual de la ruta

const URL = import.meta.env.VITE_URL;

export const DeliveryRoutes = () => {
  const token = useUser();
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    getDeliveryUsers();
    getShipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedShipment(null);
    }
  };

  const getDeliveryUsers = async () => {
    try {
      const response = await fetch(`${URL}/user/list?role=deliverer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setDeliveryUsers(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener las rutas de reparto', errorData);
        // Aquí deberías implementar una notificación de error
      }
    } catch (error) {
      console.error('Error al obtener las rutas de reparto', error);
      // Aquí deberías implementar una notificación de error
    }
  };

  const getShipments = async () => {
    try {
      const response = await fetch(`${URL}/shipments/deliverer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setShipments(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener los envíos:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener los envíos:', error);
    }
  };

  const handleViewShipments = (userId) => {
    if (selectedUser === userId) {
      setSelectedUser(null);
    } else {
      setSelectedUser(userId);
    }
  };

  const handlePickupPointClick = (shipmentId) => {
    if (selectedShipment === shipmentId) {
      setSelectedShipment(null);
    } else {
      setSelectedShipment(shipmentId);
    }
  };

  const selectedDelivererName = selectedUser ? deliveryUsers.find(user => user.id_user === selectedUser)?.name : null;
  const filteredShipments = selectedDelivererName
    ? shipments.filter(shipment => shipment.deliverer === selectedDelivererName)
    : [];

  return (
    <section id="delivery_route" className="delivery_route">
      <div className="container">
      <h4 className="titulo-repartidores">Lista de repartidores</h4>
        <ul className="lista-repartidores">
          {deliveryUsers.map((user) => (
            <div key={user.id_user} className="card-container">
              <div className="card">
                <div className="card-content">
                  <div className="user-info">
                    <img src={user.avatar || defaultAvatar} alt="Avatar" className="avatar" />
                    <div className="user-details">
                      <h6>{user.name}</h6>
                      <p>Repartidor</p>
                    </div>
                    <button onClick={() => handleViewShipments(user.id_user)}>
                      {selectedUser === user.id_user ? '-' : '+'}
                    </button>
                  </div>
                  {selectedUser === user.id_user && (
                    <ul className="shipments-list">
                      {filteredShipments.length > 0 ? (
                        filteredShipments.map((shipment) => (
                          <li key={shipment.id_shipment} className="envios" onClick={() => handlePickupPointClick(shipment.id_shipment)}>
                            <img src={shipmentIcon} alt="Shipment" className="shipment-icon" />
                            <div>
                              <strong>{shipment.customer_name}</strong>
                              <p>{shipment.delivery_address}</p>
                            </div>
                          </li>

                        ))
                      ) : (
                        <li>No hay envíos asociados</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>
        {selectedShipment && (
          <div className="popup open" ref={popupRef}>
            <h6>Detalles del envío</h6>
            {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment) && (
              <>
                <p><strong>Nombre:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.customer_name}</p>
                <p><strong>Compañía:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.company_name}</p>
                <p><strong>Dirección:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.delivery_address}</p>
                <p><strong>NIF:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.NIF}</p>
                <p><strong>Producto:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.product_name}</p>
                <p><strong>Cantidad:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.product_quantity}</p>
                <p><strong>Ciudad:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.address_city}</p>
                <p><strong>Teléfono:</strong> {filteredShipments.find(shipment => shipment.id_shipment === selectedShipment)?.customer_phone}</p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
