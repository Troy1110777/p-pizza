import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOutUser } from '../actions/userActions';
import three_line1 from '../images/three_line1.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
    const cartstate = useSelector((state)=>state.cartReducer);
    const userState = useSelector(state=>state.loginUserReducer)
    const {currentUser} = userState
    const dispatch = useDispatch()
    //console.log('cartstateN: ',cartstate.cartItems.length);

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-1 mb-2 bg-white rounded">
                <a className="navbar-brand" href="/">PPizza</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span><img width='25px' height='20px' src= {three_line1} /></span>
                </button>
                <div className="collapse navbar-collapse text-start" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    {currentUser? (
                            <div className="dropdown mt-1">
                                <a style={{color:'black'}} className="dropdown-toggle nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {currentUser.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {currentUser.isAdmin && (
                                        <a className="dropdown-item" href="/admin">Admin Dashboard</a>
                                )}
                                    <a className="dropdown-item" href="/orders">Orders</a>
                                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { dispatch(logOutUser()); toast.success('Logged Out Successfully',{
                                        position: "top-center",
                                        autoClose: 5000,
                                        style:{zIndex:8000000},
                                        theme:'colored'
                                    }); }}>Logout</a>
                                    {/* <li onClick={() => { dispatch(logOutUser()) }}>Logout</li> */}
                                </div>
                            </div>
                    ):(
                            <li className="nav-item active">
                                <a className="nav-link" href="/login">
                                    Login
                                </a>
                            </li>
                    )}
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">
                                Cart {cartstate.cartItems.length}    
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar