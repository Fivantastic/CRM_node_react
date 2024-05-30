import { useUser } from '../../../context/authContext.jsx';
import { ToggleSalesStatusButton } from '../../buttons/StatesBtn/ToggleSalesStatusButton.jsx';
import { DeleteGenericModal } from '../../forms/DeleteGenericModal.jsx';
import { MoreSales } from './MoreSales.jsx';
import { UpdateSale } from './UpdateSale.jsx';
import { PencilBroken } from '../../../assets/creado/PencilBroken.jsx';
import { Pending } from '../../../assets/creado/Pending.jsx';
import '../Sales/SalesListTable.css';

export const SalesListTable = ({ sale, onUpdateSale, onDelete }) => {
  const token = useUser();

  const errorMsg = "No se puede eliminar la venta porque tiene un albaran sin cancelar";

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

  return (
    <section id="sales_table">
      <div id="salesTableHead">
        <div id="salesTableHeadRowRef">Referencia</div>
        <div id="salesTableHeadRowName">Cliente</div>
        <div id="salesTableHeadRowProduct">Producto</div>
        <div id="salesTableHeadRowQuantity">Cantidad</div>
        <div id="salesTableHeadRowSalesAgent">Comercial</div>
        <div id="salesTableHeadRowEstatus">Estado</div>
        <div id="salesTableHeadRowActions">Acciones</div>
      </div>
      <div id="salesTableBody">
        {sale && sale.length > 0 ? (
          sale.map((sale) => {
            const statusSale = traducirEstadoVenta(sale.operation_status);
            return (
              <div key={sale.id_sale} className="salesTableBodyRow">
                <div className="salesTableBodyRowRef">{sale.ref_SL}</div>
                <div className="salesTableBodyName">{sale.company_name}</div>  
                <div className="salesTableBodyRowProduct">{sale.product_name}</div>
                <div className="salesTableBodyRowQuantity"> {sale.quantity} u.</div>
                <div className="salesTableBodyRowSalesAgent">{sale.salesAgent}</div>
                <div className="salesTableBodyRowEstatus" style={{ color: statusSale.color }}>
                  {statusSale.text}
                </div>
                <span className="salesTableBodyRowActions">
                  <MoreSales sale={sale} />
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
              </div>
              );
            }
          )
          ) : (
          <div className='noResult'>No hay clientes disponibles</div>
          )}
      </div>
    </section>
  );
};
