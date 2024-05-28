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

  // Buscar Pagos
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

// Cambiar el ordenamiento
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
      case 'importe-asc':
        sortedList.sort((a, b) => a.paid_amount - b.paid_amount);
        break;
      case 'importe-desc':
        sortedList.sort((a, b) => b.paid_amount - a.paid_amount);
        break;
      case 'ref-asc':
        sortedList.sort((a, b) => a.ref_PM.localeCompare(b.ref_PM));
        break;
      case 'ref-desc':
        sortedList.sort((a, b) => b.ref_PM.localeCompare(a.ref_PM));
        break;
      case 'fecha-asc':
      sortedList.sort( (a, b) => a.create_at.localeCompare(b.create_at));
        break;
      case 'fecha-desc':
      sortedList.sort((a, b) => b.create_at.localeCompare(a.create_at));
        break;
      default:
        break;

    }

    setFilteredList(sortedList);
  }

  // Añadir
  const addPayment = async (newPayment) => {
    try {
      setPaymentsList((prevPayment) => {
        console.log('Nuevo payment:', newPayment);
        return [...prevPayment, newPayment];
      }) 
      await getPaymentsList();
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



  // Retornar los hooks
  return {
    handleSearch,
    handleFilterChange,    
    handleSortChange,
    filteredList,
    addPayment,
    handleNewPaymentStatus
  }
}