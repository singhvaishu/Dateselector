import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from '../DatePicker';
import { DatePickerProvider } from '../../context/DatePickerContext';

describe('DatePicker Integration', () => {
    test('renders all components', () => {
        render(
            <DatePickerProvider>
                <DatePicker />
            </DatePickerProvider>
        );

        expect(screen.getByText('Recurrence Options')).toBeInTheDocument();
        expect(screen.getByText('Date Range')).toBeInTheDocument();
        expect(screen.getByText('Preview')).toBeInTheDocument();
    });

    test('allows setting recurrence and date range', () => {
        render(
            <DatePickerProvider>
                <DatePicker />
            </DatePickerProvider>
        );

        // Change recurrence type to Weekly
        const typeSelect = screen.getByLabelText('Recurrence Type');
        fireEvent.change(typeSelect, { target: { value: 'Weekly' } });
        expect(typeSelect.value).toBe('Weekly');

        // Select Monday and Wednesday
        const mondayCheckbox = screen.getByLabelText('Monday');
        const wednesdayCheckbox = screen.getByLabelText('Wednesday');
        fireEvent.click(mondayCheckbox);
        fireEvent.click(wednesdayCheckbox);
        expect(mondayCheckbox.checked).toBe(true);
        expect(wednesdayCheckbox.checked).toBe(true);

        // Set interval to 2
        const intervalInput = screen.getByLabelText('Repeat Every');
        fireEvent.change(intervalInput, { target: { value: '2' } });
        expect(intervalInput.value).toBe('2');


        const startDateInput = screen.getByLabelText('Start Date');
        const endDateInput = screen.getByLabelText('End Date (Optional)');
        expect(startDateInput).toBeInTheDocument();
        expect(endDateInput).toBeInTheDocument();
    });
});
