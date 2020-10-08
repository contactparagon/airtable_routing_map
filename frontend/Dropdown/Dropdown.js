import React from "react";
import { dropdown, dropDownContainer } from "../Styles/Styles";
const Dropdown = ({ children, handleClick, show }) => {
  return (
    <div className="container" style={dropDownContainer}>
      <button onClick={handleClick} type="button" className="button">
        Select Day and Route
      </button>
      {show ? (
        <div className="dropdown" style={dropdown}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {children}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
