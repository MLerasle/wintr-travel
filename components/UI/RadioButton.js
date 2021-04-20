import { getDayNumber, getMonthAndYear } from 'helpers/dates';

const RadioButton = ({ value, isDate }) => (
  <div className="w-full text-center text-gray-800">
    {isDate ? (
      <>
        <p className="text-gray-500 text-sm">Samedi</p>
        <p className="text-2xl font-bold">{getDayNumber(value)}</p>
        <p className="text-gray-500 text-sm">{getMonthAndYear(value)}</p>
      </>
    ) : (
      value
    )}
  </div>
);

export default RadioButton;
