import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecurrenceOptions from '../RecurrenceOptions';
import { DatePickerProvider } from '../../context/DatePickerContext';

describe('RecurrenceOptions Component', () => {
    test('renders recurrence options', () => {
        render(
            <DatePickerProvider>
                <RecurrenceOptions />
            </DatePickerProvider>
        );

        expect(screen.getByText('Recurrence Options')).toBeInTheDocument();
        expect(screen.getByLabelText('Recurrence Type')).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat Every')).toBeInTheDocument();
    });

    test('changes recurrence type', () => {
        render(
            <DatePickerProvider>
                <RecurrenceOptions />
            </DatePickerProvider>
        );

        const select = screen.getByLabelText('Recurrence Type');
        fireEvent.change(select, { target: { value: 'Weekly' } });
        expect(select.value).toBe('Weekly');
        expect(screen.getByText('Select Days of the Week')).toBeInTheDocument();
    });

    test('updates interval', () => {
        render(
            <DatePickerProvider>
                <RecurrenceOptions />
            </DatePickerProvider>
        );

        const input = screen.getByLabelText('Repeat Every');
        fireEvent.change(input, { target: { value: '2' } });
        expect(input.value).toBe('2');
    });

    test('selects days of the week', () => {
        render(
            <DatePickerProvider>
                <RecurrenceOptions />
            </DatePickerProvider>
        );

        const mondayCheckbox = screen.getByLabelText('Monday');
        const wednesdayCheckbox = screen.getByLabelText('Wednesday');

        fireEvent.click(mondayCheckbox);
        fireEvent.click(wednesdayCheckbox);

        expect(mondayCheckbox.checked).toBe(true);
        expect(wednesdayCheckbox.checked).toBe(true);
    });

    test('selects nth weekday for monthly recurrence', () => {
        render(
            <DatePickerProvider>
                <RecurrenceOptions />
            </DatePickerProvider>
        );

        const typeSelect = screen.getByLabelText('Recurrence Type');
        fireEvent.change(typeSelect, { target: { value: 'Monthly' } });
        expect(typeSelect.value).toBe('Monthly');

        const nthSelect = screen.getByLabelText('Select Nth Weekday').querySelector('select');
        const weekdaySelect = screen.getByLabelText('Select Nth Weekday').querySelectorAll('select')[1];

        fireEvent.change(nthSelect, { target: { value: '2' } });
        fireEvent.change(weekdaySelect, { target: { value: 'Tuesday' } });

        expect(nthSelect.value).toBe('2');
        expect(weekdaySelect.value).toBe('Tuesday');
    });
});
