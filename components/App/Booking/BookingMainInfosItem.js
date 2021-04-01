const BookingMainInfosItem = ({ title, children, fullwidth }) => (
  <div className={`${fullwidth ? 'sm:col-span-2' : 'sm:col-span-1'}`}>
    <dt className="font-medium text-gray-500">{title}</dt>
    <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">{children}</dd>
  </div>
);

export default BookingMainInfosItem;
