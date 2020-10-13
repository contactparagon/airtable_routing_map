import React from "react";
import { dropdown, dropDownContainer } from "../Styles/Styles";
const Dropdown = ({ viewSetter, handleClick, show }) => {
  return (
    <div className="container" style={dropDownContainer}>
      <button onClick={handleClick} type="button" className="button">
        Select Route
      </button>
      {show ? (
        <div className="dropdown" style={dropdown}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li
              onClick={() => viewSetter("Route 1")}
              style={{ padding: "8px 12px", cursor: "pointer" }}
            >
              Route 1
            </li>
            <li
              onClick={() => viewSetter("Route 2")}
              style={{ padding: "8px 12px", cursor: "pointer" }}
            >
              Route 2
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
