import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const useCustomerList = (token) => {
  const [listCustomer, setListCustomer] = useState([]);
  const [initialCustomerList, setInitialCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  const typeModule = 'customer';
  const typeModuleMessage = 'Cliente';

  useEffect(() => {
    getCustomerList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, listCustomer]);

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
        setListCustomer(responseData.data);
        setInitialCustomerList(responseData.data);
        setFilteredCustomerList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de clientes',
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
        setListCustomer(responseData.data);
        setFilteredCustomerList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredCustomerList([...initialCustomerList]);
    }
  };

  const applyFilters = () => {
    let filtered = listCustomer;
  
    if (selectedFilters.length > 0) {
      filtered = listCustomer.filter((customer) => {
        let activeFilter = true;
  
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

  const sortUsers = (list) => {
    if (!sortOption) {
      setFilteredCustomerList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case 'nombre-asc':
        sortedList.sort((a, b) => a.company_name.localeCompare(b.company_name));
        break;
      case 'nombre-desc':
        sortedList.sort((a, b) => b.company_name.localeCompare(a.company_name));
        break;
      case 'ref-asc':
        sortedList.sort((a, b) => a.ref_CT.localeCompare(b.ref_CT));
        break;
      case 'ref-desc':
        sortedList.sort((a, b) => b.ref_CT.localeCompare(a.ref_CT));
        break;
      default:
        break;
    }

    setFilteredCustomerList(sortedList);
  };

  const addCustomer = async () => {
    try {
      await getCustomerList();
    } catch (error) {
      console.error('Error al agregar un cliente:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar un cliente',
      });
    }
  };

  const deleteCustomer = async (id_customer) => {
    try {
      setListCustomer(prevCustomer => prevCustomer.filter(customer => customer.id_customer !== id_customer));
      await getCustomerList();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el cliente',
      });
    }
  };

  const updateCustomer = async (updatedCustomer) => {
    setListCustomer((prevList) =>
      prevList.map((customer) =>
        customer.id_customer === updatedCustomer.id_customer ? { ...customer, ...updatedCustomer } : customer
      ) 
      
    );
    
    
    setFilteredCustomerList((prevList) =>
      prevList.map((customer) =>
        customer.id_customer === updatedCustomer.id_customer ? { ...customer, ...updatedCustomer } : customer
      )
    );
    await getCustomerList();
  };

  const activeCustomer = (id_customer) => {
    setListCustomer((prevList) =>
      prevList.map((customer) =>
        customer.id_customer === id_customer
          ? { ...customer, active: !customer.active }
          : customer
      )
    );
    setFilteredCustomerList((prevList) =>
      prevList.map((customer) =>
        customer.id_customer === id_customer
          ? { ...customer, active: !customer.active }
          : customer
      )
    );
  };

  return {
    filteredCustomerList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    activeCustomer,
    typeModule,
    typeModuleMessage,
  };
};
