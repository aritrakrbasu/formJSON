import React, { useContext, useEffect, useState } from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'
import { FormContext } from '../../context/FormContext'

function Input({default_value,name,regex_function,required,type,placeholder,min_length,step,max_length}) {
    
    const [regex,setregex] = useState()
    const [currentCount , setCurrentCount] = useState(0)

    const {handleChange} = useContext(FormContext)

    useEffect(() => {
        if(regex_function !== undefined && regex_function !== null)
        {
            switch (regex_function.toLowerCase())
            {
                case 'name' :
                    setregex(`[a-zA-Z\\s]+`)
                    break
                case 'strict-password':
                    setregex(`(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$`)
                    break
                default :
                    setregex()
                    break;
            }
        }else
        {
            setregex()
        }
    },[regex_function])


    useEffect(()=>{
        if(default_value)
        {
            handleChange({name,label:default_value},true)
        }
    },[default_value])


    function setErrorMessage(e)
    {
        if(regex_function !== undefined && regex_function !== null)
        {
            switch (regex_function.toLowerCase())
            {
                case 'name' :
                    e.target.setCustomValidity('Name must not Contain \n 1) Special Characters \n 2) Numbers ')
                    break
                case 'strict-password':
                    e.target.setCustomValidity('Password must Contains \n 1) Uppercase \n 2) Lowercase \n 3) Number / Special Character \n 4) Minimum 6 character ')
                    break
                default :
                    return null
            }
        }else
        {
            setregex()
        }
    }

    function removeErrorMessage(e)
    {
        handleChange(e)
        setCurrentCount(e.target.value.length)
        if(e.target.value.match(regex))
        {
            e.target.setCustomValidity("")
        }
    }



    return (
        <Form.Group controlId={name}>
            <Form.Label>{name}</Form.Label>            
                <Form.Control 
                    name={name} 
                    type={type} 
                    placeholder={placeholder ? placeholder : `Enter ${name}`} 
                    defaultValue={default_value} 
                    {...regex ? { pattern : regex}  : null }
                    {...step ? {step: step} : null }
                    {...min_length ? {minlength: min_length} : null }
                    {...max_length ? {maxlength : max_length} : null }
                    onInvalid={setErrorMessage}
                    onChange={removeErrorMessage}
                    required={required}
                />

            <Container fluid className="p-0">
                <Row noGutters>
                    <Col className="p-0">
                        {
                            min_length && (
                                <div className ={currentCount < min_length ? "counter text-danger" : "counter"}>
                                    <span>Min : </span>
                                    {currentCount} / {min_length}
                                </div>
                            )
                        }
                        
                    </Col>
                    <Col className="p-0 d-flex justify-content-end">
                        {
                            max_length && (
                                <div className ={currentCount >= max_length ? "counter text-danger" : "counter"}>
                                    <span>Max : </span>
                                    {currentCount} / {max_length}
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
            
        </Form.Group>
    )
}

export default Input
