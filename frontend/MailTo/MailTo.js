
import React from "react"
import {mailToContainer} from "../Styles/Styles"
const MailTo = ({subject, body}) => {
    
    
    return (
        <div>
            <form style={mailToContainer}>
                <input type="email" />
                <a href={`mailto:${emailAddress}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}><button>
                    Email Link
                </button></a>
            </form>
            
        </div>
        
        
    )
}
export default MailTo;