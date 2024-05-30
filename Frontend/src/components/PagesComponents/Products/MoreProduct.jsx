import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";


export const MoreProduct = ({ product }) => {

  // Si active es 1 que ponga activo si es 0 que muestre inactivo
  const active = product.active  ? 'Activo' : 'Inactivo';
  const activeClass = product.active  ? 'green' : 'red';

    const fechaNormal = getNormalizedDate(product.creation_at);

    const moreInfoFields = [
     { label: 'Ref', value:''+ product.ref_PR},
     { label: 'Nombre', value:''+ product.name},
     { label: 'Precio', value:''+ product.price + ' €'},
     { label: 'Stock',value:''+ product.stock + ' u.'},
     { label: 'Estado',value:''+ active , color: activeClass},
     { label: 'Fecha de creación', value:''+ fechaNormal.toLocaleDateString()},
     { label: 'Descripción', value:''+ product.description},
     ];

     const modalIds = {
      classState: 'font-bold'
    };

    return (
        <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
    )
}