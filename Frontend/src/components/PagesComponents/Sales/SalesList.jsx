import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { UpdateSale } from './UpdateSale.jsx';

export const SalesList = ({ sale, onUpdateSale, onDelete }) => {
  const dueDate = getNormalizedDate(sale.create_at);
  const token = useUser();

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'sales';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Cliente';

  const traducirEstadoVenta = (estado) => {
    switch (estado) {
      case 'open':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'closed':
        return 'Cerrada';
      default:
        return estado;
    }
  };

  const nameComplete = `${sale.salesAgent} ${sale.last_name}`;

  const moreInfoFields = [
    { name: 'ref_CT', label: 'Ref', value: sale.ref_CT },
    { name: 'Comercial', label: 'Comercial', value: nameComplete },
    { name: 'Producto', label: 'Producto', value: sale.product_name },

    { name: 'Precio', label: 'Precio', value: sale.product_price },
    { name: 'Cantidad', label: 'Cantidad', value: sale.quantity },
    { name: 'Cliente', label: 'Cliente', value: sale.customer },

    { name: 'Email', label: 'Email', value: sale.customer_email },
    { name: 'Telefono', label: 'Telefono', value: sale.customer_phone },
    {
      name: 'Estado De la Venta',
      label: 'Estado De la Venta',
      value: traducirEstadoVenta(sale.operation_status),
    },
    {
      name: 'Fecha De Creación',
      label: 'Fecha De Creación',
      value: dueDate.toLocaleDateString(),
    },
  ];

  return (
    <>
      <h2 id="element_sale_title " className="mainInsideTitle">
        Orden de venta
      </h2>
      <p id="element_sale_subtitle" className="mainInsideSub">
        Ref: {sale.ref_SL}
      </p>
      <h3 id="element_sale_section" className=" mainSubSection">
        Producto
      </h3>
      <p>
        <strong>Nombre: </strong> {sale.product_name}
      </p>
      <p>
        <strong>Precio: </strong> {sale.product_price} €
      </p>
      <p>
        <strong>Cantidad: </strong> {sale.quantity} u.{' '}
      </p>
      <h3 id="element_sale_section" className=" mainSubSection">
        Estado De la Venta
      </h3>
      <p>{traducirEstadoVenta(sale.operation_status)}</p>
      <span id="sales_actions_list" className="main_actions">
        <MoreInfo fields={moreInfoFields} />
        <UpdateSale
          sale={sale.id_sale}
          onUpdateSale={onUpdateSale}
          token={token}
        />
        <DeleteGenericModal
          id={sale.id_sale}
          onDelete={onDelete}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />
      </span>
    </>
  );
};
