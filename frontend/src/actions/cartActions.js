export const addToCart=(pizza, quantity, varient)=>(dispatch, getState)=>{
    console.log("localStorage.getItem('currentUser'): ", JSON.parse(localStorage.getItem('currentUser'))['_id'])
    var cartItem = {
        userid: JSON.parse(localStorage.getItem('currentUser'))['_id'],
        name: pizza.name,
        _id: pizza._id,
        image:pizza.image,
        varient: varient,
        quantity: Number(quantity),
        prices:pizza.prices,
        price: pizza.prices[0][varient]*quantity
    }

    if(cartItem.quantity>10){
        alert("you can't add more than 10 quantities.")
    }
    else if (cartItem.quantity <1){
        alert("you have to take atleast 1 item")
    }
    else{
        dispatch({ type: 'ADD_TO_CART', payload: cartItem })
    }

    const cartItems = getState().cartReducer.cartItems
    
    console.log('cartItems: ', cartItems)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))//we have to update the localstorage
}

export const deleteFromCart= (pizza)=>(dispatch, getState) =>{
    dispatch({type:'DELETE_FROM_CART', payload: pizza})
    //after deletion update the local storage
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}