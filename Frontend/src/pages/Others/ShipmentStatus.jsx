export const closeShipmentStatus = async (shipmentId, token) => {
    
    const response = await fetch(`http://localhost:3000/shipment/closed/${shipmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al cerrar el envío');
    }
  
    return response.json();
  };
  