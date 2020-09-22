const BookingSummaryLine = ({ label, value, key }) => (
  <div className="flex justify-between items-center mt-2" key={key}>
    <p className="text-gray-800">{label}</p>
    {value ? (
      <p className="font-semibold whitespace-no-wrap">{value}</p>
    ) : (
      <div className="w-2 h-0.4 bg-gray-800"></div>
    )}
  </div>
);

export default BookingSummaryLine;
