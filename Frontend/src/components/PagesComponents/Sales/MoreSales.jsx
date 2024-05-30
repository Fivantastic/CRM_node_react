import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreSales = ({ sale }) => {
  const dueDate = getNormalizedDate(sale.create_at);

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
  const nameComplete = `${sale.customer} ${sale.customer_lastname}`;

  const moreInfoFields = [
    { label: 'Ref', value: sale.ref_SL },
    { label: 'Empresa', value: sale.company_name },
    { label: 'Nombre', value: nameComplete },
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

  const modalIds = {
    classState: 'font-bold'
  };

  return <MoreInfo fields={moreInfoFields} modalIds={modalIds} />;
};
