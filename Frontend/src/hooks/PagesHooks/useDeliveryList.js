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
      case 'nombre-asc':
          sortedList.sort((a, b) => a.company_name.localeCompare(b.company_name));
          break;
      case 'nombre-desc':
          sortedList.sort((a, b) => b.company_name.localeCompare(a.company_name));
          break;
      case 'fecha-asc':
        sortedList.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        break;
      case 'ref-asc':
          sortedList.sort((a, b) => a.ref_DN.localeCompare(b.ref_DN));
          break;
      case 'ref-desc':
          sortedList.sort((a, b) => b.ref_DN.localeCompare(a.ref_DN));
          break;
    }

    setFilteredAlbaranList(sortedList);
  };
  const addDeliveryNote = async (newDeliveryNote) => {
    if (!newDeliveryNote || !newDeliveryNote.id_note) {
      console.error('El nuevo albarán no tiene id_note:', newDeliveryNote);
      return;
    }
    setFilteredAlbaranList((prevList) => [...prevList, newDeliveryNote]);
    try {
      await getAlbaranList();
    } catch (error) {
      console.error('Error al sincronizar la lista de albaranes:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al sincronizar la lista de albaranes',
      });
    }
  };

  const deleteDeliveryNote = async (id_note) => {
    try {
      setFilteredAlbaranList((prevList) =>
        prevList.filter((deliveryNote) => deliveryNote.id_note !== id_note)
      );
      await getAlbaranList();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const updateDeleveryNotes = async (id_note) => {
    try {
      setFilteredAlbaranList((prevList) =>
        prevList.filter((deleveryNotes) => deleveryNotes.id_note !== id_note)
      );
      await getAlbaranList();
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la factura',
      });
    }
  };

  return {
    filteredAlbaranList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addDeliveryNote,
    deleteDeliveryNote,
    updateDeleveryNotes,
  };
};
