import React,{useContext, useRef} from 'react'
import {Form} from 'react-bootstrap'
import { FormContext } from '../context/FormContext'


function JsonHolder() {

    const{handleJsonIput,urlJsonData} = useContext(FormContext)

    const jsonInputRef= useRef()

    function useTab(e)
    {
        if (e.key === 'Tab') {
            e.preventDefault();
            var start = jsonInputRef.current?.selectionStart
            var end = jsonInputRef.current?.selectionEnd
            var val = jsonInputRef.current?.value
            jsonInputRef.current.value = val.substring(0, start) + '\t' + val.substring(end);
            jsonInputRef.current.selectionStart = jsonInputRef.current.selectionEnd = start + 1;
            return false;
        }
    }

    return (
        <div className="json__holder">
            <h1> Your form json : </h1>
            <p> A site that helps you build forms based on json </p>
            <Form className="my-3">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" defaultValue={urlJsonData} rows={20} className="theme__textarea" onChange={(e)=> handleJsonIput(e.target.value)} onKeyDown={useTab} ref={jsonInputRef}/>
                </Form.Group>
            </Form>
            
        </div>
    )
}

export default JsonHolder
