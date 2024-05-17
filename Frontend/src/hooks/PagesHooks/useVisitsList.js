import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const useVisitsList = (token) => {
  const [visitList, setVisitList] = useState([]);
  const [initialVisitList, setInitialVisitList] = useState([]);
  const [filteredVisitList, setFilteredVisitList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'visits';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Visita';

  // UseEffect para obtener la lista de usuarios
  useEffect(() => {
    getVisitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // UseEffect para aplicar los filtros
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, visitList]);

  // UseEffect para aplicar el ordenamiento
  useEffect(() => {
    if (filteredVisitList.length > 0) {
      sortSales(filteredVisitList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  // Función para obtener la lista de usuarios
  const getVisitList = async () => {
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
        setVisitList(responseData.data);
        setInitialVisitList(responseData.data);
        setFilteredVisitList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de visitas:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de visitas',
      });
    }
  };

  // Función para buscar usuarios
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/${typeModule}/search?searchTerm=${searchTerm}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setVisitList(responseData.data);
        setFilteredVisitList(responseData.data);
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
      setFilteredVisitList([...initialVisitList]);
    }
  };

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = visitList;

    if (selectedFilters.length > 0) {
      filtered = visitList.filter((visit) => {
        let activeFilter = true;

        if (
          selectedFilters.some((filter) =>
            ['scheduled', 'cancelled', 'completed'].includes(filter)
          )
        ) {
          activeFilter = selectedFilters.some(
            (filter) => filter === visit.visit_status
          );
        }

        return activeFilter;
      });
    }

    setFilteredVisitList(filtered);
    sortSales(filtered);
  };

  // Función para ordenar la lista de usuarios
  const sortSales = (list) => {
    if (!sortOption) {
      setFilteredVisitList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case 'nombre-asc':
        sortedList.sort((a, b) =>
          a.customer_name.localeCompare(b.customer_name)
        );
        break;
      case 'nombre-desc':
        sortedList.sort((a, b) =>
          b.customer_name.localeCompare(a.customer_name)
        );
        break;
      case 'fecha-asc':
        sortedList.sort(
          (a, b) => new Date(a.visit_date) - new Date(b.visit_date)
        );
        break;
      case 'fecha-desc':
        sortedList.sort(
          (a, b) => new Date(b.visit_date) - new Date(a.visit_date)
        );
        break;
      default:
        break;
    }

    setFilteredVisitList(sortedList);
  };

  const addVisit = async () => {
    try {
      await getVisitList();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar el usuario',
      });
    }
  };

  const deleteVisit = async (id_visit) => {
    try {
      setVisitList((prevUser) =>
        prevUser.filter((visit) => visit.id_visit !== id_visit)
      );
      await getVisitList();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el usuario',
      });
    }
  };

  // Actualizo el estado con la venta eliminada
  const updateVisit = async (id_visit) => {
    try {
      setVisitList((prevSales) =>
        prevSales.filter((visit) => visit.id_visit !== id_visit)
      );
      await getVisitList();
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la venta',
      });
    }
  };

  // Retornar los hooks
  return {
    filteredVisitList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addVisit,
    deleteVisit,
    updateVisit,
    typeModule,
    typeModuleMessage,
  };
};
