import React, { useState } from "react";

const BirthDatePicker: React.FC<{ onChange: (date: Date) => void }> = ({
  onChange,
}) => {
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dayValue = parseInt(e.target.value, 10);
    setDay(dayValue);
    if (dayValue && month && year) {
      onChange(new Date(year, month - 1, dayValue)); // month - 1 because months are zero-indexed in JavaScript Date
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = parseInt(e.target.value, 10);
    setMonth(monthValue);
    if (day && monthValue && year) {
      onChange(new Date(year, monthValue - 1, day)); // monthValue - 1 because months are zero-indexed in JavaScript Date
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = parseInt(e.target.value, 10);
    setYear(yearValue);
    if (day && month && yearValue) {
      onChange(new Date(yearValue, month - 1, day)); // month - 1 because months are zero-indexed in JavaScript Date
    }
  };

  return (
    <div>
      <label>Data de Nascimento:</label>
      <select value={day || ""} onChange={handleDayChange}>
        <option value="">Dia</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select value={month || ""} onChange={handleMonthChange}>
        <option value="">Mês</option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select value={year || ""} onChange={handleYearChange}>
        <option value="">Ano</option>
        {Array.from(
          { length: 100 },
          (_, i) => new Date().getFullYear() - i
        ).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BirthDatePicker;
