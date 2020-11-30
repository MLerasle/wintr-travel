const MainSection = (props) => (
  <section
    className={`bg-gray-100 flex justify-center items-center ${props.parentClass}`}
  >
    <div className={`w-full main-section ${props.className}`}>
      {props.children}
    </div>

    <style jsx>{`
      .main-section {
        min-height: calc(
          100vh - ${props.layoutWithoutNavbarAndFooter ? '0px' : '128px'}
        );
      }
    `}</style>
  </section>
);

export default MainSection;
