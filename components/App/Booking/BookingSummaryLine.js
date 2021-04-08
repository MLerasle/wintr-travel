const BookingSummaryLine = ({ label, value }) => (
  <div className="flex justify-between items-center mt-2">
    <dt className="font-medium text-gray-600">{label}</dt>
    <dd
      className={`font-semibold whitespace-no-wrap ${
        value === 'GRATUITE' ? 'text-primary-green' : ''
      }`}
    >
      {value}
    </dd>
  </div>
);

export default BookingSummaryLine;
