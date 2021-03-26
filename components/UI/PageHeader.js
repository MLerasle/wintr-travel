const PageHeader = ({ title, children }) => (
  <div className="py-8 bg-gray-100 sm:py-16">
    <div className="max-w-md mx-auto pl-4 pr-8 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl leading-10 font-extrabold tracking-tight text-gray-800 text-center sm:text-4xl sm:leading-none lg:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-xl leading-normal text-gray-500 text-center">
        {children}
      </p>
    </div>
  </div>
);

export default PageHeader;
