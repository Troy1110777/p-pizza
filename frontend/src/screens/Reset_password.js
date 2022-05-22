import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Success from '../components/Success'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { resetPassword } from '../actions/userActions'

const Reset_password = ({match}) => {
    match = { params: useParams() }
    console.log('match: ', match.params.reset_token)
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const resetpassword_res = useSelector((state) => state.resetPasswordUserReducer)
    const { error, loading, success, message } = resetpassword_res
    // console.log('f_error: ', error)
    // console.log('f_loading: ', loading)
    // console.log('f_success: ', success)
    // console.log('f_message: ', message)

    function reset_password(e) {
        //e.preventDefault()
        const reset_token = match.params.reset_token
        const passW={
            reset_token,
            password,
            cpassword
        }
        dispatch(resetPassword(passW))
        //prarinamderia2000@gmail.com

    }
  return (
    <div>
          <div className="row justify-content-center mt-5">
              <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
                  {loading && (<Loading />)}
                  {success && (<Success success={message} />)}
                  {error && (<Error error={error} />)}

                  <h2 className="text-center m-2" style={{ fontSize: "35px" }}>Reset Password</h2>
                  
                  <div>
                      <input type="email" placeholder="Enter Your New Password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} required /><br />
                      <input type="email" placeholder="Confirm Your New Password" className="form-control" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} required /><br />
                      <small>Please Enter your email for getting password link</small>
                      <button className="btn justify-content mt-3 mb-3" style={{ 'marginLeft': '17pc' }} onClick={reset_password}>SUBMIT</button>
                      <br />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Reset_password