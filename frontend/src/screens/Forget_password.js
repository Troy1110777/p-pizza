import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Success from '../components/Success'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Warning from '../components/Warning'
import { forgetPassword } from '../actions/userActions'


const Forget_password = () => {
    const [email, setEmail] = useState('')

    const forgetpassword_res = useSelector((state) => state.forgetPasswordUserReducer)
    // console.log('forgetpasswordresres: ', forgetpassword_res)
    const { error, loading, success, message, warning } = forgetpassword_res
    // console.log("RPerror: ", error)
    // console.log("RPloading: ", loading)
    // console.log("RPsuccess: ", success)
    // console.log("RPmessage: ", message)
    // console.log("RPwarning: ", warning)
    const dispatch = useDispatch()

    function forget_password(e)
    {
        e.preventDefault()
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email && regex.test(email)) {
            dispatch(forgetPassword(email))
        }
    }

  return (
    <div>
          <div className="row justify-content-center mt-5">
              <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
                  {loading && (<Loading />)}
                  {success && (<Success success={message} />)}
                  {error && (<Error error={message} />)}
                  {warning && <Warning warning={"You Are Already Logged In"}/>}
                  <h2 className="text-center m-2" style={{ fontSize: "35px" }}>Forget Password</h2>
                  <div style={{ textAlign: "center" }}>
                      <input type="email" placeholder="Enter Your Email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br/>
                      <small style={{ textAlign: "center" }}>Please Enter your email for getting password reset link. If you are already Logged In then dont enter your email.</small><br/>
                      <button className="btn justify-content mt-3 mb-3"  onClick={forget_password}>SUBMIT</button>
                      <br />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Forget_password;