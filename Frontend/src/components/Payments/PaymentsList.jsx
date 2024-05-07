export const PaymentsList = ( { payment } ) => {
    return (
      <>
        <li>
          <h2>Referencia de pago</h2>
          <p>Cantidad: {payment.paid_amount}€</p>
          <p>Fecha acordada: {payment.payment_date}</p>
  
          <h3>Factura asociada</h3>
          <p>{payment.id_invoice}</p>
  
          <h3>Cliente</h3>
          <p>Nombre: {payment.customer}</p>
          <p>Email: {payment.customer_email}</p>
          <p>Telefono: {payment.customer_phone}</p>
  
          <h3>Estado De la Venta</h3>
          <p>{payment.payment_status}</p>
          <h3>Fecha De Creación</h3>
          <p>{payment.create_at}</p>
        </li>
      </>
    );
  };
  