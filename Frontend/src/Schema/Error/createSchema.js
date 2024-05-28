import Joi from 'joi';
import { joiErrorMessages } from './JoiErrorMesasage.js';

// Esquema para la creación de un nuevo usuario
export const newUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages(joiErrorMessages),
  last_name: Joi.string().min(2).max(60).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages(joiErrorMessages),
  role: Joi.string().valid('salesAgent', 'deliverer', 'admin').required().messages({
    'any.required': 'El campo rol es requerido.',
    'string.empty': 'El campo rol no puede estar vacío.'
  }),
});

export const createCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages(joiErrorMessages),
  last_name: Joi.string().min(2).max(30).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: false }).required().messages(joiErrorMessages),
  phone: Joi.string().min(6).max(30).optional().messages(joiErrorMessages),
  company_name: Joi.string().max(30).optional().messages(joiErrorMessages),
  NIF: Joi.string().optional().messages(joiErrorMessages),
  address: Joi.string().required().messages(joiErrorMessages),
  number: Joi.string().optional().messages(joiErrorMessages),
  city: Joi.string().optional().messages(joiErrorMessages),
  zip_code: Joi.string().optional().messages(joiErrorMessages),
  country: Joi.string().optional().messages(joiErrorMessages),
});



export  const newVisitSchema = Joi.object({
  id_customer: Joi.string().guid().required().messages(joiErrorMessages),
  visit_date: Joi.date().required().messages(joiErrorMessages),
  observations: Joi.string().optional().messages(joiErrorMessages),
});

export  const newProductSchema = Joi.object({
  name: Joi.string().required().min(2).max(30).messages(joiErrorMessages),
  price: Joi.string().required().messages(joiErrorMessages),
  stock: Joi.number().required().min(1).max(10000).messages(joiErrorMessages),
  description: Joi.string().optional().messages(joiErrorMessages),
  active: Joi.boolean().optional().messages(joiErrorMessages)
});


export const deliveryNoteSchema = Joi.object({
  id_sale: Joi.string().guid().required().messages(joiErrorMessages),
  deliverer_id: Joi.string().guid().required().messages(joiErrorMessages),
});

export const saleSchema = Joi.object({
  product: Joi.string().required().messages(joiErrorMessages),
  quantity: Joi.string().required().messages(joiErrorMessages),
  customer: Joi.string().required().messages(joiErrorMessages),
});


export const createInvoiceSchema = Joi.object({
  sale_id: Joi.string().guid().required().messages(joiErrorMessages),
  payment_method: Joi.string().valid('cash', 'card', 'transfer').optional().messages(joiErrorMessages),
  due_date: Joi.date().optional().messages(joiErrorMessages),
});

export const createPaymentSchema = Joi.object({
  invoice_id: Joi.string().required().guid().messages(joiErrorMessages),
});

export const createShipmentSchema = Joi.object({
  deliveryNote_id: Joi.string().guid().required().messages(joiErrorMessages),
  additional_notes: Joi.string().optional().messages(joiErrorMessages),
});
