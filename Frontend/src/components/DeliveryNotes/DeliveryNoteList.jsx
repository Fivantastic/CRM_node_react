export const DeliveryNoteList = ({ deliveryNote }) => {
  return (
    <>
      <h2>Referencia de la nota de entrega</h2>
      <p>ID de la nota: {deliveryNote.id_note}</p>
      <p>Producto: {deliveryNote.product_name}</p>
      <p>ID del cliente: {deliveryNote.customer_id}</p>
      <p>ID de la venta: {deliveryNote.sale_id}</p>
      <p>Nombre del repartidor: {deliveryNote.deliverer}</p>
      <p>Estado de la entrega: {deliveryNote.delivery_status}</p>
    </>
  );
};
