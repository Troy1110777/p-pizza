import React, {useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'
import Warning from '../components/Warning'
const Registerscreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const registerState = useSelector((state)=>state.registerUserReducer)
    const { error, loading, success, warning, message} = registerState
    
    const dispatch = useDispatch()
    
    function register()
    {
        if(password !== cpassword){
            alert("password not matched")
        }
        else{
            const user={
                name,
                email,
                password
            }
            //console.log(user)
            if (email !== '' && password !== '' && password !== '')
                dispatch(registerUser(user))
        }
        
    }
    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
                {loading && (<Loading/>)}
                {warning && (<Warning warning={message} />)} 
                {success && (<Success success={message} />)}
                {error && (<Error error={error}/>)}

                <h2 className="text-center m-2" style={{fontSize:"35px"}}>Register</h2>
                    <div>
                        <input type="text" placeholder="name" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} required/>
                        <input type="email" placeholder="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} required/>
                        <input type="password" placeholder="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <input type="password" placeholder="confirm password" className="form-control" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} required/>

                        <button onClick={register} className="btn mt-3 mb-3">REGISTER</button>
                        <br/>
                        <a style={{color:'black'}} href="/login">Click here to Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen