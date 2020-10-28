import React from "react";
import { dropdown, dropDownContainer } from "../Styles/Styles";
const Dropdown = ({ viewSetter, handleClick, show, records }) => { 
  const routeList = []; 
  
  records.filter((record) => {
      return (
        record.getCellValue("fldsAptihO9BqOPNU") !== null
      );
    }).map(record => {
      if (!routeList.includes(record.getCellValue("fldsAptihO9BqOPNU").name)){
        routeList.push(record.getCellValue("fldsAptihO9BqOPNU").name)
      }
    })

  return (
    <div className="container" style={dropDownContainer}>
      <button onClick={handleClick} type="button" className="button">
        Select Route
      </button>
      {show ? (
        <div className="dropdown" style={dropdown}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {routeList.map(route =>{
              return(<li
                onClick={() => viewSetter(route)}
                style={{ padding: "8px 12px", cursor: "pointer" }}
                key={route}
              >
                {route}
              </li>)
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
