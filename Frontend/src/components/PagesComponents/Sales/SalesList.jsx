import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { PencilBroken } from '../../../assets/creado/PencilBroken.jsx';
import { Pending } from '../../../assets/creado/Pending.jsx';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { ToggleSalesStatusButton } from '../../buttons/StatesBtn/ToggleSalesStatusButton.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateSale } from './UpdateSale.jsx';

export const SalesList = ({ sale, onUpdateSale, onDelete }) => {
  const dueDate = getNormalizedDate(sale.create_at);
  const token = useUser();

  const traducirEstadoVenta = (estado) => {
    switch (estado) {
      case "processing":
        return { text: "En proceso", color: "orange"}
      case 'open':
        return { text: 'Pendiente', color: 'blue' };
      case 'cancelled':
        return { text: 'Cancelada', color: 'red' };
      case 'closed':
        return { text: 'Cerrada', color: 'green' };
      default:
        return { text: estado, color: 'black' };
    }
  };

  const statusSale = traducirEstadoVenta(sale.operation_status);

  // Concatena el nombre y los apellidos del cliente
  const nameComplete = `${sale.customer} ${sale.customer_lastname}`;

  const errorMsg = "No se puede eliminar la venta porque tiene un albaran sin cancelar";

  const moreInfoFields = [
    { label: 'Ref', value: sale.ref_SL },
    { label: 'Empresa', value: sale.company_name },
    { label: 'Nombre', value: nameComplete},
    { label: 'Producto', value: sale.product_name },
    { label: 'Precio', value: sale.product_price + ' €' } ,
    { label: 'Cantidad', value: sale.quantity + ' u.' } ,
    { label: 'Email', value: sale.customer_email },
    { label: 'Telefono', value: sale.customer_phone },
    { label: 'Comercial', value: sale.salesAgent },
    {
      label: 'Estado De la Venta',
      value: statusSale.text,
      color: statusSale.color,
    },
    {
      label: 'Fecha De Creación',
      value: dueDate.toLocaleDateString(),
    },
  ];

  return (
    <>
      <p id="element_visit_subtitle" className="mainInsideSub">Ref: {sale.ref_SL} </p>
      <p className="mainInsideSub"> <strong>Empresa: </strong> {sale.company_name} </p>
      <p className="mainInsideSub"> <strong>Producto: </strong> {sale.product_name} </p>
      <p className="mainInsideSub"> <strong>Precio: </strong> {sale.product_price} € </p>
      <p className="mainInsideSub"> <strong>Cantidad: </strong> {sale.quantity} u.{' '}</p>
      <p className="mainInsideSub"> <strong>Comercial: </strong> {sale.salesAgent}</p>

      <p  className="mainInsideSub"><strong>Estado: </strong><span className={`${sale.operation_status}`}  style={{ color: statusSale.color, fontWeight: '600'}}>{statusSale.text}</span>
      </p>
      <span id="sales_actions_list" className="main_actions">
        <MoreInfo fields={moreInfoFields} modalIds={[]} />
        {sale.operation_status === 'open'? ( <Pending /> ) : (
          <ToggleSalesStatusButton
            id={sale.id_sale}
            currentStatus={sale.operation_status}
            onUpdateSale={onUpdateSale}
            token={token}
            /> 
        )}
        {sale.operation_status === 'closed'? (
          <PencilBroken  />
        ) : sale.operation_status === 'cancelled'? (
          <PencilBroken />
        ) : (
        <UpdateSale sale={sale.id_sale} onUpdateSale={onUpdateSale} token={token} />
        )}
        <DeleteGenericModal
          id={sale.id_sale}
          onDelete={onDelete}
          token={token}
          typeModule="sales"
          typeModuleMessage="Venta"
          typeError={errorMsg}
        />
      </span>
    </>
  );
};
