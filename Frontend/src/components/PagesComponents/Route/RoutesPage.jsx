import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../../context/authContext.jsx';
import defaultAvatar from '/profile.svg';
import './RoutesPage.css';
import { MainLayout } from '../../../layout/MainLayout.jsx';


const URL = import.meta.env.VITE_URL;

export const RoutesPage = () => {
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
      }
    } catch (error) {
      console.error('Error al obtener las rutas de reparto', error);
    }
  };

  const getShipments = async () => {
    try {
      const response = await fetch(`${URL}/shipment/deliverer`, {
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

  const closeShipmentStatus = async (shipmentId, userId, role, newStatus) => {
    try {
      const response = await fetch(`${URL}/shipment/closed/${shipmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ userId, role, newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cerrar el envío');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error al cerrar el envío:', error);
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

  const handleDeliver = async (shipmentId) => {
    try {
      const userId = token.id; // Obtén el ID del usuario desde el token
      const role = token.role; // Obtén el rol del usuario desde el token
      const newStatus = 'delivered';

      await closeShipmentStatus(shipmentId, userId, role, newStatus);
      // Actualiza el estado de los envíos si es necesario
      setShipments((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === shipmentId ? { ...shipment, shipment_status: newStatus } : shipment
        )
      );
      console.log(`Envío ${shipmentId} entregado por usuario ${userId}`);
    } catch (error) {
      console.error('Error al entregar el envío:', error);
    }
  };

  const selectedDelivererName = selectedUser ? deliveryUsers.find(user => user.id_user === selectedUser)?.name : null;
  const filteredShipments = selectedDelivererName
    ? shipments.filter(shipment => shipment.deliverer === selectedDelivererName)
    : [];

  return (
    <MainLayout title="Rutas">
      <section id="delivery_route" className="delivery_route">
        <div className="routes_page_container">
          <ul className="routes_page_lista-repartidores">
            {deliveryUsers.map((user) => (
              <div key={user.id_user} className="routes_page_card-container">
                <div className="routes_page_card">
                  <div className="routes_page_card-content">
                    <div className="routes_page_user-info">
                      <img src={user.avatar || defaultAvatar} alt="Avatar" className="routes_page_avatar" />
                      <div className="routes_page_user-details">
                        <h6>{user.name}</h6>
                        <p>Repartidor</p>
                      </div>
                      <button className="routes_page_button"  onClick={() => handleViewShipments(user.id_user)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#13214E"><path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"/></svg>
                      </button>
                    </div>
                    {selectedUser === user.id_user && (
                      <ul className="routes_page_shipments-list">
                        {filteredShipments.length > 0 ? (
                          filteredShipments.map((shipment) => (
                            <li key={shipment.id_shipment} className="routes_page_envios">
                              <div className="routes_page_envios_info" onClick={() => handlePickupPointClick(shipment.id_shipment)}>
                                <img src='/shipmentRoute.svg' alt="Shipment" className="routes_page_shipment-icon" />
                                <div>
                                  <strong>{shipment.customer_name}</strong>
                                  <p>{shipment.delivery_address}</p>
                                </div>
                              </div>
                              <button className="routes_page_deliver-button" onClick={() => handleDeliver(shipment.id_shipment)}>Entregar</button>
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
            <div className="routes_page_popup open" ref={popupRef}>
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
    </MainLayout>
  );
};
