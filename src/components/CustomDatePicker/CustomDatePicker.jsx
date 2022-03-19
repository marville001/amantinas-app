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
        className="dark:bg-gray-secondary-color"
      />
    </div>
  );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="example-custom-input dark:text-white" onClick={onClick} ref={ref}>
    {value}
  </button>
));

export default CustomDatePicker;
