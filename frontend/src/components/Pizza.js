import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pizza = ({ pizza }) => {
    const [quantity, setQuantity] = useState(1)
    const [varient, setVarient] = useState('small')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()

    function addtocart(){
        dispatch(addToCart(pizza, quantity, varient))
        toast.success('Pizza Added to Your Cart');
    }
    return (
        <div className='shadow-lg p-3 mb-5 mt-4 bg-white rounded' >
            <div onClick={handleShow}>
                <h1>{pizza.name}</h1>
                <img src={pizza.image} className="img-fluid" style={{ height: '200px', width: '200px' }} />
            </div>
            <div className="flex-container">
                <div className='w-100 m-1'>
                    <p>Varients</p>
                    <select className='form-control' value={varient} onChange={(e)=>{setVarient(e.target.value)}}>
                        {pizza.varients.map(varient => {
                            return <option value={varient}>{varient}</option>
                        })}
                    </select>
                </div>
                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className='form-control' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i)=>{
                            return <option value={i+1}>{i+1}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div className="m-10 w-100">
                    <h1 className='mt-1'>Price:{pizza.prices[0][varient]*quantity} Rs/-</h1>
                </div>
                <div className="m-10 w-100" >
                    <button className="btn" onClick={addtocart}>ADD TO CART</button>
                    
                </div>
            </div>


            <Modal show={show} onHide={handleClose} style={{'zIndex':'600000'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{'textAlign':'center'}}>
                    <img src={pizza.image} className="img-fluid" style={{ height: '300px', width: '300px' }} />
                    <p>{pizza.description}</p>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right"
                theme='colored'
                className="toastBody"
                autoClose={3000}
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

export default Pizza;