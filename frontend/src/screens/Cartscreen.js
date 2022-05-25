import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cartscreen = () => {
    const cartstate = useSelector((state) => state.cartReducer)
    const cartItems = cartstate.cartItems;
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0) //reduce takes 2 parameter 1. initial value 2.the item which is going to loop through
    const dispatch = useDispatch()
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h2 style={{ fontSize: '40px' }}>My Cart</h2>
                    <hr />
                    {cartItems.length === 0 && (<p>No product in Your cart</p>)}
                    {cartItems.map((item) => {
                        return (
                            <div className="flex-container">
                                <div className="text-start m-1 w-100">
                                    <h1>{item.name}[ {item.varient} ]</h1>
                                    <h1>Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price}</h1>
                                    <h1 style={{ display: 'inline' }}>Quantity: </h1>
                                    <i className="fas fa-plus" onClick={() => { dispatch(addToCart(item, item.quantity + 1, item.varient)) }}></i>

                                    <b>{item.quantity}</b>
                                    <i className="fas fa-minus" onClick={() => { dispatch(addToCart(item, item.quantity - 1, item.varient)) }}></i>
                                    <hr />
                                </div>
                                <div className="m-1 w-100">
                                    <img src={item.image} alt='' style={{ height: '80px', width: '80px' }} />
                                </div>
                                <div className="m-1 w-100">
                                    <i className="fas fa-trash mt-2" onClick={() => { dispatch(deleteFromCart(item)); toast.success('Pizza is Successfully Deleted from Your Cart'); }}></i>
                                </div>
                            </div>

                        )
                    })}

                </div>
                <div className="col-md-4 text-end">
                    <h2 style={{ fontSize: "45px" }}>Subtotal: {subtotal} /-</h2>
                    <Checkout subtotal={subtotal} />
                </div>
            </div>
            <ToastContainer position="top-right"
                className="toastBody"
                theme='colored'
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                style={{ zIndex: "800000000" }}
                toastClassName="dark-toast"
            />
        </div>
    )
}

export default Cartscreen;