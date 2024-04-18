// Validamos el body
export const validateSchemaUtil = async (schema, body) => {
  try {
    await schema.validateAsync(body);
  } catch (error) {
    error.httpStatus = 400; // Bad Request
    error.code = 'SCHEMA_VALIDATION_ERROR';
    throw error;
  }
};
