import React from 'react'
import ReactJson from 'react-json-view'

function ShowData({data}) {

    return (
        <>
            <a href="/"> {"<-  Go Back to Form Editing"}</a>
            <ReactJson src={data} />
        </>
    )
}

export default ShowData
