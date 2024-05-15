import { useState, useEffect, useRef } from 'react';
import defaultAvatar from '/profile.svg';
import { useUser } from '../../../context/authContext.jsx';
const URL = import.meta.env.VITE_URL;
import './DeliveryRoutes.css'; // Archivo de estilos para la representación visual de la ruta
import shipmentIcon from '../../../../public/shipmentRoute.svg';
import { Toast } from '../../alerts/Toast.jsx';

const DeliveryRoutes = () => {
  const token = useUser();
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null); // Nuevo estado para controlar qué envío se muestra en el popup
  const popupRef = useRef(null); // Referencia al elemento del popup

  useEffect(() => {
    getDeliveryUsers();
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
      const response = await fetch(`${URL}/user/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Usuarios recibidos satisfactoriamente:', responseData);
        setDeliveryUsers(
          responseData.data.filter((user) => user.role === 'deliverer')
        );
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista de usuarios:', errorData);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de usuarios',
      });
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const getShipmentsForUser = async () => {
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
        console.log('Envíos recibidos satisfactoriamente:', responseData);
        setShipments(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener los envíos:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener los envíos:', error);
    }
  };

  const handleViewShipments = async (userId) => {
    if (selectedUser === userId) {
      setSelectedUser(null); // Si se hace clic nuevamente en el mismo usuario, ocultar los envíos
      setShipments([]); // Limpiar la lista de envíos
    } else {
      setSelectedUser(userId);
      await getShipmentsForUser(userId); // Obtener los envíos para el usuario seleccionado
    }
  };

  const handlePickupPointClick = (shipmentId) => {
    setSelectedShipment(shipmentId); // Actualizar el estado para mostrar los detalles del envío en el popup
  };

  return (
    <showRoute>
      <section className="user_container">
        <h1 className="user_title">Lista de repartidores</h1>
        <ul className="user_list_ul">
          {deliveryUsers.map((user) => {
            return (
              <li key={user.id_user} className="user">
                <div className="action-avatar">
                  <div className="container-avatar-active">
                    <img
                      src={user.avatar || defaultAvatar}
                      alt="Avatar"
                      className="avatar"
                    />
                  </div>

                  <div
                    className={`envios ${selectedUser === user.id_user ? 'visible' : ''}`}
                  >
                    <img
                      src={shipmentIcon}
                      alt="Ver Envíos"
                      onClick={() => handleViewShipments(user.id_user)}
                    />
                    {/* Aquí incluimos el código de delivery-route */}
                    {selectedUser === user.id_user && (
                      <div className="delivery-route">
                        {shipments.map((shipment) => (
                          <div
                            key={shipment.id_shipment}
                            className="pickup-point"
                            onClick={() =>
                              handlePickupPointClick(shipment.id_shipment)
                            }
                          >
                            {/* Piquetas de la ruta de reparto */}
                            <div className="pickup-point-icon"></div>
                            {/* Detalles del envío en un popup */}
                            {shipment.id_shipment === selectedShipment && (
                              <div className="popup" ref={popupRef}>
                                <h2>Detalles del envío</h2>
                                <p>
                                  <strong>Nombre: </strong>
                                  {shipment.customer_name}
                                </p>
                                <p>
                                  <strong>Compañía:</strong> $
                                  {shipment.company_name}
                                </p>
                                <p>
                                  <strong>Dirección: </strong>{' '}
                                  {shipment.delivery_address}
                                </p>
                                <p>
                                  <strong>NIF:</strong> ${shipment.NIF}
                                </p>
                                <p>
                                  <strong>Producto:</strong> $
                                  {shipment.product_name}
                                </p>
                                <p>
                                  <strong>Cantidad:</strong> $
                                  {shipment.product_quantity}
                                </p>
                                <p>
                                  <strong>Ciudad: </strong>{' '}
                                  {shipment.address_city}
                                </p>
                                <p>
                                  <strong>Teléfono:</strong> $
                                  {shipment.customer_phone}
                                </p>

                                {/* Otros detalles del envío */}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="details">
                  <p className="userName">{user.name}</p>
                  <p className="role">Repartidor</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </showRoute>
  );
};

export default DeliveryRoutes;
