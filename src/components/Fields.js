import React from 'react'
import Input from './formComponents/Input'
import Textarea from './formComponents/Textarea'
import Select from './formComponents/Select'
import Toogle from './formComponents/Toogle'
import Radio from './formComponents/Radio'
import CheckBox from './formComponents/CheckBox'

function Fields({attri}) {
    switch(attri.type)
    {
        case 'text':
        case 'password':
        case 'date':
            return(
                <Input 
                    default_value = {attri.default}
                    name = {attri.name}
                    type = {attri.type}
                    regex_function = {attri["regex-function"]}
                    required = {attri.required ? true : false}
                    placeholder = {attri.placeholder}
                    min_length = {attri["min-length"]}
                    max_length = {attri["max-length"]}
                />
            )
        case 'long text':
            return(
                <Textarea 
                    default_value = {attri.default}
                    name = {attri.name}
                    required = {attri.required ? true : false}
                    placeholder = {attri.placeholder}
                    max_length = {attri['max-length']}
                    min_length = {attri['min-length']}
                />
            )
        case 'multi choice dropdown':
            return(
                <Select 
                    default_selected = {attri.selected}
                    name = {attri.name}
                    list = {attri.list}
                    required = {attri.required ? true : false }
                    max_choice = {attri['max-choice']}
                    min_choice = {attri['min-choice']}
                    multiple = {true}
                />
            )
        case 'single choice dropdown':
            return(
                <Select 
                    default_selected = {attri.selected}
                    name = {attri.name}
                    list = {attri.list}
                    required = {attri.required ? true : false }
                    max_choice = {attri['max-choice']}
                    min_choice = {attri['min-choice']}
                    multiple = {false}
                />
            )
        case 'int':
            return(
                <Input 
                    default_value = {attri.default}
                    name = {attri.name}
                    type = "number"
                    regex_function = {attri.regex_function}
                    required = {attri.required ? true : false}
                    placeholder = {attri.placeholder}
                    step={1}
                />
            )
        case 'float':
            return(
                <Input 
                    default_value = {attri.default}
                    name = {attri.name}
                    type = "number"
                    regex_function = {attri.regex_function}
                    required = {attri.required ? true : false}
                    placeholder = {attri.placeholder}
                    step={0.01}
                />
            )
        case 'toggle':
            return(
                <Toogle 
                    default_value = {attri.default ? attri.default : null}
                    options = {attri.options ? attri.options :["",""] }
                    required = {attri.required ? true : false}
                    name = {attri.name}
                />
            )
        case 'single choice':
            return(
                <Radio 
                    default_selected = {attri.selected}
                    name = {attri.name}
                    list = {attri.list}
                />
            )
        case 'multiple choice':
            return(
                <CheckBox 
                    default_selected = {attri.selected}
                    name = {attri.name}
                    list = {attri.list}
                />
            )
        default:
            return null;

    }
}

export default Fields
