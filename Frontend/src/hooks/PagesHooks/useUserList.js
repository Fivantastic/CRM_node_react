import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const useUserList = (token) => {
  const [userList, setUserList] = useState([]);
  const [initialUserList, setInitialUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  // UseEffect para obtener la lista de usuarios
  useEffect(() => {
    getUserList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // UseEffect para aplicar los filtros
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, userList]);

  // UseEffect para aplicar el ordenamiento
  useEffect(() => {
    if (filteredUserList.length > 0) {
      sortUsers(filteredUserList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  // Función para obtener la lista de usuarios
  const getUserList = async () => {
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
        setUserList(responseData.data);
        setInitialUserList(responseData.data);
        setFilteredUserList(responseData.data);
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

  // Función para buscar usuarios
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}/user/search?searchTerm=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Buscar satisfactorio:', responseData);
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

  // Función para cambiar los filtros
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  // Función para cambiar el ordenamiento
  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredUserList([...initialUserList]);
    }
  };

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = userList;

    if (selectedFilters.length > 0) {
      filtered = userList.filter(user => {
        let activeFilter = true;
        let roleFilter = true;

        // Comprobamos si ambos filtros de actividad están presentes
        if (selectedFilters.includes('1') && selectedFilters.includes('0')) {
          activeFilter = true; // Muestra tanto activos como inactivos
        } else if (selectedFilters.includes('1')) {
          activeFilter = user.active;
        } else if (selectedFilters.includes('0')) {
          activeFilter = !user.active;
        }

        if (selectedFilters.some(filter => ['admin', 'salesAgent', 'deliverer'].includes(filter))) {
          roleFilter = selectedFilters.some(filter => filter === user.role);
        }

        return activeFilter && roleFilter;
      });
    }

    setFilteredUserList(filtered);
    sortUsers(filtered);
  };

  // Función para ordenar la lista de usuarios
  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredUserList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case 'nombre-asc':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nombre-desc':
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'ref-asc':
        sortedList.sort((a, b) => a.ref_US.localeCompare(b.ref_US));
        break;
      case 'ref-desc':
        sortedList.sort((a, b) => b.ref_US.localeCompare(a.ref_US));
        break;
      default:
        break;
    }

    setFilteredUserList(sortedList);
  };

  const addUser = async () => {
    try {
      await getUserList();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar el usuario',
      });
    }
  };

  const deleteUser = async (id_user) => {
    try {
      setUserList(prevUser => prevUser.filter(user => user.id_user !== id_user));
      await getUserList();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el usuario',
      });
    }
  };

  const activeUser = (id_user) => {
    try {
      setUserList(prevUserList =>
        prevUserList.map(user =>
          user.id_user === id_user ? { ...user, active: !user.active } : user
        )
      );
      setFilteredUserList(prevFilteredUserList =>
        prevFilteredUserList.map(user =>
          user.id_user === id_user ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al cambiar el estado del usuario',
      });
    }
  };

  // Retornar los hooks
  return {
    filteredUserList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addUser,
    deleteUser,
    activeUser
  };
};
