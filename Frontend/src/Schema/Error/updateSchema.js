import Joi from 'joi';
import { joiErrorMessages } from './JoiErrorMesasage.js';

// Esquema para la actualización de visitas
export const updateUserSchema = Joi.object({
  id_customer: Joi.string().guid().optional().messages(joiErrorMessages),
  id_user: Joi.string().guid().optional().messages(joiErrorMessages),
  visit_date: Joi.date().optional().messages(joiErrorMessages),
  observations: Joi.string().optional().messages(joiErrorMessages),
});

export const updateCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional().messages(joiErrorMessages),
  last_name: Joi.string().min(2).max(30).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: false }).optional().messages(joiErrorMessages),
  phone: Joi.string().min(6).max(30).optional().messages(joiErrorMessages),
  company_name: Joi.string().max(30).optional().messages(joiErrorMessages),
  NIF: Joi.string().optional().messages(joiErrorMessages),
  address: Joi.string().optional().messages(joiErrorMessages),
  number: Joi.string().optional().messages(joiErrorMessages),
  city: Joi.string().optional().messages(joiErrorMessages),
  zip_code: Joi.string().optional().messages(joiErrorMessages),
  country: Joi.string().optional().messages(joiErrorMessages),
});


export const updateVisitSchema = Joi.object({
  id_user: Joi.string().guid().optional().messages(joiErrorMessages),
  visit_date: Joi.date().optional().messages(joiErrorMessages),
  observations: Joi.string().optional().messages(joiErrorMessages),
});

export const UpdateProductSchema = Joi.object({
  name: Joi.string().optional().min(3).max(30).messages(joiErrorMessages),
  description: Joi.string().optional().messages(joiErrorMessages),
  price: Joi.string().optional().messages(joiErrorMessages),
  stock: Joi.number().optional().min(1).max(10000).messages(joiErrorMessages),
});

export const updateSaleSchema = Joi.object({
  quantity: Joi.string().optional().messages(joiErrorMessages),
  customer: Joi.string().optional().messages(joiErrorMessages)
});

export const updateDeliverySchema = Joi.object({
  delivery_status: Joi.string().optional().messages(joiErrorMessages)
});

export const updateShipmentSchema = Joi.object({
  shipment_status: Joi.string().valid('pending', 'inTransit', 'delivered', 'cancelled', 'delayed', 'refused').optional().messages(joiErrorMessages)
});

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional().messages(joiErrorMessages),
  last_name: Joi.string().min(2).max(30).optional().messages(joiErrorMessages),
  email: Joi.string().email({ tlds: false }).optional().messages(joiErrorMessages),
  phone: Joi.number().optional().messages(joiErrorMessages),
  bio: Joi.string().optional().messages(joiErrorMessages),
});

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label('Contraseña actual').messages(joiErrorMessages),
  newPassword: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .label('Nueva contraseña').messages(joiErrorMessages),
  repeatPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .label('Repetir nueva contraseña').messages(joiErrorMessages),
});

export const closedInvoiceSchema = Joi.object({
  invoice_status: Joi.string()
    .valid(
      'pending',
      'processing',
      'paid',
      'overdue',
      'partially_paid',
      'cancelled',
      'refunded',
      'disputed',
      'sent'
    )
    .optional().messages(joiErrorMessages),
});