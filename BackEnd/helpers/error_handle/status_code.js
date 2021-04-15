const statusError = {
    Oke: {
        code: 200,
        message: "oke"
    },
    BadRequest: {
        code: 400,
        message: "Bad Request"
    },
    Unauthorized: {
        code: 401,
        message: "Unauthorized"
    },
    Payment: {
        code: 401,
        message: "Payment Required"
    },
    Forbidden: {
        code: 403,
        message: "Forbidden "
    },
    NotFound: {
        code: 404,
        message: "Not Found "
    }

}
const statusJwt = {
    decodeFails: {
        code: 403,
        message: "Decode Failed!"
    },
    isValidToken: {
        code: 403,
        message: "Token is not valid!"
    },
    isValidRefreshToken: {
        code: 403,
        message: "refreshToken is not valid!"
    }
    ,
    expireToken: {
        code: 403,
        message: "Token expire!"
    },
    doesNotExits: {
        code: 403,
        message: "Token or refreshToken does not exits"
    }
}
const statusMulter = {
    uploadFail: {
        code: 403,
        message: "upload fail!"
    },
    IsOnlyImage: {
        code: 403,
        message: "Only image are allowed!"
    },
    ChooseFile: {
        code: 403,
        message: "Select at least one file to upload!"
    }
}
const statusUser = {
    //error
    PasswordIsNotValid:{
        code: 403,
        message: " Password is not valid."
    }
    ,
    //logout
    successLogout :{
        code:200,
        message:"logout success ..."
    },


}
const statusErrorMysql = {
    //User
    EmailExist:{
        code: 403,
        message: "Email exits!"
    },
    
    EmailIsNotValid :{
        code:403,
        message: " Email not valid!"
    },
    UserIdIsNotValid:{
        code:403,
        message: "Id is not valid!"
    },
    //Event
    JoinFail:{
        code: 403,
        message: "Event Joined!"
    },
    EventIsNotValid:{
        code:403,
        message:"Event is not valid!"
    },
    IsNotJoinEvent:{
        code:403,
        message:"User is not join Event!"
    }
    ,
    //activity
    TypeIsNotValid:{
        code:403,
        message:"Type is not valid!"
    }
}
const statusEvent = {
   Joined:{
       code:200,
       message:"Join success ..."
   }

   
}
const statusActivity = {
    ErrorGetActivity:{
        code:403,
        message:" Users is not activity!"
    },
    ErrorGetJoined:{
        code:403,
        message:"Users is not join Event! "
    },
    AddActivitySuccess:{
        code:200,
        message:"add activity success ..."
    },

}
module.exports = {
    statusError,
    statusJwt,
    statusMulter,
    statusUser,
    statusEvent,
    statusActivity,
    statusErrorMysql
};

