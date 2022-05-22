import React from 'react'

const Warning = ({warning}) => {
    return (
        <div>
            <div className="alert alert-warning" role="alert">
                {warning}
            </div>
        </div>
    )
}

export default Warning