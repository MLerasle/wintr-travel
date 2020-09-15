const MainSection = (props) => (
  <section className="bg-gray-200 flex justify-center items-center">
    <div className={`max-w-screen-lg w-full main-section ${props.className}`}>
      {props.children}
    </div>

    <style jsx>{`
      .main-section {
        min-height: calc(
          100vh - ${props.layoutWithoutFooter ? '64px' : '128px'}
        );
      }
    `}</style>
  </section>
);

export default MainSection;
