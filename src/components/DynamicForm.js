import React, { useContext } from 'react'
import {Button, Form} from 'react-bootstrap'
import { FormContext } from '../context/FormContext'
import Fields from './Fields'

function DynamicForm() {

    const {JsonData,handleSubmit} = useContext(FormContext)


    return (
        <div className="form__holder">
            <Form className="dynamic__form" onSubmit={handleSubmit}>
                {JsonData && JsonData.length > 0 && JsonData.map((feild,key)=><Fields attri={feild} key={key} />) }
                {JsonData && JsonData.length > 0 && (
                <Button variant="primary" type="submit">
                    Submit
                </Button>)}
                {JsonData === undefined && (
                    <p> Please enter your form JSON other their -> </p>
                )}
                {JsonData && JsonData?.length < 1 &&  (
                    <p> Please enter your form JSON other their -> </p>
                )}
            </Form>
        </div>
    )
}

export default DynamicForm
