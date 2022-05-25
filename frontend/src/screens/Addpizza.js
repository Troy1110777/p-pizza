import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPizza } from '../actions/pizzaActions'
import Error from '../components/Error';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addpizza = () => {
  const [name, setName] =  useState('')
  const [smallprice, setSmallprice] = useState()
  const [mediumprice, setMediumprice] = useState()
  const [largeprice, setLargeprice] = useState()
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()
  const addpizzaState = useSelector(state=>state.addPizzaReducer)
  const {success, error, loading} = addpizzaState

  function formHandler(e)
  {
    e.preventDefault()
    const pizza = {
      name,
      image,
      description,
      category,
      prices:{
        small: smallprice,
        medium: mediumprice,
        large: largeprice
      },
    }
    //console.log("pizza: ", pizza)
    dispatch(addPizza(pizza))
    toast.success('Pizza Added Successfully')
    setName('')
    setCategory('')
    setImage('')
    setDescription('')
    setSmallprice('')
    setMediumprice('')
    setLargeprice('')
  }
  return (
    <div>
      <div className='text-left'>
        <h2>Add Pizza</h2>
        {loading && (<Loading/>)}
        {error && (<Error error="something went wrong"/>)}
        {/* {success && (<Success success="New Pizza Added Successfully"/>)} */}
        <form onSubmit={formHandler}>
          <input className="form-control" type="text" placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <input className="form-control" type="text" placeholder='Small varient Price' value={smallprice} onChange={(e) => { setSmallprice(e.target.value) }} />
          <input className="form-control" type="text" placeholder='Medium varient Price' value={mediumprice} onChange={(e) => { setMediumprice(e.target.value) }} />
          <input className="form-control" type="text" placeholder='Large varient Price' value={largeprice} onChange={(e) => { setLargeprice(e.target.value) }} />
          <input className="form-control" type="text" placeholder='Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
          <input className="form-control" type="text" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
          <input className="form-control" type="text" placeholder='Image URL' value={image} onChange={(e) => { setImage(e.target.value) }} />

          <button className="btn mt-3" type="submit">Add Pizza</button>
        </form>
      </div>
      <ToastContainer position="top-right"
        theme='colored'
        bodyClassName='toastBody'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        style={{zIndex:"80000000"}}
      />
    </div>
  )
}

export default Addpizza