export const registerUserReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                loading: true,

            }
        case 'USER_REGISTER_SUCCESS':
            console.log('action.payload: ', action.payload.message)
            return {
                loading: false,
                success: action.payload.success,
                warning: action.payload.warning,
                message: action.payload.message
                
            }
        
        case 'USER_REGISTER_FAILED':
            return {
                loading: false,
                error: action.payload,
                
            }
        default: return state
    }
}


export const loginUserReducer = (state = {}, action) => {

    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading: true,

            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loading: false,
                success: true,
                currentUser: action.payload
            }
        case 'USER_LOGIN_FAILED':
            return {
                loading: false,
                error: action.payload,

            }
        default: return state
    }
}


export const logoutUserReducer = (state={}, action)=>{
    switch(action.type)
    {
        case 'LOGOUT_SUCCESS':
            return {
                success: action.payload.success,
                message: action.payload.message,
            };
        case 'LOGOUT_FAIL':
            return {
                ...state,
                success: action.payload.success,
                error: action.payload,
        }
    }
} 



export const getAllUserReducer = (state={users:[]}, action) => {

    switch (action.type) {
        case 'GET_ALLUSER_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_ALLUSER_SUCCESS':
            return {
                loading: false,
                //success: true,
                users: action.payload
            }
        case 'GET_ALLUSER_FAILED':
            return {
                error: action.payload,
                loading: false,
            }
        default: return state
    }
}

export const getUserByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_USERBYID_REQUEST':

            return {
                loading: true,
                ...state
            }
        case 'GET_USERBYID_SUCCESS':
            //console.log('action.payload: ', action.payload)
            return {
                loading: false,
                user: action.payload

            }
        case 'GET_USERBYID_FAILED':
            return {
                error: action.payload,
                loading: false
            }
        default: return state
    }
}

export const editUserRoleReducer = (state = {}, action) => {

    switch (action.type) {
        case 'EDIT_USERROLE_REQUEST':
            return {
                edituserloading: true,
                ...state
            }
        case 'EDIT_USERROLE_SUCCESS':
            //console.log('action.payload: ', action.payload)
            return {
                edituserloading: false,
                editusersuccess: true

            }
        case 'EDIT_USERROLE_FAILED':
            return {
                editusererror: action.payload,
                edituserloading: false
            }
        default: return state
    }
}

export const forgetPasswordUserReducer = (state={}, action) =>{
    switch (action.type) {
        case 'USER_FORGOTPASSWORD_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'USER_FORGOTPASSWORD_SUCCESS':
            console.log('f_action.payload: ', action.payload.message)
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }

        case 'USER_FORGOTPASSWORD_FAILED':
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}


export const resetPasswordUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_RESETPASSWORD_REQUEST':
            return {
                loading: true,
                //...state
            }
        case 'USER_RESETPASSWORD_SUCCESS':
            console.log('f1_action.payload: ', action.payload.message)
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }

        case 'USER_RESETPASSWORD_FAILED':
            return {
                loading: false,
                error: action.payload,
            }
        default: return state
    }
}

