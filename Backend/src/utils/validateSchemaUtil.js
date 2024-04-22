// validateSchemaUtil.js
export const validateSchemaUtil = async (schema, body) => {
  try {
    await schema.validateAsync(body);
  } catch (error) {
    error.statusCode = 400; // Cambiar a statusCode
    error.code = 'SCHEMA_VALIDATION_ERROR';
    throw error;
  }
};
