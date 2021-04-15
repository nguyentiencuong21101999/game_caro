const { ErrorHandler} = require('../error_handle/error_handle')
const validate = (validation) =>{
        if(validation.error){
            throw new ErrorHandler(validation.error.details[0]);
        }  
}
module.exports = validate


