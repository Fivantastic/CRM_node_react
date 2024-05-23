import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;


export const useCustomerList = (token) => {
    const [listCustomer, setListCustomer] = useState([]);
    const [initialCustomerList, setInitialCustomerList ] = useState([]);
    const [filteredCustomerList, setFilteredCustomerList] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [sortOption, setSortOption] = useState(null);
    
    // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
    const typeModule = 'customer';


    // UseEffect para obtener la lista de clientes
    useEffect(() => {
        getCustomerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // UseEffect para aplicar los filtros
    useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilters, listCustomer]);

    // UseEffect para aplicar el ordenamiento
    useEffect(() => {
    if (filteredCustomerList.length > 0) {
    sortUsers(filteredCustomerList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOption]);


    const getCustomerList = async () => {
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
        console.log('Obtener satisfactorio:', responseData);

        setListCustomer(responseData.data);
        setInitialCustomerList(responseData.data);
        setFilteredCustomerList(responseData.data);
        } else {
        const errorData = await response.json();
        console.error('Obtener fallido:', errorData);
        // Mostrar un mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
        Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de clientes',
    });
    }
    };

    // Función para buscar usuarios
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
            console.log('Búsqueda satisfactoria:', responseData);
            setListCustomer(responseData.data);
            setFilteredCustomerList(responseData.data);
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
        setFilteredCustomerList([...initialCustomerList]);
    }
    };

    // Función para aplicar los filtros
    const applyFilters = () => {
    let filtered = listCustomer;

    if (selectedFilters.length > 0) {
        filtered = listCustomer.filter(customer => {
        let activeFilter = true;

      // Comprobamos si ambos filtros de actividad están presentes
      if (selectedFilters.includes('1') && selectedFilters.includes('0')) {
        activeFilter = true; // Muestra tanto activos como inactivos
      } else if (selectedFilters.includes('1')) {
        activeFilter = customer.active;
      } else if (selectedFilters.includes('0')) {
        activeFilter = !customer.active;
      }
        return activeFilter;
        });
    }

    setFilteredCustomerList(filtered);
    sortUsers(filtered);
    };

    // Función para ordenar la lista de usuarios
    const sortUsers = (list) => {
    if (!sortOption) {
        setFilteredCustomerList(list);
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
        case 'fecha-asc':
        sortedList.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));
        break;
        case 'fecha-desc':
        sortedList.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        break;
        default:
        break;
    }

    setFilteredCustomerList(sortedList);
    };

    // Actualizo el estado con la venta añadida y solicito la lista actualizada al servidor
    const addCustomer = async () => {
    try {
        // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
        await getCustomerList();
    } catch (error) {
        console.error('Error al agregar al clientes:', error);
        // Mostrar un mensaje de error al usuario
        Toast.fire({
        icon: 'error',
        title: 'Error al agregar al clientes',
    });
    }
    };

    // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
    const deleteCustomer = async (id_customer) => {
    try {
        // Eliminar la venta del estado local
        setListCustomer((prevSales) =>
        prevSales.filter((customer) => customer.id_customer !== id_customer)
        );

        // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
        await getCustomerList();
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        // Mostrar un mensaje de error al usuario
        Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de clientes',
    });
    }
    };

    // Actualizo el estado con la venta actualizada y solicito la lista actualizada al servidor
    const updateCustomer = async (id_customer) => {
    try {
        // Eliminar la venta del estado local
        setListCustomer((prevSales) =>
        prevSales.filter((customer) => customer.id_customer !== id_customer)
        );

        // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
        await getCustomerList();
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        // Mostrar un mensaje de error al usuario
        Toast.fire({
        icon: 'error',
        title: 'Error al actualizar al cliente',
    });
    }
    };

  return {
    filteredCustomerList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addCustomer,
    deleteCustomer,
    updateCustomer,
  };
}