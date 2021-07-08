import React, { useContext } from 'react'
import {Form} from 'react-bootstrap'
import { FormContext } from '../../context/FormContext'

function Radio({name,list}) {

    const {handleChange} = useContext(FormContext)

    return (
        <div>
            {list && list.length > 0 && list.map((label,index) => (
                
                <Form.Check
                    inline
                    label={label}
                    name={name}
                    type="radio"
                    id={`inline-'radio-${index}`}
                    onChange={()=>handleChange({label,name},true)}
                    key={index}
                />
            ))}
        </div>
    )
}

export default Radio
