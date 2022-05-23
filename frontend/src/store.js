import {combineReducers} from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { addPizzaReducer, editPizzaReducer, getAllPizzasReducer, getPizzaByIdReducer}  from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducer'
import { editUserRoleReducer, getAllUserReducer, getUserByIdReducer, loginUserReducer, registerUserReducer, forgetPasswordUserReducer, resetPasswordUserReducer } from './reducers/userReducer'
import { getAllOrdersReducer, getUserOrdersReducer, placeOrderReducer } from './reducers/orderReducer'

const finalReducer = combineReducers({
    getAllPizzasReducer: getAllPizzasReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    placeOrderReducer: placeOrderReducer,
    getUserOrdersReducer: getUserOrdersReducer,
    addPizzaReducer:addPizzaReducer,
    getPizzaByIdReducer: getPizzaByIdReducer,
    editPizzaReducer: editPizzaReducer,
    getAllOrdersReducer: getAllOrdersReducer,
    getAllUserReducer: getAllUserReducer,
    getUserByIdReducer: getUserByIdReducer,
    editUserRoleReducer:editUserRoleReducer,
    forgetPasswordUserReducer: forgetPasswordUserReducer,
    resetPasswordUserReducer: resetPasswordUserReducer
})

const cartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]
const currentUser = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null

//console.log('cartItems1: ', cartItems)
const initialState={
    cartReducer:{
        cartItems: cartItems
    },
    loginUserReducer:{
        currentUser: currentUser
    }
}
const composeEnhancers=composeWithDevTools({})
const store = createStore(finalReducer, initialState,composeEnhancers(applyMiddleware(thunk)))

export default store;