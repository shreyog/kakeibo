const APIError = require("../helpers/apiError");
const { UNPROCESSABLE_ENTITY } = require("http-status");

const invalidPayloadError = new APIError({
  message: "Invalid Payload",
  status: UNPROCESSABLE_ENTITY,
});

const missingParametersError = (message = "Missing parameters", stack) =>
  new APIError({
    message: message,
    status: UNPROCESSABLE_ENTITY,
    stack,
  });

module.exports = { invalidPayloadError, missingParametersError };
