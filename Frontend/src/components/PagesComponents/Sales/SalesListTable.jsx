import { useUser } from '../../../context/authContext.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import '../Sales/SalesListTable.css';
import { MoreSales } from './MoreSales.jsx';
import { UpdateSale } from './UpdateSale.jsx';

export const SalesListTable = ({ sale, onUpdateSale, onDelete }) => {
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
  
  return (
    <section id="sales_table">
      <div id="salesTableHead">
        <div id="salesTableHeadRowNameSalesAgent">Ref</div>
        <div id="salesTableHeadRowProduct">Producto</div>
        <div id="salesTableHeadRowEstatus">Estado</div>
        <div id="salesTableHeadRowActions">Acciones</div>
      </div>
      <div id="salesTableBody">
        {sale.length > 0 &&
          sale.map((sale) => (
            <div key={sale.id_sale} id="salesTableBodyRow">
              <div id="salesTableBodyRowName">{sale.ref_SL}</div>
              <div id="salesTableBodyProduct">
                <p>
                  <strong>Nombre: </strong> {nameComplete}
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
                <MoreSales sale={sale} />
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
