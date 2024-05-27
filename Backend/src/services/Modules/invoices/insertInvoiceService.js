import { selectCustomerIdBySaleIdModel } from "../../../models/Modules/invoices/selectCustomerIdBySaleIdModel.js";
import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";
import { insertInvoiceModel } from "../../../models/Modules/invoices/insertInvoiceModel.js";
import { selectProductById } from "../../../models/products/selectProductById.js";
import { selectSaleProductByIdModel } from "../../../models/products/selectSaleProductByIdModel.js";
import { invalidCredentials, notFoundError } from "../../error/errorService.js";
import { selectInvoiceIdBySaleIdModel } from "../../../models/Modules/invoices/selectInvoiceIdBySaleIdModel.js";
import { extractFullAddress } from "../../../utils/extractFullAddress.js";
import { generateExpiryDate } from "../../../utils/generateExpiryDate.js";
import { getMaxReference5Digits } from "../../../models/getMaxReference.js";
import { generateReference5DigitsFromRef } from "../../../utils/generateReference5Digits.js";


export const newInvoiceService = async (userId, body) => {
    // Obtenemos el cuerpo de la petición
    const { sale_id, payment_method, due_date } = body;

    // Verificamos si existe una factura con esa orden de venta
    const invoice = await selectInvoiceIdBySaleIdModel(sale_id);
    if (invoice) {
        invalidCredentials('La orden de venta ya tiene una factura');}

    // Extraemos el id del cliente de orden de venta
    const saleOrder = await selectCustomerIdBySaleIdModel(sale_id);

    // Verificamos que exista la orden de venta
    if (!saleOrder) {
        invalidCredentials('La orden de venta no existe');}

    // Verificamos que exista el cliente
    if (!saleOrder.customer_id) {
        invalidCredentials('La orden de venta no tiene un cliente');}
    
    // Extraemos los datos de sales Product
    const saleProduct = await selectSaleProductByIdModel(saleOrder.saleProduct_id);

    // Extraemos el precio del producto
    const product = await selectProductById(saleProduct.product_id);

    // Calculamos el total de la venta
    const total_price = saleProduct.quantity * product.price;

    // Calculamos el iva
    const including_tax = total_price * 0.21;

    // Calculamos el total
    const total_amount = total_price + including_tax;

    // Extraemos los detalles del cliente
    const { company_name, NIF, address_id } = await selectCustomerByIdModel(saleOrder.customer_id);

    // Verificamos que exista la direccion
    if (!address_id) {throw invalidCredentials('La direccion no existe');}

    // Obtenemos la direccion completa
    const addressComplete = await extractFullAddress(address_id);

    // Creamos una id para la venta
    const idInvoice = crypto.randomUUID();

    // Obtenemos la fecha de expiración
    const expiry_date = await generateExpiryDate(due_date);

    // Obtenemos la referencia máxima de la tabla Invoices
    const maxRef = await getMaxReference5Digits('Invoices', 'ref_IN') || 'IN-AA00000';

    // Generamos la nueva referencia de Invoices
    const ref = generateReference5DigitsFromRef('IN', maxRef);

    // Insertamos la factura en la base de datos
    const response = await insertInvoiceModel(idInvoice, ref, userId, sale_id, saleOrder.customer_id, company_name, NIF, addressComplete, total_price, including_tax, total_amount, payment_method, expiry_date);

    // Retornamos la respuesta
    return response;
}