import React from 'react'
import {Form} from 'react-bootstrap'

function Select({name, default_selected, list, required, max_choice, min_choice, multiple}) {
    return (
        <Form.Group controlId={name}>
            <Form.Label>{name}</Form.Label>
                <Form.Control as="select" multiple={multiple} required={required}>
                            {list && list.length >0 && list.map((item,key)=>{
                                return( <option key={key}>{item}</option>)
                            })}
                </Form.Control>
        </Form.Group>
    )
}

export default Select
