import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePizza, getAllPizzas } from '../actions/pizzaActions'
import Error from '../components/Error';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';


const Pizzaslist = () => {
    const dispatch = useDispatch()
    const pizzasstate = useSelector((state) => state.getAllPizzasReducer)
    console.log('pizzasstate1: ', pizzasstate)
    const { pizzas, error, loading } = pizzasstate

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])

    return (
        <div>
            <h2>Pizzas List</h2>
            {loading && (<Loading />)}
            {error && (<Error error="Something went Wrong" />)}
        
            <table className="table table-bordered">
                <thead className='thead table-dark'>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Prices</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas && pizzas.map(pizza=>{
                        return <tr>
                            <td style={{ fontSize: '14px' }}>{pizza.name}</td>
                            <td><img style={{height: '5pc', width: '7pc', position:'center'}} src={pizza.image} /></td>
                            <td style={{fontSize:'14px'}}>
                                Small: {pizza.prices[0]['small']}<br/>
                                Medium: {pizza.prices[0]['medium']}<br />
                                Large: {pizza.prices[0]['large']}<br />
                            </td>
                            <td style={{ fontSize: '14px' }}>{pizza.category}</td>
                            <td>
                                <i className='fa fa-trash m-3' style={{cursor:'pointer'}} onClick={()=>{dispatch(deletePizza(pizza._id))}}></i>
                                <Link to={`/admin/editpizza/${pizza._id}`}><i className='fa fa-edit m-3'></i></Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Pizzaslist