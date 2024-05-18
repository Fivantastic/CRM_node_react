import { getNormalizedDate } from '../../../Services/getNormalizedDate.js';
import { useUser } from '../../../context/authContext.jsx';
import { useSalesList } from '../../../hooks/PagesHooks/useSalesList.js';
// import { AddButon } from '../../buttons/addButton.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import '../Sales/SalesListTable.css';
import { UpdateSale } from './UpdateSale.jsx';

export const SalesListTable = ({ sale, onDelete }) => {
  const token = useUser();
  const salesData = sale;

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

  const { updateSale } = useSalesList(token);

  return (
    <section id="sales_table">
      <div id="salesTableHead">
        <div id="salesTableHeadRowNameSalesAgent">Comencial</div>
        <div id="salesTableHeadRowProduct">Producto</div>
        <div id="salesTableHeadRowCustomer">Cliente</div>
        <div id="salesTableHeadRowEstatus">Estado</div>
        <div id="salesTableHeadRowDate">Fecha</div>
        <div id="salesTableHeadRowActions">Acciones</div>
      </div>
      <div id="salesTableBody">
        {salesData.length > 0 &&
          salesData.map((sale) => (
            <div key={sale.id_sale} id="salesTableBodyRow">
              <div id="salesTableBodyRowName">
                {sale.salesAgent} {sale.salesAgent_lastName}
              </div>
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
              <div id="saleTableBodyRowCustomer">
                <p>
                  <strong>Nombre: </strong> {sale.customer}
                </p>
                <p id="email">
                  <strong>Email: </strong> {sale.customer_email}
                </p>
                <p>
                  <strong>Telefono: </strong> {sale.customer_phone}
                </p>
              </div>
              <div id="saleTableBodyRowEstatus">
                <p>{traducirEstadoVenta(sale.operation_status)}</p>
              </div>
              <div id="salesTableBodyRowDate">
                <p>{dueDate.toLocaleDateString()}</p>
              </div>
              <div id="salesTableBodyRowActions">
                {/* <AddButon /> */}

                <UpdateSale
                  sale={sale.id_sale}
                  onUpdateSale={updateSale}
                  token={token}
                />
                <DeleteGenericModal
                  id={sale.id_user}
                  onDelete={onDelete}
                  token={token}
                  typeModule="user"
                  typeModuleMessage="Usuario"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
