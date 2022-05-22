import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Loginscreen = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginState = useSelector(state => state.loginUserReducer)
    const {loading, error} = loginState
    const dispatch = useDispatch()

    useEffect(() => {
      if(localStorage.getItem('currentUser'))
      {
          window.location.href='/'
      }
    }, [])
    
    
    function login() {
        const user = {email, password}
        dispatch(loginUser(user))
    }
    return (
        <div>
            <div className="row justify-content-center mt-5" style={{'background-images':'url(../images/pizza_img1.jpg)'}}>
                <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
                    <h2 className="text-center m-2" style={{ fontSize: "35px" }}>Login</h2>
                    {loading && <Loading/>}
                    {error && <Error error="Login Failed"/>}

                    <div>
                        <input type="email" placeholder="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                        <input type="password" placeholder="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                        <button onClick={login} className="btn mt-3 mb-3">Login</button>
                        <br/>
                        <a style={{ color: 'black', textDecoration: 'None' }} className="mt-2" href="/forget_password" >Forget Password</a><br/><br/>
                        <a style={{ color: 'black', textDecoration: 'None'}} className="mt-2" href="/register" >Click Here To Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen