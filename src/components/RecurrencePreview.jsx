import React, { useEffect } from 'react';
import { useDatePicker } from '../../context/DatePickerContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const RecurrencePreview = () => {
    const { selectedDates, calculateRecurringDates } = useDatePicker();

    useEffect(() => {
        calculateRecurringDates();

    }, []);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = format(date, 'yyyy-MM-dd');
            return selectedDates.some(
                (d) => format(new Date(d), 'yyyy-MM-dd') === formattedDate
            )
                ? 'bg-blue-500 text-white rounded-full'
                : null;
        }
    };

    return (
        <div className="p-4 border rounded-md bg-purple-100 shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="overflow-auto">
                <Calendar
                    tileClassName={tileClassName}
                    className="w-full md:w-auto"
                />
            </div>
        </div>
    );
};

export default RecurrencePreview;
