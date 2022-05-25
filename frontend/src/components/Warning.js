import React from 'react'

const Warning = ({warning}) => {
    return (
        <div>
            <div className="alert alert-warning" role="alert" style={{textAlign:"center"}}>
                {warning}
            </div>
        </div>
    )
}

export default Warning