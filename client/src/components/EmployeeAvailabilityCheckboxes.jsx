import React from 'react';

const EmployeeAvailabilityCheckboxes = (props) => {
  let dayParts = props.availabilities.map((avail, idx) => {
    return (
      <div key={idx}>
        <input 
          type="checkbox"
          id={idx}
          name={avail.day_part}
          value="newsletter"
          defaultChecked={avail.is_available}
        />
        <label htmlFor={idx}>{avail.day_part}</label>
      </div>
    );
  });

  return (
    <div>
      {dayParts}
    </div>
  );
};

export default EmployeeAvailabilityCheckboxes;