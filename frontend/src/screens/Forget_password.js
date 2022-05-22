import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Success from '../components/Success'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { forgetPassword } from '../actions/userActions'

const Forget_password = () => {
    const [email, setEmail] = useState('')

    const forgetpassword_res = useSelector((state) => state.forgetPasswordUserReducer)
    console.log('forgetpasswordres: ', forgetpassword_res)
    const { error, loading, success, message } = forgetpassword_res
    // console.log('f_error: ',error)
    // console.log('f_loading: ', loading)
    // console.log('f_success: ', success)
    // console.log('f_message: ', message)
    const dispatch = useDispatch()
    function forget_password(e)
    {
        e.preventDefault()
        //const fuser={email}
        dispatch(forgetPassword(email))
    }
  return (
    <div>
          <div className="row justify-content-center mt-5">
              <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
                  {loading && (<Loading />)}
                  {success && (<Success success={message} />)}
                  {error && (<Error error={error} />)}
                  <h2 className="text-center m-2" style={{ fontSize: "35px" }}>Forget Password</h2>
                  <div>
                      <input type="email" placeholder="Enter Your Email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br/>
                      <small>Please Enter your email for getting password reset link</small>
                      <button className="btn justify-content mt-3 mb-3" style={{ 'marginLeft': '17pc' }} onClick={forget_password}>SUBMIT</button>
                      <br />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Forget_password