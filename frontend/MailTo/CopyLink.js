import React, {useRef,useState,useEffect} from "react"
import {mailToContainer} from "../Styles/Styles"

const CopyLink = ({points,wayPointOrder}) => {
    const [copySuccess, setCopySuccess] = useState('')
    const [routeLink,setRouteLink] = useState("")
    const inputRef = useRef(null)
    
    console.log("Copylink",points,wayPointOrder)
    useEffect(()=>{
        if(points && wayPointOrder){
            link()
        }
    })
    
    function link(){
        let route = {
            origin: points[0],
            waypoints: points.slice(1, -1),
            destination: points.slice(-1)[0]
        }
        let sortedWaypoints = wayPointOrder.map(wp => route.waypoints[wp])
        let fullRoute = [route.origin,...sortedWaypoints,route.destination]
        let urlString = ""
        fullRoute.map(location => {
            console.log(typeof location)
            urlString = urlString.concat(location, "/")
        })
        setRouteLink("https://www.google.com/maps/dir/"+encodeURI(urlString))
    }

    function copyLink(e){
        link()
        e.preventDefault();
        inputRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess("Copied!")
        setTimeout(() => setCopySuccess(""),3000)
    }

    return(
        <form style={mailToContainer}>
                <input ref={inputRef} type="text" value={routeLink}/>
                <button onClick={copyLink}>
                    Copy Link
                </button>
                <span style={{color:'green', backgroundColor:"red"}}>{copySuccess}</span>
        </form>
    )
}
export default CopyLink