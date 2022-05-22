import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import Loading from './Loading'
import Error from './Error'
import Success from './Success'

const Checkout = ({ subtotal }) => {
    const orderState = useSelector((state) => state.placeOrderReducer)
    const {loading, error, success} = orderState

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState
    //console.log('currrrrrrr:', currentUser.email)
    const dispatch = useDispatch()

    function tokenHandler(token) {
        localStorage.removeItem('cartItems');
        window.location.href = '/cart'
        dispatch(placeOrder(token, subtotal))
    }

    function checkUser(){
        if(!currentUser){
            alert('For Checking Out Please Login First')
            window.location.href='/login'
        }
    }
    return (
        <div>
        {loading && (<Loading/>)}
        {error && (<Error error="Something Went Wrong"/>)}
        {success && (<Success success="Your Order Placed Successfully"/>)}
        {subtotal <= 0 && (<button className="btn" disabled>Pay Now</button>)}
        {subtotal>0 && currentUser  &&
            <StripeCheckout
                email={currentUser.email}
                amount={subtotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey='pk_test_51KeyWaSJsjptiHVFvwQEZAkq0aPaCzfmesmgmBUJgvQRGbLqbYdVS6H1vmvEXX9QEvSLKEAMuYJSihVi5l48hFMR00ZmV3I4ek'
                currency='INR'
            >
            <button className="btn" onClick={checkUser}>Pay Now</button>
            </StripeCheckout> 
        }
        </div>
        
    )
}

export default Checkout