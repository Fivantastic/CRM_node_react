import { MainLayout } from "../layout/MainLayout.jsx";
import { useUser } from "../context/authContext.jsx";
import { useEffect, useState } from "react";
import { UserList } from "../components/PagesComponents/User/UserList.jsx";
import { CreateUser } from "../components/PagesComponents/User/CreateUser.jsx";
import { ToggleMode } from "../components/NavPages/ToggleMode.jsx";
import { SearchPages } from "../components/NavPages/SearchPages.jsx";
import { FilterPages } from "../components/NavPages/FilterPages.jsx";
import { SortPages } from "../components/NavPages/SortPages.jsx";

export const UserPage = () => {
    const token = useUser(); 
    const [userList, setUserList] = useState([]);

    // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
    const typeModule = 'user';
  
    // Tipo de modulo para el nombre de los mensajes al cliente
    const typeModuleMessage = 'Usuario';
  
    const getUserList = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${typeModule}/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(`${typeModuleMessage} recibido satisfactorio:`, responseData);
  
          // Actualizar el estado con los datos obtenidos
          setUserList(responseData.data);
        } else {
          const errorData = await response.json();
          console.error('Obtener fallido:', errorData);
          // Mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error al obtener la lista de ventas:', error);
        // Mostrar un mensaje de error al usuario
      }
    };
  
    useEffect(() => {
      getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
  

    // Actualizo el estado con la venta añadida y solicito la lista actualizada al servidor
    const addUser = async () => {
      try {
        // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
        await getUserList();
      } catch (error) {
        console.error('Error al agregar la venta:', error);
        // Mostrar un mensaje de error al usuario
      }
    };
    
  
    // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
    const deleteUser = async (id_user) => {
      try {
        // Eliminar la venta del estado local
        setUserList((prevUser) =>
          prevUser.filter((user) => user.id_user !== id_user)
        );
  
        // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
        await getUserList();
      } catch (error) {
        console.error('Error al eliminar la venta:', error);
        // Mostrar un mensaje de error al usuario
      }
    };

    const activeUser = (id_user) => {
      try {
        // Actualizar el estado local del usuario directamente
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.id_user === id_user ? { ...user, active: !user.active } : user
          )
        );
      } catch (error) {
        console.error('Error al cambiar el estado del usuario:', error);
        // Mostrar un mensaje de error al usuario si es necesario
      }
    };

    const filterOptions = [
      { label: 'Activo', value: 'active' },
      { label: 'Inactivo', value: 'inactive' },
      { label: 'Administrador', value: 'admin' },
      { label: 'Comercial', value: 'commercial' },
      { label: 'Repartidor', value: 'delivery' },
    ];

    const sortOptions = [
      { label: "Nombre (A - Z)", value: "nombre-asc" },
      { label: "Nombre (Z - A)", value: "nombre-desc" },
      { label: "Fecha (Antiguos)", value: "fecha-asc" },
      { label: "Fecha (Recientes)", value: "fecha-desc" },
      { label: "Rol (A - Z)", value: "rol-asc" },
      { label: "Rol (Z - A)", value: "rol-desc" },
    ];
    
    
    
    
    return (
      <MainLayout>
        <section id="user_container" className=" mainContainer">
          <h1 id="user_title" className=" mainTitle">User List</h1>
          <nav id="user_nav" className="mainNav">
          <SearchPages />
          <CreateUser onAddUser={addUser} token={token} />
          <FilterPages options={filterOptions} />
          <SortPages options={sortOptions}/>
          <ToggleMode />
          </nav>
          <ol id="user_list" className="main_olist">
            {userList.map((data) => {
              return (
                <li key={data.id_user} id="element_user_container" >
                  <UserList user={data} id={data.id_user} activeUser={activeUser} onDelete={deleteUser}/>
                </li>
              );
            })}
          </ol>
        </section>
      </MainLayout>
    );
  };
