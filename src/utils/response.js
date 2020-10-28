const { OK } = require("http-status");

const successResponse = (data = null, message = "Success", status = OK, error = null) => ({
  status,
  message,
  data,
  error,
});

module.exports = {
  successResponse,
};
