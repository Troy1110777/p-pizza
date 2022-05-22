import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Error from '../components/Error';
import Loading from '../components/Loading';
import { getAllUsers } from '../actions/userActions';
import Edituser from './Edituser';


const Userslist = () => {
  
  const dispatch = useDispatch()
  const usersstate = useSelector((state) => state.getAllUserReducer)
  const { users, error, loading } = usersstate
  
  useEffect(() => {
    dispatch(getAllUsers())
  }, [users])
  
 
  
  return (
    <div>
      <h2>Users List</h2>
      {loading && (<Loading />)}
      {error && (<Error error="Something went Wrong" />)}
      <table className="table table-bordered">
        <thead className='thead table-dark'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Creation Date</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => {
            return (<Edituser key={user._id} user={user} />)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Userslist