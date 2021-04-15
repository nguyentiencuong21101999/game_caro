const { statusUser, statusEvent, statusErrorMysql } = require("./status_code");
//Custom Error
class ErrorHandler extends Error {
  constructor(error) {
    super();
    this.status = "error";
    this.code = error.code
    this.message = error.message;
  }
}
class ErrorCodeHandler {
  constructor(message) {
    this.status = "error";
    this.message = message;
  }
}
//MySql Error
const handleError = (reqErr, res) => {
  const err = parseSQLExceptionIfNeeded(reqErr)
  let { message } = err
  const { code, status } = err
  
  res.json({
  status: 'error',
  code,
  message
  })
  
 }

const parseSQLExceptionIfNeeded = (err) => {
  const { 
    code
    ,sqlMessage
  
  } = err
  if (code !== 'ER_SIGNAL_EXCEPTION') {
  return err
  }
  if (sqlMessage in statusErrorMysql ) {
  return new ErrorHandler(statusErrorMysql[sqlMessage])
  }
  
  return new ErrorHandler(sqlMessage.EmailExist)
}
module.exports = {
  ErrorHandler,
  ErrorCodeHandler,
  handleError
}