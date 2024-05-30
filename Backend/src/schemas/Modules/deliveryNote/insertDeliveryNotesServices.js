import { insertDeliveryNoteModel } from '../../../models/deliveryNote/deliveryNoteModels.js';
//import { getPendingSales } from '../../../utils/getPendingSales.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { updateSalesStatusOfNoteModel } from '../../../models/Modules/deliveryNote/updateSalesStatusOfNoteModel.js';
import { selectSalesByIdModel } from '../../../models/Modules/deliveryNote/selectSalesByIdModel.js';
import { selectCustomerByIdModel } from '../../../models/customer/selectCustomerByIdModel.js';
import { selectDeliveryNotesByIdModel } from '../../../models/Modules/deliveryNote/selectNotesByIdModel.js';
import { insertIdNoteInModulesByIdSaleModel } from '../../../models/Modules/deliveryNote/insertIdNoteInModulesByIdSale.js';

export const createDeliveryNoteService = async (id_sale, deliverer_id) => {
  // Extraer la información de la venta
  const pendingSalesArray = await selectSalesByIdModel(id_sale);
  const pendingSales = Array.isArray(pendingSalesArray) ? pendingSalesArray[0] : pendingSalesArray;

  // Obtener la última referencia de DeliveryNotes
  let currentRefDeliveryNote = await getMaxReference5Digits('DeliveryNotes', 'ref_DN') || 'DN-AA00000';
  // Generar la nueva referencia
  const ref_DN = generateReference5DigitsFromRef('DN', currentRefDeliveryNote);

  // Creamos el id de la nota de entrega
  const id_note = crypto.randomUUID();

  // Suposición: obtenemos customer_id y saleProduct_id desde pendingSales
  const { customer_id, saleProduct_id } = pendingSales;

  // Extraemos la dirección del cliente
  const customer = await selectCustomerByIdModel(customer_id);

  // Asegúrate de que customer existe y tiene el campo address_id
  if (!customer) {
    throw new Error(`Cliente con id ${customer_id} no encontrado`);
  }

  const { address_id } = customer;

  // Insertar la nota de entrega
  await insertDeliveryNoteModel(id_note, id_sale, ref_DN, deliverer_id, address_id, customer_id, saleProduct_id);

  // Actualizar el estado de la venta a "processing"
  await updateSalesStatusOfNoteModel(id_sale, 'processing');

  // Obtener la nota de entrega recién creada
  const data = await selectDeliveryNotesByIdModel(id_note);

  // Insertar el id de la nota de entrega en modulo asociado a la venta
  await insertIdNoteInModulesByIdSaleModel(id_sale, id_note);


  return data;
};
