import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const useSalesList = (token) => {
  const [salesList, setSalesList] = useState([]);
  const [initialSalesList, setInitialSalesList] = useState([]);
  const [filteredSalesList, setFilteredSalesList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'sales';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Venta';

  // UseEffect para obtener la lista de usuarios
  useEffect(() => {
    getSalesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // UseEffect para aplicar los filtros
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, salesList]);

  // UseEffect para aplicar el ordenamiento
  useEffect(() => {
    if (filteredSalesList.length > 0) {
      sortSales(filteredSalesList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  // Función para obtener la lista de usuarios
  const getSalesList = async () => {
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
        setSalesList(responseData.data);
        setInitialSalesList(responseData.data);
        setFilteredSalesList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de ventas:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de ventas',
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
        setSalesList(responseData.data);
        setFilteredSalesList(responseData.data);
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
      setFilteredSalesList([...initialSalesList]);
    }
  };

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = salesList;

    if (selectedFilters.length > 0) {
      filtered = salesList.filter((sale) => {
        let activeFilter = true;

        if (
          selectedFilters.some((filter) =>
            ['open', 'processing', 'cancelled', 'closed'].includes(filter)
          )
        ) {
          activeFilter = selectedFilters.some(
            (filter) => filter === sale.operation_status
          );
        }

        return activeFilter;
      });
    }

    setFilteredSalesList(filtered);
    sortSales(filtered);
  };

  // Función para ordenar la lista de usuarios
  const sortSales = (list) => {
    if (!sortOption) {
      setFilteredSalesList(list);
      return;
    }
 
    let sortedList = [...list];

    switch (sortOption) {
      case 'fecha-asc':
        sortedList.sort( (a, b) => a.create_at.localeCompare(b.create_at));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => b.create_at.localeCompare(a.create_at));
        break;
      case 'empresa-asc':
        sortedList.sort( (a, b) => a.company_name.localeCompare(b.company_name));
        break;
      case 'empresa-desc':
        sortedList.sort((a, b) => b.company_name.localeCompare(a.company_name));
        break;
        case 'ref-asc':
        sortedList.sort( (a, b) => a.ref_SL.localeCompare(b.ref_SL));
        break;
        case 'ref-desc':
        sortedList.sort((a, b) => b.ref_SL.localeCompare(a.ref_SL));
        break;
      default:
        break;
    }

    setFilteredSalesList(sortedList);
  };

  const addSale = async () => {
    try {
      await getSalesList();
    } catch (error) {
      console.error('Error al agregar el venta:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar el venta',
      });
    }
  };

  const deleteSale = async (id_sale) => {
    try {
      setSalesList((prevUser) =>
        prevUser.filter((sale) => sale.id_sale !== id_sale)
      );
      await getSalesList();
    } catch (error) {
      console.error('Error al eliminar el venta:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el venta',
      });
    }
  };

  // Actualizo el estado con la venta eliminada
  const updateSale = async (id_sale) => {
    try {
      setSalesList((prevSales) =>
        prevSales.filter((sale) => sale.id_sale !== id_sale)
      );
      await getSalesList();
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
    filteredSalesList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addSale,
    deleteSale,
    updateSale,
    typeModule,
    typeModuleMessage,
  };
};
