export const PaymentsList = ( { payment } ) => {
  const status = payment.payment_status
  let statusColor = '';
  let message = '';

  if (status === 'pending') { statusColor = 'orange'; message = "Pendiente";
} else if (status === 'cancelled') {statusColor = 'gray'; message = "Cancelado";
} else if (status === 'paid') { statusColor = 'green'; message = "Pagado";
}
  
  return (
      <>
        <h2 className="element_payment_title">{payment.paid_amount}€</h2>
        <p className="element_payment_subtitle">{payment.payment_date}</p>

        <h3 >Factura asociada</h3>
        <p>{payment.id_invoice}</p>

        <h3 className="element_payment_section">Cliente</h3>
        <p>Nombre: {payment.customer}</p>
        <p>Email: {payment.customer_email}</p>
        <p>Telefono: {payment.customer_phone}</p>

        <h3 className="status payment_status" style={{color: statusColor}}>{message}</h3>
      </>
  );
};
  