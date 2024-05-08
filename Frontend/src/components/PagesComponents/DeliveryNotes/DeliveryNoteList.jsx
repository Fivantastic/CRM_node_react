export const DeliveryNoteList = ({ deliveryNote }) => {
  

  return (
    <>
      <h2 className="element_note_title">Entrega</h2>
      <p className="element_note_subtitle">{deliveryNote.id_note}</p>
      <p>Producto: {deliveryNote.product_name}</p>
      <p>ID del cliente: {deliveryNote.customer_id}</p>
      <h3 className="element_note_section">Datos de la venta</h3>
      <p>ID de la venta: {deliveryNote.sale_id}</p>
      <p>Nombre del repartidor: {deliveryNote.deliverer}</p>
      <h3 className="note_status"> {deliveryNote.delivery_status}</h3>
    </>
  );
};
