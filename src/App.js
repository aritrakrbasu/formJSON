import React,{ useEffect, useState } from 'react';
import {Container,Row, Col} from 'react-bootstrap'
import DynamicForm from './components/DynamicForm';
import JsonHolder from './components/JsonHolder'
import {FormContext} from './context/FormContext'
import ShareSettings from './components/ShareSettings'
import ShowData from './components/ShowData'
function App() {

  const [JsonData , setJsonData] = useState([])
  const [urlJsonData , setUrlJsonData] = useState()
  const [formData , setFormData] = useState({})

  const [showDataComponent,setShowDataComponent] =useState(false)

  function handleJsonIput(data)
  {
    var cleanData = data.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
    if(isJson(cleanData))
    {
      cleanData = cleanData.replace(/[\u0000-\u0019]+/g,""); 
      var json = JSON.parse(cleanData)
      if(json.hasOwnProperty('form'))
      {
        setJsonData(json.form)
      }else
      {
        setJsonData()
      }
    }else
    {
      setJsonData()
    }
  }

  useEffect(()=>{
    var url = window.location.href
    url = new URL(url);
    var data = url.searchParams.get("data");
    if(data != null)
    {
      var decodedURL = decodeURIComponent(data)
      var json = JSON.parse(decodedURL);
      json = JSON.stringify(json, undefined, 4);
      setUrlJsonData(json)
      handleJsonIput(json)
    }else
    {
      var json = {
        "form": [
          {
            "name": "Name",
            "type": "text",
            "required": true,
            "regex-function": "Name",
            "default": "Test Name"
          }
        ]
      }
      json = JSON.stringify(json, undefined, 4);
      setUrlJsonData(json)
      handleJsonIput(json)
    }
  },[])

  function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

  function handleChange(e,checkType=null)
  {
    if(typeof formData === "object")
    {
      if(checkType)
      {
        var newState = formData
        var key = e.name
        newState[key] = e.label
        setFormData(newState)
      }else
      {
        var newState = formData
        var key = e.target.name
        newState[key] = e.target.value
        setFormData(newState)
      }

      console.log(formData)
        
    }
  }


  function handleSubmit(e)
  {
    e.preventDefault()
    setShowDataComponent(true)
  }
  

  return (
    <FormContext.Provider value={{handleJsonIput,JsonData,urlJsonData,handleChange,handleSubmit}}>
    {showDataComponent ? (
      <ShowData data={formData}/>
    ):
    (
      <Container fluid>
          <Row noGutters>
            <Col lg={4} className="p-0">
              <DynamicForm />
            </Col>
            <Col lg={4} className="p-0"> 
              <JsonHolder />
            </Col>
            <Col lg={4}>
              <ShareSettings />
            </Col>
          </Row>
      </Container>
    )}
   </FormContext.Provider>
  );
}

export default App;
