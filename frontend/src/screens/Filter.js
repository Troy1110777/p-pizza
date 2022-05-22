import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterPizzas, getAllPizzas } from '../actions/pizzaActions'

export const Filter = () => {
    const dispatch = useDispatch()
    const [searchkey, setSearchkey] = useState('')
    const [category, setCategory] = useState('All')
    return (
        <div className="container">
            <div className="row justify-content-center shadow-lg p-2 mb-2 bg-white rounded">
                <div className="col-md-3 w-35">
                    <input onChange={(e)=>{setSearchkey(e.target.value)}}
                    value={searchkey} type="text" className="form-control w-35 mt-1" placeholder='Search pizzas' />
                </div>
                <div className="col-md-3 w-35 mt-1">
                    <select className="form-control w-100" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                        <option value="all">All</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Nonveg</option>
                    </select>
                </div>
                <div className="col-md-3 w-35 mt-1">
                    <button className="btn w-100" onClick={() => { dispatch(filterPizzas(searchkey, category))}}>FILTER</button>
                </div>
            </div>
        </div>
    )
}
