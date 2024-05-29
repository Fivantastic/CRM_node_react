import xlsx from 'xlsx';
import { exportDataToExcelService } from '../../services/actions/exportDataToExcelService.js';

export const exportDataToExcelController = async (req, res, next) => {
  try {
    const { tables } = req.body;

    if (!tables || !Array.isArray(tables)) {
      throw new Error('Invalid table structure');
    }

    const data = await exportDataToExcelService(tables);

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    // Ajustar el ancho de las columnas
    const columnWidths = [
      { wch: 12 }, // Ref
      { wch: 15 }, // Estado
      { wch: 18 }, // Fecha de Creación
      { wch: 25 }, // Empresa
      { wch: 25 }, // Nombre
      { wch: 28 }, // Email
      { wch: 15 }, // Teléfono
      { wch: 25 }, // Producto
      { wch: 10 }, // Precio
      { wch: 10 }, // Cantidad
      { wch: 25 }, // Comercial
    ];
    worksheet['!cols'] = columnWidths;

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');

    const excelBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', `attachment; filename=exported_data.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } catch (error) {
    next(error);
  }
};
