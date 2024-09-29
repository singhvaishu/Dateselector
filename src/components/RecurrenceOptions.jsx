import React from 'react';
import { useDatePicker } from '../../context/DatePickerContext';

const RecurrenceOptions = () => {
    const { recurrence, updateRecurrence } = useDatePicker();

    const handleTypeChange = (e) => {
        updateRecurrence({ type: e.target.value });
    };

    const handleIntervalChange = (e) => {
        updateRecurrence({ interval: parseInt(e.target.value) });
    };

    const handleDaysOfWeekChange = (day) => {
        const currentDays = recurrence.daysOfWeek;
        if (currentDays.includes(day)) {
            updateRecurrence({
                daysOfWeek: currentDays.filter((d) => d !== day),
            });
        } else {
            updateRecurrence({
                daysOfWeek: [...currentDays, day],
            });
        }
    };

    const handleNthWeekdayChange = (field, value) => {
        updateRecurrence({
            nthWeekday: { ...recurrence.nthWeekday, [field]: value },
        });
    };

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nthOptions = [1, 2, 3, 4, 5];

    return (
        <div className="p-4 border rounded-md bg-purple-100 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recurrence Options</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recurrence Type */}
                <div>
                    <label className="block mb-2 font-medium">Recurrence Type</label>
                    <select
                        value={recurrence.type}
                        onChange={handleTypeChange}
                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>
                </div>

                {/* Interval */}
                <div>
                    <label className="block mb-2 font-medium">Repeat Every</label>
                    <div className="flex">
                        <input
                            type="number"
                            min="1"
                            value={recurrence.interval}
                            onChange={handleIntervalChange}
                            className="border rounded-l-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="border-t border-b border-r rounded-r-md p-2 w-1/2 text-center bg-gray-200">
                            {recurrence.type === 'Daily' && 'day(s)'}
                            {recurrence.type === 'Weekly' && 'week(s)'}
                            {recurrence.type === 'Monthly' && 'month(s)'}
                            {recurrence.type === 'Yearly' && 'year(s)'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Weekly Options */}
            {recurrence.type === 'Weekly' && (
                <div className="mt-4">
                    <label className="block mb-2 font-medium">Select Days of the Week</label>
                    <div className="flex flex-wrap">
                        {weekdays.map((day) => (
                            <label key={day} className="mr-4 mb-2 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={recurrence.daysOfWeek.includes(day)}
                                    onChange={() => handleDaysOfWeekChange(day)}
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Monthly Options */}
            {recurrence.type === 'Monthly' && (
                <div className="mt-4">
                    <label className="block mb-2 font-medium">Select Nth Weekday</label>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <select
                            value={recurrence.nthWeekday.nth}
                            onChange={(e) => handleNthWeekdayChange('nth', parseInt(e.target.value))}
                            className="border rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {nthOptions.map((nth) => (
                                <option key={nth} value={nth}>
                                    {nth === 1
                                        ? 'First'
                                        : nth === 2
                                            ? 'Second'
                                            : nth === 3
                                                ? 'Third'
                                                : nth === 4
                                                    ? 'Fourth'
                                                    : 'Fifth'}
                                </option>
                            ))}
                        </select>
                        <select
                            value={recurrence.nthWeekday.weekday}
                            onChange={(e) => handleNthWeekdayChange('weekday', e.target.value)}
                            className="border rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {weekdays.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecurrenceOptions;
