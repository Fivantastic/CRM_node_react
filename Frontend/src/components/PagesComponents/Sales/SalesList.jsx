import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { ToggleSalesStatusButton } from '../../buttons/StatesBtn/ToggleSalesStatusButton.jsx';
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

  const nameComplete = `${sale.salesAgent} ${sale.last_name}`;

  const moreInfoFields = [
    { label: 'Ref', value: sale.ref_SL },
    { label: 'Comercial', value: nameComplete },
    { label: 'Producto', value: sale.product_name },

    { label: 'Precio', value: sale.product_price },
    { label: 'Cantidad', value: sale.quantity },
    { label: 'Cliente', value: sale.customer },

    { label: 'Email', value: sale.customer_email },
    { label: 'Telefono', value: sale.customer_phone },
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

  /*  const modalIds = {
    idModalContainer: 'salesModalContainer',
    idModalHeader: 'salesrModalHeader',
    idModalTitle: 'salesModalTitle',
    idModalBody: 'salesModalBody',
    idModalFooter: 'salesModalFooter',
    idModalBtnClose: 'salesModalBtnClose',
  }; */

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
      <h3 id="element_sale_section" className="mainSubSection">
        Estado De la Venta
      </h3>
      <p
        className={`${sale.operation_status}`}
        style={{ color: statusSale.color }}
      >
        <strong>{statusSale.text} </strong>
      </p>
      <span id="sales_actions_list" className="main_actions">
        <MoreInfo fields={moreInfoFields} modalIds={[]} />
        <ToggleSalesStatusButton
          id={sale.id_sale}
          currentStatus={sale.operation_status}
          onUpdateSale={onUpdateSale}
          token={token}
        />
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
