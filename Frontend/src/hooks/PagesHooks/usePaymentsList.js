const URL = import.meta.env.VITE_URL;
import { useEffect, useState } from "react";
import { Toast } from "../../components/alerts/Toast";

export const usePaymentsList = (token) => {
const [paymentsList, setPaymentsList] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  // Obtener lista (useEffect - trigger)
  useEffect(() => {
    getPaymentsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // Aplicar los filtros (useEffect - trigger)
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, paymentsList]);

  // Aplicar el ordenamiento (useEffect - trigger)
  useEffect(() => {
    if (filteredList.length > 0) {
      sortPayments(filteredList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  // ___________________________________________________________________________________

  // Obtener lista
  const getPaymentsList = async () => {
    try {
      const response = await fetch(`${URL}/payments/list`, {
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
        setPaymentsList(responseData.data);
        setInitialList(responseData.data);
        setFilteredList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de pagos',
      });
      }
    } catch (error) {
      console.error('Error al obtener la lista de pagos:', error.message);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de pagos',
      });
    }
  };  

  // TODO - Buscar Pagos
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}/payments/search?searchTerm=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Buscar satisfactorio:', responseData);
        setPaymentsList(responseData.data);
        setFilteredList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar pagos:', error);
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
    let filtered = paymentsList;
        
    if (selectedFilters.length > 0) {
      filtered = paymentsList.filter(payment => {
        // let activeFilter = true;
        let statusFilter = true;

        // Filtrar por status
      if (selectedFilters.some(filter => ['paid', 'cancelled', 'pending'].includes(filter))) {
        statusFilter = selectedFilters.some(filter => filter === payment.payment_status);
        
      }

        // return activeFilter && statusFilter;
        return statusFilter;
      });
    }
    setFilteredList(filtered);
    sortPayments(filtered);
  };

  // Aplicar el orden
  // ? Aún no me funciona
  const sortPayments = (list) => {

    // Si no se envían opciones de ordenado, devolver tal cual
    if (!sortOption) {
      setFilteredList(list);
      return;
    }

      // crear la lista
    let sortedList = [...list];
    switch (sortOption) {
      case 'nombre-asc':
        sortedList.sort((a, b) => a.invoice_id.localeCompare(b.invoice_id));
        break;
      case 'nombre-desc':
        sortedList.sort((a, b) => b.invoice_id.localeCompare(a.invoice_id));
        break;
      case 'fecha-asc':
        sortedList.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        break;
      case 'status-asc':
        sortedList.sort((a, b) => a.payment_status.localeCompare(b.payment_status));
        break;
      case 'status-desc':
        sortedList.sort((a, b) => b.payment_status.localeCompare(a.payment_status));
        break;
      default:
        break;

    }

    setFilteredList(sortedList);
    console.log('Después del orden', sortedList.map( a => a.payment_status));
  }


  // ---------------------------------------------------------------------------

  // Añadir
  const addPayment = (newPayment) => {
    try {
      setPaymentsList((prevPayment) => {
        console.log('Nuevo payment:', newPayment);
        return [...prevPayment, newPayment];
      }) 
    }catch (error){
      console.error('Error al crear el pago', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al crear el pago',
    });
    }
  };

  // Actualizar
  function handleNewPaymentStatus(idPayment, newStatus) {
    try {
      setPaymentsList((prevPaymentsList) =>
        // Por cada pago de la lista...
        prevPaymentsList.map((payment) =>
          // Si el id del pago coincide...
          payment.id_payment === idPayment
            ? { ...payment, payment_status: newStatus }
            : payment
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del pago:', error);
      Toast.fire({
        icon: 'warning',
        title: 'Error, recarga la página para ver los cambios',
      });
    }
  }

  // Eliminar
  const deletePayment = (id_payment) => {
    try {
      setPaymentsList((prevPayments) =>
        prevPayments.filter((payment) => payment.id_payment !== id_payment)
      );
    } catch (error) {
      console.error('Error al eliminar el pago', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el pago',
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
    addPayment,
    deletePayment,
    handleNewPaymentStatus
  }
}