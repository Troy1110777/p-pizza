import axios from 'axios'
import Orderslist from '../screens/Orderslist';
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {

    dispatch({ type: 'PLACE_ORDER_REQUEST' })
    const currentUser = getState().loginUserReducer.currentUser;
    //console.log('currentUser: ', currentUser)
    const cartItems = getState().cartReducer.cartItems
    try {

        if (currentUser) {
            const response = await axios.post('/api/orders/placeorder', { token, subtotal, currentUser, cartItems })
            //console.log('Oresponse: ', response)
            dispatch({ type: 'PLACE_ORDER_SUCCESS' })
        }

    }
    catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED' })
        console.log(error)
    }
}


export const getUsersOrders=()=>async (dispatch, getState)=>{

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_USERS_ORDERS_REQUEST' })

    try {
        const response = await axios.post('/api/orders/getuserorders', {userid:currentUser._id});
        //console.log("order response=================>", response)
        //console.log("response: ", response.data);
        dispatch({ type: 'GET_USERS_ORDERS_SUCCESS', payload: response.data })
    }
    catch (error) {
        dispatch({ type: 'GET_USERS_ORDERS_FAILED', payload: error })
    }
}


export const getAllOrders = () => async (dispatch, getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_ALLORDERS_REQUEST' })

    try {
        const response = await axios.get('/api/orders/getallorders');
        // console.log("order response=================>", response)
        // console.log("response: ", response.data);
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: response.data })
    }
    catch (error) {
        dispatch({ type: 'GET_ALLORDERS_FAILED', payload: error })
    }
}

export const deliverOrder =(orderid)=> async (dispatch)=>{
    try {
        const response = await axios.post('/api/orders/deliverorder', {orderid})
        //console.log(response)
        alert("order Delivered")
        const orders = await axios.get('/api/orders/getallorders')
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: orders.data })
    } catch (error) {
        //console.log(error)
        alert("Some Error Occured, order could not processed")
        
    }
}