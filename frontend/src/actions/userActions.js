import axios from "axios"

export const registerUser = (user) => async dispatch =>{

    dispatch({type:"USER_REGISTER_REQUEST"});
    try{
        const response = await axios.post('/api/users/register', user)
        console.log('reg response: ', response.data)
        dispatch({ type: "USER_REGISTER_SUCCESS", payload:response.data })
    }
    catch (error)
    {
        dispatch({ type: "USER_REGISTER_FAILED", payload: error})
    }
}

export const loginUser = (user) => async dispatch =>{
    dispatch({type: "USER_LOGIN_REQUEST"})

    try{
        const response = await axios.post('/api/users/login', user)
        console.log('login response: ', response)
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href='/'

    }catch (error)
    {
        dispatch({ type: "USER_LOGIN_FAILED", payload: error })
    }
}

// export const logOutUser = () => dispatch => {
//     //const response = await axios.post('/api/users/logout')
//     //console.log('logout_response: ', response)
//     localStorage.removeItem('currentUser')
//     window.location.href = '/login' //reload
// }
export const logOutUser=()=> async dispatch =>{
    try {
        const response = await axios.get('/api/users/logout')
        //console.log('logout_response: ', response)
        dispatch({ type: 'LOGOUT_SUCCESS' });
        localStorage.removeItem('currentUser')
        window.location.href = '/login' //reload
    } catch (error) {
        dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message });
        console.log(error)
    }
}


export const getAllUsers=()=> async dispatch => {
    dispatch({ type: 'GET_ALLUSER_REQUEST' })
    try {
        const response = await axios.get('/api/users/getallusers');
        //console.log("Users-response: ", response.data);
        dispatch({ type: 'GET_ALLUSER_SUCCESS', payload: response.data })
    }
    catch(error) {
        dispatch({ type: 'GET_ALLUSER_FAILED', payload: error })
    }
}

export const getUserById = (userid) => async dispatch => {

    dispatch({ type: 'GET_USERBYID_REQUEST' })

    try {
        const response = await axios.post('/api/users/getuserbyid', { userid });
        //console.log("response: ", response.data);
        dispatch({ type: 'GET_USERBYID_SUCCESS', payload: response.data })
    }
    catch (error) {
        dispatch({ type: 'GET_USERBYID_FAILED', payload: error })
    }
}

export const editUserRole = (editeduser)=>async dispatch =>{
    dispatch({ type: 'EDIT_USERROLE_REQUEST'})
    try {
        const response1ed = await axios.post('/api/users/editrole', { editeduser })
        // console.log("responseER1", editeduser)
        // console.log("responseER2", response1ed.data)
        dispatch({ type: 'EDIT_USERROLE_SUCCESS' })
        // console.log('EditedUser Id:', editeduser.id)
        var currentId = JSON.parse(localStorage.getItem('currentUser'))
        // console.log('CurrentUser Id1:', currentId)
        // console.log('CurrentUser Id2:', currentId['_id'])
        if (editeduser.id === currentId['_id'])
        {
            localStorage.setItem('currentUser', JSON.stringify(response1ed.data))
        }
        window.location.reload()
    } catch (error) {
        dispatch({ type: 'EDIT_USERROLE_FAILED', payload: error })
    }
}

export const forgetPassword=(email)=> async dispatch=>{
    dispatch({ type: 'USER_FORGOTPASSWORD_REQUEST' })
    try {
        const f_response = await axios.post('/api/users/forgot_password', {email} )
        console.log('f_response: ', f_response.data)
        dispatch({ type: 'USER_FORGOTPASSWORD_SUCCESS', payload: f_response.data })
    } catch (error) {
        dispatch({ type: 'USER_FORGOTPASSWORD_FAILED', payload: error })
    }
}

export const resetPassword = (passW) => async dispatch => {
    dispatch({ type: 'USER_RESETPASSWORD_REQUEST' })
    try {
        const f_response = await axios.post('/api/users/reset_password', passW)
        console.log('f_response: ', f_response.data)
        dispatch({ type: 'USER_RESETPASSWORD_SUCCESS', payload: f_response.data })
        window.location.href="/login"
    } catch (error) {
        dispatch({ type: 'USER_RESETPASSWORD_FAILED', payload: error })
    }
}