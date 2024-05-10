import { ShipmentInfoButton } from '../../buttons/ShipmentInfoButton';

export const ShipmentList = ({ Shipments }) => {
    return (
      <div>
        <ul>
          {Shipments.map((shipmentArray, index) => {
            // Verificar que el array de envíos no esté vacío y que cada envío tenga un nombre de cliente
            if (shipmentArray.length > 0 && shipmentArray.some(shipment => shipment.customer_name)) {
              return (
                <li key={index}>
                  <ul>
                    {shipmentArray.map((shipment, i) => {
                      // Renderizar solo si el envío tiene todos los datos necesarios
                      if (shipment.customer_name && shipment.company_name && shipment.customer_phone) {
                        return (
                          <li key={i}>
                            {/* Botón para ver detalles del envío */}
                            <ShipmentInfoButton shipmentData={shipment} />
                          </li>
                        );
                      } else {
                        return null; // No renderizar si faltan datos
                      }
                    })}
                  </ul>
                </li>
              );
            } else {
              return null; // No renderizar si el array de envíos está vacío o no válido
            }
          })}
        </ul>
      </div>
    );
};
