import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import { ChangeStatus } from "../../forms/ChangeStatus.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";

export const PaymentsList = ({
  payment,
  onDelete,
  handleNewPaymentStatus,
  typeModule,
  typeModuleMessage,
  token

}) => {
const paidDate = getNormalizedDate(payment.payment_date);

const traducirEstadoPago = (estado) => {
  switch (estado) {
    case 'pending':
      return { text: 'Pendiente', color: 'blue' };
    case 'cancelled':
      return { text: 'Cancelado', color: 'red' };
    case 'paid':
      return { text: 'Pagado', color: 'green' };
    default:
      return { text: estado, color: 'black' };
  }
};

const estadoPago = traducirEstadoPago(payment.payment_status)

const moreInfoFields = [
  { label: 'Ref', value: payment.ref_PM },
  { label: 'Cantidad', value: payment.paid_amount + '€'},
  { label: 'Cliente', value: `${payment.customer}`},
  { label: 'Telefono', value: payment.customer_phone },
  { label: 'Email', value: payment.customer_email },
  { label: 'Fecha del pago', value: paidDate.toLocaleDateString() },
  { label: 'Estado', value: estadoPago.text, color: estadoPago.color },
  { label: 'Factura asociada', value: payment.id_invoice },
  { label: 'Id del comercial', value: `${payment.salesAgent}` },
];

  return (
      <>
        <h2 id="element_payment_title" className=" mainInsideTitle">{payment.ref_PM}</h2>
        <h3 id="element_payment_paid" className=" mainInsideTitle"><strong>Pago: </strong> {payment.paid_amount}€</h3>
        <p id="element_payment_subtitle" className=" mainInsideSub"><strong>Fecha de pago: </strong> {paidDate.toLocaleDateString()}</p>

        <h3 id="element_payment_section " className="mainSubSection">Cliente</h3>
        <p><strong>Nombre: </strong> {payment.customer}</p>
        <p><strong>Email: </strong> {payment.customer_email}</p>
        <p><strong>Telefono: </strong> {payment.customer_phone}</p>

        <h3 id="payment_status" className="mainStatusSection" style={{color: estadoPago.color}}>{estadoPago.text}</h3>

        <span id="visit_actions" className="main_actions">

        <MoreInfo fields={moreInfoFields} modalIds={[]} />

        <ChangeStatus
          id={payment.id_payment}
          currentStatus={payment.payment_status}
          onClick={handleNewPaymentStatus}
          token={token}
        />
        <DeleteGenericModal
          id={payment.id_payment}
          onDelete={onDelete}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />

        </span>
      </>
  );
};
  