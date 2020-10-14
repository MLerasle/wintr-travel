const Hero = (props) => (
  <section className="hero">
    <section className="hero-content">{props.children}</section>

    <style jsx>{`
      @media (min-width: 768px) {
        .hero {
          position: relative;
          width: 100%;
          min-height: ${props.type == 'full'
            ? 'calc(100vh - 64px)'
            : 'calc(100vh - 128px)'};
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
        .hero-content {
          position: relative;
          padding: 5rem 0;
        }
      }
    `}</style>
  </section>
);

export default Hero;
