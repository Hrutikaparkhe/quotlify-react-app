import React, { useState } from "react";
import "../Dropdown/Dropdown.scss";
import logo2 from "../../assets/img/logo2.png";
const Dropdown = ({setValues,values}) => {
 
  return (
    <div>
      <form action="#">
        <div className="select">
          <select
            name="nameValueSelect"
            class="select__field"
            required
            onChange={(e) => setValues(e.target.value)}
            id="valuess"
            value={values}
          >
           
            <option value="quotes">quotes</option>
            <option value="Author">Authors</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Dropdown;
