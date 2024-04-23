import React, { useState } from "react";

interface IRangePicker {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IDateRangePicker {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const CustomDatePicker = ({ label, name, value, onChange }: IRangePicker) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0zM5 4H4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2h-1V1a1 1 0 10-2 0v3H6V1a1 1 0 10-2 0v3zm11 5H4v7a2 2 0 002 2h12a2 2 0 002-2v-7H5v1a1 1 0 102 0V9zm-2 1a1 1 0 100 2 1 1 0 000-2zm-8 0a1 1 0 100 2 1 1 0 000-2zm8 0H7v2h8v-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={label}
      />
    </div>
  );
};

export default function DateRangePicker({
  setStartDate: setParentStartDate,
  setEndDate: setParentEndDate,
}: IDateRangePicker) {
  const [startDateString, setStartDateString] = useState("");
  const [endDateString, setEndDateString] = useState("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateString(e.target.value); 
    setParentStartDate(e.target.value); 
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateString(e.target.value); 
    setParentEndDate(e.target.value); 
  };

  return (
    <div className="flex items-center">
      <CustomDatePicker
        label="Select date start"
        name="start"
        value={startDateString}
        onChange={handleStartDateChange}
      />
      <span className="mx-4 text-gray-500">to</span>
      <CustomDatePicker
        label="Select date end"
        name="end"
        value={endDateString}
        onChange={handleEndDateChange}
      />
    </div>
  );
}
