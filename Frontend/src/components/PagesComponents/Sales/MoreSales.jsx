import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";


export const MoreSales = ({ sale }) => {

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
    const nameComplete = `${sale.name} ${sale.last_name}`;
  
    const moreInfoFields = [
      { label: 'Ref', value: sale.ref_SL },
      {  label: 'Comercial', value: nameComplete },
      {  label: 'Producto', value: sale.product_name },
  
      {  label: 'Precio', value: sale.product_price },
      {  label: 'Cantidad', value: sale.quantity },
      {  label: 'Cliente', value: sale.customer },
  
      {  label: 'Email', value: sale.customer_email },
      {  label: 'Telefono', value: sale.customer_phone },
      {
       
        label: 'Estado De la Venta',
        value: traducirEstadoVenta(sale.operation_status),
      },
      {
        
        label: 'Fecha De Creación',
        value: dueDate.toLocaleDateString(),
      },
    ];
    return (
        <MoreInfo fields={moreInfoFields} modalIds={[]} />
    );
}