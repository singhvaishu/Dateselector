import React from 'react';
import { useDatePicker } from '../../context/DatePickerContext';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = () => {
    const { dateRange, updateDateRange } = useDatePicker();

    return (
        <div className="p-4 border rounded-md bg-purple-100 shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-4">Date Range</h2>
            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Start Date */}
                <div className="flex-1 mb-4 md:mb-0">
                    <label className="block mb-2 font-medium">Start Date</label>
                    <ReactDatePicker
                        selected={new Date(dateRange.startDate)}
                        onChange={(date) => updateDateRange({ startDate: date })}
                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholderText="Select start date"
                    />
                </div>
                {/* End Date */}
                <div className="flex-1">
                    <label className="block mb-2 font-medium">End Date (Optional)</label>
                    <ReactDatePicker
                        selected={dateRange.endDate ? new Date(dateRange.endDate) : null}
                        onChange={(date) => updateDateRange({ endDate: date })}
                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        isClearable
                        placeholderText="Select end date"
                    />
                </div>
            </div>
        </div>
    );
};

export default DateSelector;
