import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
import { RatingDashboard } from '../../components/Dashboard/DataDashboard/RatingDashboard.jsx';
const URL = import.meta.env.VITE_URL;

export const useVisitsList = (token) => {
  const [visitList, setVisitList] = useState([]);
  const [initialVisitList, setInitialVisitList] = useState([]);
  const [filteredVisitList, setFilteredVisitList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  const typeModule = 'visits';
  const typeModuleMessage = 'Visita';

  useEffect(() => {
    getVisitList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, visitList]);

  useEffect(() => {
    if (filteredVisitList.length > 0) {
      sortSales(filteredVisitList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

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
        console.error('Obtener fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de visitas:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de visitas',
      });
    }
  };

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
      console.error('Error al buscar visitas:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredVisitList([...initialVisitList]);
    }
  };

  const applyFilters = () => {
    let filtered = visitList;

    if (selectedFilters.length > 0) {
      filtered = visitList.filter((visit) => {
        return selectedFilters.includes(visit.visit_status);
      });
    }

    setFilteredVisitList(filtered);
    sortSales(filtered);
  };

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
      case 'ref-asc':
          sortedList.sort((a, b) => a.ref_VT.localeCompare(b.ref_VT));
        break;
      case 'ref-desc':sortedList.sort((a, b) => b.ref_VT.localeCompare(a.ref_VT
          ));
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
      console.error('Error al agregar la visita:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar la visita',
      });
    }
  };

  const deleteVisit = async (id_visit) => {
    try {
      setVisitList((prevVisits) =>
        prevVisits.filter((visit) => visit.id_visit !== id_visit)
      );
      await getVisitList();
      RatingDashboard();
    } catch (error) {
      console.error('Error al eliminar la visita:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar la visita',
      });
    }
  };

  const updateVisit = async (id_visit, newStatus) => {
    try {
      setVisitList((prevVisitList) =>
        prevVisitList.map((visit) =>
          visit.id_visit === id_visit
            ? { ...visit, visit_status: newStatus }
            : visit
        )
      );
      await getVisitList();
    } catch (error) {
      console.error('Error al cambiar el estado de la visita:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al cambiar el estado de la visita',
      });
    }
  };

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
