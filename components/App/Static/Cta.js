import smoothscroll from 'smoothscroll-polyfill';

const Cta = () => {
  const scrollToTop = () => {
    // Polyfill that fixes smooth scroll bug in Safari
    smoothscroll.polyfill();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-white">
      <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        En piste !
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500 mb-6">
        Découvrez le plaisir du ski sans contraintes.
      </p>
      <button className="btn btn-primary btn-large" onClick={scrollToTop}>
        Réservez maintenant
      </button>
    </section>
  );
};

export default Cta;
