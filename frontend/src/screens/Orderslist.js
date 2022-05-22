import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePizza, getAllPizzas } from '../actions/pizzaActions'
import Error from '../components/Error';
import Loading from '../components/Loading';
import { Link, Outlet } from 'react-router-dom';
import { deliverOrder, getAllOrders } from '../actions/orderActions';

const Orderslist = () => {
  const dispatch = useDispatch()
  const getallorders = useSelector(state => state.getAllOrdersReducer)
  const { loading, error, orders } = getallorders
  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  return (
    <div>
      {loading && (<Loading />)}
      {error && (<Error error="Something went wrong" />)}
      <h2>Orders List</h2>
      <table className="table table-striped table-bordered">

        <thead className="thead table-dark">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map(order => {
            return <tr>
              <td>{order._id}</td>
              <td>{order.email}</td>
              <td>{order.userid}</td>
              <td>{order.orderAmount}</td>

              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.isDelivered ? (<h1 style={{color:'green'}}>Delivered</h1>) : (<button className="btn" onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>)}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Orderslist