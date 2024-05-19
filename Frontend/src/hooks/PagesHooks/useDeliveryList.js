import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;


export const useDeliveryList = (token) => {
  const [albaranList, setAlbaranList] = useState([]);
  const [initialAlbaranList, setInitialAlbaranList] = useState([]);
  const [filteredAlbaranList, setFilteredAlbaranList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  
  const typeModule = 'deliveryNotes';
  
  useEffect(() => {
    getAlbaranList();
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters(); 
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, albaranList]);

  useEffect(() => {
    if (filteredAlbaranList.length > 0) {
      sortAlbaranes(filteredAlbaranList);
    }
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getAlbaranList = async () => {
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
        setAlbaranList(responseData.data);
        setInitialAlbaranList(responseData.data);
        setFilteredAlbaranList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de albaranes:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de albaranes',
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
        setAlbaranList(responseData.data);
        setFilteredAlbaranList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar albaranes:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredAlbaranList([...initialAlbaranList]);
    }
  };

  const applyFilters = () => {
    let filtered = albaranList;

    if (selectedFilters.length > 0) {
      filtered = albaranList.filter(albaran => {
        return selectedFilters.includes(albaran.delivery_status);
      });
    }

    setFilteredAlbaranList(filtered);
    sortAlbaranes(filtered);
  };

  const sortAlbaranes = (list) => {
    if (!sortOption) {
      setFilteredAlbaranList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case 'fecha-asc':
        sortedList.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        break;

    }

    setFilteredAlbaranList(sortedList);
  };

  return {
    filteredAlbaranList,
    setFilteredAlbaranList,  // Asegúrate de exportar esta función
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getAlbaranList,
  };
};
