import Testimonial from '@/App/Home/Testimonial';

const Testimonials = () => (
  <section className="flex justify-center items-center text-center px-4 sm:px-10 py-10 sm:py-16">
    <div className="max-w-screen-xxl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight mb-6 sm:mb-10">
        Demandez l'avis de nos clients.
      </h2>
      <article className="flex flex-col sm:flex-row justify-between items-center tracking-wide">
        <Testimonial person="Jean-Michel Sansidée">
          Merci Wintr Travel pour ce service simple et efficace!
        </Testimonial>
        <Testimonial person="Sandrine Prèdesessou" classes="py-6 sm:py-0">
          J'ai pu annuler ma réservation sans problème et ai reçu le
          remboursement dans la foulée. Merci beaucoup!
        </Testimonial>
        <Testimonial person="Patrick Sébastien">
          Un service incroyable, une équipe de rêve, je n'envisage plus ma vie
          sans Wintr Travel!
        </Testimonial>
      </article>
    </div>
  </section>
);

export default Testimonials;
