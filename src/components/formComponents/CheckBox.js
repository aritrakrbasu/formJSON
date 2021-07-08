import React, { useContext, useState } from 'react'
import {Form} from 'react-bootstrap'
import { FormContext } from '../../context/FormContext'
function Radio({name,list}) {

    const {handleChange} = useContext(FormContext)
    const [checked,setChecked] = useState([])

    function handleCheckBox(e,label)
    {
        var prevState = checked
        if(prevState.includes(label))
        {
            prevState.pop(label)
        }
        else
        {
            prevState.push(label)
        }

        setChecked(prevState)

        handleChange({label:prevState,name:[e.target.name]},true)
    }

    return (
        <div>
            {list && list.length > 0 && list.map((label,index) => (
                
                <Form.Check
                    inline
                    label={label}
                    name={name}
                    type="checkbox"
                    id={`inline-radio-${index}`}
                    onChange={(e)=>handleCheckBox(e,label)}
                    key={index}
                />
            ))}
        </div>
    )
}

export default Radio
