import Testimonial from '@/App/Home/Testimonial';

const Testimonials = () => (
  <section className="flex justify-center items-center text-center px-4 sm:px-10 py-10 sm:py-16">
    <div className="max-w-screen-xxl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight mb-6 sm:mb-10">
        Demandez l'avis de nos clients.
      </h2>
      <article className="flex flex-col sm:flex-row justify-between items-center tracking-wide">
        <Testimonial person="David M.">
          Un service qui tombe à pic en pleine pandémie de covid-19. On a hâte
          d'y être!
        </Testimonial>
        <Testimonial person="Sandrine P." classes="py-6 sm:py-0">
          J'ai pu annuler ma réservation sans problème et ai reçu le
          remboursement dans la foulée. Merci beaucoup!
        </Testimonial>
        <Testimonial person="Patrick S.">
          La réservation est vraiment simple à faire et le service client très
          réactif.
        </Testimonial>
      </article>
    </div>
  </section>
);

export default Testimonials;
