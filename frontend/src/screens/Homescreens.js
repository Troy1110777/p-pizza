import React, {Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  {getAllPizzas}  from '../actions/pizzaActions'
import  {CgMouse}  from 'react-icons/cg'
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pizza from '../components/Pizza';
import { Filter } from './Filter';

const Homescreens = () => {
    const dispatch = useDispatch()
    const pizzasstate = useSelector((state)=>state.getAllPizzasReducer)
    // console.log('pizzasstate1: ', pizzasstate)

    const { pizzas, error, loading}  = pizzasstate

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])

    function scrollWin() {
        window.scrollTo( 0,500)
    }

    function Scroll() {
        document.querySelector('.scrollbtn').addEventListener("click", scrollWin)
    }
    return (
        <Fragment>
            <Filter />
            <div className="banner">
                    <p>Welcome to PPizza</p>
                    <h1>FIND AMAZING PIZZAS BELOW UNDER SUITABLE PRICES</h1>
                    <p>Great Until The Last Slice</p>

                <a >
                    <button className='scrollbtn' onClick={Scroll}>
                            Scroll <CgMouse />
                        </button>
                    </a>
            </div>
            
            <div className="pizzas row justify-content-center">
                {loading ? (
                    <h1>Loading</h1>,
                    <Loading/>
                ) : error ? (
                    <Error error='Something went wrong'/>
                ) : (
                            
                    pizzas.map((pizza) => {
                        return (
                            <div className="col-md-3 m-3" key={pizza._id}>
                                <div>
                                    <Pizza key={pizza._id} pizza={pizza} />   
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </Fragment>
    )
}

export default Homescreens