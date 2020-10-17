const { missingParametersError } = require("../exceptions/genericErrors");

const validate = async (payload, schema) => {
  try {
    const result = await schema.validateAsync(payload);
    return result;
  } catch (error) {
    missingParametersError(error.message, error.stack);
  }
};

module.exports = validate;
