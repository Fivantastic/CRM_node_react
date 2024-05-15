import { MainLayout } from '../layout/MainLayout.jsx';
import { useUser } from '../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { UserList } from '../components/PagesComponents/User/UserList.jsx';
import { CreateUser } from '../components/PagesComponents/User/CreateUser.jsx';
import { ToggleMode } from '../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../components/NavPages/FilterPages.jsx';
import { SortPages } from '../components/NavPages/SortPages.jsx';
import { UserListTable } from '../components/PagesComponents/User/UserListTable.jsx';
import { Toast } from '../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const UserPage = () => {
  const token = useUser();
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isListView, setIsListView] = useState(true);

  const typeModule = 'user';

  const typeModuleMessage = 'Usuario';

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    setFilteredUserList(userList);  // Asegura que la lista completa se muestre inicialmente
  }, [userList]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, userList]);

  const getUserList = async () => {
    try {
      const response = await fetch(`${URL}/${typeModule}/list`, {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(`${typeModuleMessage} recibido satisfactoriamente:`, responseData);
        setUserList(responseData.data);
        setFilteredUserList(responseData.data); // Aplica filtros a la lista obtenida
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de usuarios',
    });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}/${typeModule}/search?searchTerm=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Busqueda satisfactoria:', responseData);
        setUserList(responseData.data);
        setFilteredUserList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const applyFilters = () => {
    const isAnyFilterActive = Object.values(selectedFilters).some(value => value);
  
    if (isAnyFilterActive) {
      let filtered = userList.filter(user => {
        // Filtrar por actividad
        const activeFilter = selectedFilters['1'] ? user.active :
                             selectedFilters['0'] ? !user.active : 
                             true;
  
        // Filtrar por roles
        const roleFilter = Object.keys(selectedFilters).some(key => 
          (['admin', 'salesAgent', 'deliverer'].includes(key) && selectedFilters[key] && user.role === key)) ||
          !['admin', 'salesAgent', 'deliverer'].some(role => role in selectedFilters);
  
        // Combinar los filtros (tiene que cumplir con ambos)
        return activeFilter && roleFilter;
      });
      setFilteredUserList(filtered);
    } else {
      // Si no hay filtros seleccionados, muestra la lista completa
      setFilteredUserList(userList);
    }
  };
  

  const addUser = async () => {
    try {
      await getUserList();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const deleteUser = async (id_user) => {
    try {
      setUserList((prevUser) => prevUser.filter((user) => user.id_user !== id_user));
      await getUserList();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const activeUser = (id_user) => {
    try {
      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user.id_user === id_user ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

  const filterOptions = [
    { label: 'Activo', key: 'active', value: '1' },
    { label: 'Inactivo', key: 'active', value: '0' },
    { label: 'Administrador', key: 'role', value: 'admin' },
    { label: 'Comercial', key: 'role', value: 'salesAgent' },
    { label: 'Repartidor', key: 'role', value: 'deliverer' },
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
      <section id="user_container" className="mainContainer">
        <h1 id="user_title" className="mainTitle">User List</h1>
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateUser onAddUser={addUser} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} />
          <ToggleMode onClick={() => setIsListView(prev => !prev)} />
        </nav>
        {isListView ? (
          <ol id="user_list" className="main_olist">
            {filteredUserList.map(data => (
              <li key={data.id_user} id="element_user_container">
                <UserList user={data} id={data.id_user} activeUser={activeUser} onDelete={deleteUser} />

              </li>
            ))}
          </ol>
        ) : (
          <UserListTable user={filteredUserList} activeUser={activeUser} onDelete={deleteUser} />
        )}
      </section>
    </MainLayout>
  );
};
