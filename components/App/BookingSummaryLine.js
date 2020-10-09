const BookingSummaryLine = ({ label, value }) => (
  <div className="flex justify-between items-center mt-2">
    <p className="text-gray-800">{label}</p>
    <p
      className={`font-semibold whitespace-no-wrap ${
        value === 'GRATUIT' ? 'text-green-500' : ''
      }`}
    >
      {value}
    </p>
  </div>
);

export default BookingSummaryLine;
