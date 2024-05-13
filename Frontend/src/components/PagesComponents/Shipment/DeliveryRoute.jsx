import { useState, useEffect } from 'react';
import defaultAvatar from '/profile.svg';
import { useUser } from '../../../context/authContext.jsx';

const DeliveryRoutes = () => {
  const token = useUser();
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    getDeliveryUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getDeliveryUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Usuarios recibidos satisfactoriamente:', responseData);
        setDeliveryUsers(responseData.data.filter((user) => user.role === 'deliverer'));
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista de usuarios:', errorData);
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

  return (
    <showRoute>
      <section className="user_container">
        <h1 className="user_title">Lista de repartidores</h1>
        <ul className="user_list_ul">
          {deliveryUsers.map((user) => {
            return (
              <li key={user.id_user} className="user">
                <div className="container-avatar-active">
                  <img
                    src={user.avatar || defaultAvatar}
                    alt="Avatar"
                    className="avatar"
                  /> 
                  <div className="actions">
                  <button onClick={() => handleViewShipments(user.id_user)}>Ver Envíos</button>
                </div>
                </div>
                <div className="details">
                  <p className="userName">{user.name}</p>
                  <p className="role">Repartidor</p>
                </div>
               
                {selectedUser === user.id_user && (
                  <ul className="shipments_list_ul">
                    {shipments.map((shipment) => (
                      <li key={shipment.id_shipment} className="shipment">
                        <h2>Detalles del envío</h2>
                        <h3>Destinatario</h3>
                        <p><strong>Nombre: </strong> {shipment.customer_name}</p>
                        <p><strong>Compañía: </strong> {shipment.company_name}</p>
                        <p><strong>Dirección: </strong> {shipment.delivery_address}</p>
                        <p><strong>NIF: </strong> {shipment.NIF}</p>
                        <p><strong>Producto: </strong> {shipment.product_name}</p>
                        <p><strong>Cantidad: </strong> {shipment.product_quantity}</p>
                        <p><strong>Ciudad: </strong> {shipment.address_city}</p>
                        <p><strong>Teléfono: </strong> {shipment.customer_phone}</p>
                        <h3>Estado del envío</h3>
                        <p>{shipment.delivery_status}</p>
                        <h3>Repartidor</h3>
                        <p>{shipment.deliverer}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </showRoute>
  );
};

export default DeliveryRoutes;
