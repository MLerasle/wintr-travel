const BookingMainInfosItem = ({ title, children }) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="font-medium text-gray-500">{title}</dt>
    <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">{children}</dd>
  </div>
);

export default BookingMainInfosItem;
