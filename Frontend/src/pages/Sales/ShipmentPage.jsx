import  { useState, useEffect } from 'react';
import { MainLayout } from '../../layout/MainLayout.jsx';
import defaultAvatar from '/profile.svg';
import { useUser } from '../../context/authContext.jsx';
import { ShipmentList } from '../../components/PagesComponents/Shipment/ShipmentList.jsx';
import '/src/components/PagesComponents/Shipment/ShipmentStyle.css';

const ShipmentPage = () => {
  const token = useUser();
  const [userList, setUserList] = useState([]);
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    getDeliveryUsers();
    getRouteData();
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

        // Filtrar la lista de usuarios para mostrar solo los repartidores
        const deliveryUsers = responseData.data.filter(
          (user) => user.role === 'deliverer'
        );

        // Actualizar el estado con los datos de los repartidores
        setUserList(deliveryUsers);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista de usuarios:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const getRouteData = async () => {
    try {
      const response = await fetch('http://localhost:3000/shipment/route', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(
          'Datos de la hoja de ruta recibidos satisfactoriamente:',
          responseData
        );
        setRouteData(responseData.data); // Actualizar el estado con los datos de la hoja de ruta
      } else {
        const errorData = await response.json();
        console.error(
          'Error al obtener los datos de la hoja de ruta:',
          errorData
        );
      }
    } catch (error) {
      console.error('Error al obtener los datos de la hoja de ruta:', error);
    }
  };

  // Mapeo de roles
  const roleMapping = {
    salesAgent: 'Agente de Ventas',
    deliverer: 'Repartidor',
    admin: 'Administrador',
  };

  return (
    <MainLayout>
      <section className="user_container">
        <h1 className="user_title">Lista de comerciales</h1>
        <ul className="user_list_ul">
          {userList.map((user) => {
            return (
              <li key={user.id_user} className="user">
                <div className="container-avatar-active">
                  <img
                    src={user.avatar || defaultAvatar}
                    alt="Avatar"
                    className="avatar"
                  />
                </div>
                <div className="details">
                  <p className="userName">{user.name}</p>
                  <p className="role">{roleMapping[user.role] || user.role}</p>
                </div>
                <div className="actions">
                  <button onClick={() => {
                  
                  }}>
                    Ver Envios
                  </button>
                  {/* Aquí mostramos el botón ShipmentInfoButton */}
                  {routeData.length > 0 && (
                    <ShipmentList Shipments={routeData} token={token} />
                  )}
                  
                  
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </MainLayout>
  );
};

export default ShipmentPage;