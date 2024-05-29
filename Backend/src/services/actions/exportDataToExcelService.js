import { getDataToExcelByTable } from '../../models/actions/getDataToExcelByTableNameModel.js';

const stateTranslations = {
  Sales: {
    operation_status: {
      open: 'Abierta',
      processing: 'En proceso',
      cancelled: 'Cancelada',
      closed: 'Cerrada',
    },
  },
  Visits: {
    visit_status: {
      scheduled: 'Programada',
      cancelled: 'Cancelada',
      completed: 'Completada',
    },
  },
  DeliveryNotes: {
    delivery_status: {
      pending: 'Pendiente',
      processing: 'En proceso',
      cancelled: 'Cancelada',
      delivering: 'En entrega',
      delivered: 'Entregada',
    },
  },
  Shipments: {
    shipment_status: {
      pending: 'Pendiente',
      inTransit: 'En tránsito',
      delivered: 'Entregada',
      delayed: 'Retrasada',
      cancelled: 'Cancelada',
    },
  },
  Invoices: {
    invoice_status: {
      pending: 'Pendiente',
      processing: 'En proceso',
      paid: 'Pagada',
      overdue: 'Vencida',
      partially_paid: 'Parcialmente pagada',
      cancelled: 'Cancelada',
      refunded: 'Reembolsada',
      disputed: 'Disputada',
      sent: 'Enviada',
    },
  },
  Payments: {
    payment_status: {
      pending: 'Pendiente',
      cancelled: 'Cancelada',
      paid: 'Pagada',
    },
  },
};

const translateState = (table, field, value) => {
  if (stateTranslations[table] && stateTranslations[table][field]) {
    return stateTranslations[table][field][value] || value;
  }
  return value;
};

export const exportDataToExcelService = async (tables) => {
  const data = await getDataToExcelByTable(tables);

  return data.map(row => {
    const translatedRow = { ...row };

    Object.keys(row).forEach(field => {
      if (field === 'Estado') {
        translatedRow[field] = translateState('Sales', 'operation_status', row[field]);
      }
      // Agrega aquí más casos si tienes otros campos de estado a traducir
    });

    return translatedRow;
  });
};
