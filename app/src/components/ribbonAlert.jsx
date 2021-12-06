import React from 'react'
import { reason } from '../utils/constants'
import hazard  from '../assets/hazard.svg'
import "./ribbonAlert.css"

function RibbonAlert({reasonAlert}) {
    console.log('reason: ', reason)
    console.log('la razon: ', reasonAlert)
    return (
        <div  className="warning-ribbon">
            <p > Warning: {reasonAlert} &nbsp; &nbsp;</p>
           <img className="blink_me" src={hazard}  alt="logo" /> 
        </div>
    )
}

export default RibbonAlert
