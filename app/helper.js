class Helper {
  static resHandler = (res, statusCode, apiStatus, data, message) => {
    res.status(200).send({
      apiStatus,
      data,
      message,
    });
  };
}
module.exports = Helper;
