import smoothscroll from 'smoothscroll-polyfill';

import Button from '@/UI/Button';

const HomeCta = () => {
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
    <section className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-primary-blue">
      <h2 className="text-2xl sm:text-3xl font-bold pb-2 text-white leading-tight">
        En piste !
      </h2>
      <p className="text-md sm:text-lg lg:text-xl text-white mb-6">
        Retrouvez le plaisir du ski sans contraintes.
      </p>
      <Button
        classes="w-auto uppercase tracking-wide bg-secondary-blue text-white"
        onClick={scrollToTop}
      >
        Réservez maintenant
      </Button>
    </section>
  );
};

export default HomeCta;
