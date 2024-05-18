import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { MoreInfo } from '../../InfoModal/MoreInfo.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import '../Sales/SalesListTable.css';
import { UpdateSale } from './UpdateSale.jsx';

export const SalesListTable = ({ sale, onUpdateSale, onDelete }) => {
  const token = useUser();
  const salesData = sale;

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'sales';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Cliente';

  const dueDate = getNormalizedDate(sale.create_at);

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
    <section id="sales_table">
      <div id="salesTableHead">
        <div id="salesTableHeadRowNameSalesAgent">Ref</div>
        <div id="salesTableHeadRowProduct">Producto</div>
        <div id="salesTableHeadRowEstatus">Estado</div>
        <div id="salesTableHeadRowActions">Acciones</div>
      </div>
      <div id="salesTableBody">
        {salesData.length > 0 &&
          salesData.map((sale) => (
            <div key={sale.id_sale} id="salesTableBodyRow">
              <div id="salesTableBodyRowName">{sale.ref_SL}</div>
              <div id="salesTableBodyProduct">
                <p>
                  <strong>Nombre: </strong> {sale.product_name}
                </p>
                <p>
                  <strong>Precio: </strong> {sale.product_price} €
                </p>
                <p>
                  <strong>Cantidad: </strong> {sale.quantity} u.{' '}
                </p>
              </div>
              <div id="saleTableBodyRowEstatus">
                <p>{traducirEstadoVenta(sale.operation_status)}</p>
              </div>
              <div id="salesTableBodyRowActions">
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
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
