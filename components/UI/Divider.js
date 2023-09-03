const Divider = ({ label, className }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
    {label && (
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">{label}</span>
      </div>
    )}
  </div>
);

export default Divider;
