const URL = import.meta.env.VITE_URL;
import { useEffect, useState } from "react";
import { Toast } from "../../components/alerts/Toast";

export const useInvoicesList = (token) => {
const [invoicesList, setInvoicesList] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  // Obtener lista (useEffect - trigger)
  useEffect(() => {
    getInvoicesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // Aplicar los filtros (useEffect - trigger)
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, invoicesList]);

  // Aplicar el ordenamiento (useEffect - trigger)
  useEffect(() => {
    if (filteredList.length > 0) {
      sortInvoices(filteredList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  // Obtener lista
  const getInvoicesList = async () => {
    try {
      const response = await fetch(`${URL}/invoice`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Obtener satisfactorio:', responseData);

        // Actualizar el estado con los datos obtenidos
        setInvoicesList(responseData.data);
        setInitialList(responseData.data);
        setFilteredList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de facturas',
      });
      }
    } catch (error) {
      console.error('Error al obtener la lista de facturas:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de facturas',
    });
    }
  };

  // TODO - Buscar facturas
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}/invoice/search?searchTerm=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Buscar satisfactorio:', responseData);
        setInvoicesList(responseData.data);
        setFilteredList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar facturas:', error);
    }
  };
  
  // Cambiar Filtros
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters); // Funciona bien
  };

// ???????   Cambiar el ordenamiento
  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredList([...initialList]);
    }
  };

  //   Aplicar los filtros 
  const applyFilters = () => {
    let filtered = invoicesList;
        
    if (selectedFilters.length > 0) {
      filtered = invoicesList.filter(invoice => {
        // let activeFilter = true;
        let statusFilter = true;

            // Filtrar por status
        if (selectedFilters.some(filter => ['pending', 'paid', 'overdue', 'partially_paid', 'cancelled', 'refunded', 'disputed', 'sent'].includes(filter))) {
          statusFilter = selectedFilters.some(filter => filter === invoice.invoice_status);
          
        }

        // return activeFilter && statusFilter;
        return statusFilter;
      });
    }
    setFilteredList(filtered);
    sortInvoices(filtered);
  };

  // Aplicar el orden
  // ? Aún no me funciona
  const sortInvoices = (list) => {

    // Si no se envían opciones de ordenado, devolver tal cual
    if (!sortOption) {
      setFilteredList(list);
      return;
    }

      // crear la lista
    let sortedList = [...list];
    console.log(sortedList);
    switch (sortOption) {
      case 'comercial-asc':
        sortedList.sort((a, b) => a.agent_name.localeCompare(b.agent_name));
        break;
        case 'comercial-desc':
          sortedList.sort((a, b) => b.agent_name.localeCompare(a.agent_name));
          break;
          case 'fecha-asc':
            sortedList.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
            break;
          case 'fecha-desc':
              sortedList.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
            break;
          case 'ref-asc':
                sortedList.sort((a, b) => a.ref_IN.localeCompare(b.ref_IN));
            break;
          case 'ref-desc':
                sortedList.sort((a, b) => b.ref_IN.localeCompare(a.ref_IN));
            break;
      default:
        break;

    }

    setFilteredList(sortedList);
  }

    // Actualizo el estado con la venta añadida
    const addInvoice = async () => {
        try {
          await getInvoicesList();
        } catch (error) {
          console.error('Error al agregar la factura:', error);
          Toast.fire({
            icon: 'error',
            title: 'Error al agregar la factura',
        });
        }
      };
    
      // Actualizo el estado con la venta eliminada
      const updateInvoice = async (id_invoice) => {
        try {
          setInvoicesList((prevSales) =>
            prevSales.filter((invoice) => invoice.id_invoice !== id_invoice)
          );
    
          await getInvoicesList();
        } catch (error) {
          console.error('Error al actualizar la factura:', error);
          Toast.fire({
            icon: 'error',
            title: 'Error al actualizar la factura',
        });
        }
      };
    

  // _____________________________________________________________________________

  // Retornar los hooks
  return {
    handleSearch,
    handleFilterChange,    
    handleSortChange,
    filteredList,
    addInvoice,
    updateInvoice
  }
}