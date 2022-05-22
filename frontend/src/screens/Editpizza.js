import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editPizza, getPizzaById } from '../actions/pizzaActions'
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';

const Editpizza = ({ match }) => {
    match = { params: useParams() }
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [smallprice, setSmallprice] = useState()
    const [mediumprice, setMediumprice] = useState()
    const [largeprice, setLargeprice] = useState()
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const getPizzaByIdState = useSelector((state) => state.getPizzaByIdReducer)
    const { pizza, error, loading } = getPizzaByIdState

    const editPizzasState = useSelector((state) => state.editPizzaReducer)
    const { editloading, editerror, editsuccess } = editPizzasState

    function formHandler(e) {
        e.preventDefault()
        const editedpizza = {
            _id: match.params.pizzaid,
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            },
        }
        dispatch(editPizza(editedpizza))
        console.log("pizza: ", pizza)
    }

    useEffect(() => {
        if (pizza) {

            if (pizza._id == match.params.pizzaid) {
                setName(pizza.name)
                setCategory(pizza.category)
                setDescription(pizza.description)
                setSmallprice(pizza.prices[0]['small'])
                setMediumprice(pizza.prices[0]['medium'])
                setLargeprice(pizza.prices[0]['large'])
                setImage(pizza.image)

            }
            else {
                dispatch(getPizzaById(match.params.pizzaid))
            }
        }
        else {
            dispatch(getPizzaById(match.params.pizzaid))
        }
    }, [pizza, dispatch])

    return (
        <div>
            <h2>Edit Pizza</h2>
            <h1>Pizza id= {match.params.pizzaid}</h1>
            <img class="form-control" src={image} style={{ width: '13pc', height: '15pc', float: 'right', marginLeft: '2pc' }} />
            <div class="col-md-9" style={{ display: 'inline-block', border: '0px solid blue', marginRight: '1pc' }}>
                <div className='text-left'>
                    {loading && (<Loading />)}
                    {error && (<Error error="something went wrong" />)}
                    {editsuccess && (<Success success="Pizza Detaills Updated Succcessfully" />)}
                    {editloading && (<Loading />)}
                    {/* <img class="col-1" src={image} style={{ width: '10pc', height: '10pc', float: 'right' }} /> */}
                    <form onSubmit={formHandler}>
                        <input className="form-control" type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input className="form-control" type="text" placeholder='Small varient Price' value={smallprice} onChange={(e) => { setSmallprice(e.target.value) }} />
                        <input className="form-control" type="text" placeholder='Medium varient Price' value={mediumprice} onChange={(e) => { setMediumprice(e.target.value) }} />
                        <input className="form-control" type="text" placeholder='Large varient Price' value={largeprice} onChange={(e) => { setLargeprice(e.target.value) }} />
                        <input className="form-control" type="text" placeholder='Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
                        <input className="form-control" type="text" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                        <input className="form-control" type="text" placeholder='Image URL' value={image} onChange={(e) => { setImage(e.target.value) }} />

                        <button className="btn mt-3" type="submit">Edit Pizza</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editpizza