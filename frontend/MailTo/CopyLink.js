import React, {useRef,useState} from "react"
import {mailToContainer} from "../Styles/Styles"

const CopyLink = ({route}) => {
    const [copySuccess, setCopySuccess] = useState('')
    const [routeLink,setRouteLink] = useState("") 
    const inputRef = useRef(null)
    

    function copyLink(e){
        e.preventDefault();
        inputRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess("Copied!")
        setTimeout(() => setCopySuccess(""),3000)
    }

    return(
        <form style={mailToContainer}>
                <input ref={inputRef} type="text" />
                <button onClick={copyLink}>
                    Copy Link
                </button>
                {copySuccess}
        </form>
    )
}
export default CopyLink