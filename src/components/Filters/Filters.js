import React from 'react'
import '../Filters/Filters.scss'
const Filters = ({submitText,setChecked}) => {
  console.log("####",submitText)
  return (
    <div className='checkbox-container'>
<label className="check_container">{submitText}
  <input type="checkbox" />
  <span className="checkmark"></span>
 
</label>


    </div>
  )
}

export default Filters