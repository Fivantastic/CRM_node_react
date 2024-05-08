import { useEffect, useState } from 'react';
import { useUser } from '../context/authContext.jsx';
import { PaymentsList } from '../components/Payments/PaymentsList.jsx';
import { ChangeStatus } from '../components/forms/ChangeStatus.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';
import { CreatePayment } from '../components/Payments/CreatePayment.jsx';
import { MainLayout } from '../layout/MainLayout.jsx';

import '../components/PopsStyle/ListStyleGeneric.css'
import Swal from 'sweetalert2';

// Modelo swal
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const PaymentPage = () => {
  const token = useUser();
  const [paymentsList, setPaymentsList] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'payments';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Pagos';

  useEffect(() => {
    const getSaleList = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${typeModule}/list`, {
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
        } else {
          const errorData = await response.json();
          console.error('Obetener fallido:', errorData);
        }
      } catch (error) {
        console.error('Error al obtener la lista de pagos:', error);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de pagos',
          });
      }
    };

    getSaleList();
  }, [token]);

  // Actualizo el estado con la venta añadida
  const addPayment = (newPayment) => {
    setPaymentsList((prevPayment) => {
      console.log('Nuevo payment:', newPayment);
      return [...prevPayment, newPayment]});
  };

  // Actualizo el estado con el pago eliminado
  const deletePayment = (id_payment) => {
    setPaymentsList((prevPayments) =>
      prevPayments.filter((payment) => payment.id_payment !== id_payment)
    );
  };

  // TODO - Actualizar componente en cambio de estado
  function handleNewPaymentStatus (idPayment, newStatus) {
    try {
      setPaymentsList((prevPaymentsList) =>
        // Por cada pago de la lista...
        prevPaymentsList.map((payment) =>
        // Si el id del pago coincide...
          payment.id_payment === idPayment ? { ...payment, payment_status: newStatus } : payment
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);

      Toast.fire({
        icon: 'error',
        title: 'Por favor, recarga la página',
        });
    }
  }

  return (
    <MainLayout>
      <section className='payment_container'>
        <h1>Pagos</h1>
        <CreatePayment onAddPayment={addPayment} token={token} />
        <ol className='payment_list generic_list'>
        {paymentsList.map((data) => {
            const currentStatus = data.payment_status
            return (
              <li key={data.id_payment} className='element_payment_content' >
                <PaymentsList payment={data} />
                {currentStatus !== "cancelled" && <ChangeStatus id={data.id_payment} onClick={handleNewPaymentStatus} newStatus={'cancelled'} newStatusMessage='Cancelar' token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />  }
                {currentStatus !== "paid" && currentStatus !== "cancelled" && <ChangeStatus id={data.id_payment} onClick={handleNewPaymentStatus} newStatus={'paid'} newStatusMessage='Resolver' token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} /> }
                {currentStatus !== "pending" && currentStatus !== "paid" && <ChangeStatus id={data.id_payment} onClick={handleNewPaymentStatus} newStatus={'pending'} newStatusMessage='Restaurar' token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} /> }

                {currentStatus === "cancelled" && <DeleteGenericModal id={data.id_payment} onDelete={deletePayment} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} /> }
              </li>
            );
          })}
        </ol> 
      </section>
    </MainLayout>
  );
};
