import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap';
import { editUserRole } from '../actions/userActions';


const Edituser = ({ user }) => {
    const dispatch = useDispatch()
    //const usersstate = useSelector((state) => state.getAllUserReducer)
    // const { users, error, loading } = usersstate
    // useEffect(() => {
    //     dispatch(getAllUsers())
    // }, [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [role, setRole] = useState('')
    const [id, setId] = useState(user._id)

    function formHandler(e) {
        e.preventDefault()
        const editeduser = {
            id,
            role
        }
        console.log('edit user: ', editeduser)
        dispatch(editUserRole(editeduser))
    }
    return (<tr className='col-md-5'>
        {/* <tr style={{ fontSize: '6px' }}> */}
            <td style={{ fontSize: '12px' }}>{user.name}</td>
            <td style={{ fontSize: '12px' }}>
                {user.email}
            </td>
            <td style={{ fontSize: '12px' }}>{user.createdAt}</td>
            <td style={{ fontSize: '12px' }}>
                {user.isAdmin ? <p>Admin</p> : <p>User</p>}
            </td>
            <td >
                <i className='fa fa-trash m-3' style={{ cursor: 'pointer' }} ></i>
                <i className='fa fa-edit m-3' style={{ cursor: 'pointer' }} onClick={handleShow}></i>
            </td>
        
            <Modal show={show} onHide={handleClose} style={{ 'z-index': '600000' }}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formHandler}>
                        <input className="form-control" type="text" value={user._id} onChange={(e) => { setId(e.target.readOnly) }} disabled />
                        <input className="form-control" type="text" value={user.name} disabled/>
                        <input className="form-control" type="text" value={user.email} disabled/>
                        <select className='form-control mt-2' id='form-control' onChange={(e) => { setRole(e.target.value) }}>
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                        </select>
                        <input className="form-control" type="text" value={user.createdAt} disabled />
                        <button className="btn mt-3" type="submit">Save</button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>
            
        {/* </tr> */}
    </tr>)
}
export default Edituser