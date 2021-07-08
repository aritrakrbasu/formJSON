import React, { useContext } from 'react'
import {Button} from 'react-bootstrap'
import { FormContext } from '../context/FormContext'
import { ToastContainer, toast } from 'react-toastify';

function ShareSettings() {

    const{JsonData} = useContext(FormContext)

    var exportName = new Date
    exportName.toString()

    function shareForm()
    {
        var json = {
            "form" :JsonData
        }

        var url = window.location.href
        url = new URL(url);
        var shareUrl= `${url.origin}?data=${encodeURIComponent(JSON.stringify(json))}`
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = shareUrl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);

        toast.success('Form link has been copied to your clipboard ', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }

    return (
        <div className="share__holder">
            <div className="share__button__holder">
                <Button variant="light" className="theme__btn" onClick={shareForm}>
                    Share Form
                </Button>
                <a href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({"form":JsonData}))} download={exportName + ".json"} className="theme__btn">
                    Download Json
                </a>
            </div>
            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </div>
    )
}

export default ShareSettings
