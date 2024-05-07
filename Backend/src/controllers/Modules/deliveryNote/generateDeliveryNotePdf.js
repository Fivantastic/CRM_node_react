import { PDFDocument, rgb } from 'pdf-lib';
import { insertDeliveryNoteModel } from '../../../models/deliveryNote/deliveryNoteModels.js';

export const generateDeliveryNotePdf = async (idNote) => {
  try {
    // Obtener los datos del albarán desde la base de datos
    const deliveryNoteData = await insertDeliveryNoteModel(idNote);

    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Agregar los datos del albarán al PDF
    page.drawText(`Sale ID: ${deliveryNoteData.sale_id}`, { x: 50, y: 700 });
    page.drawText(`Deliverer ID: ${deliveryNoteData.deliverer_id}`, { x: 50, y: 675 });
    // Agrega los otros campos aquí...

    // Codificar el PDF como un ArrayBuffer
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  } catch (error) {
    throw error;
  }
};
