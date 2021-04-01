const BookingSummaryLine = ({ label, value }) => (
  <div className="flex justify-between items-center mt-2">
    <p className="text-gray-800">{label}</p>
    <p
      className={`font-semibold whitespace-no-wrap ${
        value === 'GRATUITE' ? 'text-primary-green' : ''
      }`}
    >
      {value}
    </p>
  </div>
);

export default BookingSummaryLine;