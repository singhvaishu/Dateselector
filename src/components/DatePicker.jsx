import React, { useEffect } from 'react';
import RecurrenceOptions from './RecurrenceOptions';
import DateSelector from './DateSelector';
import RecurrencePreview from './RecurrencePreview';
import { useDatePicker } from '../../context/DatePickerContext';

const DatePicker = () => {
    const { calculateRecurringDates, recurrence, dateRange } = useDatePicker();

    useEffect(() => {
        calculateRecurringDates();

    }, [recurrence, dateRange]);

    return (
        <div className="max-w-3xl mx-auto p-4 bg-blue-200 shadow-lg rounded-md">
            <RecurrenceOptions />
            <DateSelector />
            <RecurrencePreview />
        </div>
    );
};

export default DatePicker;
