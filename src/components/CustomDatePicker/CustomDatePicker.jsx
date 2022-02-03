import React, { forwardRef, useState } from "react";
import DatePicker from "react-date-picker";

// import "react-datepicker/dist/DatePicker.css"

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        value={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="example-custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

export default CustomDatePicker;
