export const DeliveryNoteList = ({ deliveryNote }) => {

  return (
    <>
      <h2 className="element_note_title mainInsideTitle">Entrega</h2>
      <p className="element_note_subtitle mainInsideSub">{deliveryNote.id_note}</p>
      <p><strong>Producto:</strong> {deliveryNote.product_name}</p>
      <p><strong>ID del cliente:</strong> {deliveryNote.customer_id}</p>
      <h3 className="element_note_section mainSubSection">Datos de la venta</h3>
      <p><strong>ID de la venta:</strong> {deliveryNote.sale_id}</p>
      <p><strong>Nombre del repartidor:</strong> {deliveryNote.deliverer}</p>
      <h3 className="note_status mainStatusSection"> {deliveryNote.delivery_status}</h3>
    </>
  );
};
