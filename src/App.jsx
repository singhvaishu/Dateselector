import React from 'react';
import { DatePickerProvider } from '../context/DatePickerContext';
import DatePicker from './components/DatePicker';

function App() {
  return (
    <DatePickerProvider>
      <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
        <DatePicker />
      </div>
    </DatePickerProvider>
  );
}

export default App;
