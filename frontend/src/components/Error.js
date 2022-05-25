import React from 'react'

const Error = ({error}) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert" style={{ textAlign: "center" }}>
              {error}
          </div>
    </div>
  )
}

export default Error;