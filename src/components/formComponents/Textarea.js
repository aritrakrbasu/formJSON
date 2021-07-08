import React, { useContext, useEffect, useState } from 'react'
import {Form, Container, Row, Col} from 'react-bootstrap'
import { FormContext } from '../../context/FormContext'

function Textarea({default_value, name, required, placeholder, min_length, max_length}) {

    const [currentCount , setCurrentCount] = useState(0)
    const {handleChange} = useContext(FormContext)

    function handleTextarea(e)
    {
        setCurrentCount(e.target.value.length)
        handleChange(e)
    }

    useEffect(()=>{
        if(default_value)
        {
            handleChange({name,label:default_value},true)
        }
    },[default_value])

    return (
    <Form.Group controlId={name}>
        <Form.Label>{name}</Form.Label>
            <Form.Control 
                as="textarea" 
                defaultValue={default_value} 
                minLength={min_length} 
                maxLength={max_length} 
                rows={3} 
                name={name} 
                placeholder={placeholder?placeholder:`Write your ${name}`} 
                required={required} 
                onChange={(e)=>handleTextarea(e)} />
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

export default Textarea
