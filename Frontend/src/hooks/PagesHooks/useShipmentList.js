import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

const useShipmentList = (token) => {
  const [shipmentList, setShipmentList] = useState([]);
  const [initialShipmentList, setInitialShipmentList] = useState([]);
  const [filteredShipmentList, setFilteredShipmentList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const typeModule = 'shipment';
  
  useEffect(() => {
    getShipmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, shipmentList]);

  useEffect(() => {
    if (filteredShipmentList.length > 0) {
      sortShipments(filteredShipmentList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getShipmentList = async () => {
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
        setShipmentList(responseData.data);
        setInitialShipmentList(responseData.data);
        setFilteredShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de envíos',
        });
      }
    } catch (error) {
      console.error('Error al obtener la lista de envíos:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de envíos',
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
        setShipmentList(responseData.data);
        setFilteredShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar envíos:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredShipmentList([...initialShipmentList]);
    }
  };

  const applyFilters = () => {
    let filtered = shipmentList;

    if (selectedFilters.length > 0) {
      filtered = shipmentList.filter((shipment) => selectedFilters.includes(shipment.shipment_status));
    }

    setFilteredShipmentList(filtered);
  };

  const sortShipments = (list) => {
    if (!sortOption) {
      setFilteredShipmentList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case 'fecha-asc':
        sortedList.sort((a, b) => new Date(a.delivery_date) - new Date(b.delivery_date));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => new Date(b.delivery_date) - new Date(a.delivery_date));
        break;
        case 'ref-asc':
        sortedList.sort((a, b) => a.ref_SH.localeCompare(b.ref_SH));
        break;
      case 'ref-desc':
        sortedList.sort((a, b) => b.ref_SH.localeCompare(a.ref_SH));
        break;
    }

    setFilteredShipmentList(sortedList);
  };

  const addShipment = async () => {
    try {
      await getShipmentList();
    } catch (error) {
      console.error('Error al agregar el envío:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar el envío',
      });
    }
  };
  
  const deleteShipment = async (id_shipment) => {
    try {
      setFilteredShipmentList((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id_shipment !== id_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error('Error al eliminar el envío:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el envío',
      });
    }
  };
  
  const updateShipment = async (updatedShipment) => {
    try {
      setFilteredShipmentList((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === updatedShipment.id_shipment ? { ...shipment, ...updatedShipment } : shipment
        )
      );
  
      setShipmentList((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === updatedShipment.id_shipment ? { ...shipment, ...updatedShipment } : shipment
        )
      );
  
      setInitialShipmentList((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === updatedShipment.id_shipment ? { ...shipment, ...updatedShipment } : shipment
        )
      );
  
      await getShipmentList();
    } catch (error) {
      console.error('Error al actualizar el envío:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar el envío',
      });
    }
  };
  

  return {
    filteredShipmentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getShipmentList,
    setFilteredShipmentList,
    addShipment,
    deleteShipment,
    updateShipment,
  };
};

export default useShipmentList;
