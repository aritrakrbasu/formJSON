import React, { useContext, useEffect, useState } from 'react'
import {Form} from 'react-bootstrap'
import { FormContext } from '../../context/FormContext'

function Toogle({name,options,required,default_value}) {

    const [checked , setChecked] = useState(false)
    const [loading,setLoading] = useState(true)
    const {handleChange} = useContext(FormContext)

    useEffect(() => {
        if(default_value)
        {
            handleChange({name,label:default_value},true)
            if(default_value === options[1])
            {
                setChecked(true)
                setLoading(false)
            }else if (default_value === options[0])
            {
                setChecked(false)
                setLoading(false)
            }
        }else
            setLoading(false)
    }, [default_value])

    function handleToogle(e)
    {
        console.log()
        if(e.target.checked)
        {
            handleChange({label:options[0],name:[e.target.name]},true)
        }else
        {
            handleChange({label:options[1],name:[e.target.name]},true)
        }
    }
    
    return (
        <>
        {
            !loading && (
            <Form.Group className="d-flex" controlId={name}>
                <span className="pr-2">{options[0]}</span>
                <Form.Check 
                    name={name}
                    type="switch"
                    id="custom-switch"
                    label={options[1]}
                    defaultChecked = {checked}
                    onChange={handleToogle}
                />

            </Form.Group>
            )
        }
        </>
        
        
    )
}

export default Toogle
