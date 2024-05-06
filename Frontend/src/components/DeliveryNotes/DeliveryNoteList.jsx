
export const DeliveryNoteList = ({ deliveryNote }) => {
  return (
    <>
      <li>
        <h2>Referencia de la nota de entrega</h2>
        <p>ID de la nota: {deliveryNote.id}</p>
        <p>ID de la venta: {deliveryNote.sale_id}</p>
        <p>ID del repartidor: {deliveryNote.deliverer_id}</p>
        <p>Estado de la entrega: {deliveryNote.delivery_status}</p>
        {/* Otros detalles de la nota de entrega según necesites */}
      </li>
    </>
  );
};


