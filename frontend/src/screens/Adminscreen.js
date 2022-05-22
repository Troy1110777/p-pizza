import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


const Adminscreen = () => {
    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState
    const dispatch = useDispatch()
    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = "/"
        }
    }, [])

    return (
        <div className='container'>
            <h2 style={{ fontSize: '35px', color:'white', backgroundColor:'green', borderRadius:'5px'}}>Admin Panel</h2>

            {/* <div className="row justify-content-center"> */}
            <div className="row">
                <div className="col-md-2" style={{  border: '0px solid green'}}>
                    <ul className="adminfunctions">
                        <li><Link to="/admin/userslist">User List</Link></li>
                        <li><Link to="/admin/pizzaslist">Pizzas List</Link></li>
                        <li><Link to="/admin/addpizza">Add New Pizza</Link></li>
                        <li><Link to="/admin/orderslist">Orders List</Link></li>
                        <li><Link to="/admin/orderslist">Offer</Link></li>
                    </ul>
                </div>
                
                <div className="col justify-content-center" style={{ border: '0px solid green'}}>
                    <div className='col-md-12' style={{ border: '0px solid red' }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminscreen