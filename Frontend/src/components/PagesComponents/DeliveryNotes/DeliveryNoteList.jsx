export const DeliveryNoteList = ({ deliveryNote }) => {

  const traducirEstadoEntrega = (estado) => {
    switch (estado) {
      case 'pending':
        return 'Pendiente';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      case 'delivering':
        return 'En reparto';
      default:
        return estado;
    }
  }

  return (
    <>
      <h2 id="element_note_title " className="mainInsideTitle">Entrega</h2>
      <p id="element_note_subtitle" className=" mainInsideSub">{deliveryNote.ref_DN}</p>
      <h3>Producto: {deliveryNote.product_name}</h3>
      <p><strong>Nombre del Cliente: </strong> {deliveryNote.customer_name}</p>
      <p><strong>Teléfono del Cliente: </strong> {deliveryNote.customer_phone}</p>
      <h3 id="element_note_section" className=" mainSubSection">Datos de la venta</h3>
      <p><strong>ID de la venta: </strong> {deliveryNote.sale_id}</p>
      <p><strong>Nombre del repartidor: </strong> {deliveryNote.deliverer}</p>
      <p><strong>Fecha: </strong> {deliveryNote.create_at}</p>
      <h3 id="note_status" className=" mainStatusSection"> {traducirEstadoEntrega(deliveryNote.delivery_status)}</h3>
    </>
  );
};
