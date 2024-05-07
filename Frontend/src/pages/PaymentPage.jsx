import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { PaymentsList } from '../components/Payments/PaymentsList.jsx';
// import { ChangeStatus } from '../components/forms/ChangeStatus.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';
import { CreatePayment } from '../components/Payments/CreatePayment.jsx';
// import { UpdateSale } from '../components/Sales/UpdateSale.jsx';

export const PaymentPage = () => {
  // const token = useUser();
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
          // Mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error al obtener la lista de pagos:', error);
        // Mostrar un mensaje de error al usuario
      }
    };

    getSaleList();
  }, [token]);

  //TODO Actualizo el estado con la venta añadida
  const addPayment = () => {
    setPaymentsList((prevPayment) => [...prevPayment, paymentsList]);
  };

  //TODO Actualizo el estado con el pago eliminado
  const deletePayment = (id_payment) => {

    setPaymentsList((prevPayments) =>
      prevPayments.filter((payment) => payment.id_payment !== id_payment)
    );
  };

  //TODO Actualizo el estado con la venta eliminada
  // const updateSale = (id_sale) => {
  //   setSalesList((prevSales) =>
  //     prevSales.filter((sale) => sale.id_sale !== id_sale)
  //   );
  // };

  return (
    <section className="sale_container">
      <li>
        <Link to="/">Home</Link>
      </li>
      <h1 className="sale_title">Pagos</h1>
      <CreatePayment onAddPayment={addPayment} token={token} />
      <ol>
      {paymentsList.map((data) => {
          return (
            <div key={data.id_payment}>
              <PaymentsList payment={data}/>
              {/* <ChangeStatus id={data.id_payment} onClick={console.log('Cambiando el estado')} newStatus={'cancelled'} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />  */}
              {data.status === "cancelled" && <DeleteGenericModal id={data.id_payment} onDelete={deletePayment} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} /> }
            </div>
          );
        })}
      </ol> 
    </section>
  );
};
