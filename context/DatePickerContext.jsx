import React, { createContext, useContext, useState } from 'react';
import { addDays, addWeeks, addMonths, addYears, getDay, setDate, set } from 'date-fns';

const DatePickerContext = createContext();

export const useDatePicker = () => useContext(DatePickerContext);

export const DatePickerProvider = ({ children }) => {
    const [recurrence, setRecurrence] = useState({
        type: 'Daily',
        interval: 1,
        daysOfWeek: [],
        nthWeekday: { nth: 1, weekday: 'Monday' },
    });

    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: null,
    });

    const [selectedDates, setSelectedDates] = useState([]);

    const updateRecurrence = (newRecurrence) => {
        setRecurrence((prev) => ({ ...prev, ...newRecurrence }));
    };

    const updateDateRange = (newRange) => {
        setDateRange((prev) => ({ ...prev, ...newRange }));
    };

    const calculateRecurringDates = () => {

        const occurrences = [];
        let currentDate = new Date(dateRange.startDate);
        let count = 0;
        const maxOccurrences = 10;

        while (count < maxOccurrences) {
            switch (recurrence.type) {
                case 'Daily':
                    currentDate = addDays(currentDate, recurrence.interval);
                    break;
                case 'Weekly':
                    currentDate = addWeeks(currentDate, recurrence.interval);
                    break;
                case 'Monthly':
                    currentDate = addMonths(currentDate, recurrence.interval);
                    break;
                case 'Yearly':
                    currentDate = addYears(currentDate, recurrence.interval);
                    break;
                default:
                    break;
            }


            if (recurrence.type === 'Weekly' && recurrence.daysOfWeek.length > 0) {
                const weekDays = recurrence.daysOfWeek.map(day => weekdays.indexOf(day));
                const nextWeekDays = weekDays.map(day => {
                    const daysToAdd = (day - getDay(currentDate) + 7) % 7;
                    return addDays(currentDate, daysToAdd);
                });
                occurrences.push(...nextWeekDays);
            } else if (recurrence.type === 'Monthly') {
                const { nth, weekday } = recurrence.nthWeekday;
                const weekdayIndex = weekdays.indexOf(weekday);
                const nthDate = getNthWeekdayOfMonth(currentDate, nth, weekdayIndex);
                if (nthDate) occurrences.push(nthDate);
            } else {
                occurrences.push(currentDate);
            }

            count++;
            if (dateRange.endDate && currentDate > dateRange.endDate) break;
        }

        const uniqueOccurrences = Array.from(new Set(occurrences.map(d => d.toDateString())))
            .map(d => new Date(d))
            .sort((a, b) => a - b);

        setSelectedDates(uniqueOccurrences.slice(0, maxOccurrences));
    };

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getNthWeekdayOfMonth = (date, nth, weekday) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        let count = 0;
        for (let day = 1; day <= 31; day++) {
            const current = new Date(year, month, day);
            if (current.getMonth() !== month) break;
            if (current.getDay() === weekday) {
                count++;
                if (count === nth) {
                    return current;
                }
            }
        }
        return null;
    };

    return (
        <DatePickerContext.Provider
            value={{
                recurrence,
                updateRecurrence,
                dateRange,
                updateDateRange,
                selectedDates,
                calculateRecurringDates,
            }}
        >
            {children}
        </DatePickerContext.Provider>
    );
};
