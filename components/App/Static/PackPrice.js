const PackPrice = ({ price, label }) => (
  <span>
    <span className="flex flex-col text-center">
      <span className="text-5xl font-extrabold text-white tracking-tight">
        {price} €
      </span>
      <span className="mt-2 text-base font-medium text-green-100">{label}</span>
    </span>
  </span>
);

export default PackPrice;
